
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { Post } from "../../types/post";
import { useAuth } from "../../context/auth";
import Link from "next/link";
import { ReactElement } from "react";
import { db } from "../../firebase/firebase";
import { doc } from "firebase/firestore";

export const getStaticProps: GetStaticProps<{
  post: Post;
}> = async (context) => {
  const snap = await db.doc(`posts/${context.params?.id}`).get();
  const post = snap.data() as Post;
  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const PostDetailPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const user = useUser(post?.authorId);
  const { fbUser } = useAuth();
  const isAuter = fbUser?.uid === post?.authorId;

  if (!post) {
    return <p>記事はない</p>;
  }

  return (
    <div className=" container">
      <h1 className=" font-bold text-lg mb-2">{post.title}</h1>
      {user && (
        <div className="flex mb-4">
          <div className="w-10 h-10 mr-2 bg-slate-100 rounded-full"></div>
          <div className="flex-1">
            <p>{user.name}</p>
            <p className=" text-slate-600 ">
              {format(post.createdAt, "yyyy年MM月dd日投稿")}
            </p>
          </div>
        </div>
      )}
      <p className="">{post.body}</p>
      {isAuter && (
        <Link href={`/posts/${post.id}/edit`}>
          <a className=" text-slate-300">編集</a>
        </Link>
      )}
    </div>
  );
};

PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PostDetailPage;