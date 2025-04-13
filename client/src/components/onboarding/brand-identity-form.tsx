import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BrandIdentityFormProps {
  data: any;
  updateFormData: (data: any) => void;
}

export default function BrandIdentityForm({ data, updateFormData }: BrandIdentityFormProps) {
  const [formValues, setFormValues] = useState({
    products: data?.products || "",
    description: data?.description || "",
    uniqueSellingProposition: data?.uniqueSellingProposition || "",
    serviceType: data?.serviceType || "",
    features: data?.features || "",
  });

  useEffect(() => {
    updateFormData(formValues);
  }, [formValues, updateFormData]);

  const handleInputChange = (field: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="border border-gray-200 shadow-sm mb-8">
      <CardContent className="p-8">
        <h2 className="font-playfair text-2xl font-semibold mb-6">Brand Identity and Service Offerings</h2>
        
        <form className="space-y-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="products" className="block text-sm font-medium mb-2">
                What products or services does your brand offer?
              </Label>
              <Textarea 
                id="products"
                placeholder="Please list all key products/services your brand provides."
                rows={4}
                value={formValues.products}
                onChange={(e) => handleInputChange("products", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="block text-sm font-medium mb-2">
                How would you describe your product/service in one sentence?
              </Label>
              <Input 
                id="description"
                placeholder="Provide a concise description that reflects the core value of what you offer."
                value={formValues.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="uniqueSellingProposition" className="block text-sm font-medium mb-2">
                What is the unique selling proposition (USP) of your product/service?
              </Label>
              <Textarea 
                id="uniqueSellingProposition"
                placeholder="What makes your product/service stand out from others in the market?"
                rows={4}
                value={formValues.uniqueSellingProposition}
                onChange={(e) => handleInputChange("uniqueSellingProposition", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium mb-2">
                Which of the following best describes your service offering?
              </Label>
              <RadioGroup 
                value={formValues.serviceType}
                onValueChange={(value) => handleInputChange("serviceType", value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
              >
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="physical_products" id="physical_products" />
                  <Label htmlFor="physical_products" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Physical Products</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="digital_products" id="digital_products" />
                  <Label htmlFor="digital_products" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Digital Products</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="consulting_services" id="consulting_services" />
                  <Label htmlFor="consulting_services" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Consulting/Professional Services</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="subscription_services" id="subscription_services" />
                  <Label htmlFor="subscription_services" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Subscription-Based Service</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="hybrid" id="hybrid" />
                  <Label htmlFor="hybrid" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Hybrid (Physical and Digital)</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Other</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="features" className="block text-sm font-medium mb-2">
                Are there any particular features or benefits of your service that you would like to emphasize in your branding?
              </Label>
              <Textarea 
                id="features"
                placeholder="Please list any standout attributes or selling points that differentiate your service."
                rows={4}
                value={formValues.features}
                onChange={(e) => handleInputChange("features", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
        </form>
        
        {/* Explanation Section */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mt-10">
          <h3 className="font-playfair text-lg font-semibold mb-2">Why We Need This Information</h3>
          <p className="text-gray-600 mb-3">
            Understanding the core offerings of your business helps us create branding that accurately represents your products or services. This information enables us to:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Highlight your unique selling proposition in your brand messaging</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Select design elements that complement your service offering</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Craft messaging that communicates the value you provide to customers</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
