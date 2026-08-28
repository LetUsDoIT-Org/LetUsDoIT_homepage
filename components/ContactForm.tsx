"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/actions";

const initialState: ContactState = { status: "idle" };

function Field({
  name,
  label,
  hint,
  type = "text",
  required = false,
  rows,
  error,
  defaultValue,
}: {
  name: string;
  label: string;
  hint?: string;
  type?: string;
  required?: boolean;
  rows?: number;
  error?: string;
  defaultValue?: string;
}) {
  const describedBy = [hint ? `${name}-hint` : null, error ? `${name}-error` : null]
    .filter(Boolean)
    .join(" ");

  const shared = {
    id: name,
    name,
    required,
    defaultValue,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
    className: [
      "w-full border bg-pool px-3 py-2.5 text-ink transition-colors duration-200",
      "placeholder:text-ink-mute",
      error ? "border-act-ink" : "border-rule hover:border-ink-mute",
    ].join(" "),
  };

  return (
    <p className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-ink">
        {label}
        {!required && <span className="font-normal text-ink-mute"> (valgfrit)</span>}
      </label>
      {hint && (
        <span id={`${name}-hint`} className="text-sm text-ink-mute">
          {hint}
        </span>
      )}
      {rows ? (
        <textarea {...shared} rows={rows} />
      ) : (
        <input {...shared} type={type} />
      )}
      {error && (
        <span id={`${name}-error`} className="text-sm font-medium text-act-ink">
          {error}
        </span>
      )}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={[
        "mt-2 self-start bg-act px-6 py-3 font-semibold text-ink",
        "shadow-[0_2px_10px_rgba(0,46,69,0.2)]",
        "transition-transform duration-300 ease-settle",
        "hover:-translate-y-px disabled:translate-y-0 disabled:opacity-60",
      ].join(" ")}
    >
      {pending ? "Sender…" : "Send beskeden"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);

  if (state.status === "ok") {
    return (
      <div role="status" className="border border-auto-ink bg-pool p-6">
        <h3 className="font-display text-xl font-semibold text-ink">
          Beskeden er sendt
        </h3>
        <p className="mt-2 max-w-measure text-ink-soft">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state.status === "error" && state.message && (
        <p role="alert" className="border border-act-ink bg-pool px-4 py-3 font-medium text-ink">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="navn"
          label="Navn"
          required
          error={state.fieldErrors?.navn}
          defaultValue={state.values?.navn}
        />
        <Field
          name="virksomhed"
          label="Virksomhed"
          defaultValue={state.values?.virksomhed}
        />
        <Field
          name="email"
          label="E-mail"
          type="email"
          required
          error={state.fieldErrors?.email}
          defaultValue={state.values?.email}
        />
        <Field
          name="telefon"
          label="Telefon"
          type="tel"
          defaultValue={state.values?.telefon}
        />
      </div>

      <Field
        name="besked"
        label="Hvilken proces driller?"
        hint="Et par linjer er nok. Hvad sker der i dag, og hvor tit?"
        rows={5}
        required
        error={state.fieldErrors?.besked}
        defaultValue={state.values?.besked}
      />

      {/* Honeypot, hidden from people and from assistive technology. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px opacity-0"
      />

      <SubmitButton />
    </form>
  );
}
