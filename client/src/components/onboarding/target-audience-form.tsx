import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface TargetAudienceFormProps {
  data: any;
  updateFormData: (data: any) => void;
}

export default function TargetAudienceForm({ data, updateFormData }: TargetAudienceFormProps) {
  const [formValues, setFormValues] = useState({
    targetMarket: data?.targetMarket || "",
    painPoints: data?.painPoints || "",
    motivations: data?.motivations || [] as string[],
    buyingHabits: data?.buyingHabits || [] as string[],
  });

  useEffect(() => {
    updateFormData(formValues);
  }, [formValues, updateFormData]);

  const handleRadioChange = (field: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

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

  const handleTextChange = (field: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="border border-gray-200 shadow-sm mb-8">
      <CardContent className="p-8">
        <h2 className="font-playfair text-2xl font-semibold mb-6">Target Market & Customer Insights</h2>
        
        <form className="space-y-8">
          {/* Question Group 1 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Your Ideal Customer</h3>
            
            <div className="mb-6">
              <Label className="block text-sm font-medium mb-2">
                Who is your ideal customer or target market?
              </Label>
              <RadioGroup
                value={formValues.targetMarket}
                onValueChange={(value) => handleRadioChange("targetMarket", value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="b2c" id="b2c" />
                  <Label htmlFor="b2c" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Individuals (B2C)</span>
                    <span className="text-sm text-gray-500">Targeting end consumers directly</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="b2b" id="b2b" />
                  <Label htmlFor="b2b" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Other Businesses (B2B)</span>
                    <span className="text-sm text-gray-500">Selling to other companies</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="demographic" id="demographic" />
                  <Label htmlFor="demographic" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Specific Demographic</span>
                    <span className="text-sm text-gray-500">E.g., millennials, parents, etc.</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="geographic" id="geographic" />
                  <Label htmlFor="geographic" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Geographic-based</span>
                    <span className="text-sm text-gray-500">Local, national, international</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="mb-6">
              <Label htmlFor="pain_points" className="block text-sm font-medium mb-2">
                What pain points or needs does your target audience face that your product/service solves?
              </Label>
              <Textarea
                id="pain_points"
                rows={4}
                value={formValues.painPoints}
                onChange={(e) => handleTextChange("painPoints", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Describe the primary challenges your audience experiences..."
              />
            </div>
          </div>
          
          {/* Question Group 2 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Customer Motivations</h3>
            
            <div className="mb-6">
              <Label className="block text-sm font-medium mb-2">
                What motivates your target audience to choose your product/service over others?
              </Label>
              <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="price" 
                    checked={formValues.motivations.includes("price")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("motivations", "price", checked as boolean)
                    }
                  />
                  <Label htmlFor="price">Price</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="quality" 
                    checked={formValues.motivations.includes("quality")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("motivations", "quality", checked as boolean)
                    }
                  />
                  <Label htmlFor="quality">Quality</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="convenience" 
                    checked={formValues.motivations.includes("convenience")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("motivations", "convenience", checked as boolean)
                    }
                  />
                  <Label htmlFor="convenience">Convenience</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="exclusivity" 
                    checked={formValues.motivations.includes("exclusivity")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("motivations", "exclusivity", checked as boolean)
                    }
                  />
                  <Label htmlFor="exclusivity">Exclusivity</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ethical" 
                    checked={formValues.motivations.includes("ethical")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("motivations", "ethical", checked as boolean)
                    }
                  />
                  <Label htmlFor="ethical">Ethical Considerations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="customer_exp" 
                    checked={formValues.motivations.includes("customer_exp")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("motivations", "customer_exp", checked as boolean)
                    }
                  />
                  <Label htmlFor="customer_exp">Customer Experience</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="innovation" 
                    checked={formValues.motivations.includes("innovation")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("motivations", "innovation", checked as boolean)
                    }
                  />
                  <Label htmlFor="innovation">Innovation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="reputation" 
                    checked={formValues.motivations.includes("reputation")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("motivations", "reputation", checked as boolean)
                    }
                  />
                  <Label htmlFor="reputation">Brand Reputation</Label>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <Label className="block text-sm font-medium mb-2">
                What are the buying habits of your target audience?
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="price_sensitive" 
                    checked={formValues.buyingHabits.includes("price_sensitive")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("buyingHabits", "price_sensitive", checked as boolean)
                    }
                  />
                  <Label htmlFor="price_sensitive" className="cursor-pointer">Price-sensitive</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="quality_over_price" 
                    checked={formValues.buyingHabits.includes("quality_over_price")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("buyingHabits", "quality_over_price", checked as boolean)
                    }
                  />
                  <Label htmlFor="quality_over_price" className="cursor-pointer">Prefer quality over price</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="online_purchase" 
                    checked={formValues.buyingHabits.includes("online_purchase")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("buyingHabits", "online_purchase", checked as boolean)
                    }
                  />
                  <Label htmlFor="online_purchase" className="cursor-pointer">Frequently purchase online</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="personalized" 
                    checked={formValues.buyingHabits.includes("personalized")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("buyingHabits", "personalized", checked as boolean)
                    }
                  />
                  <Label htmlFor="personalized" className="cursor-pointer">Seek personalized experiences</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="recommendations" 
                    checked={formValues.buyingHabits.includes("recommendations")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("buyingHabits", "recommendations", checked as boolean)
                    }
                  />
                  <Label htmlFor="recommendations" className="cursor-pointer">Value peer recommendations</Label>
                </div>
              </div>
            </div>
          </div>
        </form>
        
        {/* Explanation Section */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mt-10">
          <h3 className="font-playfair text-lg font-semibold mb-2">Why We Need This Information</h3>
          <p className="text-gray-600 mb-3">
            Understanding your target audience is crucial for developing a brand identity that resonates with the right people. This information helps us:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Create messaging that speaks directly to your ideal customers' needs</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Design visual elements that appeal to your specific demographic</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Develop a brand strategy that differentiates you from competitors in meaningful ways</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
