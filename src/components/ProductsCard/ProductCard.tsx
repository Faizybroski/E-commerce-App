// components/ProductCard.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
  return (
    <Card className="hover:shadow-lg transition cursor-pointer">
      <CardHeader className="p-0">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <CardDescription className="text-primary font-bold mt-2">
          ${price.toFixed(2)}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
