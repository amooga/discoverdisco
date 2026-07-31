import CreatePostForm from "../components/create-post/CreatePostForm";

export default function CreateAdvertisementPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <CreatePostForm />
      </div>
    </main>
  );
}