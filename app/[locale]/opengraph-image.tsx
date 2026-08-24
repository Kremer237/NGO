import { ImageResponse } from "next/og";
import { getDictionary, resolveLocale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#F7F5EF",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 40 }}>
          <div style={{ width: 22, height: 44, borderRadius: 6, backgroundColor: "#17382F" }} />
          <div style={{ width: 22, height: 70, borderRadius: 6, backgroundColor: "#17382F" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#C58A43" }} />
            <div style={{ width: 22, height: 84, borderRadius: 6, backgroundColor: "#17382F" }} />
          </div>
        </div>
        <div style={{ fontSize: 30, color: "#6B716D", display: "flex" }}>{dict.meta.siteName}</div>
        <div style={{ fontSize: 56, fontWeight: 700, color: "#17382F", maxWidth: 900, display: "flex" }}>
          {dict.meta.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
