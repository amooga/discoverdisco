interface ImageUploaderProps {
  image: string;
  onChange: (value: string) => void;
}

export default function ImageUploader({
  image,
  onChange,
}: ImageUploaderProps) {
  function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    onChange(imageUrl);
  }

  return (
    <div>
      <label className="mb-2 block font-medium">
        Poster *
      </label>

      <label className="flex h-64 cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 hover:border-orange-400 hover:bg-orange-50 transition">

        {image ? (
          <img
            src={image}
            alt="Preview"
            className="h-full w-full rounded-3xl object-cover"
          />
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold">
              Upload Poster
            </p>

            <p className="mt-2 text-slate-500">
              Click to choose an image
            </p>
          </div>
        )}

        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
}