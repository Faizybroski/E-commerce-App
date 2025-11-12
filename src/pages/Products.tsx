import React, { useEffect, useState } from "react";
import { fetchProducts } from "@/services/api";
import { Loader } from "@/components/Loader/Loader";
import { ProductCard } from "@/components/ProductsCard/ProductCard";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  categoryId: string;
  featured: boolean;
}

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: "cat-1", name: "Electronics" },
  { id: "cat-2", name: "Clothing" },
  { id: "cat-3", name: "Home & Garden" },
  { id: "cat-4", name: "Books" },
  { id: "cat-5", name: "Sports & Outdoors" },
  { id: "cat-6", name: "Smartphones" },
  { id: "cat-7", name: "Laptops" },
];

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFeatured, setShowFeatured] = useState(false);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [sort, setSort] = useState<string | undefined>();

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts({
        category: selectedCategories.join(","),
        featured: showFeatured,
        minPrice,
        maxPrice,
        sort,
        page: 1,
        limit: 20,
      });
      setProducts(data.products);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategories, showFeatured, minPrice, maxPrice, sort]);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  if (loading) return <Loader text="Loading products..." />;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        {/* Categories */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-lg">Categories</h3>
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              <Label>{cat.name}</Label>
            </div>
          ))}
        </div>

        {/* Featured */}
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <Checkbox
            checked={showFeatured}
            onCheckedChange={() => setShowFeatured((prev) => !prev)}
          />
          <Label>Show Featured Only</Label>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="border rounded px-2 py-1 w-20"
            value={minPrice ?? ""}
            onChange={(e) => setMinPrice(Number(e.target.value) || undefined)}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            className="border rounded px-2 py-1 w-20"
            value={maxPrice ?? ""}
            onChange={(e) => setMaxPrice(Number(e.target.value) || undefined)}
          />
        </div>

        {/* Sort */}
        <Select onValueChange={setSort}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          className="ml-auto"
          onClick={() => {
            setSelectedCategories([]);
            setShowFeatured(false);
            setMinPrice(undefined);
            setMaxPrice(undefined);
            setSort(undefined);
          }}
        >
          Reset Filters
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="hover:scale-105 transition-transform"
          >
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images[0]}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
