// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get<{ accessToken: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {}
    );
    // Get cookies from the response
    const newCookies = response.headers["set-cookie"];

    if (newCookies) {
      // Set cookies on the client side
      res.setHeader("Set-Cookie", newCookies);
    }
    res.status(200).json("OK");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
}
