"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { PlusCircle } from "lucide-react";

interface ProfileImageProps {
  src: string;
  alt: string;
  onImageChange: (file: File) => void;
}

export default function ProfileImage({
  src,
  alt,
  onImageChange,
}: ProfileImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <div
      className="relative w-64 h-64"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="relative w-full h-full rounded-full border-2 border-white overflow-hidden">
        <Image src={src} alt={alt} layout="fill" objectFit="cover" />
      </div>
      <label
        htmlFor="profile-image-upload"
        className={`absolute bottom-4 right-4 w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
        <PlusCircle className="w-6 h-6 text-white" />
        <input
          id="profile-image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
}
