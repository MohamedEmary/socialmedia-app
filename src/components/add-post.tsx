"use client";

import { useState, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, SquarePen, X } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface AddPostProps {
  onNewPostAdded?: () => void;
}

export default function AddPost({ onNewPostAdded }: AddPostProps) {
  const [postText, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const token: string | null = localStorage.getItem("token");

  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = () => {
    if (postText.trim()) {
      const data = new FormData();

      data.append("body", postText);
      if (image) {
        data.append("image", image);
      }

      const config = {
        method: "post",
        url: "https://linked-posts.routemisr.com/posts",
        headers: {
          token: token,
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
              description: "Your post has been created successfully.",
            });
            if (onNewPostAdded) {
              onNewPostAdded();
            }
          }
        })
        .catch(() => {
          toast({
            title: "Error",
            variant: "destructive",
            description: "An error occurred while creating your post.",
          });
        });

      setBody("");
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mb-3">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <SquarePen className="inline-block pr-2" size={30} /> Create a New
          Post
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            id="post-body"
            placeholder="What's on your mind?"
            value={postText}
            onChange={handleBodyChange}
            rows={4}
            className="resize-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          {imagePreview && (
            <div className="relative w-20 h-20">
              <Image
                src={imagePreview}
                alt="Preview"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={handleRemoveImage}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <Button onClick={handleSubmit} disabled={!postText.trim()}>
            Post
          </Button>
          <div className="flex items-center space-x-2">
            <Input
              id="post-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <Label
              htmlFor="post-image"
              className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <ImagePlus className="h-5 w-5 text-gray-600" />
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
