"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { ArrowUpRight, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { contact } from "@/content/home";
import { cn } from "@/lib/cn";

/*
  Contact form with live validation, adapted from the reference Sudhanshu shared.
  A field stays neutral until it is first valid or loses focus; from then on it
  shows a tick or an error as you type. Submitting checks every field, focuses
  the first one that needs attention, and turns away sends that arrive within
  five seconds of the page loading (a cheap bot check, next to a honeypot field).
  Styles live in globals.css (.contact-*).
*/

type FieldName = "name" | "email" | "message";
type FieldStatus = "idle" | "success" | "error";
type FormStatus = "idle" | "sending" | "sent" | "failed" | "too-quick";

const FIELD_NAMES: FieldName[] = ["name", "email", "message"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_LENGTH = { name: 2, message: 3 };
const SPAM_WINDOW_MS = 5000;

const EMPTY_VALUES: Record<FieldName, string> = { name: "", email: "", message: "" };
const NOT_STARTED: Record<FieldName, boolean> = { name: false, email: false, message: false };
const ALL_STARTED: Record<FieldName, boolean> = { name: true, email: true, message: true };

function isValid(field: FieldName, value: string) {
  const trimmed = value.trim();
  return field === "email" ? EMAIL_PATTERN.test(trimmed) : trimmed.length >= MIN_LENGTH[field];
}

// Netlify Forms: public/__forms.html declares this form so Netlify registers it at
// deploy time, and submissions post to that static file. Netlify isn't running in
// development, so dev fakes a short successful send to keep the states reviewable.
async function sendMessage(fields: Record<string, string>) {
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return;
  }

  const response = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ "form-name": "contact", ...fields }).toString(),
  });
  if (!response.ok) throw new Error(`Contact form failed with status ${response.status}`);
}

export function ContactForm() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [started, setStarted] = useState(NOT_STARTED);
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const loadedAt = useRef(0);

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  const fieldStatus = (field: FieldName): FieldStatus => {
    if (!started[field]) return "idle";
    return isValid(field, values[field]) ? "success" : "error";
  };

  const focusField = (field: FieldName) => {
    formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as FieldName;
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    // Feedback starts once the field is valid, so nobody sees an error mid-way through typing.
    if (!started[field] && isValid(field, value)) {
      setStarted((current) => ({ ...current, [field]: true }));
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as FieldName;
    setStarted((current) => (current[field] ? current : { ...current, [field]: true }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    setStarted(ALL_STARTED);
    const firstInvalid = FIELD_NAMES.find((field) => !isValid(field, values[field]));
    if (firstInvalid) {
      setStatus("idle");
      focusField(firstInvalid);
      return;
    }

    if (Date.now() - loadedAt.current < SPAM_WINDOW_MS) {
      setStatus("too-quick");
      return;
    }

    setStatus("sending");
    const botField = formRef.current?.querySelector<HTMLInputElement>('[name="bot-field"]')?.value ?? "";

    try {
      await sendMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        "bot-field": botField,
      });
      // The form hides once sent, so hand focus to the confirmation instead of losing it.
      flushSync(() => setStatus("sent"));
      successRef.current?.focus();
    } catch {
      setStatus("failed");
    }
  };

  const handleSendAnother = () => {
    flushSync(() => {
      setValues(EMPTY_VALUES);
      setStarted(NOT_STARTED);
      setStatus("idle");
    });
    loadedAt.current = Date.now();
    focusField("name");
  };

  const sending = status === "sending";

  return (
    <div className="flex flex-col gap-6">
      <form
        ref={formRef}
        name="contact"
        noValidate
        onSubmit={handleSubmit}
        hidden={status === "sent"}
        className="flex flex-col gap-6"
      >
        {/* Honeypot: hidden from people, filled in by bots, dropped by Netlify. */}
        <p hidden>
          <label>
            Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        {FIELD_NAMES.map((field) => {
          const id = `contact-${field}`;
          const state = fieldStatus(field);
          const { label, placeholder, error } = contact.form.fields[field];
          const shared = {
            id,
            name: field,
            value: values[field],
            placeholder,
            required: true,
            onChange: handleChange,
            onBlur: handleBlur,
            "aria-invalid": state === "error",
            "aria-describedby": state === "error" ? `${id}-error` : undefined,
          };

          return (
            <div key={field} className="contact-field" data-status={state}>
              <div className="flex w-full items-baseline justify-between gap-4">
                <label htmlFor={id} className="text-[0.875em] font-medium leading-none">
                  {label} <span aria-hidden className="text-bento-blue">*</span>
                </label>
                {state === "error" && (
                  <span id={`${id}-error`} className="text-[0.8125em] font-medium leading-none text-(--bento-danger)">
                    {error}
                  </span>
                )}
              </div>

              <div className="relative w-full">
                {field === "message" ? (
                  <textarea {...shared} maxLength={5000} className="contact-input is--textarea" />
                ) : (
                  <input
                    {...shared}
                    type={field === "email" ? "email" : "text"}
                    autoComplete={field}
                    maxLength={256}
                    className="contact-input"
                  />
                )}
                <span aria-hidden className="contact-field-icon is--success">
                  <CheckCircle size="100%" />
                </span>
                <span aria-hidden className="contact-field-icon is--error">
                  <WarningCircle size="100%" weight="duotone" />
                </span>
              </div>
            </div>
          );
        })}

        <div className="h-px w-full bg-bento-ink/15" />

        <button
          type="submit"
          aria-disabled={sending}
          className={cn(
            "group flex h-14 w-full items-center justify-between rounded-full bg-bento-blue pl-6 pr-2 text-[1.0625em] font-medium text-bento-on-blue transition-[scale] duration-200 active:scale-[0.99]",
            sending && "cursor-progress",
          )}
        >
          {sending ? contact.form.sending : contact.form.submit}
          <span className="grid size-10 place-items-center rounded-full bg-bento-on-blue text-bento-blue transition-transform duration-300 ease-out-expo group-hover:rotate-45">
            <ArrowUpRight size={16} weight="bold" aria-hidden />
          </span>
        </button>
      </form>

      {status === "sent" && (
        <>
          <div ref={successRef} tabIndex={-1} role="status" className="contact-notification" data-tone="success">
            <p className="contact-notification-p">{contact.form.success}</p>
            <span aria-hidden className="contact-notification-icon">
              <CheckCircle size="100%" />
            </span>
          </div>
          <button
            type="button"
            onClick={handleSendAnother}
            className="self-start text-[0.9375em] font-medium underline decoration-bento-blue underline-offset-4"
          >
            {contact.form.sendAnother}
          </button>
        </>
      )}

      {(status === "failed" || status === "too-quick") && (
        <div role="alert" className="contact-notification" data-tone="error">
          <p className="contact-notification-p">
            {status === "failed" ? contact.form.failure : contact.form.tooQuick}
          </p>
          <span aria-hidden className="contact-notification-icon">
            <WarningCircle size="100%" weight="duotone" />
          </span>
        </div>
      )}
    </div>
  );
}
