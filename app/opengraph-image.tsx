import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: video editing studio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default OG image for every page: black, one red REC dot, the headline. */
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0F0E0E", color: "#fff", fontFamily: "Helvetica, Arial, sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 1, color: "rgba(255,255,255,0.62)" }}>
          <div style={{ width: 14, height: 14, borderRadius: 99, background: "#FE2E4B" }} />
          REC 00:00:00:00 — VIDEO EDITING STUDIO
        </div>
        <div style={{ display: "flex", fontSize: 96, lineHeight: 0.98, letterSpacing: -3, fontWeight: 300, maxWidth: 980 }}>{site.hero.headline}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "rgba(255,255,255,0.62)" }}>
          <span>{site.name}</span>
          <span>{site.url.replace("https://", "")}</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 4, display: "flex" }}>
          <div style={{ width: "38%", height: 4, background: "#FE2E4B" }} />
        </div>
      </div>
    ),
    size,
  );
}
