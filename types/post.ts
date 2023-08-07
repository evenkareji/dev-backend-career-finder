// import { Timestamp } from "firebase-admin/firestore";
import { Interview } from "./interview";

export type Post = {
  id: string;
  authorId: string;

  body: {
    companyName: string;
    occupation: Array<string>;
    interview:Array<Interview>
    // etc
    impression?: string;
    result: string;
  };
  reactions: Array<string | undefined | null>;
  createdAt:any;
  updateAt: string | null;
};