import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// Register fonts
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Inter",
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: "2pt solid #E5E7EB",
  },
  restaurantName: {
    fontSize: 32,
    fontWeight: 700,
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 6,
  },
  menuDescription: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    fontStyle: "italic",
  },
  category: {
    marginTop: 25,
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 8,
    borderBottom: "1pt solid #E5E7EB",
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 700,
    color: "#1F2937",
    flex: 1,
  },
  categoryDescription: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 10,
    fontStyle: "italic",
  },
  item: {
    marginBottom: 15,
    paddingBottom: 12,
    borderBottom: "0.5pt solid #F3F4F6",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#1F2937",
    flex: 1,
    paddingRight: 10,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 700,
    color: "#8B5CF6",
  },
  itemDescription: {
    fontSize: 10,
    color: "#6B7280",
    lineHeight: 1.5,
    marginBottom: 6,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 6,
  },
  badge: {
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 8,
    color: "#4B5563",
  },
  badgeVegetarian: {
    backgroundColor: "#D1FAE5",
  },
  badgeVegetarianText: {
    color: "#065F46",
  },
  badgeAllergen: {
    backgroundColor: "#FEF3C7",
  },
  badgeAllergenText: {
    color: "#92400E",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#9CA3AF",
    borderTop: "1pt solid #E5E7EB",
    paddingTop: 15,
  },
  imageContainer: {
    marginBottom: 8,
    marginTop: 6,
  },
  itemImage: {
    width: "100%",
    height: 120,
    objectFit: "cover",
    borderRadius: 8,
  },
  twoColumn: {
    flexDirection: "row",
    gap: 20,
  },
  column: {
    flex: 1,
  },
});

interface MenuPDFProps {
  menu: {
    restaurantName?: string;
    menuName: string;
    description?: string;
    primaryColor?: string;
    categories: Array<{
      name: string;
      description?: string;
      items: Array<{
        name: string;
        description?: string;
        price?: number;
        image?: string;
        allergens?: string[];
        dietaryInfo?: {
          vegetarian?: boolean;
          vegan?: boolean;
          glutenFree?: boolean;
        };
        preparationTime?: number;
      }>;
    }>;
  };
  layout?: "single" | "two-column";
}

export const MenuPDF: React.FC<MenuPDFProps> = ({ menu, layout = "single" }) => {
  const renderItem = (item: any) => (
    <View style={styles.item} key={item.name}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.price && (
          <Text style={styles.itemPrice}>€{item.price.toFixed(2)}</Text>
        )}
      </View>

      {item.description && (
        <Text style={styles.itemDescription}>{item.description}</Text>
      )}

      {item.image && (
        <View style={styles.imageContainer}>
          <Image src={item.image} style={styles.itemImage} />
        </View>
      )}

      <View style={styles.badges}>
        {item.preparationTime && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⏱ {item.preparationTime} min</Text>
          </View>
        )}

        {item.dietaryInfo?.vegetarian && (
          <View style={[styles.badge, styles.badgeVegetarian]}>
            <Text style={[styles.badgeText, styles.badgeVegetarianText]}>
              🌱 Vegetarian
            </Text>
          </View>
        )}

        {item.dietaryInfo?.vegan && (
          <View style={[styles.badge, styles.badgeVegetarian]}>
            <Text style={[styles.badgeText, styles.badgeVegetarianText]}>
              🌿 Vegan
            </Text>
          </View>
        )}

        {item.dietaryInfo?.glutenFree && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Gluten Free</Text>
          </View>
        )}

        {item.allergens?.length > 0 && (
          <View style={[styles.badge, styles.badgeAllergen]}>
            <Text style={[styles.badgeText, styles.badgeAllergenText]}>
              ⚠ Contains: {item.allergens.join(", ")}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderCategory = (category: any) => (
    <View style={styles.category} key={category.name}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryName}>{category.name}</Text>
      </View>

      {category.description && (
        <Text style={styles.categoryDescription}>{category.description}</Text>
      )}

      {layout === "two-column" && category.items.length > 2 ? (
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            {category.items
              .filter((_: any, idx: number) => idx % 2 === 0)
              .map(renderItem)}
          </View>
          <View style={styles.column}>
            {category.items
              .filter((_: any, idx: number) => idx % 2 === 1)
              .map(renderItem)}
          </View>
        </View>
      ) : (
        category.items.map(renderItem)
      )}
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.restaurantName}>
            {menu.restaurantName || "Restaurant"}
          </Text>
          <Text style={styles.menuTitle}>{menu.menuName}</Text>
          {menu.description && (
            <Text style={styles.menuDescription}>{menu.description}</Text>
          )}
        </View>

        {menu.categories.map(renderCategory)}

        <View style={styles.footer}>
          <Text>
            Menu created with MenuAI - The AI-Powered Menu Generation Platform
          </Text>
        </View>
      </Page>
    </Document>
  );
};
