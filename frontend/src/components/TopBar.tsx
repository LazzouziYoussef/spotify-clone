import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton.tsx";

const TopBar = () => {
  const isAdmin = false;

  return (
    <div className="sticky top-0 z-10 bg-zinc-900/75 backdrop-blur-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">Spotify-Clone</div>

        <div className="flex items-center gap-4">
          {isAdmin && (
            <Link to="/admin" className="flex items-center gap-2">
              <LayoutDashboardIcon className="size-4" />
              <span>Admin Dashboard</span>
            </Link>
          )}
          <SignedIn>
            <SignOutButton />
          </SignedIn>
          <SignedOut>
            <SignInOAuthButton />
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
