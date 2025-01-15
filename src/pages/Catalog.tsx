import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../components/shared/SectionTitle";
import ProductCard from "../components/shared/ProductCard";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Product = Database['public']['Tables']['products']['Row'] & {
  product_images: Database['public']['Tables']['product_images']['Row'][]
};

const categories = [
  "Все",
  "Кухни",
  "Шкафы",
  "Стеллажи",
  "Столы",
  "Стулья",
  "Кровати",
];

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      console.log("Fetching products from Supabase...");
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_images (
            image_path,
            is_primary
          )
        `);

      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }

      console.log("Products fetched:", data);
      return (data as Product[]).map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category || "",
        image: product.product_images.find((img) => img.is_primary)?.image_path ||
          product.product_images[0]?.image_path ||
          "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7",
      }));
    },
  });

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Все" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 animate-fade-in">
      <div className="container">
        <SectionTitle
          title="Каталог мебели"
          subtitle="Широкий выбор мебели для вашего дома"
        />

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Поиск по каталогу"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-accent text-white"
                      : "bg-secondary text-primary hover:bg-accent/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Загрузка товаров...</p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              По вашему запросу ничего не найдено
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;