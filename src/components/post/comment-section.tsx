import { useState } from "react";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MoreHorizontal, MessageCircle } from "lucide-react";
import {
  Comment,
  CommentRequest,
  CommentResponse,
  Comment as CommentType,
} from "@/app/types/post.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import reduxStore from "@/lib/Redux/ReduxStore";
import { addComment } from "@/lib/Redux/PostsSlice";
import { useHandleOpenPost } from "@/lib/utils";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface CommentSectionProps {
  commentsArr: CommentType[];
  showAllComments: boolean;
  postId: string;
  myPost: boolean;
}

export default function CommentSection({
  commentsArr,
  showAllComments,
  postId,
  myPost,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(commentsArr);
  const [newComment, setNewComment] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [commentBeingEdited, setCommentBeingEdited] = useState<string | null>(
    null
  );
  const [token] = useState<string | null>(localStorage.getItem("token"));
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const handleOpenPost = useHandleOpenPost();

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: CommentRequest = {
        content: newComment.trim(),
        post: postId,
      };

      dispatch(addComment(comment)).then((res) => {
        const payload: CommentResponse = res.payload as CommentResponse;
        if (payload.message === "success") {
          setComments(payload.comments);
        }
      });
      setNewComment("");
    }
  };

  const handleUpdateComment = (commentId: string) => {
    const data = {
      content: commentBeingEdited,
    };

    const config = {
      method: "put",
      url: `https://linked-posts.routemisr.com/comments/${commentId}`,
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
            description: "Comment updated successfully",
            variant: "success",
          });
          const updatedComments = comments.map((comment) =>
            comment._id === commentId
              ? { ...comment, content: commentBeingEdited }
              : comment
          );
          setComments(updatedComments);
        }
      })
      .catch((error) => {
        const lengthMsg = `"content" length must be less than or equal to 30 characters long`;
        if (error.response.data.error === lengthMsg) {
          toast({
            title: "Error",
            description: "Comment must be less than 30 characters long",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "An error occurred while updating the comment",
            variant: "destructive",
          });
        }
      });
  };

  const handleDeleteComment = (commentId: string) => {
    const config = {
      method: "delete",
      url: `https://linked-posts.routemisr.com/comments/${commentId}`,
      headers: {
        token: token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.message === "success") {
          toast({
            title: "Success",
            description: "Comment deleted successfully",
            variant: "success",
          });
          setComments(comments.filter((comment) => comment._id !== commentId));
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "An error occurred while deleting the comment",
          variant: "destructive",
        });
      });
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
    <CardFooter className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm text-gray-500 w-full">
        <MessageCircle
          size={20}
          className="cursor-pointer"
          onClick={() => handleOpenPost(postId)}
        />
        <span className="cursor-pointer" onClick={() => handleOpenPost(postId)}>
          {comments.length} comments
        </span>
      </div>
      <div className="flex w-full items-center gap-2">
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
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

      {comments.length > 0 && (
        <div className="w-full space-y-4">
          {(showAllComments ? comments : [comments[0]]).map((comment) => (
            <div key={comment._id} className="flex items-start gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={comment.commentCreator.photo || ""}
                  alt={comment.commentCreator.name || ""}
                />
                <AvatarFallback>
                  {comment.commentCreator.name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">
                    {comment.commentCreator.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(comment.createdAt || "")}
                  </p>
                </div>
                {editingCommentId === comment._id ? (
                  <div className="mt-1 space-y-2">
                    <Input
                      value={commentBeingEdited || ""}
                      onChange={(e) => setCommentBeingEdited(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => setEditingCommentId(null)}
                        variant="outline"
                        size="sm">
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          handleUpdateComment(comment._id || "");
                          setEditingCommentId(null);
                        }}
                        size="sm">
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm">{comment.content}</p>
                )}
              </div>
              {myPost && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Comment options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingCommentId(comment._id);
                        setCommentBeingEdited(comment.content);
                      }}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteComment(comment._id || "")}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
          {!showAllComments && comments.length > 1 && (
            <Button
              variant="link"
              onClick={() => handleOpenPost(postId)}
              className="mt-2 px-0">
              Show all comments
            </Button>
          )}
        </div>
      )}
    </CardFooter>
  );
}
