"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CommentItem, CommentData } from "./comment-item";
import { Loader2, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogCommentsProps {
    slug: string;
}

export function BlogComments({ slug }: BlogCommentsProps) {
    const { data: session } = useSession();
    const [comments, setComments] = useState<CommentData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [hasMore, setHasMore] = useState(false);

    // Fetch initial comments (just 1)
    useEffect(() => {
        const fetchInitialComments = async () => {
            try {
                const res = await fetch(`/api/blog/${slug}/comments`);
                if (!res.ok) throw new Error("Failed to load comments");
                const data = await res.json();
                setComments(data.comments);
                setHasMore(data.hasMore);
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialComments();
    }, [slug]);

    const handleLoadMore = async () => {
        if (comments.length === 0) return;
        setIsLoadingMore(true);
        const lastCursor = comments[comments.length - 1].id;

        try {
            const res = await fetch(`/api/blog/${slug}/comments?cursor=${lastCursor}`);
            if (!res.ok) throw new Error("Failed to load more comments");
            const data = await res.json();

            setComments((prev) => [...prev, ...data.comments]);
            setHasMore(data.hasMore);
        } catch (error) {
            console.error("Error loading more comments:", error);
            toast.error("Failed to load more comments");
        } finally {
            setIsLoadingMore(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/blog/${slug}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newComment }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to post comment");
            }

            const createdComment = await res.json();

            // Add new comment to the top of the list
            setComments((prev) => [createdComment, ...prev]);
            setNewComment("");
            toast.success("Comment posted successfully");
        } catch (error: any) {
            console.error("Error posting comment:", error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="mt-16 pt-12 border-t border-border/40 max-w-3xl mx-auto w-full">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                    <MessageSquare size={20} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Comments</h3>
            </div>

            {/* Comment Form */}
            <div className="mb-10">
                {session ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Textarea
                            placeholder="Share your thoughts..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="min-h-[120px] resize-none pb-12 rounded-xl focus-visible:ring-primary/20 bg-background"
                        />
                        <div className="flex justify-end -mt-16 mr-3 relative z-10">
                            <Button
                                type="submit"
                                disabled={isSubmitting || !newComment.trim()}
                                size="sm"
                                className="h-9 px-6 rounded-lg font-medium tracking-wide shadow-sm"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Posting...
                                    </>
                                ) : (
                                    "Comment"
                                )}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="p-6 bg-secondary/30 rounded-xl border border-border/50 text-center flex flex-col items-center justify-center gap-4">
                        <p className="text-muted-foreground font-medium">Join the conversation</p>
                        <Button asChild variant="outline" className="rounded-full px-8 border-primary/20 hover:bg-primary/5">
                            <Link href="/login">Sign in to comment</Link>
                        </Button>
                    </div>
                )}
            </div>

            {/* Comments List */}
            {isLoading ? (
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl items-start bg-secondary/10">
                            <Skeleton className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800" />
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-24 h-4 bg-zinc-900" />
                                    <Skeleton className="w-16 h-3 bg-zinc-900" />
                                </div>
                                <Skeleton className="w-full h-12 bg-zinc-900" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : comments.length > 0 ? (
                <div className="space-y-6">
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}
                    </div>

                    {hasMore && (
                        <div className="pt-6 flex justify-center">
                            <Button
                                variant="outline"
                                onClick={handleLoadMore}
                                disabled={isLoadingMore}
                                className="w-full sm:w-auto rounded h-auto text-sm"
                            >
                                {isLoadingMore ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                    "Load More Comments"
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-12 border border-dashed border-border/60 rounded-xl bg-secondary/10">
                    <p className="text-muted-foreground text-sm">No comments yet. Be the first to share your thoughts!</p>
                </div>
            )}
        </section>
    );
}
