import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
function Navbar() {
  const { data: session, loading } = useSession();
  if (session) {
  }
  return (
    <nav className="header">
      <h1 className="logo">NextAuth</h1>
      <ul className={`main-nav `}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>

        {session ? (
          <li>
            <Link href={"/api/auth/signout"}>
              <p onClick={() => signOut()}>signout</p>
            </Link>
          </li>
        ) : (
          <li>
            <Link href={"/api/auth/signin"}>
              <p onClick={() => signIn()}>signin</p>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
