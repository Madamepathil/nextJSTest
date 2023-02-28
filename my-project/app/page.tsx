import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Login from "./Login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <h3>Login website</h3>
      <Login />
    </main>
  );
}
