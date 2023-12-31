import { useRouter } from "next/router";
import { PrimaryButton } from "../../primary-button/primaryButton";

const SignIn = () => {
  const router = useRouter();

  const executeLogin = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "drake@test.com",
          password: "abc123",
        }),
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log(data);
    window.location.href = "/test";
  };
  return (
    <PrimaryButton
      content={"ログイン"}
      className="mb-3"
      onClick={executeLogin}
    />
  );
};
export default SignIn;
