import React from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (cart.length === 0)
    return <p className="text-center mt-8">Your cart is empty.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {cart.map((item) => (
        <Card key={item.id} className="flex flex-col md:flex-row items-center gap-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-32 h-32 object-cover rounded-md"
          />
          <CardContent className="flex-1 space-y-2">
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>${item.price.toFixed(2)}</CardDescription>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value) || 1)
                }
                className="w-20"
              />
              <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-between items-center mt-4">
        <p className="font-bold text-xl">Total: ${totalPrice.toFixed(2)}</p>
        <Button variant="secondary" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <Button className="w-full mt-4">Proceed to Checkout</Button>
    </div>
  );
};

export default Cart;