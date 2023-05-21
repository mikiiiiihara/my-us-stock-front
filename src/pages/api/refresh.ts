import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = parse(req.headers.cookie || "");
  try {
    const response = await axios.get<{ accessToken: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        withCredentials: true,
        headers: {
          Cookie: `refreshToken=${cookies["refreshToken"]};`,
        },
      }
    );
    // Get cookies from the response
    const newCookies = response.headers["set-cookie"];

    if (newCookies) {
      // Set cookies on the client side
      res.setHeader("Set-Cookie", newCookies);
    }
    const accessToken = response.data.accessToken;
    res.status(200).json({ accessToken });
  } catch (error: any) {
    console.log(error);
    const statusCode = error.response?.status || 500;
    res
      .status(statusCode)
      .json({ message: "An error occurred while processing your request." });
  }
}
