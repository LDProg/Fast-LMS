import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGGEDIN_REDIRECT,
  adminRoutes,
  apiAuthPrefix,
  apiStripePrefix,
  apiUploadthingPrefix,
  authRoutes,
  publicRoutes,
  salesforceRoutes,
} from "./route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiStripeRoute = nextUrl.pathname.startsWith(apiStripePrefix);
  const isApiUploadthing = nextUrl.pathname.startsWith(apiUploadthingPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isSalesforceRoute = salesforceRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute || isApiUploadthing || isApiStripeRoute) return null;

  if (isAdminRoute) {
    // console.log(req.cookies.get("authjs.session-token").value, "reqqqq");
    // console.log(req.auth.user, "token middle");
    // const token = req.cookies.get("authjs.session-token").value;
    // const decoded = jwtDecode(token);
    // console.log(decoded, "decoded");
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGGEDIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if ((!isLoggedIn && !isPublicRoute) || nextUrl.pathname === "/") {
    return Response.redirect(new URL("/auth", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
