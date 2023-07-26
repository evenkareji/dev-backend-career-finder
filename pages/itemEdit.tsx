import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth";
import { Post } from "../types/post";
import { auth, db } from "../firebase/firebase";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import InputForm from "../components/input_form";
import { useState } from "react";

const itemEdit = () => {
  const router = useRouter();
  const [add, setAdd] = useState<Array<number>>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  const addForm = () => {
    console.log("add", add);
    setAdd([...add, add.length]);
  };

  const addForms = add.map((index: number) => (
    <>
      <div key={index}>
        <div>
          <label htmlFor="">選考名</label>
          <select {...register(`format${index}`)} id="format">
            <option value="一次選考">一次選考</option>
            <option value="二次選考">二次選考</option>
            <option value="最終選考">最終選考</option>
          </select>
        </div>
        <div>
          <label htmlFor="">面接形式</label>
          <select {...register(`method${index}`)} id="method">
            <option value="Web面接">Web面接</option>
            <option value="対面">対面</option>
          </select>
        </div>
        <div>
          <label htmlFor="">面接方式</label>
          <select {...register(`system${index}`)} id="system">
            <option value="個人">個人</option>
            <option value="団体">団体</option>
          </select>
        </div>
        <div>
          <label htmlFor="">人数</label>
          <input type="number" {...register(`headcount${index}`)} id="head" />
        </div>
        <div>
          <label htmlFor="">質問された内容など</label>
          <textarea
            autoComplete="off"
            {...register(`description${index}`)}
            id="body"
          ></textarea>
        </div>
      </div>
    </>
  ));
  const { isLoading, fbUser } = useAuth();
  if (!fbUser) {
    if (!isLoading) {
      router.push("/login");
    }
    return null;
  }
  const submit = (data: Post) => {
    const ref = doc(collection(db, "posts_d"));
    console.log(fbUser);
    const post: Post = {
      id: ref.id,
      authorId: fbUser.uid,

      body: {
        companyName: data.companyName,
        occupation: [],
        interview: [
          {
            index: 0,
            interviewFormat: data.format,
            interviewMethod: data.method,
            selectionResult: data.system,
            headcount: data.headcount,
            description: data.description,
          },
        ],
        result: data.result,
        impression: data.impression,
      },
      likes: [],
      createdAt: new Date(),
      updateAt: null,
    };
    add.forEach((i: any) => {
      console.log(eval("data.format" + i));
      post.body.interview.push({
        index: i,
        interviewFormat: eval("data.format" + i),
        interviewMethod: eval("data.method" + i),
        selectionResult: eval("data.system" + i),
        headcount: eval("data.headcount" + i),
        description: eval("data.description" + i),
      });
    });

    console.log(post);
    setDoc(ref, post).then(async () => {
      // await revalidate("/");
      alert(`記事を作成しました`);
    });
  };

  return (
    <div onSubmit={handleSubmit(submit)}>
      <form>
        <div>
          <div className="">
            <label htmlFor="">会社名</label>
            <input
              autoComplete="off"
              {...register("companyName")}
              id="companyName"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="">選考名</label>
            <select {...register("format")} id="format">
              <option value="一次選考">一次選考</option>
              <option value="二次選考">二次選考</option>
              <option value="最終選考">最終選考</option>
            </select>
          </div>
          <div>
            <label htmlFor="">面接形式</label>
            <select {...register("method")} id="method">
              <option value="Web面接">Web面接</option>
              <option value="対面">対面</option>
            </select>
          </div>
          <div>
            <label htmlFor="">面接方式</label>
            <select {...register("system")} id="system">
              <option value="個人">個人</option>
              <option value="団体">団体</option>
            </select>
          </div>
          <div>
            <label htmlFor="">人数</label>
            <input type="number" {...register("headcount")} id="head" />
          </div>
          <div>
            <label htmlFor="">質問された内容など</label>
            <textarea
              autoComplete="off"
              {...register("description")}
              id="body"
            ></textarea>
          </div>
        </div>
        {addForms}
        <p onClick={addForm}>+</p>
        <div>
          <label htmlFor="">現在の状態</label>
          <select {...register("result")} id="result">
            <option value="合格">合格</option>
            <option value="不合格">不合格</option>
            <option value="選考途中">選考途中</option>
          </select>
        </div>
        <div>
          <label htmlFor="">選考を通じた感想</label>
          <input {...register("impression")} id="impression" />
        </div>
        <button>投稿</button>
      </form>
    </div>
  );
};

export default itemEdit;
