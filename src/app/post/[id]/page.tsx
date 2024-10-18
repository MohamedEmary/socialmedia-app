"use client";
import { Post as PostType } from "@/app/types/post.types";
import Post from "@/components/post/post";
import { PostSkeleton } from "@/components/post-skeleton";
import { getSinglePost } from "@/lib/Redux/PostsSlice";
import reduxStore, { RootState } from "@/lib/Redux/ReduxStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page({ params: { id } }: { params: { id: string } }) {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();

  const post: PostType | null = useSelector(
    (state: RootState) => state.posts.singlePost
  );

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch, id]);

  return (
    <>
      {post ? (
        <Post post={post} showAllComments={true} />
      ) : (
        <PostSkeleton commentCount={3} />
      )}
    </>
  );
}

export default Page;
