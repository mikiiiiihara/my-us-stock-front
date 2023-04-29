import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import safeStringify from "fast-safe-stringify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Filter out problematic headers
    const filteredHeaders = Object.fromEntries(
      Object.entries(req.headers).filter(
        ([key, value]) => key.toLowerCase() !== "set-cookie"
      )
    );
    // Get the redirect location from the response headers or response.url
    // Redirect to Google's login page
    res.writeHead(302, {
      // Location: redirectLocation,
      Location: "https://my-us-stock-km5gk6oanq-an.a.run.app/auth",
    });
    res.end();
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: safeStringify(error) });
  }
}
