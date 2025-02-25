import { isAdmin } from "@/lib/admin"
import { NextResponse } from "next/server"
import db from "@/db/drizzle"
import { eq } from "drizzle-orm"
import { lessons } from "@/db/schema"

export const GET = async (
    req: Request,
    { params }: { params: Promise<{ lessonId: number }> },
) => {
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, (await(params)).lessonId),
    })

    return NextResponse.json(data);

}

export const PUT = async (
    req: Request,
    { params }: { params: Promise<{ lessonId: number }> },
) => {
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const data = await db.update(lessons).set({
        ...body
    }).where(eq(lessons.id, (await(params)).lessonId)).returning();

    return NextResponse.json(data[0]);

}

export const DELETE = async (
    req: Request,
    { params }: { params: Promise<{ lessonId: number }> },
) => {
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const data = await db.delete(lessons).where(eq(lessons.id, (await(params)).lessonId)).returning();

    return NextResponse.json(data[0]);
}
