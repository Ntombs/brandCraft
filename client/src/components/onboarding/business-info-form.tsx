import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// South African business registration types
const registrationTypes = [
  { id: "pty-ltd", label: "(Pty) Ltd - Proprietary Limited Company" },
  { id: "cc", label: "CC - Close Corporation" },
  { id: "sole-prop", label: "Sole Proprietor" },
  { id: "inc", label: "Inc. - Incorporated Company" },
  { id: "npc", label: "NPC - Non-Profit Company" },
  { id: "co-op", label: "Co-operative" }
];
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BusinessInfoFormProps {
  data: any;
  updateFormData: (data: any) => void;
}

export default function BusinessInfoForm({ data, updateFormData }: BusinessInfoFormProps) {
  const [formValues, setFormValues] = useState({
    businessName: data?.businessName || "",
    industry: data?.industry || "",
    registrationNumber: data?.registrationNumber || "",
    foundedYear: data?.foundedYear || "",
    businessDescription: data?.businessDescription || "",
    employeeCount: data?.employeeCount || "",
    bbbeeLevel: data?.bbbeeLevel || "",
  });

  useEffect(() => {
    updateFormData(formValues);
  }, [formValues, updateFormData]);

  const handleChange = (field: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="border border-gray-200 shadow-sm mb-8">
      <CardContent className="p-8">
        <h2 className="font-playfair text-2xl font-semibold mb-6">Business Information</h2>

        <form className="space-y-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="businessName" className="block text-sm font-medium mb-2">
                What is your business name?
              </Label>
              <Input 
                id="businessName"
                placeholder="e.g., Nompo Evelyn"
                value={formValues.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="industry" className="block text-sm font-medium mb-2">
                What industry does your business operate in?
              </Label>
              <Input 
                id="industry"
                placeholder="e.g., Financial Services, Hospitality, Healthcare"
                value={formValues.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="registrationNumber" className="block text-sm font-medium mb-2">
                What is your business registration number? (Optional)
              </Label>
              <Input 
                id="registrationNumber"
                placeholder="e.g., LLC123456"
                value={formValues.registrationNumber}
                onChange={(e) => handleChange("registrationNumber", e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="foundedYear" className="block text-sm font-medium mb-2">
                When was your business founded?
              </Label>
              <Input 
                id="foundedYear"
                placeholder="e.g., 2018"
                value={formValues.foundedYear}
                onChange={(e) => handleChange("foundedYear", e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="businessDescription" className="block text-sm font-medium mb-2">
                Please provide a brief description of your business
              </Label>
              <Textarea 
                id="businessDescription"
                placeholder="Tell us about what your business does, your mission, and your vision..."
                rows={4}
                value={formValues.businessDescription}
                onChange={(e) => handleChange("businessDescription", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-2">
                How many employees does your business have?
              </Label>
              <RadioGroup
                value={formValues.employeeCount}
                onValueChange={(value) => handleChange("employeeCount", value)}
                className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3"
              >
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="1-5" id="1-5" />
                  <Label htmlFor="1-5" className="cursor-pointer">1-5 employees</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="6-20" id="6-20" />
                  <Label htmlFor="6-20" className="cursor-pointer">6-20 employees</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="21-50" id="21-50" />
                  <Label htmlFor="21-50" className="cursor-pointer">21-50 employees</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="51-100" id="51-100" />
                  <Label htmlFor="51-100" className="cursor-pointer">51-100 employees</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="101-500" id="101-500" />
                  <Label htmlFor="101-500" className="cursor-pointer">101-500 employees</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="500+" id="500+" />
                  <Label htmlFor="500+" className="cursor-pointer">500+ employees</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="bbbeeLevel" className="block text-sm font-medium mb-2">
                BBBEE Status Level (if applicable)
              </Label>
              <RadioGroup
                value={formValues.bbbeeLevel}
                onValueChange={(value) => handleChange("bbbeeLevel", value)}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                {[1,2,3,4,5,6,7,8].map((level) => (
                  <div key={level} className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value={level.toString()} id={`level-${level}`} />
                    <Label htmlFor={`level-${level}`} className="cursor-pointer">Level {level}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </form>

        {/* Explanation Section */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mt-10">
          <h3 className="font-playfair text-lg font-semibold mb-2">Why We Need This Information</h3>
          <p className="text-gray-600 mb-3">
            Understanding your business basics helps us create a brand strategy that aligns with your business size, industry standards, and growth stage. This information allows us to:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Position your brand appropriately within your industry</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Tailor our approach based on your company's scale and maturity</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Ensure all brand elements comply with your industry's regulations</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}