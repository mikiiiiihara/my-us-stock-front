import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import safeStringify from "fast-safe-stringify";

const googleAuthRedirect = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const response = await axios.get(
      // `${process.env.NEXT_PUBLIC_API_URL}/auth/redirect`,
      "https://my-us-stock-km5gk6oanq-an.a.run.app/auth/redirect",
      {
        headers: req.headers,
        maxRedirects: 0,
        validateStatus: (status) =>
          status === 302 || (status >= 200 && status < 300),
      }
    );

    // Get cookies from the response
    const cookies = response.headers["set-cookie"];

    if (cookies) {
      // Set cookies on the client side
      res.setHeader("Set-Cookie", cookies);
    }

    // Redirect to a success page or home page
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  } catch (error) {
    res.status(500).json({ message: safeStringify(error) });
  }
};

export default googleAuthRedirect;
