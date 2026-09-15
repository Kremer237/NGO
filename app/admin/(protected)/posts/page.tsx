import Link from "next/link";
import { listAllStories } from "@/lib/stories-repo";

export default async function PostsListPage() {
  const stories = await listAllStories();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-forest">Posts</h1>
        <Link href="/admin/posts/new" className="rounded-button bg-forest px-4 py-2 text-sm font-medium text-ivory">
          New post
        </Link>
      </div>

      {stories.length === 0 ? (
        <p className="mt-8 text-sm text-slate">No posts yet.</p>
      ) : (
        <table className="mt-6 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-slate">
              <th className="py-2">Title</th>
              <th className="py-2">Category</th>
              <th className="py-2">Status</th>
              <th className="py-2">Updated</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => (
              <tr key={story.id} className="border-b border-border">
                <td className="py-3">
                  <Link href={`/admin/posts/${story.id}`} className="text-forest hover:underline">
                    {story.title_en}
                  </Link>
                </td>
                <td className="py-3 text-slate">{story.category}</td>
                <td className="py-3 text-slate">{story.status}</td>
                <td className="py-3 text-slate">{new Date(story.updated_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
