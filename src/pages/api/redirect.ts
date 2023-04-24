import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const googleAuthRedirect = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

export default googleAuthRedirect;
