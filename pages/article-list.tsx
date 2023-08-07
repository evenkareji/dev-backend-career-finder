import React from "react";
import algoliasearch from "algoliasearch";
import {
  Configure,
  Hits,
  HitsProps,
  InstantSearch,
  Pagination,
  SearchBox,
  SearchBoxProps,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import { User } from "../types/user";
import PostItemCard from "../components/postItem-card";
import { debounce } from "debounce";
const searchClient = algoliasearch(
  "VM6K40T2WT",
  "c3e5475421873a971c6d08ec6ccc4d34"
);

const articleList = () => {
    const search: SearchBoxProps["queryHook"] = (query, hook) => {
    console.log("検索実行");
    hook(query);
  };
  return (
    <div className=" container">
      <h1>検索</h1>
      <InstantSearch indexName="posts_d" searchClient={searchClient}>
        <SearchBox
          queryHook={debounce(search, 500)}
          classNames={{
            root: "relative inline-block",
            input: "rounded-full border-slate-950 bg-gray-400 pr-10 pl-3 py-2",
            submitIcon: "hidden",
            resetIcon: "hidden",
          }}
          submitIconComponent={() => (
            <span className="absolute right-0 text-black top-1/2 -translate-y-1/2 p-3 text-slate-200">

            </span>
          )}
        />
        <Configure hitsPerPage={10} />
          <Hits<any>
            classNames={{
              list: "space-y-4 my-6",
            }}
            hitComponent={({ hit }) => <PostItemCard post={hit} />}
          />
        {/* <Pagination
          classNames={{
              list: "flex space-x-1",
              link: "py-1 px-3 ",
              disabledItem: "opacity-40",
              selectedItem: "text-blue-500",
            }}
          /> */}
      </InstantSearch>
    </div>
    );
};

export default articleList;
