import { FieldValue, arrayRemove, arrayUnion, doc, getDoc, increment, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import Reaction  from "../types/reaction"
import { async } from "@firebase/util"

export const useToggleReaction = () => {

    const SetReaction =async (uid: string, name: string, reaction: string, url: string, ref: any, post: string) => {
        const userRef = doc(db, "users", uid)
        const reactionData: Reaction = (await getDoc(ref)).data().reactions
        let reactionValue
        if (reactionData.length>=1) {
            reactionValue = reactionData?.find(obj => obj.reaction === reaction)
        } else if(reaction){
            reactionValue = reactionData
        }
        console.log(ref,reactionValue?.value)
        if (reactionValue?.value != undefined) {
             updateDoc(ref, {
                reactions: arrayRemove({
                    reaction, url: url, value: reactionValue.value
                })
            })
            updateDoc(ref, {
                reactions: arrayUnion({
                    reaction, url: url, value: reactionValue.value + 1
                })
            })
        } else {
            updateDoc(ref, {
                reactions: arrayUnion({
                    reaction, url: url, value: 1
                })
            })
        }
        updateDoc(userRef, {
            reactions: arrayUnion({ reaction: reaction, post: post, url:url})
        })
    }
    const ToggleReaction = async (uid: string, reaction: string,url:string,url_old:string, ref: any, reaction_old: string,post:string) => {
        const userRef = doc(db, "users", uid)
        // try {
        updateDoc(userRef, {
            reactions:arrayRemove({ reaction: reaction_old, post:post,url:url_old})
        })
        const reactionData: Reaction = (await getDoc(ref)).data().reactions
        let reactionValue
        if (reactionData.length>=1) {
            reactionValue = reactionData?.find(obj => obj.reaction === reaction_old)
        } else {
            reactionValue = reactionData
        }
        if (reactionValue.value == 1) {
            updateDoc(ref, {
                reactions: arrayRemove({reaction:reaction_old, value:1,url:url_old})
            })
        } else {
            updateDoc(ref, {
                reactions:arrayRemove({ reaction: reaction_old, value:reactionValue.value ,url:url_old})
            })
            updateDoc(ref, {
                reactions:arrayUnion({ reaction: reaction_old, value:reactionValue.value-1  ,url:url_old})
            })
        }
        if (reaction != reaction_old) {
                if (reactionData.length>=1) {
                    reactionValue = reactionData?.find(obj => obj.reaction === reaction)
                } else if(reaction){
                    reactionValue = reactionData
                }
            if (reactionValue?.value != undefined) {
                    updateDoc(ref, {
                        reactions:arrayRemove({reaction:reaction, url: url, value: reactionValue.value
                        })
                    })
                    updateDoc(ref, {
                        reactions:arrayUnion({reaction:reaction, url: url, value: reactionValue.value + 1
                        })
                    })
                } else {
                    updateDoc(ref, {
                        reactions:arrayUnion({reaction:reaction, url: url, value:1
                        })
                    })
                }
                updateDoc(userRef, {
                    reactions:arrayUnion({ reaction: reaction, post:post,url:url})
                })
        }
    }
    return{ SetReaction ,ToggleReaction}
}