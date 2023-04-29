// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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

    // Redirect to Google's login page
    res.writeHead(302, {
      Location: response.url,
    });
    res.end();
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: safeStringify(error) });
  }
}
