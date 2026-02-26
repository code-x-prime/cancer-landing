"use client"
import { useState, useRef, useEffect } from "react";
import { CheckCircle2, Upload, Shield, UserCheck, ArrowRight, ArrowLeft, Save } from "lucide-react";
import { CountryCodeSelect } from "./CountryCodeSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const africanCountries = [
  "Nigeria", "Kenya", "Ethiopia", "Ghana", "Tanzania", "South Africa",
  "Uganda", "Cameroon", "Senegal", "Zimbabwe", "Sudan", "Rwanda",
  "Mozambique", "Zambia", "Angola", "Democratic Republic of Congo", "Other",
];

const TOTAL_STEPS = 2;

const LeadForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const topRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    country: "",
    city: "",
    countryCode: "+91",
    phone: "",
    email: "",
    symptoms: "",
    duration: "",
    previousTreatment: "",
    treatmentDetails: "",
    privacyAgreed: false,
  });

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem("panacea_lead_form_data");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.whatsapp && !parsedData.phone) {
          parsedData.phone = parsedData.whatsapp;
          parsedData.countryCode = "+91";
        }
        setFormData(prev => ({ ...prev, ...parsedData }));
        toast({ title: "Welcome back!", description: "We've restored your progress." });
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }, [toast]);

  const handleSaveForLater = () => {
    try {
      localStorage.setItem("panacea_lead_form_data", JSON.stringify(formData));
      toast({ title: "Progress Saved", description: "You can resume later from this device." });
    } catch (e) {
      toast({ title: "Error", description: "Could not save progress. Storage might be full.", variant: "destructive" });
    }
  };

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
      if (selectedFile.size > 25 * 1024 * 1024) {
        toast({ title: "File too large", description: "Max file size is 25MB", variant: "destructive" });
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const validateStep = (currentStep) => {
    const d = formData;
    if (currentStep === 1) {
      if (!d.name || !d.gender || !d.dob || !d.country) return false;
      // At least one of email or phone must be provided
      if (!d.phone && !d.email) return false;
    }
    if (currentStep === 2) {
      if (!formData.symptoms || !formData.previousTreatment) return false;
      if (formData.previousTreatment === "Yes" && !formData.treatmentDetails) return false;
      if (!formData.privacyAgreed) return false;
    }
    return true;
  };

  const nextStep = () => {
    if (!validateStep(step)) {
      let msg = "Please fill all mandatory fields.";
      if (step === 1 && !formData.phone && !formData.email) {
        msg = "Please provide at least WhatsApp number or Email.";
      } else if (step === 2 && !formData.privacyAgreed) {
        msg = "Please agree to the Privacy Policy to submit.";
      }
      toast({ title: "Incomplete Details", description: msg, variant: "destructive" });
      return;
    }
    setStep(prev => prev + 1);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(2)) {
      const msg = !formData.privacyAgreed 
        ? "Please agree to the Privacy Policy to submit."
        : "Please fill all mandatory fields.";
      toast({ title: "Incomplete Details", description: msg, variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'phone' && key !== 'countryCode') {
          data.append(key, formData[key]);
        }
      });
      data.append("whatsapp", formData.phone ? `${formData.countryCode} ${formData.phone}` : "");

      if (file) data.append("file", file);

      const response = await fetch("/api/submit-lead", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        toast({ title: "Details submitted!", description: "Our team will contact you shortly." });
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass rounded-2xl p-8 shadow-2xl text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-whatsapp/20 flex items-center justify-center animate-pulse">
          <CheckCircle2 className="text-whatsapp" size={40} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Submission Successful!</h3>
          <p className="text-lg text-primary font-medium mt-2">Our team is reviewing your case...</p>
        </div>
        <div className="bg-secondary/50 p-4 rounded-lg text-sm text-left space-y-2">
          <div className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5" /><span>Details received securely.</span></div>
          <div className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5" /><span>Case is being reviewed by our specialists.</span></div>
          <div className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5" /><span>You will be contacted within 2 hours.</span></div>
        </div>
        <Button onClick={() => window.open('https://wa.me/919958800961', '_blank')} className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white">
          Chat on WhatsApp for Status
        </Button>
      </div>
    );
  }

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div ref={topRef} className="glass rounded-2xl p-4 sm:p-6 shadow-2xl transition-all">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent leading-tight">
              Let&apos;s Help You
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Get expert medical guidance — free consultation</p>
          </div>
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full flex-shrink-0">Step {step} of {TOTAL_STEPS}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── Step 1: Patient Details ── */}
        {step === 1 && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h4 className="font-semibold text-foreground border-b pb-2">Patient Information</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Patient Full Name *</Label>
                <Input id="name" required placeholder="As per passport" value={formData.name} onChange={handleInputChange} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Gender *</Label>
                  <Select onValueChange={(v) => handleSelectChange("gender", v)} value={formData.gender}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dob" className="text-sm font-medium">Date of Birth *</Label>
                  <Input id="dob" type="date" required value={formData.dob} onChange={handleInputChange} className="mt-1" />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Country of Residence *</Label>
                <Select onValueChange={(v) => handleSelectChange("country", v)} value={formData.country}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select Country" /></SelectTrigger>
                  <SelectContent>
                    {africanCountries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="city" className="text-sm font-medium">City</Label>
                <Input id="city" placeholder="Current city" value={formData.city} onChange={handleInputChange} className="mt-1" />
              </div>

              {/* WhatsApp OR Email — at least one required */}
              <div>
                <Label className="text-sm font-medium">WhatsApp Number <span className="text-muted-foreground font-normal">(or provide Email below)</span></Label>
                <div className="flex gap-2 mt-1">
                  <CountryCodeSelect value={formData.countryCode} onChange={(code) => handleSelectChange("countryCode", code)} />
                  <Input id="phone" type="tel" placeholder="Mobile Number" value={formData.phone} onChange={handleInputChange} className="flex-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">Email Address <span className="text-muted-foreground font-normal">(or provide WhatsApp above)</span></Label>
                <Input id="email" type="email" placeholder="For report delivery" value={formData.email} onChange={handleInputChange} className="mt-1" />
              </div>
              {(!formData.phone && !formData.email) && (
                <p className="text-xs text-destructive">* Please provide at least WhatsApp number or Email</p>
              )}
            </div>
          </div>
        )}

        {/* ── Step 2: Medical Details + Upload ── */}
        {step === 2 && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h4 className="font-semibold text-foreground border-b pb-2">Medical Details & Reports</h4>
            <div className="space-y-3">

              <div>
                <Label htmlFor="symptoms" className="text-sm font-medium">Symptoms Description *</Label>
                <Textarea id="symptoms" required placeholder="Describe main symptoms..." value={formData.symptoms} onChange={handleInputChange} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Duration of Symptoms</Label>
                <Select onValueChange={(v) => handleSelectChange("duration", v)} value={formData.duration}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="How long?" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Less than 1 month">&lt; 1 month</SelectItem>
                    <SelectItem value="1-3 months">1-3 months</SelectItem>
                    <SelectItem value="3-6 months">3-6 months</SelectItem>
                    <SelectItem value="6+ months">6+ months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Previous Treatment Taken? *</Label>
                <RadioGroup onValueChange={(v) => handleSelectChange("previousTreatment", v)} value={formData.previousTreatment} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="pt-yes" />
                    <Label htmlFor="pt-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="pt-no" />
                    <Label htmlFor="pt-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.previousTreatment === "Yes" && (
                <div className="animate-in fade-in zoom-in duration-200">
                  <Label htmlFor="treatmentDetails" className="text-sm font-medium">Treatment Details *</Label>
                  <Textarea id="treatmentDetails" required placeholder="Chemo, Surgery, Medication names..." value={formData.treatmentDetails} onChange={handleInputChange} className="mt-1" />
                </div>
              )}

              {/* File Upload */}
              <div>
                <Label className="text-sm font-medium">Upload Medical Reports (Optional)</Label>
                <label className="mt-2 flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:border-primary/60 transition-colors bg-secondary/30">
                  <Upload size={28} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{fileName || "Click to upload reports"}</span>
                  <span className="text-xs text-muted-foreground">PDF, JPG, PNG, DOC (Max 25MB)</span>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleFileChange} />
                </label>
                {fileName && <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1"><CheckCircle2 size={12} /> {fileName} attached</p>}
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start gap-2 pt-2 border-t border-border mt-4">
                <input 
                  type="checkbox" 
                  id="privacyAgreed" 
                  checked={formData.privacyAgreed}
                  onChange={(e) => handleSelectChange("privacyAgreed", e.target.checked)}
                  className="mt-1 flex-shrink-0 cursor-pointer accent-primary w-4 h-4"
                />
                <Label htmlFor="privacyAgreed" className="text-sm font-medium text-foreground/80 leading-tight cursor-pointer">
                  I agree to the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>
                </Label>
              </div>

            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4 gap-3">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
              <ArrowLeft size={16} className="mr-2" /> Back
            </Button>
          ) : (
            <div className="flex-1 md:hidden"></div>
          )}

          <Button type="button" variant="ghost" onClick={handleSaveForLater} className="text-muted-foreground hover:text-primary gap-2">
            <Save size={16} /> <span className="hidden sm:inline">Save & Resume</span>
          </Button>

          {step < TOTAL_STEPS ? (
            <Button type="button" onClick={nextStep} className="flex-1 bg-primary hover:bg-primary/90">
              Next Step <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading} className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold shadow-lg">
              {isLoading ? "Submitting..." : "Submit Now"}
            </Button>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><Shield size={10} className="text-primary" /> Encrypted</span>
          <span className="flex items-center gap-1"><UserCheck size={10} className="text-primary" /> HIPAA Compliant</span>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
