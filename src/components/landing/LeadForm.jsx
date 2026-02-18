"use client"
import { useState } from "react";
import { CheckCircle2, Upload, Shield, UserCheck, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const africanCountries = [
  "Nigeria", "Kenya", "Ethiopia", "Ghana", "Tanzania", "South Africa",
  "Uganda", "Cameroon", "Senegal", "Zimbabwe", "Sudan", "Rwanda",
  "Mozambique", "Zambia", "Angola", "Democratic Republic of Congo", "Other",
];

const cancerTypes = [
  "Breast", "Prostate", "Cervical", "Lung", "Blood Cancer", "Other",
];

const LeadForm = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    whatsapp: "",
    email: "",
    cancerType: "",
    stage: "",
    timeline: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (file) data.append("file", file);

      const response = await fetch("/api/submit-lead", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        toast({ title: "Case submitted!", description: "Our team will review and respond within 24–48 hours." });
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit form. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass rounded-2xl p-8 shadow-2xl text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-whatsapp/20 flex items-center justify-center">
          <CheckCircle2 className="text-whatsapp" size={32} />
        </div>
        <h3 className="text-xl font-bold text-foreground">Case Submitted Successfully!</h3>
        <p className="text-muted-foreground">Our oncology team will review your reports and respond within 24–48 hours.</p>
        <a
          href="https://wa.me/919958800961"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-whatsapp text-whatsapp-foreground font-semibold"
        >
          Chat on WhatsApp for Faster Response
        </a>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-foreground">Get a Free Cancer Case Review</h3>
        <p className="text-sm text-accent font-semibold">(24–48 Hours Response)</p>
        <p className="text-xs text-muted-foreground mt-1">Submit your medical reports for AI-assisted pre-screening followed by review by senior oncologists in India.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
          <Input
            id="name"
            required
            placeholder="Enter your full name"
            className="mt-1"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="country" className="text-sm font-medium">Country *</Label>
          <Select required onValueChange={(value) => handleSelectChange("country", value)}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Select your country" /></SelectTrigger>
            <SelectContent>
              {africanCountries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp Number *</Label>
            <Input
              id="whatsapp"
              required
              type="tel"
              placeholder="+234 xxx xxxx"
              className="mt-1"
              value={formData.whatsapp}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
            <Input
              id="email"
              required
              type="email"
              placeholder="your@email.com"
              className="mt-1"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="cancer-type" className="text-sm font-medium">Type of Cancer *</Label>
          <Select required onValueChange={(value) => handleSelectChange("cancerType", value)}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Select cancer type" /></SelectTrigger>
            <SelectContent>
              {cancerTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="stage" className="text-sm font-medium">Current Diagnosis Stage (Optional)</Label>
          <Select onValueChange={(value) => handleSelectChange("stage", value)}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Select stage if known" /></SelectTrigger>
            <SelectContent>
              {["Not sure", "Early stage", "Advanced stage"].map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium">Upload Medical Reports *</Label>
          <label className="mt-1 flex items-center gap-3 p-3 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/60 transition-colors bg-secondary/50">
            <Upload size={20} className="text-primary" />
            <span className="text-sm text-muted-foreground">{fileName || "Click to upload reports (PDF, JPG, PNG)"}</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div>
          <Label htmlFor="timeline" className="text-sm font-medium">When are you planning treatment? (Optional)</Label>
          <Select onValueChange={(value) => handleSelectChange("timeline", value)}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Select timeline" /></SelectTrigger>
            <SelectContent>
              {["Immediately", "Within 1 month", "1–3 months"].map(t => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="message" className="text-sm font-medium">Additional message / questions (Optional)</Label>
          <Textarea
            id="message"
            placeholder="Any additional details about your condition..."
            className="mt-1"
            rows={3}
            value={formData.message}
            onChange={handleInputChange}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 text-base shadow-lg">
          {isLoading ? "Submitting..." : "Get Treatment Plan & Cost Estimate"}
        </Button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Shield size={12} className="text-primary" /> 100% Confidential</span>
        <span className="flex items-center gap-1"><UserCheck size={12} className="text-primary" /> Doctor Reviewed</span>
        <span className="flex items-center gap-1"><FileCheck size={12} className="text-primary" /> No Obligation</span>
      </div>
    </div>
  );
};

export default LeadForm;
