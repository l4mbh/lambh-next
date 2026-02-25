import { getBlogs, GetBlogsParams } from "@/backend/actions/blog"
import { BlogList } from "@/components/features/blog/blog-list"

export default async function BlogPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;

    // Parse URL params for the backend query
    const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
    const limit = 9; // Number of posts per page
    const search = typeof params.q === 'string' ? params.q : undefined;
    const tag = typeof params.tag === 'string' ? params.tag : undefined;
    const fromDate = typeof params.from === 'string' ? params.from : undefined;

    const queryParams: GetBlogsParams = {
        page: isNaN(page) || page < 1 ? 1 : page,
        limit,
        search,
        tag,
        fromDate,
        publishedOnly: true
    };

    // Fetch filtered and paginated blogs from PostgreSQL database
    const result = await getBlogs(queryParams);

    // We no longer need to filter `published`, as the query does this

    return (
        <div className="container mx-auto p-4 lg:p-8 space-y-8 max-w-7xl">

            <BlogList
                blogs={result.posts}
                allTags={result.allTags}
                totalPages={result.totalPages}
                currentPage={result.currentPage}
            />
        </div>
    )
}
