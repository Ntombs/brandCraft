import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface ProjectGoalsFormProps {
  data: any;
  updateFormData: (data: any) => void;
}

export default function ProjectGoalsForm({ data, updateFormData }: ProjectGoalsFormProps) {
  const [formValues, setFormValues] = useState({
    marketingGoals: data?.marketingGoals || [] as string[],
    successMetrics: data?.successMetrics || [] as string[],
    futureVision: data?.futureVision || "",
    upcomingServices: data?.upcomingServices || "",
    geographicExpansion: data?.geographicExpansion || "",
  });

  useEffect(() => {
    updateFormData(formValues);
  }, [formValues, updateFormData]);

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormValues(prev => {
      const currentValues = prev[field] as string[] || [];
      return {
        ...prev,
        [field]: checked 
          ? [...currentValues, value]
          : currentValues.filter(item => item !== value)
      };
    });
  };

  const handleRadioChange = (field: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTextChange = (field: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="border border-gray-200 shadow-sm mb-8">
      <CardContent className="p-8">
        <h2 className="font-playfair text-2xl font-semibold mb-6">Brand and Marketing Goals</h2>
        
        <form className="space-y-8">
          <div className="space-y-6">
            <div>
              <Label className="block text-sm font-medium mb-2">
                What are the primary goals of your brand's marketing efforts?
              </Label>
              <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="brand_awareness" 
                    checked={formValues.marketingGoals.includes("brand_awareness")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("marketingGoals", "brand_awareness", checked as boolean)
                    }
                  />
                  <Label htmlFor="brand_awareness">Brand Awareness</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="lead_generation" 
                    checked={formValues.marketingGoals.includes("lead_generation")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("marketingGoals", "lead_generation", checked as boolean)
                    }
                  />
                  <Label htmlFor="lead_generation">Lead Generation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="customer_retention" 
                    checked={formValues.marketingGoals.includes("customer_retention")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("marketingGoals", "customer_retention", checked as boolean)
                    }
                  />
                  <Label htmlFor="customer_retention">Customer Retention</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="revenue_increase" 
                    checked={formValues.marketingGoals.includes("revenue_increase")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("marketingGoals", "revenue_increase", checked as boolean)
                    }
                  />
                  <Label htmlFor="revenue_increase">Increased Revenue</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="thought_leadership" 
                    checked={formValues.marketingGoals.includes("thought_leadership")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("marketingGoals", "thought_leadership", checked as boolean)
                    }
                  />
                  <Label htmlFor="thought_leadership">Thought Leadership</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="community_building" 
                    checked={formValues.marketingGoals.includes("community_building")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("marketingGoals", "community_building", checked as boolean)
                    }
                  />
                  <Label htmlFor="community_building">Community Building</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="education" 
                    checked={formValues.marketingGoals.includes("education")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("marketingGoals", "education", checked as boolean)
                    }
                  />
                  <Label htmlFor="education">Education/Information</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="block text-sm font-medium mb-2">
                How do you measure success for your brand's marketing?
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="website_traffic" 
                    checked={formValues.successMetrics.includes("website_traffic")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("successMetrics", "website_traffic", checked as boolean)
                    }
                  />
                  <Label htmlFor="website_traffic" className="cursor-pointer">Website traffic</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="social_engagement" 
                    checked={formValues.successMetrics.includes("social_engagement")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("successMetrics", "social_engagement", checked as boolean)
                    }
                  />
                  <Label htmlFor="social_engagement" className="cursor-pointer">Social media engagement</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="conversion_rates" 
                    checked={formValues.successMetrics.includes("conversion_rates")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("successMetrics", "conversion_rates", checked as boolean)
                    }
                  />
                  <Label htmlFor="conversion_rates" className="cursor-pointer">Conversion rates</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="customer_feedback" 
                    checked={formValues.successMetrics.includes("customer_feedback")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("successMetrics", "customer_feedback", checked as boolean)
                    }
                  />
                  <Label htmlFor="customer_feedback" className="cursor-pointer">Customer feedback</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="sales_growth" 
                    checked={formValues.successMetrics.includes("sales_growth")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("successMetrics", "sales_growth", checked as boolean)
                    }
                  />
                  <Label htmlFor="sales_growth" className="cursor-pointer">Sales and revenue growth</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="brand_recognition" 
                    checked={formValues.successMetrics.includes("brand_recognition")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("successMetrics", "brand_recognition", checked as boolean)
                    }
                  />
                  <Label htmlFor="brand_recognition" className="cursor-pointer">Brand recognition</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="futureVision" className="block text-sm font-medium mb-2">
                Where do you see your brand in the next 3-5 years?
              </Label>
              <Textarea 
                id="futureVision"
                placeholder="E.g., expanding to new markets, launching new products/services, becoming a leader in your niche, etc."
                rows={4}
                value={formValues.futureVision}
                onChange={(e) => handleTextChange("futureVision", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            
            <div>
              <Label htmlFor="upcomingServices" className="block text-sm font-medium mb-2">
                Are there any new services or product lines you plan to introduce in the future?
              </Label>
              <Textarea 
                id="upcomingServices"
                placeholder="Briefly describe any upcoming expansions, pivots, or new initiatives."
                rows={4}
                value={formValues.upcomingServices}
                onChange={(e) => handleTextChange("upcomingServices", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium mb-2">
                What geographic areas do you plan to target in the future?
              </Label>
              <RadioGroup
                value={formValues.geographicExpansion}
                onValueChange={(value) => handleRadioChange("geographicExpansion", value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="local" id="local" />
                  <Label htmlFor="local" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Local</span>
                    <span className="text-sm text-gray-500">Focusing on your immediate area</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="national" id="national" />
                  <Label htmlFor="national" className="flex-1 cursor-pointer">
                    <span className="block font-medium">National</span>
                    <span className="text-sm text-gray-500">Expanding across the country</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="international" id="international" />
                  <Label htmlFor="international" className="flex-1 cursor-pointer">
                    <span className="block font-medium">International</span>
                    <span className="text-sm text-gray-500">Expanding to multiple countries</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="specific_regions" id="specific_regions" />
                  <Label htmlFor="specific_regions" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Specific Regions</span>
                    <span className="text-sm text-gray-500">E.g., Europe, North America, Asia, etc.</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </form>
        
        {/* Explanation Section */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mt-10">
          <h3 className="font-playfair text-lg font-semibold mb-2">Why We Need This Information</h3>
          <p className="text-gray-600 mb-3">
            Understanding your brand's goals and future vision helps us create a brand strategy that supports your long-term objectives. This information enables us to:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Design a brand identity that can grow and adapt with your business</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Create marketing materials that align with your specific marketing goals</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Develop a comprehensive branding strategy that positions you for your future expansion plans</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
