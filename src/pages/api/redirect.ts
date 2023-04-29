import fetch from "node-fetch";
import { NextApiRequest, NextApiResponse } from "next";
import safeStringify from "fast-safe-stringify";

const googleAuthRedirect = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    // Filter out problematic headers
    const filteredHeaders = Object.fromEntries(
      Object.entries(req.headers).filter(
        ([key, value]) => key.toLowerCase() !== "set-cookie"
      )
    );

    const response = await fetch(
      "https://my-us-stock-km5gk6oanq-an.a.run.app/auth/redirect",
      {
        headers: {
          ...filteredHeaders,
          "Content-Type": "application/json",
        },
        redirect: "manual",
      }
    );
    console.log("response.headers:");
    console.log(response.headers);
    console.log(response.headers.get("set-cookie"));

    if (!response.ok && response.status !== 302) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    // Get the redirect location from the response headers
    const redirectLocation = response.url;

    // Get cookies from the response
    const cookies = response.headers.get("set-cookie");

    if (cookies) {
      // Set cookies on the client side
      res.setHeader("Set-Cookie", cookies);
    }

    if (redirectLocation != null) {
      // Redirect to a success page or home page
      res.writeHead(302, {
        Location: "/",
      });
      res.end();
    } else {
      // If the location header is not found, return an error
      res.status(500).json({ message: "Redirect location not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: safeStringify(error) });
  }
};

export default googleAuthRedirect;
