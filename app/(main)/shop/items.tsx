"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { refillHearts } from "@/actions/user-progress";
import { toast } from "sonner";
import { createStripeUrl } from "@/actions/user-subscription";
import { POINTS_REFILL } from "@/constants";
type Props={
    hearts:number;
    points:number;
    hasActiveSubscription:boolean;
};

export const Items=({hasActiveSubscription,hearts,points}:Props)=>{
    const [pending,startTransition]=useTransition();

    const onRefillHearts=()=>{
        if(pending || hearts===5 || points<POINTS_REFILL){
            return;
        }
        startTransition(()=>{
            refillHearts().catch(()=>toast.error("Something went wrong")
            )
        })
    }
    const onUpgrade=()=>{
        startTransition(()=>{
            createStripeUrl().then((response)=>{
                if(response.data){ 
                    window.location.href=response.data;
                }
            }).catch(()=>toast.error("Something went wrong"));
        })
    }
    return(
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-top-2">
                <Image
                src="/heart.svg"
                alt="Heart"
                height={60}
                width={60}
                />
                <div className="flex-1 ">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold ">
                        Refill Hearts
                    </p>
                </div>
                <Button 
                onClick={onRefillHearts}
                disabled={pending || hearts===5 || points<POINTS_REFILL}>
                    {hearts===5?"Full":
                    <div className="flex items-center">
                        <Image
                        src="/points.svg"
                        alt="Points"
                        height={20}
                        width={20}
                        />
                        <p>
                        {POINTS_REFILL}
                        </p>
                    </div>
                    }
                </Button>
            </div>
            <div className="flex items-center p-4 pt-8 gap-x-4 border-t-2 w-full ">
                <Image
                src="/unlimited.svg"
                alt="unlimited"
                height={60}
                width={60}
                />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Unlimited hearts
                    </p>
                </div>
                <Button
                onClick={onUpgrade}
                disabled={pending || hasActiveSubscription}
                >
                    {hasActiveSubscription?"active":"upgrade"}
                </Button>
            </div>

        </ul>
    )
}