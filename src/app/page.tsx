"use client";
import { getPosts } from "@/lib/Redux/PostsSlice";
import Post from "../components/post/post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import reduxStore, { RootState } from "@/lib/Redux/ReduxStore";
import { Post as PostType } from "./types/post.types";
import { PostSkeletonList } from "@/components/post-skeleton";
import AddPost from "../components/add-post";
import { useRouter } from "next/navigation";

export default function Page() {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();

  const allPosts: PostType[] | null = useSelector(
    (state: RootState) => state.posts.allPosts
  );

  const token = useSelector((state: RootState) => state.auth.userToken);

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/login");
    } else if (token) {
      dispatch(getPosts(30));
    }
  }, [isAuth, router, token, dispatch]);

  return (
    <>
      <AddPost />
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
