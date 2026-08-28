"use server";

import { Resend } from "resend";

export type ContactState = {
  status: "idle" | "ok" | "error";
  message?: string;
  /** Field-level problems, keyed by input name. */
  fieldErrors?: Record<string, string>;
  /** Echoed back so a failed submit does not empty the form. */
  values?: Record<string, string>;
};

const TO_ADDRESS = "simon@letusdoit.dk";

/**
 * Resend requires a verified sender domain. Until letusdoit.dk is verified
 * there, onboarding@resend.dev is the address Resend hands out for testing
 * and it only delivers to the account owner — which is fine here, because
 * the only recipient is the account owner.
 */
const FROM_ADDRESS = process.env.CONTACT_FROM_ADDRESS ?? "onboarding@resend.dev";

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    navn: clean(formData.get("navn")),
    virksomhed: clean(formData.get("virksomhed")),
    email: clean(formData.get("email")),
    telefon: clean(formData.get("telefon")),
    besked: clean(formData.get("besked")),
  };

  // Honeypot. A real person never fills this; bots fill everything.
  if (clean(formData.get("website")) !== "") {
    return { status: "ok", message: "Tak. Jeg vender tilbage hurtigst muligt." };
  }

  const fieldErrors: Record<string, string> = {};

  if (values.navn.length < 2) {
    fieldErrors.navn = "Skriv dit navn, så jeg ved, hvem jeg svarer.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    fieldErrors.email = "E-mailen mangler et @ eller et domæne. Tjek den lige.";
  }
  if (values.besked.length < 10) {
    fieldErrors.besked =
      "Skriv et par linjer om processen — så kan jeg svare på noget konkret.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Der mangler noget, før jeg kan sende den.",
      fieldErrors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message:
        "Formularen kan ikke sende lige nu. Skriv til simon@letusdoit.dk eller ring på +45 41 20 80 88.",
      values,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `LetUsDoIT hjemmeside <${FROM_ADDRESS}>`,
      to: [TO_ADDRESS],
      replyTo: values.email,
      subject: `Henvendelse fra ${values.navn}${values.virksomhed ? ` — ${values.virksomhed}` : ""}`,
      text: [
        `Navn: ${values.navn}`,
        `Virksomhed: ${values.virksomhed || "(ikke oplyst)"}`,
        `E-mail: ${values.email}`,
        `Telefon: ${values.telefon || "(ikke oplyst)"}`,
        "",
        values.besked,
      ].join("\n"),
    });

    if (error) {
      return {
        status: "error",
        message:
          "Beskeden blev ikke sendt. Prøv igen, eller skriv direkte til simon@letusdoit.dk.",
        values,
      };
    }

    return {
      status: "ok",
      message: "Tak. Jeg vender tilbage inden for en arbejdsdag.",
    };
  } catch {
    return {
      status: "error",
      message:
        "Beskeden blev ikke sendt. Prøv igen, eller skriv direkte til simon@letusdoit.dk.",
      values,
    };
  }
}
