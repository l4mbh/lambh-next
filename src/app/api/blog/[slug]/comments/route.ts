import { NextResponse } from "next/server";
import { db } from "@/backend/db";
import { auth } from "@/backend/auth";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const slug = (await params).slug;
        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get("cursor");

        // Find the blog post first to make sure it exists and to get its ID
        const blogPost = await db.blogPost.findUnique({
            where: { slug },
            select: { id: true },
        });

        if (!blogPost) {
            return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
        }

        const take = cursor ? 4 : 1; // Take 1 initially, or 4 on 'load more'
        const skip = cursor ? 1 : 0; // Skip the cursor itself if provided

        const comments = await db.comment.findMany({
            where: { blogId: blogPost.id },
            take: take + 1, // Fetch one extra to check if there are more
            ...(cursor ? { cursor: { id: cursor } } : {}),
            skip,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });

        let hasMore = false;
        if (comments.length > take) {
            hasMore = true;
            comments.pop(); // Remove the extra item
        }

        return NextResponse.json({ comments, hasMore });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const session = await auth();
        if (!session?.user?.id && !session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const slug = (await params).slug;
        const { content } = await req.json();

        if (!content || typeof content !== "string" || content.trim() === "") {
            return NextResponse.json({ error: "Content is required" }, { status: 400 });
        }

        const blogPost = await db.blogPost.findUnique({
            where: { slug },
            select: { id: true },
        });

        if (!blogPost) {
            return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
        }

        const userIdentifier = session.user.id ? { id: session.user.id } : { email: session.user.email as string };

        const user = await db.user.findUnique({
            where: userIdentifier,
            select: { id: true }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const newComment = await db.comment.create({
            data: {
                content: content.trim(),
                blogId: blogPost.id,
                userId: user.id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
    }
}
