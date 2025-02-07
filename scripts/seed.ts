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

        await db.insert(schema.courses).values([
            {
                id:1,
                title:"Python",
                imageSrc:"/python.svg"
            },
            {
                id:2,
                title:"C",
                imageSrc:"/C.png"
            },
            {
                id:3,
                title:"C++",
                imageSrc:"/C++.png"
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
        ])

        console.log("Seeding finished");
    }catch(error){
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();