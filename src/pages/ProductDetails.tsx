import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "@/services/api";
import { Loader } from "@/components/Loader/Loader";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
}

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const prod = await getProductById(id!);
        setProduct(prod);
        setSelectedImage(prod.images[0] || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    console.log("firts cart");
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
    });

    console.log("button cart");
    navigate("/cart"); 
  };

  if (loading) return <Loader text="Loading product..." />;
  if (!product) return <p className="text-center mt-8">Product not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6">
      <Card className="md:w-1/2">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-80 object-cover rounded-md mb-4"
          />
          {product.images.length > 1 && (
            <Tabs value={selectedImage} onValueChange={setSelectedImage}>
              <TabsList className="space-x-2">
                {product.images.map((img) => (
                  <TabsTrigger key={img} value={img}>
                    <img
                      src={img}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </CardContent>
      </Card>

      <div className="md:w-1/2 space-y-4">
        <p className="text-primary font-bold text-xl">
          ${product.price.toFixed(2)}
        </p>
        <Card>
          <CardContent>
            <CardDescription>{product.description}</CardDescription>
          </CardContent>
        </Card>
        <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductDetails;
