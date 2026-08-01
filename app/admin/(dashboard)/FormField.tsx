export default function FormField({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  readOnly,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <div>
      <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        readOnly={readOnly}
        className={`w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine ${
          readOnly ? "bg-cream-dim text-ink-soft cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}
