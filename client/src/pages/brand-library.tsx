import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { Palette, Image, Type, FileText } from "lucide-react";

export default function BrandLibrary() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-playfair text-3xl font-bold mb-2">Brand Library</h1>
          <p className="text-gray-600">
            Access and download all your brand assets and guidelines
          </p>
        </div>

        <Tabs defaultValue="assets">
          <TabsList className="w-full border-b border-gray-200 mb-6">
            <TabsTrigger value="assets" className="flex items-center">
              <Image className="h-4 w-4 mr-2" /> Brand Assets
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center">
              <Type className="h-4 w-4 mr-2" /> Typography
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center">
              <Palette className="h-4 w-4 mr-2" /> Color Palette
            </TabsTrigger>
            <TabsTrigger value="guidelines" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" /> Guidelines
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Logos & Marks</CardTitle>
                <CardDescription>
                  Primary logo, variations, and brand marks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Palette className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No assets available yet</h3>
                  <p className="text-gray-500 max-w-md">
                    Your brand assets will appear here once your project is complete
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Typography System</CardTitle>
                <CardDescription>
                  Brand fonts and typographic guidelines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Type className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No typography defined yet</h3>
                  <p className="text-gray-500 max-w-md">
                    Your typography guidelines will appear here once defined in your project
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>
                  Primary, secondary, and accent colors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Palette className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No color palette defined yet</h3>
                  <p className="text-gray-500 max-w-md">
                    Your brand colors will appear here once defined in your project
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guidelines" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Guidelines</CardTitle>
                <CardDescription>
                  Comprehensive usage instructions for your brand
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No guidelines available yet</h3>
                  <p className="text-gray-500 max-w-md">
                    Your brand guidelines will appear here once your project is complete
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
