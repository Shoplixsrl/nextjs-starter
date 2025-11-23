"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Loader2, ChefHat, Plus, Image as ImageIcon, Download } from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [generateImages, setGenerateImages] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [generatedMenu, setGeneratedMenu] = useState<any>(null);

  const handleGenerateMenu = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a menu description");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/generate-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, generateImages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate menu");
      }

      setGeneratedMenu(data.menu);
      toast.success("Menu generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate menu");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPDF = async () => {
    if (!generatedMenu) {
      toast.error("No menu to export");
      return;
    }

    setIsExportingPDF(true);
    try {
      const response = await fetch("/api/pdf/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menu: {
            ...generatedMenu,
            restaurantName: "Your Restaurant Name",
          },
          layout: "single",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate PDF");
      }

      // Download PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${generatedMenu.menuName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to export PDF");
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChefHat className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold">MenuAI Dashboard</h1>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Restaurant
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList>
            <TabsTrigger value="generate">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Menu
            </TabsTrigger>
            <TabsTrigger value="menus">My Menus</TabsTrigger>
            <TabsTrigger value="qr-codes">QR Codes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Generator Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    AI Menu Generator
                  </CardTitle>
                  <CardDescription>
                    Describe your restaurant concept and let AI create your perfect menu
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt">Menu Description</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Example: Create an Italian fine dining menu with fresh pasta dishes, traditional antipasti, and gourmet pizzas. Focus on authentic Tuscan flavors with a modern twist. Price range: €15-35 per dish."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={8}
                      className="resize-none"
                    />
                    <p className="text-xs text-slate-500">
                      Be specific about cuisine type, style, price range, and special requirements
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <div className="space-y-0.5">
                      <Label htmlFor="generate-images" className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Generate AI Images
                      </Label>
                      <p className="text-xs text-slate-500">
                        Professional food photography for each dish (takes longer)
                      </p>
                    </div>
                    <Switch
                      id="generate-images"
                      checked={generateImages}
                      onCheckedChange={setGenerateImages}
                    />
                  </div>

                  <Button
                    onClick={handleGenerateMenu}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating Menu...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate Menu
                      </>
                    )}
                  </Button>

                  {isGenerating && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Creating menu structure...</span>
                      </div>
                      {generateImages && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Generating professional food images...</span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Preview Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Menu Preview</CardTitle>
                  <CardDescription>
                    {generatedMenu
                      ? "Your AI-generated menu is ready!"
                      : "Your generated menu will appear here"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedMenu ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{generatedMenu.menuName}</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          {generatedMenu.description}
                        </p>
                      </div>

                      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {generatedMenu.categories?.map((category: any, catIdx: number) => (
                          <div key={catIdx} className="space-y-3">
                            <div className="flex items-center gap-2">
                              <h4 className="text-lg font-semibold">{category.name}</h4>
                              {category.icon && (
                                <Badge variant="outline">{category.icon}</Badge>
                              )}
                            </div>
                            {category.description && (
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {category.description}
                              </p>
                            )}

                            <div className="space-y-3">
                              {category.items?.map((item: any, itemIdx: number) => (
                                <div
                                  key={itemIdx}
                                  className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h5 className="font-medium">{item.name}</h5>
                                    {item.price && (
                                      <span className="font-semibold text-purple-600">
                                        €{item.price.toFixed(2)}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                    {item.description}
                                  </p>
                                  {item.image && (
                                    <div className="mt-2 relative aspect-video rounded-md overflow-hidden">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="object-cover w-full h-full"
                                      />
                                      {item.imageGeneratedByAi && (
                                        <Badge className="absolute top-2 right-2 bg-purple-600">
                                          AI Generated
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                  {item.allergens?.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {item.allergens.map((allergen: string) => (
                                        <Badge key={allergen} variant="outline" className="text-xs">
                                          {allergen}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={handleExportPDF}
                          disabled={isExportingPDF}
                        >
                          {isExportingPDF ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Exporting...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              Export PDF
                            </>
                          )}
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Save Menu
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <ChefHat className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
                      <p className="text-slate-500">
                        Generate your first menu to see a preview
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Tips Section */}
            <Card>
              <CardHeader>
                <CardTitle>Tips for Best Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Be Specific</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Include cuisine type, style, target audience, and price range
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Mention Restrictions</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Specify dietary requirements, allergen concerns, or ingredient preferences
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Set the Mood</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Describe the atmosphere: casual, fine dining, family-friendly, trendy, etc.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menus">
            <Card>
              <CardHeader>
                <CardTitle>My Menus</CardTitle>
                <CardDescription>Manage all your restaurant menus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ChefHat className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No menus yet. Generate your first one!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qr-codes">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Management</CardTitle>
                <CardDescription>Create and track QR codes for your menus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-slate-500">QR code management coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Track performance and customer insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-slate-500">Analytics dashboard coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
