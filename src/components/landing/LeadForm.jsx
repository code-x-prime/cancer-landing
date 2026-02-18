"use client"
import { useState, useRef, useEffect } from "react";
import { CheckCircle2, Upload, Shield, UserCheck, ArrowRight, ArrowLeft, Info, Save } from "lucide-react";
import { CountryCodeSelect } from "./CountryCodeSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const africanCountries = [
  "Nigeria", "Kenya", "Ethiopia", "Ghana", "Tanzania", "South Africa",
  "Uganda", "Cameroon", "Senegal", "Zimbabwe", "Sudan", "Rwanda",
  "Mozambique", "Zambia", "Angola", "Democratic Republic of Congo", "Other",
];

const medicalConcerns = [
  "Cancer (Oncology)", "Cardiac (Heart)", "Orthopedics (Bone/Joint)", 
  "Neurology (Brain/Spine)", "Transplant", "General Surgery", "Other"
];

const LeadForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const topRef = useRef(null);

  const [formData, setFormData] = useState({
    // Step 1: Patient Details
    name: "",
    gender: "",
    dob: "",
    country: "",
    city: "",
    countryCode: "+91",
    phone: "",
    email: "",
    
    // Step 2: Medical Condition
    concern: "",
    diagnosis: "",
    symptoms: "",
    duration: "",
    previousTreatment: "",
    treatmentDetails: "",
    existingConditions: "",
    
    // Step 3: Reports (File handles separately)
    
    // Step 4: Preferences & Consent
    preferredHospital: "",
    budget: "",
    travelReadiness: "",
    consentData: false,
    consentDisclaimer: false
  });

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem("panacea_lead_form_data");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Migration for old data with 'whatsapp' field
        if (parsedData.whatsapp && !parsedData.phone) {
             parsedData.phone = parsedData.whatsapp;
             parsedData.countryCode = "+91"; // Default fall back
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
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({ title: "File too large", description: "Max file size is 10MB", variant: "destructive" });
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const validateStep = (currentStep) => {
    const d = formData;
    if (currentStep === 1) {
      if (!d.name || !d.gender || !d.dob || !d.country || !d.phone || !d.email) return false;
    }
    if (currentStep === 2) {
      if (!d.concern || !d.symptoms || !d.previousTreatment) return false;
      if (d.previousTreatment === "Yes" && !d.treatmentDetails) return false;
    }
    // Step 3 is optional (Reference: "Upload Medical Reports (Optional but Recommended)")
    if (currentStep === 4) {
      if (!d.consentData || !d.consentDisclaimer) return false;
    }
    return true;
  };

  const nextStep = () => {
    if (!validateStep(step)) {
      toast({ title: "Incomplete Details", description: "Please fill all mandatory fields.", variant: "destructive" });
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
    if (!validateStep(4)) {
      toast({ title: "Consent Required", description: "Please agree to the consent and disclaimer.", variant: "destructive" });
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
      data.append("whatsapp", `${formData.countryCode} ${formData.phone}`);
      
      if (file) data.append("file", file);

      const response = await fetch("/api/submit-lead", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        toast({ title: "Case submitted!", description: "AI Analysis in progress. Review in 2 hours." });
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
      <div className="glass rounded-2xl p-8 shadow-2xl text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-whatsapp/20 flex items-center justify-center animate-pulse">
          <CheckCircle2 className="text-whatsapp" size={40} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Submission Successful!</h3>
          <p className="text-lg text-primary font-medium mt-2">AI System is analyzing your case...</p>
        </div>
        <div className="bg-secondary/50 p-4 rounded-lg text-sm text-left space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-primary mt-0.5" />
            <span>Details received securely.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-primary mt-0.5" />
            <span>Structuring medical data...</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-primary mt-0.5" />
            <span>Matching with specialist...</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">You will receive your <strong>AI Pre-Screening Report</strong> within 2 hours via email & WhatsApp.</p>
        <Button onClick={() => window.open('https://wa.me/919958800961', '_blank')} className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white">
          Chat on WhatsApp for Status
        </Button>
      </div>
    );
  }

  const progress = (step / 4) * 100;

  return (
    <div ref={topRef} className="glass rounded-2xl p-4 sm:p-6 shadow-2xl transition-all">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-foreground">AI Pre-Screening</h3>
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">Step {step} of 4</span>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <Info size={12} /> Takes ~5 minutes. AI Analysis provided in 2 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Patient Basic Details */}
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
                <Label htmlFor="country" className="text-sm font-medium">Country of Residence *</Label>
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
              <div>
                <Label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp Number *</Label>
                <div className="flex gap-2 mt-1">
                  <CountryCodeSelect 
                    value={formData.countryCode} 
                    onChange={(code) => handleSelectChange("countryCode", code)} 
                  />
                  <Input 
                    id="phone" 
                    required 
                    type="tel" 
                    placeholder="Mobile Number" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    className="flex-1" 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                <Input id="email" required type="email" placeholder="For report delivery" value={formData.email} onChange={handleInputChange} className="mt-1" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Medical Condition & History */}
        {step === 2 && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h4 className="font-semibold text-foreground border-b pb-2">Medical Concern Details</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="concern" className="text-sm font-medium">Primary Medical Concern *</Label>
                <Select onValueChange={(v) => handleSelectChange("concern", v)} value={formData.concern}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select Category" /></SelectTrigger>
                  <SelectContent>
                    {medicalConcerns.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="diagnosis" className="text-sm font-medium">Specific Diagnosis (if known)</Label>
                <Input id="diagnosis" placeholder="e.g. Stage 2 Breast Cancer" value={formData.diagnosis} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="symptoms" className="text-sm font-medium">Symptoms Description *</Label>
                <Textarea id="symptoms" required placeholder="Describe main symptoms (Min 30 chars)..." value={formData.symptoms} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="duration" className="text-sm font-medium">Duration of Symptoms</Label>
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
              <div>
                <Label htmlFor="existingConditions" className="text-sm font-medium">Other Medical Conditions</Label>
                <Input id="existingConditions" placeholder="Diabetes, Hypertension, etc." value={formData.existingConditions} onChange={handleInputChange} className="mt-1" />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Medical Reports Upload */}
        {step === 3 && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h4 className="font-semibold text-foreground border-b pb-2">Upload Reports</h4>
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm text-primary flex gap-2">
                <Info size={16} className="mt-0.5 flex-shrink-0" />
                <p>Uploading reports (PDF/JPG) improves AI accuracy by 40%.</p>
              </div>

              <div>
                <Label className="text-sm font-medium">Upload Medical Documents (Optional)</Label>
                <label className="mt-2 flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:border-primary/60 transition-colors bg-secondary/30">
                  <Upload size={32} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{fileName || "Click to upload reports"}</span>
                  <span className="text-xs text-muted-foreground">PDF, JPG, PNG (Max 10MB)</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </label>
                {fileName && <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1"><CheckCircle2 size={12}/> {fileName} attached</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">What to upload?</Label>
                <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Recent Doctor Prescriptions</li>
                  <li>Biopsy / Pathology Reports</li>
                  <li>CT / MRI / PET Scan Reports (PDF)</li>
                  <li>Discharge Summaries</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Preferences & Consent */}
        {step === 4 && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h4 className="font-semibold text-foreground border-b pb-2">Treatment & Consent</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="preferredHospital" className="text-sm font-medium">Preferred Hospital (Optional)</Label>
                <Select onValueChange={(v) => handleSelectChange("preferredHospital", v)} value={formData.preferredHospital}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select Preference" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any Top Hospital">Any Top Hospital (Recommended)</SelectItem>
                    <SelectItem value="Apollo Hospitals">Apollo Hospitals</SelectItem>
                    <SelectItem value="Fortis Healthcare">Fortis Healthcare</SelectItem>
                    <SelectItem value="Max Healthcare">Max Healthcare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="travelReadiness" className="text-sm font-medium">When can you travel?</Label>
                <Select onValueChange={(v) => handleSelectChange("travelReadiness", v)} value={formData.travelReadiness}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select Timeline" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Immediately">Immediately</SelectItem>
                    <SelectItem value="Within 1 month">Within 1 month</SelectItem>
                    <SelectItem value="1-3 months">1-3 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox id="consentData" checked={formData.consentData} onCheckedChange={(c) => handleSelectChange("consentData", c)} />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="consentData" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      I consent to the processing of my medical data for AI pre-screening.
                    </Label>
                    <p className="text-xs text-muted-foreground">Detailed in Privacy Policy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="consentDisclaimer" checked={formData.consentDisclaimer} onCheckedChange={(c) => handleSelectChange("consentDisclaimer", c)} />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="consentDisclaimer" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      I understand AI results are preliminary and do not replace a doctor&apos;s diagnosis.
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
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

          {step < 4 ? (
            <Button type="button" onClick={nextStep} className="flex-1 bg-primary hover:bg-primary/90">
              Next Step <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading} className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold shadow-lg">
              {isLoading ? "Submitting..." : "Submit for AI Analysis"}
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

