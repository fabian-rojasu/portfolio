import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Fabián Rojas Ugalde";

// Social preview in the cream palette: name on the left, the developer entity on the right
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  const rows: [string, string][] = [
    ["role", t("role")],
    ["location", profile.location],
    ["stack", ".NET · Python · Node"],
    ["open_to_work", String(profile.openToWork)],
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px",
          background: "#f3eee3",
          color: "#111111",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 520 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#6b6558" }}>
            <div style={{ width: 14, height: 14, background: "#d9541e" }} />
            fabian-rojas
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.05, fontFamily: "sans-serif" }}>{profile.name}</div>
          <div style={{ fontSize: 32, color: "#3f3b35", fontFamily: "sans-serif" }}>{t("role")}</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 500,
            background: "#111111",
            color: "#f3eee3",
            boxShadow: "14px 14px 0 #d9541e",
            fontSize: 20,
          }}
        >
          <div style={{ display: "flex", padding: "16px 24px", color: "#d9541e", borderBottom: "1px solid #34312c" }}>
            developer
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "20px 24px" }}>
            {rows.map(([key, value]) => (
              <div key={key} style={{ display: "flex", gap: 20 }}>
                <div style={{ display: "flex", width: 150, flexShrink: 0, color: "#a8a193" }}>{key}</div>
                <div style={{ display: "flex", flex: 1 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
