import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ShoppingCart, LogOut, Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  // { label: "Home", path: "/", icon: Menu },
  { label: "Products", path: "/products", icon: Menu },
  // Add more items as needed
];

const Navigation: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };

  const isCartActive = location.pathname === "/cart";

  return (
    <nav className="sticky top-0 z-50 border-b border-border backdrop-blur-md bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center space-x-2"
          >
            <h1>E-commerce Application</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`flex items-center space-x-2 transition-all ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Desktop Cart/Profile/Auth */}
            <div className="hidden lg:flex items-center space-x-4">
              {user && (
                <Link to="/cart">
                  <Button
                    variant={isCartActive ? "default" : "outline"}
                    className="relative flex items-center space-x-2 border border-primary/20 hover:bg-primary hover:text-secondary transition-all"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="hidden sm:inline">Cart</span>
                    {totalItems > 0 && (
                      <motion.span
                        key={totalItems}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </Button>
                </Link>
              )}

              {user && (
                <Link to="/profile">
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 border border-primary/20 hover:bg-primary hover:text-secondary transition-all"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-secondary text-primary">
                        {user.firstName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline font-medium">
                      {user.firstName}
                    </span>
                  </Button>
                </Link>
              )}

              {!user ? (
                <Button
                  onClick={() => navigate("/auth")}
                  variant="secondary"
                  className="border border-primary/30 hover:bg-primary hover:text-secondary transition-all"
                >
                  Login
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleSignOut}
                  className="border border-primary/30 bg-secondary hover:bg-primary text-primary hover:text-secondary transition-all"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              )}
            </div>

            {/* Hamburger Toggle: md/lg below */}
            <Button
              variant="ghost"
              size="icon"
              className="md:flex lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-2 space-y-1 pb-4"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-md transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <Icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}

              {/* Cart/Profile/Auth in Hamburger */}
              {user && (
                <>
                  <Link
                    to="/cart"
                    onClick={() => setIsOpen(false)}
                    className="w-full block"
                  >
                    <Button className="w-full flex items-center px-4 py-3 text-left">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Cart ({totalItems})
                    </Button>
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="w-full block"
                  >
                    <Button className="w-full flex items-center px-4 py-3 text-left">
                      <Avatar className="h-5 w-5 mr-2">
                        <AvatarFallback className="bg-secondary text-primary">
                          {user.firstName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {user.firstName}
                    </Button>
                  </Link>

                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-3 text-left text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-all"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </button>
                </>
              )}

              {!user && (
                <button
                  onClick={() => {
                    navigate("/auth");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-3 text-left text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-all"
                >
                  Login
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
