"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import {
  Post as PostType,
  Comment,
  CommentRequest,
  CommentResponse,
} from "@/app/types/post.types";
import Image from "next/image";
import { addComment } from "@/lib/Redux/PostsSlice";
import { useDispatch } from "react-redux";
import reduxStore from "@/lib/Redux/ReduxStore";
import { useRouter } from "next/navigation";

interface PostProps {
  post: PostType;
  showAllComments?: boolean;
}

const emptyPost: PostType = {
  id: null,
  body: null,
  image: null,
  user: {
    _id: null,
    name: null,
    photo: null,
  },
  createdAt: new Date().toISOString(),
  comments: [],
};

export default function Post({
  post = emptyPost,
  showAllComments = false,
}: PostProps) {
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const router = useRouter();

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: CommentRequest = {
        content: newComment.trim(),
        post: post.id,
      };

      dispatch(addComment(comment)).then((res) => {
        const payload: CommentResponse = res.payload;
        if (payload.message === "success") {
          setComments(payload.comments);
        }
      });
      setNewComment("");
    }
  };

  const handleOpenPost = (postId: string) => {
    router.push(`/post/${postId}`); //?fromApp=true
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage
            src={post.user.photo}
            alt={post.user.name}
            className="object-cover"
          />
          {/* use the first letter of the user name as a fallback */}
          <AvatarFallback>{post.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{post.user.name}</h2>
          <p
            className="text-sm text-gray-500 cursor-pointer"
            onClick={() => handleOpenPost(post.id)}>
            {formatDate(post.createdAt)}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative">
        <p>{post.body}</p>
        {post.image && (
          <Image
            src={post.image}
            alt="Post image"
            width={500}
            height={500}
            className="w-full h-auto rounded-lg"
          />
        )}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MessageCircle
            size={20}
            className="cursor-pointer"
            onClick={() => handleOpenPost(post.id)}
          />
          <span
            className="cursor-pointer"
            onClick={() => handleOpenPost(post.id)}>
            {comments.length} comments
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="flex w-full items-center gap-2">
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleAddComment}
            variant="outline"
            className="text-black dark:text-white bg-transparent">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send comment</span>
          </Button>
        </div>

        {/* Render the comments section only if there are comments */}
        {comments.length > 0 && (
          <div className="w-full space-y-4">
            {showAllComments ? (
              comments.map((comment) => (
                <div key={comment._id} className="flex items-start gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={comment.commentCreator.photo}
                      alt={comment.commentCreator.name}
                    />
                    <AvatarFallback>
                      {comment.commentCreator.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">
                        {comment.commentCreator.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div key={comments[0]._id} className="flex items-start gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={comments[0].commentCreator.photo}
                      alt={comments[0].commentCreator.name}
                    />
                    <AvatarFallback>
                      {comments[0].commentCreator.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">
                        {comments[0].commentCreator.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(comments[0].createdAt)}
                      </p>
                    </div>
                    <p className="text-sm">{comments[0].content}</p>
                  </div>
                </div>
                {comments.length > 1 && (
                  <Button
                    variant="link"
                    onClick={() => handleOpenPost(post.id)}
                    className="mt-2 px-0">
                    Show all comments
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
