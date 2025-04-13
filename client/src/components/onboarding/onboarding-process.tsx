import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { OnboardingData } from "@shared/schema";
import BusinessInfoForm from "./business-info-form";
import BrandIdentityForm from "./brand-identity-form";
import TargetAudienceForm from "./target-audience-form";
import VisualStyleForm from "./visual-style-form";
import BrandVoiceForm from "./brand-voice-form";
import ProjectGoalsForm from "./project-goals-form";

export type OnboardingStep = {
  id: number;
  name: string;
  completed: boolean;
  active: boolean;
};

export default function OnboardingProcess() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [steps, setSteps] = useState<OnboardingStep[]>([
    { id: 1, name: "Business Info", completed: false, active: true },
    { id: 2, name: "Brand Identity", completed: false, active: false },
    { id: 3, name: "Target Audience", completed: false, active: false },
    { id: 4, name: "Brand Voice", completed: false, active: false },
    { id: 5, name: "Visual Style", completed: false, active: false },
    { id: 6, name: "Project Goals", completed: false, active: false },
  ]);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<OnboardingData>>({
    clientId: user?.id,
    businessInfo: {},
    brandIdentity: {},
    targetAudience: {},
    visualStyle: {},
    brandVoice: {},
    projectGoals: {},
    completedSteps: 0
  });

  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / steps.length) * 100;
  
  // Fetch existing onboarding data if available
  const { data: existingData, isLoading } = useQuery<OnboardingData>({
    queryKey: ["/api/onboarding"],
  });
  
  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: Partial<OnboardingData>) => {
      const res = await apiRequest("POST", "/api/onboarding", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/onboarding"] });
    },
    onError: (error) => {
      toast({
        title: "Error saving data",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // If existing data is available, pre-fill the form
  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
      
      // Update steps based on completedSteps
      if (existingData.completedSteps) {
        const newSteps = [...steps];
        for (let i = 0; i < existingData.completedSteps; i++) {
          if (newSteps[i]) {
            newSteps[i].completed = true;
            newSteps[i].active = false;
          }
        }
        // Set the current step to the next uncompleted step
        const nextStep = existingData.completedSteps + 1;
        if (nextStep <= steps.length) {
          newSteps[nextStep - 1].active = true;
          setCurrentStep(nextStep);
        } else {
          // If all steps are completed, set active to the last step
          newSteps[steps.length - 1].active = true;
          setCurrentStep(steps.length);
        }
        setSteps(newSteps);
      }
    }
  }, [existingData]);
  
  const handleNext = () => {
    if (currentStep < steps.length) {
      // Mark current step as completed and update active step
      const newSteps = [...steps];
      newSteps[currentStep - 1].completed = true;
      newSteps[currentStep - 1].active = false;
      newSteps[currentStep].active = true;
      setSteps(newSteps);
      
      // Update formData with completedSteps
      const updatedFormData = {
        ...formData,
        completedSteps: currentStep
      };
      setFormData(updatedFormData);
      
      // Save current step data to the server
      updateMutation.mutate(updatedFormData);
      
      // Move to the next step
      setCurrentStep(currentStep + 1);
    } else {
      // If we're on the last step, save and redirect to dashboard
      const updatedFormData = {
        ...formData,
        completedSteps: steps.length
      };
      setFormData(updatedFormData);
      
      updateMutation.mutate(updatedFormData, {
        onSuccess: () => {
          toast({
            title: "Onboarding completed",
            description: "Your brand discovery process is complete!",
          });
          // Redirect to dashboard
          setLocation("/dashboard");
        }
      });
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      // Update active step
      const newSteps = [...steps];
      newSteps[currentStep - 1].active = false;
      newSteps[currentStep - 2].active = true;
      setSteps(newSteps);
      
      // Move to previous step
      setCurrentStep(currentStep - 1);
    }
  };
  
  const updateFormData = (sectionKey: keyof OnboardingData, sectionData: any) => {
    setFormData({
      ...formData,
      [sectionKey]: sectionData
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header with progress */}
      <div className="mb-10">
        <h1 className="font-playfair text-3xl font-bold mb-6">Brand Discovery Journey</h1>
        <p className="text-gray-600 max-w-3xl mb-8">
          Welcome to Nompo Evelyn's brand discovery process. This comprehensive questionnaire will help us understand your business and create a tailored brand strategy. 
          Each section builds upon the previous to form a complete picture of your vision.
        </p>
        
        {/* Progress Bar */}
        <div className="w-full max-w-5xl mb-4">
          <Progress value={progressPercentage} className="h-1 bg-gray-200" />
        </div>
        <div className="flex flex-wrap mb-8 max-w-5xl justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center mb-2 mx-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  step.completed
                    ? "bg-gray-800 text-white"
                    : step.active
                    ? "bg-black text-white"
                    : "border border-gray-400 text-gray-400"
                }`}
              >
                {step.completed ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span className="text-xs text-center">{step.name}</span>
            </div>
          ))}
        </div>
        
        {/* Form Content */}
        {currentStep === 1 && (
          <BusinessInfoForm 
            data={formData.businessInfo} 
            updateFormData={(data) => updateFormData("businessInfo", data)}
          />
        )}
        
        {currentStep === 2 && (
          <BrandIdentityForm 
            data={formData.brandIdentity} 
            updateFormData={(data) => updateFormData("brandIdentity", data)}
          />
        )}
        
        {currentStep === 3 && (
          <TargetAudienceForm 
            data={formData.targetAudience} 
            updateFormData={(data) => updateFormData("targetAudience", data)}
          />
        )}
        
        {currentStep === 4 && (
          <BrandVoiceForm 
            data={formData.brandVoice} 
            updateFormData={(data) => updateFormData("brandVoice", data)}
          />
        )}
        
        {currentStep === 5 && (
          <VisualStyleForm 
            data={formData.visualStyle} 
            updateFormData={(data) => updateFormData("visualStyle", data)}
          />
        )}
        
        {currentStep === 6 && (
          <ProjectGoalsForm 
            data={formData.projectGoals} 
            updateFormData={(data) => updateFormData("projectGoals", data)}
          />
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          <Button
            type="button"
            variant="outline"
            className="border border-black text-black"
            onClick={handlePrevious}
            disabled={currentStep === 1 || updateMutation.isPending}
          >
            {currentStep > 1 ? `Previous: ${steps[currentStep - 2].name}` : "Previous"}
          </Button>
          
          <Button
            type="button"
            className="bg-black text-white hover:bg-gray-800"
            onClick={handleNext}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            
            {currentStep < steps.length
              ? `Next: ${steps[currentStep].name}`
              : "Complete & Generate Scope"}
          </Button>
        </div>
      </div>
    </div>
  );
}
