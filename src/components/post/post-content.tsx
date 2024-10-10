import React, { useState, useRef } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";
import Image from "next/image";

interface PostContentProps {
  body: string;
  image: string | null;
  editing: boolean;
  onSave: (body: string, image: File | null) => void;
  onCancel: () => void;
}

export default function PostContent({
  body,
  image,
  editing,
  onSave,
  onCancel,
}: PostContentProps) {
  const [editedBody, setEditedBody] = useState(body);
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditedImage(e.target.files[0]);
    }
  };

  if (editing) {
    return (
      <CardContent className="space-y-4">
        <Textarea
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          rows={4}
        />
        <div className="space-y-2">
          {image && (
            <div className="relative w-full h-64">
              <Image
                src={image}
                alt="Current post image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline">
              <ImagePlus className="h-4 w-4 mr-2" />
              Change Image
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            {editedImage && (
              <span className="text-sm text-gray-500">New image selected</span>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={() => onSave(editedBody, editedImage)}>Save</Button>
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent className="space-y-4">
      <p className="break-words">
        {body.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      {image && (
        <Image
          src={image}
          alt={body}
          width={500}
          height={500}
          className="w-full h-auto rounded-lg"
        />
      )}
    </CardContent>
  );
}
