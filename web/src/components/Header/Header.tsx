import { Auth } from "firebase/auth";
import { useAuthValue } from "../../contexts/AuthContext";
import SignedInHeader from "./SignedInHeader/SignedInHeader";
import UnsignedInHeader from "./UnsignedInHeader/UnsignedInHeader";

export default function Header() {
  const currentUser = useAuthValue()
  console.log("Header", currentUser)
  return currentUser ? <SignedInHeader /> : <UnsignedInHeader />;
}