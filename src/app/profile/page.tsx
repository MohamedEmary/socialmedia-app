"use client";
import reduxStore from "@/lib/Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { Post as PostType } from "../types/post.types";
import { useEffect } from "react";
import { getMyData, getMyPosts } from "@/lib/Redux/PostsSlice";
import { PostSkeletonList } from "@/components/post-skeleton";
import Post from "@/components/post";
import AddPost from "@/components/add-post";
import ProfileImage from "@/components/profile-image";
import { myInfo } from "@/app/types/other.type";

export default function Page() {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();

  const myPosts: PostType[] = useSelector(
    (state: ReturnType<typeof reduxStore.getState>) => state.posts.myPosts
  );

  const myInfo: myInfo = useSelector(
    (state: ReturnType<typeof reduxStore.getState>) => state.posts.myInfo
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getMyData());
      const id = myInfo ? myInfo.user._id : "";
      dispatch(getMyPosts({ id, limit: 30 }));
    };

    fetchData();
  }, [dispatch, myInfo]);

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

      <AddPost />
      <div className="space-y-3">
        {myPosts ? (
          myPosts.map((post) => <Post post={post} key={post.id} />)
        ) : (
          <PostSkeletonList />
        )}
      </div>
    </>
  );
}
