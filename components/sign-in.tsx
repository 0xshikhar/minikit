// @ts-nocheck
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
export const SignIn = () => {
    const { data: session } = useSession();
    console.log("session", session);

    if (session) {
        return (
            <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-muted-foreground">
                    Signed in as {session?.user?.name?.slice(0, 10)}
                </p>
                <Button variant="outline" onClick={() => signOut()}>
                    Sign out
                </Button>
                <Button className="rounded-lg py-2">
                    <Link href="/events">Launch App!</Link>
                </Button>
            </div>
        );
    }

    return (
        <Button onClick={() => signIn("worldcoin")} size="lg">
            Verify with World ID
        </Button>
    );
};
