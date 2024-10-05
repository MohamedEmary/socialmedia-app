"use client";
import { Post as PostType } from "@/app/types/post.types";
import Post from "@/components/post";
import { getSinglePost } from "@/lib/Redux/PostsSlice";
import reduxStore from "@/lib/Redux/ReduxStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page({ params }) {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();

  const post: PostType = useSelector(
    (state: ReturnType<typeof reduxStore.getState>) => state.posts.singlePost
  );

  useEffect(() => {
    const id: string = params.id;
    dispatch(getSinglePost(id));
  }, []);

  return (
    <>{post ? <Post post={post} showAllComments={true} /> : <p>loading</p>}</>
  );
}

export default Page;
