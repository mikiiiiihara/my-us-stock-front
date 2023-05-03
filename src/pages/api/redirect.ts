// pages/api/auth/redirect.ts
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

async function redirect(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/redirect`,
      {
        headers: req.headers,
        maxRedirects: 0,
        validateStatus: (status) =>
          status === 302 || (status >= 200 && status < 300),
      }
    );
    console.log(response.data);
    // NestJSから設定されたCookieが存在する場合、それを使用
    if (req.headers["set-cookie"]) {
      res.setHeader("Set-Cookie", req.headers["set-cookie"]);
    }

    // リダイレクト先を設定（例: ホームページ）
    res.writeHead(302, { Location: "/" });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default redirect;
