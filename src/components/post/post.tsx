"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Post as PostType } from "@/app/types/post.types";
import PostHeader from "./post-header";
import PostContent from "./post-content";
import CommentSection from "./comment-section";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { RootState } from "@/lib/Redux/ReduxStore";
import { useSelector } from "react-redux";

interface PostProps {
  post: PostType;
  showAllComments?: boolean;
  onPostDeleted?: () => void;
}

export default function Post({
  post,
  showAllComments = false,
  onPostDeleted,
}: PostProps) {
  const [editingPost, setEditingPost] = useState(false);
  const [postBody, setPostBody] = useState(post.body);
  const [postImage, setPostImage] = useState(post.image);
  const token = useSelector((state: RootState) => state.auth.userToken);

  const handleUpdatePost = (updatedBody: string, updatedImage: File | null) => {
    const data = new FormData();
    data.append("body", updatedBody);
    if (updatedImage) {
      data.append("image", updatedImage);
    }

    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://linked-posts.routemisr.com/posts/${post.id}`,
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
            description: "Post updated successfully",
            variant: "success",
          });
          setPostBody(updatedBody);
          if (updatedImage) {
            setPostImage(URL.createObjectURL(updatedImage));
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setEditingPost(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <PostHeader
        user={post.user}
        createdAt={post.createdAt || ""}
        postId={post.id || ""}
        onEdit={() => setEditingPost(true)}
        onDelete={onPostDeleted || (() => {})}
      />
      <PostContent
        body={postBody || ""}
        image={postImage}
        editing={editingPost}
        onSave={handleUpdatePost}
        onCancel={() => setEditingPost(false)}
      />
      <CommentSection
        commentsArr={post.comments}
        showAllComments={showAllComments}
        postId={post.id || ""}
      />
    </Card>
  );
}
