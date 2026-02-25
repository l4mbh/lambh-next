import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

export interface CommentData {
    id: string;
    content: string;
    createdAt: string;
    user: {
        id: string;
        name: string | null;
        image: string | null;
    };
}

export function CommentItem({ comment }: { comment: CommentData }) {
    const initials = comment.user.name
        ? comment.user.name.substring(0, 2).toUpperCase()
        : "U";

    return (
        <div className="flex gap-4 p-4 rounded-xl bg-secondary/20 border border-border/50">
            <Avatar className="h-10 w-10 shrink-0 border border-border/50">
                <AvatarImage src={comment.user.image || undefined} alt={comment.user.name || "User"} />
                <AvatarFallback className="text-xs bg-muted text-muted-foreground font-mono">
                    {initials}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 gap-1">
                <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm">
                        {comment.user.name || "Anonymous User"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                </div>
                <p className="text-sm text-foreground/90 whitespace-pre-wrap mt-1 leading-relaxed">
                    {comment.content}
                </p>
            </div>
        </div>
    );
}
