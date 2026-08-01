"use client";

import { useEffect, useState } from "react";

export default function PhotoField({
  currentPhoto,
  label = "Profile Picture",
  name = "photo",
  removeName = "removePhoto",
  variant = "avatar",
  helpText,
  allowRemove = true,
}: {
  currentPhoto?: string;
  label?: string;
  name?: string;
  removeName?: string;
  variant?: "avatar" | "cover";
  helpText?: string;
  allowRemove?: boolean;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  // Build (and clean up) an object URL for the newly picked file.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return file ? URL.createObjectURL(file) : null;
    });
  }

  const shown = preview || currentPhoto;
  const isCover = variant === "cover";
  const previewClass = isCover
    ? "w-full max-w-[280px] aspect-[16/9] rounded-md object-cover border border-[color:var(--line)]"
    : "w-16 h-16 rounded-full object-cover border border-[color:var(--line)]";

  return (
    <div>
      <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
        {label}
      </label>

      {shown && (
        <div className={`mb-3 ${isCover ? "" : "flex items-center gap-4"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shown}
            alt={preview ? "Selected preview" : "Current image"}
            className={previewClass}
          />
          {preview ? (
            <span
              className={`font-sans text-[0.8rem] font-medium text-forest ${
                isCover ? "block mt-2" : ""
              }`}
            >
              New image preview — save to apply.
            </span>
          ) : allowRemove ? (
            <label
              className={`flex items-center gap-2 font-sans text-[0.84rem] text-ink-soft ${
                isCover ? "mt-2" : ""
              }`}
            >
              <input type="checkbox" name={removeName} className="w-4 h-4 accent-wine" />
              Remove current {isCover ? "image" : "photo"}
            </label>
          ) : null}
        </div>
      )}

      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={handleChange}
        className="block w-full font-sans text-[0.85rem] text-ink-soft file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:bg-wine file:text-cream file:font-semibold file:text-[0.82rem] hover:file:bg-wine-dark file:cursor-pointer"
      />
      <p className="font-sans text-[0.76rem] text-ink-soft mt-1.5">
        {helpText || "JPG or PNG, up to 2 MB."}{" "}
        {currentPhoto ? "Leave empty to keep the current image." : "Optional."}
      </p>
    </div>
  );
}
