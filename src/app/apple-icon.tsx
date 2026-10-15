import { ImageResponse } from "next/og";
import { turtleDataUri } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";



/** iOS home-screen icon: the turtle mark on a soft tint. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2faef" }}>
        <img src={turtleDataUri} width={132} height={132} alt="" />
      </div>
    ),
    size
  );
}
