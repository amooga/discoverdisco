import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "../../store/postStore";
import ImageUploader from "./ImageUploader";
import CategorySelect from "./CategorySelect";
import TypeSelect from "./TypeSelect";
import PostPreview from "./PostPreview";
import PublishButton from "./PublishButton";

export default function CreatePostForm() {
  const navigate = useNavigate();
  const addPost = usePostStore((state) => state.addPost);

  const [image, setImage] = useState("");

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("Stationery");

  const [type, setType] = useState("offer");

  const [description, setDescription] = useState("");

  const [validUntil, setValidUntil] = useState("");

  function publish() {
    if (!title || !description) {
      alert("Please fill all required fields.");
      return;
    }

    addPost({
      id: Date.now().toString(),
      title,
      description,
      image,
      category,
      type: type as any,
      status: "published",
      createdAt: new Date().toISOString(),
      validUntil,
    });

    navigate("/dashboard");
  }

return (
    <div className="grid gap-8 lg:grid-cols-5">

        {/* LEFT COLUMN */}

        <section className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <h1 className="text-3xl font-bold text-slate-900">
            Create New Advertisement
        </h1>

        <p className="mt-2 text-slate-500">
            Create an advertisement that customers around you will discover.
        </p>

        <div className="mt-8 space-y-6">

            <ImageUploader
            image={image}
            onChange={setImage}
            />

            <div>

            <label className="mb-2 block font-medium">
                Title *
            </label>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="20% OFF School Bags"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            />

            </div>

            <CategorySelect
            value={category}
            onChange={setCategory}
            />

            <TypeSelect
            value={type}
            onChange={setType}
            />

            <div>

            <label className="mb-2 block font-medium">
                Description *
            </label>

            <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell customers about your offer..."
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            />

            </div>

            <div>

            <label className="mb-2 block font-medium">
                Valid Until
            </label>

            <input
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            />

            </div>

            <PublishButton
            onPublish={publish}
            />

        </div>

        </section>

        {/* RIGHT COLUMN */}

        <aside className="lg:col-span-2">

        <div className="sticky top-24">

            <PostPreview
            title={title}
            image={image}
            category={category}
            description={description}
            />

        </div>

        </aside>

    </div>
  );
}