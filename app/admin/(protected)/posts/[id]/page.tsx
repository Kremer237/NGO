import { notFound } from "next/navigation";
import { getStoryById } from "@/lib/stories-repo";
import StoryForm from "@/components/admin/StoryForm";
import StoryStatusControls from "@/components/admin/StoryStatusControls";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const story = await getStoryById(id);
  if (!story) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-forest">Edit post</h1>
        <StoryStatusControls id={story.id} status={story.status} />
      </div>
      <div className="mt-6 max-w-3xl">
        <StoryForm
          storyId={story.id}
          initial={{
            slug_en: story.slug_en,
            slug_fr: story.slug_fr,
            title_en: story.title_en,
            title_fr: story.title_fr,
            category: story.category,
            featured_image: story.featured_image,
            summary_en: story.summary_en ?? "",
            summary_fr: story.summary_fr ?? "",
            body_en: story.body_en,
            body_fr: story.body_fr,
            related_project: story.related_project ?? "",
          }}
        />
      </div>
    </div>
  );
}
