import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface VisualStyleFormProps {
  data: any;
  updateFormData: (data: any) => void;
}

export default function VisualStyleForm({ data, updateFormData }: VisualStyleFormProps) {
  const [formValues, setFormValues] = useState({
    designStyle: data?.designStyle || "",
    colorPalette: data?.colorPalette || "",
    designElements: data?.designElements || "",
    designExamples: data?.designExamples || "",
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

  const handleTextChange = (field: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Mock color swatches for demonstration
  const colorSwatches = [
    { name: "Monochrome", colors: ["#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF"] },
    { name: "Natural", colors: ["#30241A", "#5E4C3E", "#A89382", "#D9CFC1", "#F2EEE5"] },
    { name: "Cool", colors: ["#1D3557", "#457B9D", "#A8DADC", "#E5EFF6", "#F1FAEE"] },
    { name: "Warm", colors: ["#3D0814", "#8E1616", "#D35050", "#F2AB91", "#F9E9DC"] },
    { name: "Bold", colors: ["#03071E", "#9D0208", "#DC2F02", "#F48C06", "#FFBA08"] },
    { name: "Subtle", colors: ["#354F52", "#52796F", "#84A98C", "#CAD2C5", "#E5E5E5"] },
  ];

  return (
    <Card className="border border-gray-200 shadow-sm mb-8">
      <CardContent className="p-8">
        <h2 className="font-playfair text-2xl font-semibold mb-6">Brand Aesthetics and Visual Style</h2>
        
        <form className="space-y-8">
          <div className="space-y-6">
            <div>
              <Label className="block text-sm font-medium mb-2">
                Which style of design best aligns with your brand?
              </Label>
              <RadioGroup
                value={formValues.designStyle}
                onValueChange={(value) => handleRadioChange("designStyle", value)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="minimalistic" id="minimalistic" />
                  <Label htmlFor="minimalistic" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Minimalistic and Clean</span>
                    <span className="text-sm text-gray-500">Simple, uncluttered, modern</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="bold" id="bold" />
                  <Label htmlFor="bold" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Bold and Modern</span>
                    <span className="text-sm text-gray-500">Strong, impactful, innovative</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="elegant" id="elegant" />
                  <Label htmlFor="elegant" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Elegant and Refined</span>
                    <span className="text-sm text-gray-500">Sophisticated, premium, classic</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="playful" id="playful" />
                  <Label htmlFor="playful" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Playful and Fun</span>
                    <span className="text-sm text-gray-500">Energetic, vibrant, approachable</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="vintage" id="vintage" />
                  <Label htmlFor="vintage" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Vintage/Retro</span>
                    <span className="text-sm text-gray-500">Nostalgic, timeless, authentic</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="artistic" id="artistic" />
                  <Label htmlFor="artistic" className="flex-1 cursor-pointer">
                    <span className="block font-medium">Artistic and Abstract</span>
                    <span className="text-sm text-gray-500">Creative, unique, expressive</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="block text-sm font-medium mb-2">
                What colors best reflect your brand's identity?
              </Label>
              <p className="text-sm text-gray-500 mb-4">
                Select a color theme or describe your preferred palette
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {colorSwatches.map((swatch) => (
                  <div 
                    key={swatch.name}
                    className={`border rounded-md p-3 cursor-pointer hover:border-black transition-colors ${
                      formValues.colorPalette === swatch.name ? 'border-black' : 'border-gray-200'
                    }`}
                    onClick={() => handleRadioChange("colorPalette", swatch.name)}
                  >
                    <div className="flex mb-3">
                      {swatch.colors.map((color) => (
                        <div 
                          key={color} 
                          className="h-8 flex-1" 
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem 
                        value={swatch.name} 
                        id={`color_${swatch.name}`} 
                        checked={formValues.colorPalette === swatch.name}
                      />
                      <Label htmlFor={`color_${swatch.name}`} className="ml-2">
                        {swatch.name}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <Label htmlFor="custom_colors" className="block text-sm font-medium mb-2">
                  Describe your color preferences (optional)
                </Label>
                <Input 
                  id="custom_colors"
                  placeholder="E.g., earthy tones, vibrant blues and greens, etc."
                  value={formValues.colorPalette === "custom" ? formValues.colorPalette : ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      setFormValues(prev => ({
                        ...prev,
                        colorPalette: "custom",
                        customColors: e.target.value
                      }));
                    }
                  }}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="designElements" className="block text-sm font-medium mb-2">
                Are there any design elements or symbols that you'd like to incorporate into your branding?
              </Label>
              <Textarea 
                id="designElements"
                placeholder="E.g., nature-related symbols, geometric shapes, tech-inspired designs, organic forms, etc."
                rows={4}
                value={formValues.designElements}
                onChange={(e) => handleTextChange("designElements", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            
            <div>
              <Label htmlFor="designExamples" className="block text-sm font-medium mb-2">
                Do you have any visual or design elements from competitors or other brands that you like or dislike?
              </Label>
              <Textarea 
                id="designExamples"
                placeholder="Provide specific examples or preferences..."
                rows={4}
                value={formValues.designExamples}
                onChange={(e) => handleTextChange("designExamples", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
        </form>
        
        {/* Explanation Section */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mt-10">
          <h3 className="font-playfair text-lg font-semibold mb-2">Why We Need This Information</h3>
          <p className="text-gray-600 mb-3">
            Your visual preferences help us create a brand identity that resonates with your vision and appeals to your target audience. This information guides us in:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Developing a cohesive color palette that evokes the right emotions</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Creating design elements that align with your brand's personality</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Establishing a visual style that sets you apart from competitors</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
