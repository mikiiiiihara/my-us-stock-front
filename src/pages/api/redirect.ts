import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";
import safeStringify from "fast-safe-stringify";

const googleAuthRedirect = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.log("res:");
  console.log(req.headers);
  console.log("req:");
  console.log(res);
  try {
    // Filter out problematic headers
    const filteredHeaders = Object.fromEntries(
      Object.entries(req.headers).filter(
        ([key, value]) => key.toLowerCase() !== "set-cookie"
      )
    );
    console.log("filteredHeaders:");
    console.log(filteredHeaders);
    const response = await fetch(
      "https://my-us-stock-km5gk6oanq-an.a.run.app/auth/redirect",
      {
        headers: {
          ...filteredHeaders,
          "Content-Type": "application/json",
        },
        redirect: "manual",
        credentials: "include",
      }
    );
    console.log(response.url);

    if (!response.ok && response.status !== 302) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    // Get cookies from the response
    const cookies = response.headers.get("set-cookie");

    if (cookies) {
      // Set cookies on the client side
      res.setHeader("Set-Cookie", cookies);
    }

    // Redirect to a success page or home page
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: safeStringify(error) });
  }
};

export default googleAuthRedirect;
