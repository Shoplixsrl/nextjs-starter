"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Clock, Flame } from "lucide-react";

export default function MenuViewerPage() {
  const params = useParams();
  const shortCode = params.shortCode as string;

  // Mock menu data - in production this would fetch from DB
  const menu = {
    restaurantName: "Trattoria Bella Vista",
    restaurantLogo: null,
    menuName: "Main Menu",
    description: "Authentic Italian cuisine with a modern twist",
    primaryColor: "#8B5CF6",
    categories: [
      {
        name: "Antipasti",
        description: "Traditional Italian starters",
        icon: "utensils-crossed",
        items: [
          {
            name: "Bruschetta al Pomodoro",
            description: "Grilled bread topped with fresh tomatoes, basil, garlic, and extra virgin olive oil",
            price: 8.50,
            allergens: ["gluten"],
            dietaryInfo: { vegetarian: true, vegan: false },
            preparationTime: 10,
          },
          {
            name: "Burrata Pugliese",
            description: "Creamy burrata cheese with heirloom tomatoes, aged balsamic, and fresh basil",
            price: 14.00,
            allergens: ["dairy"],
            dietaryInfo: { vegetarian: true },
            preparationTime: 5,
          },
        ],
      },
      {
        name: "Primi Piatti",
        description: "Fresh pasta dishes",
        icon: "chef-hat",
        items: [
          {
            name: "Spaghetti alla Carbonara",
            description: "Classic Roman pasta with guanciale, pecorino romano, and black pepper",
            price: 16.00,
            allergens: ["gluten", "dairy", "eggs"],
            preparationTime: 15,
            spicyLevel: 0,
          },
          {
            name: "Tagliatelle al Tartufo",
            description: "Homemade tagliatelle with black truffle, butter, and parmigiano reggiano",
            price: 24.00,
            allergens: ["gluten", "dairy"],
            dietaryInfo: { vegetarian: true },
            preparationTime: 18,
          },
        ],
      },
    ],
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom, ${menu.primaryColor}15, white)`,
      }}
    >
      {/* Header */}
      <header
        className="text-white py-8"
        style={{ backgroundColor: menu.primaryColor }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ChefHat className="w-8 h-8" />
            <h1 className="text-3xl font-bold">{menu.restaurantName}</h1>
          </div>
          <h2 className="text-xl opacity-90">{menu.menuName}</h2>
          {menu.description && (
            <p className="opacity-75 mt-2">{menu.description}</p>
          )}
        </div>
      </header>

      {/* Menu Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {menu.categories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-4">
              <div className="text-center mb-6">
                <h3
                  className="text-3xl font-bold mb-2"
                  style={{ color: menu.primaryColor }}
                >
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-slate-600">{category.description}</p>
                )}
              </div>

              <div className="space-y-4">
                {category.items.map((item, itemIdx) => (
                  <Card key={itemIdx} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
                          <p className="text-slate-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div
                          className="text-2xl font-bold whitespace-nowrap"
                          style={{ color: menu.primaryColor }}
                        >
                          €{item.price.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.preparationTime && (
                          <Badge variant="outline" className="gap-1">
                            <Clock className="w-3 h-3" />
                            {item.preparationTime} min
                          </Badge>
                        )}

                        {item.spicyLevel && item.spicyLevel > 0 && (
                          <Badge variant="outline" className="gap-1">
                            <Flame className="w-3 h-3" />
                            {Array(item.spicyLevel).fill("🌶️").join("")}
                          </Badge>
                        )}

                        {item.dietaryInfo?.vegetarian && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                            Vegetarian
                          </Badge>
                        )}

                        {item.dietaryInfo?.vegan && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                            Vegan
                          </Badge>
                        )}

                        {item.dietaryInfo?.glutenFree && (
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                            Gluten Free
                          </Badge>
                        )}

                        {item.allergens && item.allergens.length > 0 && (
                          <Badge variant="outline" className="text-orange-600">
                            Contains: {item.allergens.join(", ")}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-sm text-slate-500">
            Menu powered by <span className="font-semibold">MenuAI</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            QR Code: {shortCode}
          </p>
        </div>
      </div>
    </div>
  );
}
