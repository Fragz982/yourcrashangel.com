const ITEMS = [
  "YOU PICK THE SHOP",
  "NOT THE INSURER",
  "OEM > CHEAP PARTS",
  "DISPUTE THE TOTAL",
  "GET RENTAL COVERAGE",
  "DIMINISHED VALUE IS REAL",
  "READ YOUR ESTIMATE",
  "SUPPLEMENTS EXIST",
  "DON'T SIGN TOO FAST",
  "KNOW YOUR RIGHTS",
];

export default function Marquee() {
  return (
    <div
      className="relative w-full overflow-hidden border-y border-border bg-surface py-4"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max gap-8">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-8 font-display text-sm font-semibold uppercase tracking-widest text-muted"
          >
            {item}
            <span className="text-accent-orange">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
