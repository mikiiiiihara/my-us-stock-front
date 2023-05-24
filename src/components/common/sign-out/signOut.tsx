import { Button } from "react-bootstrap";

const SignOut = () => {
  const executeSignOut = async () => {
    // ログアウトAPIを実行
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      credentials: "include", // Send the cookies
      // Other settings...
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // Redirect to the login page
          window.location.href = "/";
        } else {
          // Handle the error
          console.error(data.message);
        }
      });
  };
  return (
    <Button variant="primary" size="sm" onClick={executeSignOut}>
      Sign out
    </Button>
  );
};
export default SignOut;
