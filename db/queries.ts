import {cache} from "react";
import db from "./drizzle";
import {eq} from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { userProgress,courses } from "./schema";

export const getUserProgress=cache(async()=>{
    await new Promise((resolve) => setTimeout(resolve, 100));// Connection delay for Neon
    const {userId}=await auth();

    if(!userId){
        return null;
    }
    const data=await db.query.userProgress.findFirst({
        where:eq(userProgress.userId,userId),
        with:{
            activeCourse:true,
        },
    });
    return data;
})

export const getCourses=cache(async()=>{
    const data = await db.query.courses.findMany();

    return data;
})

export const   getCourseById=cache(async(courseId:number)=>{
    const data=await db.query.courses.findFirst({
        where:eq(courses.id,courseId),
    })
    return data; 
})