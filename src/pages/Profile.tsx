// pages/Profile.tsx
import React, { useEffect, useState, useContext } from "react";
import { Loader } from "@/components/Loader/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthContext";

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  address: Address;
  createdAt: string;
  isVerified: boolean;
}

const Profile: React.FC = () => {
  const { user } = useContext(AuthContext); // assume context provides logged-in user
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    // simulate API fetch
    const loadProfile = async () => {
      setLoading(true);
      try {
        setProfile(user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  if (loading) return <Loader text="Loading profile..." />;
  if (!profile) return <p className="text-center mt-8">Profile not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">My Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Full Name:</span>
            <span>
              {profile.firstName} {profile.lastName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{profile.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Phone:</span>
            <span>{profile.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Role:</span>
            <span className="capitalize">{profile.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Verified:</span>
            <span>{profile.isVerified ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Member Since:</span>
            <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        {profile && (
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Street:</span>
              <span>{profile.address?.street}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">City:</span>
              <span>{profile.address?.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">State:</span>
              <span>{profile.address?.state}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">ZIP Code:</span>
              <span>{profile.address?.zipCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Country:</span>
              <span>{profile.address?.country}</span>
            </div>
          </CardContent>
        )}
      </Card>

      <div className="text-center">
        <Button
          onClick={() => alert("Edit profile functionality coming soon!")}
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default Profile;
