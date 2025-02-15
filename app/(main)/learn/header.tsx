"use client"
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
type Props={
    title:string;
}
import { useTheme } from 'next-themes';

export const Header=({title}:Props)=>{
    const {theme,_}=useTheme();
    return(
        <div className={cn("sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50",
            theme==="dark" && "sticky top-0 bg-[#020817] pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50"
        )}>
            <Link href="/courses">
            <Button variant="ghost" size="sm">
                <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400"/>
            </Button>
            </Link>
            <h1 className='font-bold text-lg'>
                {title}
            </h1>
            <div></div>

        </div>
    )
}