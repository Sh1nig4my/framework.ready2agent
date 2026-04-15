"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogoutIcon } from "@/components/ui/icons";

export function LogoutButton() {
  return (
    <Button
      className="w-full justify-start"
      onClick={() => signOut({ callbackUrl: "/login" })}
      type="button"
      variant="ghost"
    >
      <LogoutIcon size={16} />
      Logout
    </Button>
  );
}
