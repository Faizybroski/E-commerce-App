import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const { login, register } = useContext(AuthContext);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setAddress({ street: "", city: "", state: "", zipCode: "", country: "" });
    setAgreeToTerms(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        if (!email.trim() || !password.trim()) {
          toast({
            title: "Login Validation",
            description: "E-mail and password are required.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const res = await login(email.trim(), password.trim());
        if (!res.success) throw new Error(res.message);

        toast({
          title: "Welcome Back!",
          description: "Successfull Login.",
        });
        navigate("/");
        resetForm();
      } else {
        if (
          !firstName.trim() ||
          !lastName.trim() ||
          !email.trim() ||
          !password.trim()
        ) {
          toast({
            title: "Registration Validation",
            description: "All fields are required",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        if (!agreeToTerms) {
          toast({
            title: "Agree to Terms",
            description:
              "You can't be registered without agree to our terms and conditions.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const res = await register({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password: password.trim(),
          role: "buyer",
          phone: phone.trim(),
          address,
        });

        if (!res.success) throw new Error(res.message);

        toast({
          title: "Registration successful!",
          description: "You are now registered successfully.",
        });
        resetForm();
        navigate("/");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong.",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-xl p-6 shadow-lg bg-gradient-card animate-fade-in">
        <div className="flex justify-center mb-6">
          <h1 className="text-2xl font-bold text-primary">
            {isLogin ? "Login" : "Register"}
          </h1>
        </div>

        <div className="flex mb-6 bg-secondary/20 rounded-full p-1">
          <button
            className={`flex-1 py-2 rounded-full text-sm font-medium ${
              isLogin
                ? "bg-primary text-secondary shadow"
                : "text-muted-foreground bg-secondary"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 rounded-full text-sm font-medium ${
              !isLogin
                ? "bg-primary text-secondary shadow"
                : "text-muted-foreground bg-secondary"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Fisrt Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    type="text"
                    placeholder="Street"
                    value={address.street}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        street: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) =>
                      setAddress((prev) => ({ ...prev, city: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) =>
                      setAddress((prev) => ({ ...prev, state: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">Postcode</Label>
                  <Input
                    id="zipCode"
                    type="text"
                    placeholder="Postcode"
                    value={address.zipCode}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        zipCode: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    type="text"
                    placeholder="Country"
                    value={address.country}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        country: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) =>
                    setAgreeToTerms(checked === true)
                  }
                />
                <Label htmlFor="terms">
                  I accepted{" "}
                  <Link
                    to="/terms-conditions"
                    className="text-primary underline"
                  >
                    Terms And Conditions
                  </Link>
                </Label>
              </div>
            </>
          )}

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="text-primary absolute right-4 top-8"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full py-3 mt-2"
            disabled={loading || (!isLogin && !agreeToTerms)}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : isLogin ? (
              "Login"
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};
