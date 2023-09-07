import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import SignedInHeader from "./SignedInHeader/SignedInHeader";
import UnsignedInHeader from "./UnsignedInHeader/UnsignedInHeader";

export default function Header() {
  const [user] = useAuthState(auth)

  return user ? <SignedInHeader /> : <UnsignedInHeader />

}