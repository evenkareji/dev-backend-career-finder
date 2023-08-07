import React, { useEffect, useState } from 'react'
import { getDocs, collection,getDoc ,doc,arrayUnion, updateDoc, arrayRemove} from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { Reaction } from '../types/reaction'
import { useAuth } from '../context/auth'
import { useToggleReaction } from '../lib/useToggleReaction'

const ReactionList = ({ post}: { post: string }) => {
  const [reactions, setReactions] = useState<Reaction[]>([])
  const { SetReaction, ToggleReaction } = useToggleReaction();
  const { user } = useAuth();
  useEffect(() => {
    const getReaction = async () => {
      const querySnapshot = await getDocs(collection(db, "reactionList"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        url: doc.data().url,
        value:doc.data().value,
        ...doc.data(),
      }));
      setReactions(data);
    };
    getReaction();
  }, []);

  const addReaction = async (post: string, reaction: string, url:string) => {
    if (user) {
      const docRef = doc(db, "posts_d", post)
      const reactionData: Array<Reaction> = (await getDoc(docRef)).data().reactions
      const userRef = doc(db, "users", user.id)
      const userData: Array<{ post: string, reaction: string ,url:string}> = (await getDoc(userRef)).data().reactions
      const existingReaction = userData?.find(obj => obj.post === post);

      if (existingReaction) {
          console.log("toggle")
          ToggleReaction(user.id, reaction,url,existingReaction.url, docRef,existingReaction.reaction,post);
      } else {
        SetReaction(user.id, user.name, reaction, url,docRef,post);
        }
      }
  }

  return (
    <div>
    <p>Reaction</p>
    {reactions.map((reaction: Reaction, index: number) => (
      <div key={index}>
      <button onClick={()=>addReaction(post, reaction.id,reaction.url)}>
      <img src={reaction.url} alt="" />
      </button>
      </div>
      ))}
      </div>
      )
    }

    export default ReactionList
