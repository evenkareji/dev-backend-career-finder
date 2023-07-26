import React from "react";
import { useForm } from "react-hook-form";
import { Post } from "../types/post";
const InputForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();
  return (
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
        <input type="number" {...register("head")} id="head" />
      </div>
      <div>
        <label htmlFor="">質問された内容など</label>
        <textarea autoComplete="off" {...register("body")} id="body"></textarea>
      </div>
    </div>
  );
};

export default InputForm;
