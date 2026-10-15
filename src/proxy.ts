import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

// Locale routing (replaces ShipFree's Supabase auth proxy, which redirected
// every visitor to /login):
//   /it/..., /en/...  -> served as is
//   /es/...           -> 308 to the unprefixed URL (Spanish is the default)
//   /anything-else    -> rewritten internally to /es/anything-else
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (first === defaultLocale) {
    // Generated metadata images live under /es internally; serve them directly.
    if (/\/(opengraph|twitter)-image/.test(pathname))
      return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (isLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals, the generated apple-icon and any file
  // with an extension (sitemap.xml, robots.txt, rss.xml, icon.svg, images...).
  matcher: ["/((?!api|_next|apple-icon|.*\\..*).*)"],
};
