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
    const response = await fetch(
      "https://my-us-stock-km5gk6oanq-an.a.run.app/auth",
      {
        headers: {
          ...filteredHeaders,
          "Content-Type": "application/json",
        },
      }
    );

    // Get the redirect location from the response headers
    const redirectLocation = response.headers.get("location");

    if (redirectLocation) {
      // Redirect to Google's login page
      res.writeHead(302, {
        Location: redirectLocation,
      });
      res.end();
    } else {
      // If the location header is not found, return an error
      res.status(500).json({ message: "Redirect location not found" });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: safeStringify(error) });
  }
}
