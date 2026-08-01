import FormField from "../FormField";

export default function MinistryForm({
  action,
  defaultValues,
  submitLabel,
  canSubmit = true,
}: {
  action: (formData: FormData) => void;
  defaultValues?: {
    slug?: string;
    name?: string;
    description?: string;
    leader?: string;
    contact?: string;
    schedule?: string;
    upcoming?: string[];
    order?: number;
  };
  submitLabel: string;
  canSubmit?: boolean;
}) {
  const v = defaultValues || {};
  return (
    <form
      action={action}
      className="space-y-5 bg-white border border-[color:var(--line)] rounded-lg p-8 max-w-[640px]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Name" name="name" defaultValue={v.name} required />
        <FormField label="Slug (optional, auto from name)" name="slug" defaultValue={v.slug} />
      </div>
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={v.description}
          required
          rows={3}
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Leader" name="leader" defaultValue={v.leader} />
        <FormField label="Contact (email or phone)" name="contact" defaultValue={v.contact} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Meeting schedule" name="schedule" defaultValue={v.schedule} />
        <FormField
          label="Display order (0 shows first)"
          name="order"
          type="number"
          defaultValue={v.order ?? 0}
        />
      </div>
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Upcoming activities <span className="font-normal text-ink-soft/70">(one per line)</span>
        </label>
        <textarea
          name="upcoming"
          defaultValue={(v.upcoming || []).join("\n")}
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
