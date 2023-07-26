import React, { useState } from "react";
// import { useUser } from "../lib/user";
import Link from "next/link";
import { Post } from "../types/post";
import Image from "next/image";
import Reaction from "./reaction";

const PostItemCard = ({ post }: { post: Post }) => {
    //   const user = useUser(post.authorId);
    const [reactionTab, setReactionTab] = useState<boolean>(false);

    const reactionOpen = () => {
      setReactionTab(!reactionTab)
      console.log("aa!")
    }
  return (
    <>
      <div className=" rounded-md shadow p-4">
        <h2 className=" line-clamp-2">
                {post.body.companyName}
        </h2>
        <p>{post.body.result}</p>
        <button onClick={reactionOpen}>+</button>
        {reactionTab && <Reaction/>}
        {/* {user && (
          <div className="flex mt-4 items-center">
            <Image
              src={user?.avatarURL}
              className="w-10 h-10 block rounded-full"
              alt=""
            />
            <div className=" ml-5">
              <p className=" truncate">{user.name}</p>
              <p className=" text-slate-500 text-sm">
                {format(post.createdAt, "yyyy/MM/dd")}
              </p>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default PostItemCard;