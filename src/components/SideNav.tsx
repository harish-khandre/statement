import Link from "next/link";
import { signIn, signOut, useSession} from "next-auth/react";
import { IconHoverEffect } from "./IconHoverEffect";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";

const SideNav = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <nav className="sticky top-0 px-4 py-4 text-white">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">
            <IconHoverEffect>
              <span className="flex items-center gap-4 ">
                <VscHome className="h-8 w-8" />
                <span className="hidden text-xl md:inline">Home</span>
              </span>
            </IconHoverEffect>
          </Link>
        </li>
        {user != null && (
          <li>
            <Link href={`/profile/${user.id}`}>
              <IconHoverEffect>
                <span className="flex items-center gap-4 ">
                  <VscAccount className="h-8 w-8" />
                  <span className="hidden text-xl md:inline">Profile</span>
                </span>
              </IconHoverEffect>
            </Link>
          </li>
        )}
        {user == null ? (
          <li>
            <button onClick={() => void signIn()}>
              <IconHoverEffect>
                <span className="flex items-center gap-4 ">
                  <VscSignIn className="h-8 w-8 fill-zinc-300 " />
                  <span className="hidden text-xl text-zinc-500 md:inline ">
                    Log In
                  </span>
                </span>
              </IconHoverEffect>
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>
              <IconHoverEffect>
                <span className="flex items-center gap-4 ">
                  <VscSignOut className="h-8 w-8 fill-red-400 " />
                  <span className="hidden text-lg text-red-500 md:inline ">
                    Log Out
                  </span>
                </span>
              </IconHoverEffect>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideNav;
