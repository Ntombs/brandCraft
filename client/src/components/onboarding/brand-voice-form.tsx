import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface BrandVoiceFormProps {
  data: any;
  updateFormData: (data: any) => void;
}

export default function BrandVoiceForm({ data, updateFormData }: BrandVoiceFormProps) {
  const [formValues, setFormValues] = useState({
    tonality: data?.tonality || "",
    personality: data?.personality || [] as string[],
    customerFeeling: data?.customerFeeling || [] as string[],
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

  return (
    <Card className="border border-gray-200 shadow-sm mb-8">
      <CardContent className="p-8">
        <h2 className="font-playfair text-2xl font-semibold mb-6">Brand Tone, Voice, and Personality</h2>
        
        <form className="space-y-8">
          <div className="space-y-6">
            <div>
              <Label className="block text-sm font-medium mb-2">
                What tone would you like your brand's communication to have?
              </Label>
              <RadioGroup
                value={formValues.tonality}
                onValueChange={(value) => handleRadioChange("tonality", value)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="authoritative" id="authoritative" />
                  <Label htmlFor="authoritative" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Authoritative and Knowledgeable</span>
                    <span className="text-sm text-gray-500">Expert, trusted, informative</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="friendly" id="friendly" />
                  <Label htmlFor="friendly" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Friendly and Approachable</span>
                    <span className="text-sm text-gray-500">Warm, conversational, helpful</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="inspirational" id="inspirational" />
                  <Label htmlFor="inspirational" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Inspirational and Motivational</span>
                    <span className="text-sm text-gray-500">Uplifting, encouraging, positive</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="fun" id="fun" />
                  <Label htmlFor="fun" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Fun and Playful</span>
                    <span className="text-sm text-gray-500">Humorous, light-hearted, casual</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="sophisticated" id="sophisticated" />
                  <Label htmlFor="sophisticated" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Sophisticated and Elegant</span>
                    <span className="text-sm text-gray-500">Refined, exclusive, polished</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="direct" id="direct" />
                  <Label htmlFor="direct" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Direct and Bold</span>
                    <span className="text-sm text-gray-500">Straightforward, confident, powerful</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="block text-sm font-medium mb-2">
                Which adjectives best describe the personality of your brand?
              </Label>
              <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="professional" 
                    checked={formValues.personality.includes("professional")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("personality", "professional", checked as boolean)
                    }
                  />
                  <Label htmlFor="professional">Professional</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="innovative" 
                    checked={formValues.personality.includes("innovative")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("personality", "innovative", checked as boolean)
                    }
                  />
                  <Label htmlFor="innovative">Innovative</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="trustworthy" 
                    checked={formValues.personality.includes("trustworthy")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("personality", "trustworthy", checked as boolean)
                    }
                  />
                  <Label htmlFor="trustworthy">Trustworthy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="fun" 
                    checked={formValues.personality.includes("fun")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("personality", "fun", checked as boolean)
                    }
                  />
                  <Label htmlFor="fun">Fun</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="warm" 
                    checked={formValues.personality.includes("warm")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("personality", "warm", checked as boolean)
                    }
                  />
                  <Label htmlFor="warm">Warm</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="empowering" 
                    checked={formValues.personality.includes("empowering")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("personality", "empowering", checked as boolean)
                    }
                  />
                  <Label htmlFor="empowering">Empowering</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cutting-edge" 
                    checked={formValues.personality.includes("cutting-edge")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("personality", "cutting-edge", checked as boolean)
                    }
                  />
                  <Label htmlFor="cutting-edge">Cutting-edge</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ethical" 
                    checked={formValues.personality.includes("ethical")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("personality", "ethical", checked as boolean)
                    }
                  />
                  <Label htmlFor="ethical">Ethical</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="block text-sm font-medium mb-2">
                How should your customers feel when interacting with your brand?
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="confident" 
                    checked={formValues.customerFeeling.includes("confident")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("customerFeeling", "confident", checked as boolean)
                    }
                  />
                  <Label htmlFor="confident" className="cursor-pointer">Confident</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="empowered" 
                    checked={formValues.customerFeeling.includes("empowered")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("customerFeeling", "empowered", checked as boolean)
                    }
                  />
                  <Label htmlFor="empowered" className="cursor-pointer">Empowered</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="excited" 
                    checked={formValues.customerFeeling.includes("excited")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("customerFeeling", "excited", checked as boolean)
                    }
                  />
                  <Label htmlFor="excited" className="cursor-pointer">Excited</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="comforted" 
                    checked={formValues.customerFeeling.includes("comforted")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("customerFeeling", "comforted", checked as boolean)
                    }
                  />
                  <Label htmlFor="comforted" className="cursor-pointer">Comforted</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="respected" 
                    checked={formValues.customerFeeling.includes("respected")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("customerFeeling", "respected", checked as boolean)
                    }
                  />
                  <Label htmlFor="respected" className="cursor-pointer">Respected</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <Checkbox 
                    id="valued" 
                    checked={formValues.customerFeeling.includes("valued")}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("customerFeeling", "valued", checked as boolean)
                    }
                  />
                  <Label htmlFor="valued" className="cursor-pointer">Valued</Label>
                </div>
              </div>
            </div>
          </div>
        </form>
        
        {/* Explanation Section */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mt-10">
          <h3 className="font-playfair text-lg font-semibold mb-2">Why We Need This Information</h3>
          <p className="text-gray-600 mb-3">
            Your brand's voice and personality shape how you communicate with your audience and how they perceive you. This information helps us:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Create messaging that consistently reflects your brand's character</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Develop a communication style that resonates with your target audience</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Ensure your brand's personality aligns with your visual identity for consistency</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
