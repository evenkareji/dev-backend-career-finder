import React, { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const Reaction = () => {
  const [reactions, setReactions] = useState<any[]>([])

  useEffect(() => {
    const getReaction = async () => {
      const querySnapshot = await getDocs(collection(db, "reactionList"));

      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        url:doc.data().url,
        ...doc.data(),
      }));

      setReactions(data);
    };

    getReaction();
  }, []);

  return (
    <div>
      <p>Reaction</p>
      {reactions.map((reaction: any, index: number) => (
        <div key={index}>
        <p >{reaction.id}</p>
          <img src={reaction.url} alt="" />
        </div>
      ))}
    </div>
  )
}

export default Reaction
