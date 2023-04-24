import { FormEvent } from "react";
import Header from "../../components/common/header/header";
import router from "next/router";
import PrimaryButton from "../../components/primary-button/primaryButton";

export default function login() {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      router.push("/api/login");
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <>
      <Header title="My US Stock Portfolio | Login" />
      <p>Login Page</p>
      <form onSubmit={handleSubmit}>
        <PrimaryButton content="Login" className="mb-3" type="submit" />
      </form>
    </>
  );
}
