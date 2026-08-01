"use client";

import { useEffect, useState } from "react";
import { compressImage } from "@/lib/compress-image";
import { uploadGalleryImage } from "./actions";

export default function GalleryUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setError("");
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return f ? URL.createObjectURL(f) : null;
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      setError("Please choose an image to upload.");
      return;
    }
    // Capture the form values NOW, while the inputs are still enabled — disabling
    // them (via the pending state below) would drop them from FormData.
    const fd = new FormData(e.currentTarget);
    setError("");
    setPending(true);

    try {
      const blob = await compressImage(file);
      fd.set("image", blob, "gallery.jpg"); // replace the raw file with the compressed one
    } catch {
      setPending(false);
      setError("Could not process that image. Please try another file.");
      return;
    }

    // Call the action outside try/catch so its redirect can navigate.
    await uploadGalleryImage(fd);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-[color:var(--line)] rounded-lg p-6 mb-10 max-w-[640px] space-y-5"
    >
      <h2 className="font-display text-[1.1rem] font-semibold text-ink">Upload an image</h2>

      {error && (
        <p className="bg-wine/10 border border-wine/30 text-wine rounded-md px-4 py-3 text-[0.85rem] font-sans">
          {error}
        </p>
      )}

      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Image
        </label>
        {preview && (
          <div className="mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Selected preview"
              className="w-full max-w-[280px] aspect-[16/9] rounded-md object-cover border border-[color:var(--line)]"
            />
          </div>
        )}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={onPick}
          disabled={pending}
          className="block w-full font-sans text-[0.85rem] text-ink-soft file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:bg-wine file:text-cream file:font-semibold file:text-[0.82rem] hover:file:bg-wine-dark file:cursor-pointer disabled:opacity-60"
        />
        <p className="font-sans text-[0.76rem] text-ink-soft mt-1.5">
          Large photos are automatically resized in your browser before upload, so it stays fast.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-5">
        <div>
          <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
            Alt text (description)
          </label>
          <input
            type="text"
            name="alt"
            disabled={pending}
            className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine disabled:opacity-60"
          />
        </div>
        <div>
          <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
            Display order
          </label>
          <input
            type="number"
            name="order"
            defaultValue={0}
            disabled={pending}
            className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine disabled:opacity-60"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary disabled:opacity-60 disabled:cursor-wait"
      >
        {pending ? "Uploading…" : "Upload Image"}
      </button>
    </form>
  );
}
