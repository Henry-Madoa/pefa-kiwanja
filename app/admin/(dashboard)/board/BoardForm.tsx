import FormField from "../FormField";
import PhotoField from "../PhotoField";

export default function BoardForm({
  action,
  defaultValues,
  submitLabel,
  canSubmit = true,
}: {
  action: (formData: FormData) => void;
  defaultValues?: {
    title?: string;
    name?: string;
    position?: string;
    note?: string;
    photo?: string;
    order?: number;
  };
  submitLabel: string;
  canSubmit?: boolean;
}) {
  const v = defaultValues || {};
  return (
    <form action={action} className="space-y-5 bg-white border border-[color:var(--line)] rounded-lg p-8 max-w-[640px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Title (e.g. Dr., Rev., Mr.)" name="title" defaultValue={v.title} required />
        <FormField label="Name" name="name" defaultValue={v.name} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Position (e.g. Board Chairman)" name="position" defaultValue={v.position} required />
        <FormField label="Display order (0 shows first)" name="order" type="number" defaultValue={v.order ?? 0} />
      </div>
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Note (a short bio about the person)
        </label>
        <textarea
          name="note"
          defaultValue={v.note}
          rows={4}
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>
      <PhotoField currentPhoto={v.photo} />
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
