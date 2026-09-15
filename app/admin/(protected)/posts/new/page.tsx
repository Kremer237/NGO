import StoryForm from "@/components/admin/StoryForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-forest">New post</h1>
      <div className="mt-6 max-w-3xl">
        <StoryForm />
      </div>
    </div>
  );
}
