import { useRef, useState } from "react";
import { ImagePlus, Loader2, X, RefreshCw } from "lucide-react";
import uploadService from "../../services/upload.service";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function ImageUploader({
  value,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file?: File) {
    if (!file) return;

    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError(
        "Please select a JPG, PNG, or WEBP image."
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image must be smaller than 5 MB.");
      return;
    }

    try {
      setUploading(true);

      const result = await uploadService.upload(file);

      onChange(result.url);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to upload image. Please try again."
      );
    } finally {
      setUploading(false);
    }
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    handleFile(file);

    // Allows selecting the same file again.
    event.target.value = "";
  }

  function handleDrop(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    handleFile(file);
  }

  function removeImage() {
    onChange("");
    setError("");
  }

  return (
    <div>
      <label className="mb-2 block font-medium">
        Advertisement Image
      </label>

      {value ? (
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
          <img
            src={value}
            alt="Advertisement preview"
            className="h-64 w-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 disabled:opacity-50"
            >
              <RefreshCw size={16} />
              Replace
            </button>

            <button
              type="button"
              onClick={removeImage}
              disabled={uploading}
              className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
            >
              <X size={16} />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-orange-400 hover:bg-orange-50"
        >
          {uploading ? (
            <>
              <Loader2
                size={40}
                className="animate-spin text-orange-500"
              />

              <p className="mt-4 font-semibold text-slate-800">
                Uploading image...
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Please wait
              </p>
            </>
          ) : (
            <>
              <div className="rounded-2xl bg-orange-100 p-4">
                <ImagePlus
                  size={32}
                  className="text-orange-500"
                />
              </div>

              <p className="mt-4 font-semibold text-slate-800">
                Drag & drop your image here
              </p>

              <p className="mt-1 text-sm text-slate-500">
                or click to choose an image
              </p>

              <p className="mt-4 text-xs text-slate-400">
                JPG, PNG or WEBP • Maximum 5 MB
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
      />

      {error && (
        <p className="mt-2 text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}