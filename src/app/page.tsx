"use client";
import { getPosts } from "@/lib/Redux/PostsSlice";
import Post from "../components/post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import reduxStore from "@/lib/Redux/ReduxStore";
import { Post as PostType } from "./types/post.types";

export default function Page() {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const allPosts: PostType[] = useSelector((state) => state.posts.allPosts);

  useEffect(() => {
    dispatch(getPosts(30));
  }, []);

  return (
    <>
      <div className="space-y-3">
        {allPosts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
