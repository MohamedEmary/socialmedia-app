"use client";
import { getPosts } from "@/lib/Redux/PostsSlice";
import Post from "../components/post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import reduxStore from "@/lib/Redux/ReduxStore";
import { Post as PostType } from "./types/post.types";
import { PostSkeletonList } from "@/components/post-skeleton";

export default function Page() {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();

  const allPosts: PostType[] = useSelector(
    (state: ReturnType<typeof reduxStore.getState>) => state.posts.allPosts
  );

  useEffect(() => {
    dispatch(getPosts(30));
  }, []);

  return (
    <>
      <div className="space-y-3">
        {allPosts ? (
          allPosts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <PostSkeletonList />
        )}
      </div>
    </>
  );
}
