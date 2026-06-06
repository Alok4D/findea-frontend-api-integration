export function ContactInfoAside() {
  return (
    <div className="flex flex-col gap-6 font-playfair md:gap-8">
      <h2 className="text-xl font-bold leading-snug text-black md:text-2xl lg:text-[26px]">
        Core principles. Deleniti atque corrupti quos dolo reset.
      </h2>
      <p className="text-base leading-relaxed text-brand-text-secondary md:text-lg">
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
        corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
      </p>
      <hr className="border-0 border-t border-[#c9c6c0]" />
      <address className="not-italic">
        <ul className="flex flex-col gap-3 text-base text-black md:text-lg">
          <li>30 South Avenue San Francisco</li>
          <li>Phone: +78 123 456 789</li>
          <li>
            Email:{" "}
            <a href="mailto:Support@lifestyle.com" className="underline-offset-2 hover:underline">
              Support@lifestyle.com
            </a>
          </li>
          <li>
            <a href="https://www.lifestyle.com" className="underline-offset-2 hover:underline" target="_blank" rel="noreferrer">
              www.lifestyle.com
            </a>
          </li>
        </ul>
      </address>
    </div>
  );
}
