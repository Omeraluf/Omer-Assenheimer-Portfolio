import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { Button } from "./button";

export function EmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Button
        onClick={handleCopy}
        variant="outline"
        className="rounded-2xl flex items-center"
      >
        {copied ? (
          <Check className="h-4 w-4 mr-2 text-green-600" />
        ) : (
          <Mail className="h-4 w-4 mr-2" />
        )}
        {copied ? "Copied!" : "Email"}
      </Button>

      {/* Tooltip */}
      <span
        className={`absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded-md text-white bg-neutral-800 shadow transition-opacity duration-300 pointer-events-none ${
          hovered || copied ? "opacity-100" : "opacity-0"
        }`}
      >
        {copied ? "Copied to clipboard!" : "Copy to clipboard"}
      </span>
    </div>
  );
}
