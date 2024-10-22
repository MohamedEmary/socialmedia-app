"use client";
import reduxStore, { RootState } from "@/lib/Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { Post as PostType } from "../types/post.types";
import { useEffect, useState } from "react";
import { getMyData, getMyPosts } from "@/lib/Redux/PostsSlice";
import { PostSkeletonList } from "@/components/post-skeleton";
import Post from "@/components/post/post";
import AddPost from "@/components/add-post";
import ProfileImage from "@/components/profile-image";
import { useRouter } from "next/navigation";

export default function Page() {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();

  const myPosts: PostType[] | null = useSelector(
    (state: RootState) => state.posts.myPosts
  );

  const myInfo = useSelector((state: RootState) => state.posts.myInfo);

  const id: string =
    useSelector((state: RootState) => state.posts.myInfo?.user._id) || "";

  const token = useSelector((state: RootState) => state.auth.userToken);
  const [postsChanged, setPostsChanged] = useState(false);

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/login");
    }
  }, [isAuth, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        await dispatch(getMyData());
        dispatch(getMyPosts({ id, limit: 30 }));
      }
    };
    fetchData();
  }, [dispatch, token, id, postsChanged]);

  const handlePostsChanged = () => {
    setPostsChanged((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center py-4">
        <ProfileImage
          src={(myInfo && myInfo.user.photo) || ""}
          alt={(myInfo && myInfo.user.name) || ""}
        />
        <h1 className="mt-4 text-2xl font-bold">
          {myInfo && myInfo.user.name}
        </h1>
      </div>

      <AddPost onNewPostAdded={handlePostsChanged} />
      <div className="space-y-3">
        {myPosts ? (
          myPosts.map((post) => (
            <Post post={post} key={post.id} myPost={true} onPostDeleted={handlePostsChanged} />
          ))
        ) : (
          <PostSkeletonList />
        )}
      </div>
    </>
  );
}
