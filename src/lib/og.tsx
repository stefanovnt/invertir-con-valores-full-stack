import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// The brand logo (transparent PNG) embedded as a data URI for Satori.
let logoPromise: Promise<string> | null = null;
const loadLogo = () =>
  (logoPromise ??= readFile(
    path.join(process.cwd(), "public", "images", "logo.png")
  ).then((buf) => `data:image/png;base64,${buf.toString("base64")}`));

// Brand Open Graph / Twitter card generator (next/og, rendered at build time).

export const ogSize = { width: 1200, height: 630 };

// Plus Jakarta Sans ExtraBold for the headline. Google Fonts serves TTF (which Satori
// needs) when no browser user-agent is sent. Falls back to the default font.
let fontPromise: Promise<ArrayBuffer | null> | null = null;
function loadDisplayFont() {
  fontPromise ??= (async () => {
    try {
      const css = await fetch(
        "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800"
      ).then((r) => r.text());
      const url = css.match(
        /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/
      )?.[1];
      return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
    } catch {
      return null;
    }
  })();
  return fontPromise;
}

export async function brandOgImage({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow: string;
}) {
  const [font, logo] = await Promise.all([loadDisplayFont(), loadLogo()]);
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
          background:
            "linear-gradient(135deg, #f0f8fe 0%, #ffffff 45%, #f2faef 100%)",
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
          <img src={logo} width={72} height={72} alt="" />
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 800,
              ...(font ? { fontFamily: "Plus Jakarta Sans" } : {}),
            }}
          >
            Invertir con&nbsp;<span style={{ color: "#23810f" }}>Valores</span>
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#23810f",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 60 ? 60 : 78,
              fontWeight: 800,
              lineHeight: 1.05,
              marginTop: 20,
              letterSpacing: -1.5,
              ...(font ? { fontFamily: "Plus Jakarta Sans" } : {}),
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 220,
            height: 10,
            borderRadius: 10,
            background: "linear-gradient(90deg, #1c92e1, #31b317)",
          }}
        />
      </div>
    ),
    {
      ...ogSize,
      ...(font
        ? {
            fonts: [
              {
                name: "Plus Jakarta Sans",
                data: font,
                weight: 800 as const,
                style: "normal" as const,
              },
            ],
          }
        : {}),
    }
  );
}
