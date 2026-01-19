import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton.tsx";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import { cn } from "@/lib/utils.ts";
import { buttonVariants } from "./ui/button.tsx";

const TopBar = () => {
  const { isAdmin } = useAuthStore();

  return (
    <div className="rounded-lg sticky top-0 z-10 bg-zinc-900/75 backdrop-blur-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/spotify.png" className="size-8" alt="spt-logo" />
          Spotify-Clone
        </div>
        <div className="flex items-center gap-4">
          {isAdmin && (
            <Link
              to="/admin"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <LayoutDashboardIcon className="size-4" />
              <span>Admin Dashboard</span>
            </Link>
          )}
          <SignedIn>
            <UserButton />
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
