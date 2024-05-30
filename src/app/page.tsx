'use client'
// import { useSession, signOut } from 'next-auth/react';

export default function HomePage() {
  // const { data: session } = useSession();

  return (
    <div>
      {/* {session ? (
        <>
          <h1>Welcome, {session.user?.name}</h1>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <h1>Welcome to the homepage</h1>
      )} */}

      <h1>this is home page</h1>
    </div>
  );
}