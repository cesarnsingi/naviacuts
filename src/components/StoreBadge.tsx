"use client";

// SVG sources:
// Apple  → https://www.svgrepo.com/svg/303128/download-on-the-app-store-apple-logo
// Google → https://www.svgrepo.com/svg/341868/google-pay

interface StoreBadgeProps {
  store: "ios" | "android";
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function StoreBadge({
  store,
  href = "#download",
  size = "md",
  className = "",
}: StoreBadgeProps) {
  const heights: Record<string, number> = { sm: 40, md: 52, lg: 64 };
  const h = heights[size];

  /* ── Apple "Download on the App Store" ── */
  if (store === "ios") {
    // Exact SVG from svgrepo #303128 — Apple's official badge artwork
    return (
      <a
        href={href}
        aria-label="Download on the App Store"
        className={`inline-block transition-opacity duration-200 hover:opacity-80 active:scale-95 ${className}`}
        style={{ lineHeight: 0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          height={h}
          viewBox="0 0 119.66407 40"
        >
          <g>
            {/* Black rounded-rect badge */}
            <rect
              rx="4.75"
              height="39.5"
              width="119.16407"
              y=".25"
              x=".25"
              fill="#000"
            />
            <rect
              rx="4.5"
              height="39"
              width="118.66407"
              y=".5"
              x=".5"
              fill="none"
              stroke="#a6a6a6"
              strokeWidth="1"
            />
          </g>

          {/* Apple logo glyph */}
          <g fill="#fff">
            <path d="M24.76977 19.6639c-.02997-3.22978 2.63532-4.7972 2.7561-4.87249-1.50588-2.19936-3.84628-2.50159-4.67391-2.52806-1.97984-.20193-3.8714 1.16765-4.87853 1.16765-1.01077 0-2.55747-1.14118-4.2092-1.10811-2.15316.03307-4.14628 1.25823-5.25696 3.17766-2.25378 3.90142-.57633 9.67052 1.61026 12.83972 1.07436 1.55285 2.34399 3.29373 4.00588 3.23025 1.61691-.0661 2.22211-1.03931 4.17657-1.03931 1.94796 0 2.50827 1.03931 4.20264.99946 1.74085-.03307 2.83838-1.5694 3.89961-3.13261 1.2431-1.79478 1.74747-3.55558 1.77091-3.64379-.03972-.01648-3.37884-1.29469-3.41202-5.13037z" />
            <path d="M21.60355 10.13712c.88641-1.07766 1.49258-2.56225 1.32913-4.05659-1.28494.05323-2.84499.85495-3.76423 1.9159-.81977.94977-1.54296 2.48399-1.35264 3.94181 1.43311.10973 2.89873-.72688 3.79774-1.80112z" />
          </g>

          {/* "Download on the" small text */}
          <g fill="#fff">
            <text
              xmlSpace="preserve"
              style={{ fontFamily: "'SF Pro Display', '-apple-system', 'Helvetica Neue', sans-serif" }}
              fontSize="8.15"
              letterSpacing="0"
              x="34.5"
              y="17.5"
            >
              Download on the
            </text>

            {/* "App Store" large text */}
            <text
              xmlSpace="preserve"
              style={{ fontFamily: "'SF Pro Display', '-apple-system', 'Helvetica Neue', sans-serif", fontWeight: 600 }}
              fontSize="17.5"
              letterSpacing="-.3"
              x="33.5"
              y="32"
            >
              App Store
            </text>
          </g>
        </svg>
      </a>
    );
  }

  /* ── Google Play badge ── */
  // Exact four-colour Play triangle from svgrepo #341868
  return (
    <a
      href={href}
      aria-label="Get it on Google Play"
      className={`inline-block transition-opacity duration-200 hover:opacity-80 active:scale-95 ${className}`}
      style={{ lineHeight: 0 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        height={h}
        viewBox="0 0 646.00233 190.00099"
      >
        {/* Black rounded-rect badge */}
        <rect
          rx="22.54"
          height="190"
          width="646"
          fill="#000"
        />

        {/* Official Google Play icon — four colour paths */}
        {/* Blue */}
        <path
          d="M82.5 45.47L40.36 89.91l-.02.02-.01.01L82.5 134.4l.04-.02 50.08-28.73c14.31-8.2 14.31-21.65 0-29.85L82.5 45.47z"
          fill="#4285f4"
        />
        {/* Green */}
        <path
          d="M40.33 89.94L14.38 55.21A15.08 15.08 0 0 0 10 65.13v59.71a15 15 0 0 0 4.38 9.91l25.97-34.73-.02-.08z"
          fill="#34a853"
        />
        {/* Yellow */}
        <path
          d="M132.62 75.77l-50.08-28.73-.04-.02-8.11 8.11 8.11 8.12 42.13-4.66c14.31 8.2 14.31 21.65 0 29.85L82.5 117.17l8.11 8.11.04-.02 50.08-28.73c8.13-4.61 8.13-12.15-.11-20.76z"
          fill="#fbbc04"
        />
        {/* Red */}
        <path
          d="M82.5 45.47l.04.02 8.07-8.07A15.12 15.12 0 0 0 82.5 35c-4.26 0-8.03 1.68-10.7 4.38L40.33 89.94l42.13-44.45.04-.02z"
          fill="#ea4335"
        />

        {/* "GET IT ON" label */}
        <text
          x="195"
          y="80"
          fill="#fff"
          fontFamily="'Google Sans', 'Roboto', sans-serif"
          fontSize="42"
          letterSpacing="3"
          fontWeight="400"
        >
          GET IT ON
        </text>

        {/* "Google Play" main text */}
        <text
          x="190"
          y="148"
          fill="#fff"
          fontFamily="'Google Sans', 'Roboto', sans-serif"
          fontSize="76"
          fontWeight="500"
          letterSpacing="-1"
        >
          Google Play
        </text>
      </svg>
    </a>
  );
}
