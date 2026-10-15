import { ImageResponse } from "next/og";

// Brand Open Graph / Twitter card generator (next/og, rendered at build time).

export const ogSize = { width: 1200, height: 630 };

// Same top-down turtle as the logo mark, as a data URI (Satori renders <img> reliably).
export const turtleDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1c92e1"/><stop offset="1" stop-color="#31b317"/></linearGradient></defs><g fill="#14250d"><ellipse cx="8.5" cy="11" rx="4.2" ry="2.1" transform="rotate(-35 8.5 11)"/><ellipse cx="23.5" cy="11" rx="4.2" ry="2.1" transform="rotate(35 23.5 11)"/><ellipse cx="10" cy="24.5" rx="2.8" ry="1.6" transform="rotate(35 10 24.5)"/><ellipse cx="22" cy="24.5" rx="2.8" ry="1.6" transform="rotate(-35 22 24.5)"/><circle cx="16" cy="5.2" r="3"/></g><ellipse cx="16" cy="17.5" rx="8.2" ry="9.2" fill="url(#g)"/><path d="M16 12.2l3.4 2.2v4.2L16 20.8l-3.4-2.2v-4.2z" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="1.3" stroke-linejoin="round"/></svg>`
)}`;

// Space Grotesk Bold for the headline. Google Fonts serves TTF (which Satori
// needs) when no browser user-agent is sent. Falls back to the default font.
let fontPromise: Promise<ArrayBuffer | null> | null = null;
function loadDisplayFont() {
  fontPromise ??= (async () => {
    try {
      const css = await fetch("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700").then((r) => r.text());
      const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
      return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
    } catch {
      return null;
    }
  })();
  return fontPromise;
}

export async function brandOgImage({ title, eyebrow }: { title: string; eyebrow: string }) {
  const font = await loadDisplayFont();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #f0f8fe 0%, #ffffff 45%, #f2faef 100%)",
          color: "#14250d",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -160,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "linear-gradient(135deg, #1c92e1, #31b317)",
            opacity: 0.9,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={turtleDataUri} width={64} height={64} alt="" />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, ...(font ? { fontFamily: "Space Grotesk" } : {}) }}>
            Invertir con&nbsp;<span style={{ color: "#23810f" }}>Valores</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#23810f" }}>
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 60 ? 60 : 78,
              fontWeight: 700,
              lineHeight: 1.05,
              marginTop: 20,
              letterSpacing: -1.5,
              ...(font ? { fontFamily: "Space Grotesk" } : {}),
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", width: 220, height: 10, borderRadius: 10, background: "linear-gradient(90deg, #1c92e1, #31b317)" }} />
      </div>
    ),
    {
      ...ogSize,
      ...(font ? { fonts: [{ name: "Space Grotesk", data: font, weight: 700 as const, style: "normal" as const }] } : {}),
    }
  );
}
