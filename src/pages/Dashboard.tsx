import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Star, ArrowRight } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          Welcome to <span className="text-secondary">E-commerce App</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover premium products at unbeatable prices — all in one place.
          Shop smarter, live better.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button size="lg" onClick={() => navigate("/products")}>
            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          {!user && (
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
          )}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card className="hover:shadow-lg transition-all text-center p-6">
          <CardContent className="flex flex-col items-center space-y-3">
            <ShoppingBag className="h-10 w-10 text-primary" />
            <h3 className="text-lg font-semibold">Wide Range</h3>
            <p className="text-muted-foreground text-sm">
              Explore hundreds of products across all your favorite categories.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all text-center p-6">
          <CardContent className="flex flex-col items-center space-y-3">
            <Star className="h-10 w-10 text-primary" />
            <h3 className="text-lg font-semibold">Top Quality</h3>
            <p className="text-muted-foreground text-sm">
              We handpick every item to ensure high quality and great value.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all text-center p-6">
          <CardContent className="flex flex-col items-center space-y-3">
            <ArrowRight className="h-10 w-10 text-primary" />
            <h3 className="text-lg font-semibold">Fast Checkout</h3>
            <p className="text-muted-foreground text-sm">
              Secure payments and quick delivery — because time is valuable.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* CTA Banner */}
      <section className="w-full max-w-5xl">
        <Card className="bg-gradient-to-r from-primary to-secondary text-white border-none">
          <CardContent className="text-center py-12 space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Join ShopEase today
            </h2>
            <p className="text-white/80">
              Sign up and start your shopping journey with exclusive offers.
            </p>
            {!user ? (
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/auth")}
                className="text-primary font-semibold"
              >
                Get Started
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/products")}
                className="text-primary font-semibold"
              >
                Start Shopping
              </Button>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
