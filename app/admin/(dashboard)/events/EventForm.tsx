import FormField from "../FormField";

export default function EventForm({
  action,
  defaultValues,
  submitLabel,
  canSubmit = true,
}: {
  action: (formData: FormData) => void;
  defaultValues?: {
    slug?: string;
    title?: string;
    description?: string;
    venue?: string;
    date?: string;
    time?: string;
    organizer?: string;
    category?: string;
    capacity?: number;
    registered?: number;
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
        <FormField label="Venue" name="venue" defaultValue={v.venue} required />
        <FormField label="Category" name="category" defaultValue={v.category} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Date" name="date" type="date" defaultValue={v.date} required />
        <FormField label="Time" name="time" defaultValue={v.time} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Organizer" name="organizer" defaultValue={v.organizer} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Capacity" name="capacity" type="number" defaultValue={v.capacity} required />
        <FormField label="Registered" name="registered" type="number" defaultValue={v.registered ?? 0} />
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
