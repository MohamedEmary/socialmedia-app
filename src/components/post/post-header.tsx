import { CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHandleOpenPost } from "@/lib/utils";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { User } from "@/app/types/post.types";

interface PostHeaderProps {
  user: User;
  createdAt: string;
  postId: string;
  myPost: boolean;
  onEdit: () => void;
}

export default function PostHeader({
  user,
  createdAt,
  postId,
  myPost,
  onEdit,
}: PostHeaderProps) {
  const handleOpenPost = useHandleOpenPost();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleRemovePost = () => {
    const config = {
      method: "delete",
      url: `https://linked-posts.routemisr.com/posts/${postId}`,
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.message === "success") {
          toast({
            title: "Success",
            description: "Post deleted successfully",
            variant: "success",
          });
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "An error occurred while deleting the post",
          variant: "destructive",
        });
      });
  };

  return (
    <CardHeader className="flex flex-row items-center gap-4">
      <Avatar>
        <AvatarImage
          src={user.photo || ""}
          alt={user.name || ""}
          className="object-cover"
        />
        <AvatarFallback>{user.name?.[0] || ""}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p
          className="text-sm text-gray-500 cursor-pointer"
          onClick={() => handleOpenPost(postId)}>
          {formatDate(createdAt)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {myPost && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Post options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={handleRemovePost}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </CardHeader>
  );
}
