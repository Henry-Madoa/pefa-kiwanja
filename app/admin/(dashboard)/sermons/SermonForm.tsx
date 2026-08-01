import FormField from "../FormField";

const categories = ["Sunday Service", "Midweek Service", "Conference", "Special Event"];

export default function SermonForm({
  action,
  defaultValues,
  submitLabel,
  canSubmit = true,
}: {
  action: (formData: FormData) => void;
  defaultValues?: {
    slug?: string;
    title?: string;
    speaker?: string;
    date?: string;
    scripture?: string;
    category?: string;
    description?: string;
    youtubeId?: string;
    duration?: string;
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
        <FormField label="Speaker" name="speaker" defaultValue={v.speaker} required />
        <FormField label="Date" name="date" type="date" defaultValue={v.date} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Scripture" name="scripture" defaultValue={v.scripture} required />
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="YouTube Video ID" name="youtubeId" defaultValue={v.youtubeId} required />
        <FormField label="Duration (e.g. 42 min)" name="duration" defaultValue={v.duration} required />
      </div>
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={v.description}
          required
          rows={4}
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>
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
