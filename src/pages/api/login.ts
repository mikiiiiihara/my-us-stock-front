// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth`,
      {
        headers: req.headers,
      }
    );

    // Redirect to Google's login page
    res.writeHead(302, {
      Location: response.request.res.responseUrl,
    });
    res.end();
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
}
