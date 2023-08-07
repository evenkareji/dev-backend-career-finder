import React, { useEffect, useState } from 'react'
import { Reaction } from '../types/reaction'
import { useAuth } from '../context/auth'
import { PostReaction } from '../types/post-reaction'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const CurrentReactionList = ({ post }: { post: string }) => {
  const [currentReaction, setCurrentReaction] = useState<Reaction[]>([])
  const [currentReactionValue, setCurrentReactionValue] = useState()
  const { user } = useAuth();

  useEffect(() => {
    const getReaction = async () => {
      const docRef = doc(db, "posts_d", post)
      const ReactionData: Array<Reaction> = (await getDoc(docRef)).data().reactions
      console.log(ReactionData)
      if (ReactionData) {
        const valueData: Array<{ reaction: string, value:number ,url:string }>  = []
        ReactionData.map(doc => (
          valueData.push({reaction:doc.reaction,url:doc.url, value:doc.value}),
          console.log(valueData)
        ))
        setCurrentReaction(valueData);
        console.log(currentReaction)
      }
    };
    getReaction();
  },[])
  return (

    <div>
      {currentReaction.map((reaction: Reaction, index: number) => (
        <div key={index}>
          <p>{reaction.value}人</p>
          <p>{ reaction.reaction }</p>
          <img src={reaction.url } alt="" />
        </div>
      ))}
    </div>
  )
}

export default CurrentReactionList
