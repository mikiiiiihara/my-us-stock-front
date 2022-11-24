import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return session ? (
    <>
      {JSON.stringify(session)}
      <button onClick={() => signOut()}>SignOut</button>
    </>
  ) : (
    <>
      <button onClick={() => signIn()}>SignIn</button>
    </>
  );
}
