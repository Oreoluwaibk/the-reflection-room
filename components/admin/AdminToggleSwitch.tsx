"use client";

type Props = {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onClick: () => void;
};

/** Visual on/off switch used in admin lists. */
export function AdminToggleSwitch({
  checked,
  disabled,
  label,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-md border border-sage/40 px-2.5 py-1.5 text-xs font-medium text-forest transition hover:bg-sage-mist/50 disabled:opacity-60"
    >
      <span
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition ${
          checked ? "bg-sage-deep" : "bg-forest/25"
        }`}
      >
        <span
          className={`inline-block size-3.5 rounded-full bg-cream shadow transition ${
            checked ? "translate-x-4" : "translate-x-1"
          }`}
        />
      </span>
      {label}
    </button>
  );
}
