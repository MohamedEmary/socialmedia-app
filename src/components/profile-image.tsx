"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import reduxStore from "@/lib/Redux/ReduxStore";
import { getMyData } from "@/lib/Redux/PostsSlice";

interface ProfileImageProps {
  src: string;
  alt: string;
}

export default function ProfileImage({ src, alt }: ProfileImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch<typeof reduxStore.dispatch>();

  const changeProfilePhoto = (img: File) => {
    const data = new FormData();
    data.append("photo", img);

    const config = {
      method: "put",
      url: "https://linked-posts.routemisr.com/users/upload-photo",
      headers: {
        token: localStorage.getItem("token"),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.message === "success") {
          toast({
            title: "Success",
            variant: "success",
            description: "Profile photo updated successfully",
          });
          dispatch(getMyData());
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Something went wrong! please try again",
        });
      });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      changeProfilePhoto(e.target.files[0]);
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
