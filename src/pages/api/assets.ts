// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL_CRON}/assets`,
    {
      user: `${process.env.NEXT_PUBLIC_ACCOUNT}`,
    }
  );
  console.log(result.data);
  res.status(200).json({ result: result.data });
}
