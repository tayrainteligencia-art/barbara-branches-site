import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const iconData = await readFile(
    join(process.cwd(), "public/brand/icon.png"),
  );
  const iconSrc = `data:image/png;base64,${iconData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0e0c09",
          backgroundImage:
            "radial-gradient(ellipse at 70% 25%, rgba(176,130,74,0.25), transparent 60%)",
        }}
      >
        <img src={iconSrc} width={180} height={180} alt="" />
        <div
          style={{
            marginTop: 32,
            fontSize: 64,
            fontFamily: "serif",
            color: "#fbf8f2",
            letterSpacing: 4,
          }}
        >
          BÁRBARA BRANCHES
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 28,
            fontFamily: "serif",
            color: "#d4af7a",
            letterSpacing: 8,
          }}
        >
          BELEZA · CIÊNCIA · HARMONIA
        </div>
      </div>
    ),
    { ...size },
  );
}
