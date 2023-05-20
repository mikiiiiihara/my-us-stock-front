// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let accessToken = "";
  const cookies = parse(req.headers.cookie || "");
  accessToken = cookies["accessToken"];
  res.status(200).json({ accessToken: accessToken ?? "" });
}
