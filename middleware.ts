// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
   if (req.nextUrl.pathname.startsWith("/api/entries/")) {
      const id = req.nextUrl.pathname.replace("/api/entries/", "");
      const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

      if (!checkMongoIDRegExp.test(id)) {
         const url = req.nextUrl.clone();
         //  redireccion al mensaje de error
         url.pathname = "/api/bad-request";
         //  ? => para empezar con los query parameters
         url.search = `?message${id} is not a valid mongoID`;
         return NextResponse.rewrite(url);
      }
   }

   //console.log({ req: req.nextUrl.pathname });

   return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
   //   matcher: '/about/:path*',
   matcher: [
      // "/api/:path*",
      "/api/entries/:path*",
   ],
};

// * El middleware solo va a entrar a las peticiones que entren por el
// * matcher definido
