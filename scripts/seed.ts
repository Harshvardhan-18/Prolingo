import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

const main=async()=>{
    try{
        console.log("Seeding database")
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id:1,
                title:"C++",
                imageSrc:"/C++.png"
            },
            {
                id:2,
                title:"C",
                imageSrc:"/C.png"
            },
            {
                id:3,
                title:"Python",
                imageSrc:"/python.svg"
            },
            {
                id:4,
                title:"Javascript",
                imageSrc:"/JS.svg"
            },
            {
                id:5,
                title:"Java",
                imageSrc:"/java.png"
            }
        ]);
        await db.insert(schema.units).values([
            {
                id:1,
                courseId:1,
                title:"Unit 1",
                description:"Learn the basics of C++",
                order:1,
            }
        ]);
        await db.insert(schema.lessons).values([
            {
                id:1,
                unitId:1,
                title:"Syntax",
                order:1,
            },
            {
                id:2,
                unitId:1,
                title:"Statements",
                order:2,
            },
            {
                id:3,
                unitId:1,
                title:"Statements",
                order:3,
            },
            {
                id:4,
                unitId:1,
                title:"Statements",
                order:4,
            },
            {
                id:5,
                unitId:1,
                title:"Statements",
                order:5,
            },
            {
                id:6,
                unitId:1,
                title:"Statements",
                order:6,
            }
        ]);
        await db.insert(schema.challenges).values([
            {
                id:1,
                lessonId:1,
                type:"SELECT",
                order:1,
                question:"Which of the following syntax is correct?",
            }
        ]);
        await db.insert(schema.challengeOptions).values([
            {
                id:1,
                challengeId:1,
                imageSrc:"/library_c.png",
                correct:true,
                text:"1",
                audioSrc:"/es_boy.mp3"
            },
            {
                id:2,
                challengeId:1,
                imageSrc:"/library_w.png",
                correct:false,
                text:"2",
                audioSrc:"/es_boy.mp3 "
            },
            {
                id:3,
                challengeId:1,
                imageSrc:"/library_w.png",
                correct:false,
                text:"3",
                audioSrc:"/es_boy.mp3 "
            },
        ]);

        console.log("Seeding finished");
    }catch(error){
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();