import FormField from "../FormField";
import PhotoField from "../PhotoField";

const categories = ["News", "Devotional", "Testimony", "Mission Update", "Pastor's Message"];

export default function BlogForm({
  action,
  defaultValues,
  submitLabel,
  canSubmit = true,
}: {
  action: (formData: FormData) => void;
  defaultValues?: {
    slug?: string;
    title?: string;
    category?: string;
    author?: string;
    date?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    tags?: string[];
  };
  submitLabel: string;
  canSubmit?: boolean;
}) {
  const v = defaultValues || {};
  return (
    <form action={action} className="space-y-5 bg-white border border-[color:var(--line)] rounded-lg p-8 max-w-[640px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Title" name="title" defaultValue={v.title} required />
        <FormField label="Slug (optional, auto from title)" name="slug" defaultValue={v.slug} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Author" name="author" defaultValue={v.author} required />
        <FormField label="Date" name="date" type="date" defaultValue={v.date} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
            Category
          </label>
          <select
            name="category"
            defaultValue={v.category || categories[0]}
            className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <FormField label="Tags (comma-separated)" name="tags" defaultValue={(v.tags || []).join(", ")} />
      </div>
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Excerpt
        </label>
        <textarea
          name="excerpt"
          defaultValue={v.excerpt}
          required
          rows={2}
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Content
        </label>
        <textarea
          name="content"
          defaultValue={v.content}
          required
          rows={8}
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>
      <PhotoField
        currentPhoto={v.coverImage}
        label="Cover Image (tile background)"
        name="coverImage"
        removeName="removeCoverImage"
        variant="cover"
        helpText="Shown as the card cover on the blog list. JPG or PNG, up to 2 MB."
      />
      <div className="space-y-2">
        {!canSubmit && (
          <p className="font-sans text-[0.8rem] text-ink-soft">
            You have view-only access — changes can&apos;t be saved.
          </p>
        )}
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
