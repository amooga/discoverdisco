import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { usePostStore } from "../../store/postStore";
import ImageUploader from "./ImageUploader";
import CategorySelect from "./CategorySelect";
import TypeSelect from "./TypeSelect";
import PostPreview from "./PostPreview";
import PublishButton from "./PublishButton";

export default function CreatePostForm() {
    const navigate = useNavigate();
    const addPost = usePostStore((state) => state.addPost);

    const [form, setForm] = useState({
        title: "",
        description: "",
        categoryId: "",
        imageUrl: "",
        type: "offer",
        validUntil: "",
        categoryName: "",
    });

    const { title, description, categoryId, imageUrl: image, type, validUntil, categoryName } = form;

    async function publish() {
        if (!title || !description) {
            alert("Please fill all required fields.");
            return;
        }

        if (!categoryId) {
            alert("Please select a category.");
            return;
        }
        try {
            await addPost({
                title,
                description,
                imageUrl: image || undefined,
                categoryId,
                validUntil: validUntil ? new Date(validUntil).toISOString()
                    : undefined,
            });

            navigate("/dashboard");
        } catch (error) {
            alert(
                error?.response?.data?.message ??
                "Failed to publish advertisement."
            );
        }
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
                        value={image}
                        onChange={(value) => setForm((prev) => ({
                            ...prev,
                            imageUrl: value,
                        }))}
                    />

                    <div>

                        <label className="mb-2 block font-medium">
                            Title *
                        </label>

                        <input
                            value={title}
                            onChange={(e) => setForm((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))}
                            placeholder="20% OFF School Bags"
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
                        />

                    </div>

                    <CategorySelect
                        value={categoryId}
                        onChange={(value: string, name: string) => setForm((prev) => ({
                            ...prev,
                            categoryId: value,
                            categoryName: name,
                        }))}
                    />

                    <TypeSelect
                        value={type}
                        onChange={(value) => setForm((prev) => ({
                            ...prev,
                            type: value,
                        }))}
                    />

                    <div>

                        <label className="mb-2 block font-medium">
                            Description *
                        </label>

                        <textarea
                            rows={6}
                            value={description}
                            onChange={(e) => setForm((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))}
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
                            onChange={(e) => setForm((prev) => ({
                                ...prev,
                                validUntil: e.target.value,
                            }))}
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
                        />

                    </div>

                    <PublishButton onPublish={publish} />

                </div>

            </section>

            {/* RIGHT COLUMN */}

            <aside className="lg:col-span-2">

                <div className="sticky top-24">

                    <PostPreview
                        title={title}
                        image={image}
                        category={categoryName}
                        description={description}
                    />

                </div>

            </aside>

        </div>
    );
}