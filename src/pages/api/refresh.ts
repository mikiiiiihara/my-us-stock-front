// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Redirect to Google's login page
    res.writeHead(302, {
      Location: `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
    });
    res.end();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
}
