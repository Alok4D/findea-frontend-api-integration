"use client";

import { useState, FormEvent } from "react";

const fieldShell =
  "w-full border border-[#1a1a1a]/25 bg-[#E1E0DA] px-3 py-2.5 font-playfair text-sm text-brand-text outline-none transition-colors focus:border-brand-text md:px-4 md:py-3 md:text-base";

export function ContactFormPanel() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="w-full">
      {sent ? (
        <p className="font-playfair text-base text-brand-text-secondary">
          Thank you — we&apos;ll get back to you soon. (Demo: wire to your API when ready.)
        </p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-5 md:gap-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
            <div>
              <label htmlFor="c-first" className="mb-1.5 block font-playfair text-sm text-black">
                First Name (required)
              </label>
              <input id="c-first" name="firstName" required className={fieldShell} />
            </div>
            <div>
              <label htmlFor="c-last" className="mb-1.5 block font-playfair text-sm text-black">
                Last Name (required)
              </label>
              <input id="c-last" name="lastName" required className={fieldShell} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
            <div>
              <label htmlFor="c-email" className="mb-1.5 block font-playfair text-sm text-black">
                Your Email (required)
              </label>
              <input id="c-email" name="email" type="email" required className={fieldShell} />
            </div>
            <div>
              <label htmlFor="c-web" className="mb-1.5 block font-playfair text-sm text-black">
                Website
              </label>
              <input id="c-web" name="website" type="url" className={fieldShell} />
            </div>
          </div>
          <div>
            <label htmlFor="c-msg" className="mb-1.5 block font-playfair text-sm text-black">
              Your Message
            </label>
            <textarea id="c-msg" name="message" required rows={8} className={`${fieldShell} min-h-[180px] resize-y`} />
          </div>
          <button
            type="submit"
            className="w-full bg-[#F2E0C9] py-3.5 font-playfair text-base font-bold text-black transition-colors hover:bg-[#e8d4b8] sm:w-auto sm:px-14 md:text-lg"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
