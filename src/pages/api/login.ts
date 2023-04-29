import type { NextApiRequest, NextApiResponse } from "next";
import safeStringify from "fast-safe-stringify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.writeHead(302, {
      Location: "https://my-us-stock-km5gk6oanq-an.a.run.app/auth",
    });
    res.end();
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: safeStringify(error) });
  }
}
