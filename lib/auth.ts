import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const login = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((res) => {
      alert(`${res.user.displayName} logged in.`);
    })
    .catch((err) => console.log(err));
};

export const logout = () => {
  signOut(auth).then(() => {
    alert("logout");
  });
};
