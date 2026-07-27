import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
};

const sizes = {
  sm: { logo: 36, signature: 110, gap: "gap-2" },
  md: { logo: 48, signature: 150, gap: "gap-3" },
  lg: { logo: 58, signature: 180, gap: "gap-3" },
};

export function BrandMark({
  size = "md",
  showTagline = true,
  className = "",
}: BrandMarkProps) {
  const s = sizes[size];

  return (
    <Link
      href="/"
      className={`group flex items-center ${s.gap} ${className}`}
      aria-label={`${site.name} — Home`}
    >
      <Image
        src="/brand/logo-ia.png"
        alt="IA pen logo"
        width={s.logo}
        height={s.logo}
        className="shrink-0 object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        priority
      />
      <div className="flex flex-col">
        <Image
          src="/brand/signature.png"
          alt={site.name}
          width={s.signature}
          height={Math.round(s.signature * 0.4)}
          className="object-contain object-left"
          style={{ width: "auto", height: "auto", maxWidth: s.signature }}
          priority
        />
        {showTagline ? (
          <span className="mt-0.5 text-[0.62rem] font-medium tracking-[0.28em] text-sage-deep uppercase">
            Pause Think Grow
          </span>
        ) : null}
      </div>
    </Link>
  );
}
