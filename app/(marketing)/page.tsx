import { Button } from "@/components/ui/button";
// import Image from "next/image";
import { Loader } from "lucide-react";
import Link from "next/link";
import { ClerkLoading, ClerkLoaded, SignedIn,SignInButton, SignedOut,SignUpButton } from "@clerk/nextjs";


const Home = () => {
  return (
    <div className="m-w-[988px] mx-auto p-4 gap-2 flex-1 w-full items-center justify-center flex flex-col lg:flex-row">
      <div className="relative mb-8 lg:mb-0 w-[240px] h-[240px] lg:w-[424px] lg:h-[424px]">
        {/* <Image src={} fill alt="Hero"/> */}
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-center text-neutral-600 max-w-[480px]">
        Learn practice and master programming languages with Prolingo.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
            <ClerkLoading>
                <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
            </ClerkLoading>
            <ClerkLoaded>
                <SignedOut>
                    <SignUpButton mode="modal">
                        <Button size="lg" variant="secondary" className="w-full">
                            Get Started
                        </Button>
                    </SignUpButton>
                    <SignInButton mode="modal">
                        <Button size="lg" variant="primaryOutline" className="w-full">
                            I already have an account
                        </Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <Button size="lg" className="w-full" asChild variant="secondary">
                       <Link href="/learn">
                       Continue Learning 
                       </Link>
                    </Button>
                </SignedIn>
            </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};

export default Home;
