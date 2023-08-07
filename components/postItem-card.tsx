import React, { useState } from "react";
// import { useUser } from "../lib/user";
import Link from "next/link";
import { Post } from "../types/post";
import Image from "next/image";
import ReactionList from "./addReaction";
import CurrentReactionList from "./current-reaction-list";

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
        <p>{post.id}</p>
        <button onClick={reactionOpen}>+</button>
        <CurrentReactionList post={post.id} />
        {reactionTab && <ReactionList  post={post.id} />}
      </div>
    </>
  );
};

export default PostItemCard;