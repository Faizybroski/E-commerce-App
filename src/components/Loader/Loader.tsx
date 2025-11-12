// components/Loader.tsx
import { Loader2 } from "lucide-react";
import React from "react";

interface LoaderProps {
  size?: number; // optional, default 48px
  text?: string; // optional loading text
}

export const Loader: React.FC<LoaderProps> = ({ size = 48, text = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2
          className="animate-spin text-primary mx-auto"
          style={{ width: size, height: size }}
        />
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
    </div>
  );
};
