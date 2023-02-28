import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/product");
  };
  return (
    <>
      <Head></Head>
      <div style={{ display: "flex", gap: 2 }}>
        <Link href={"/blog"}>
          <h1>Blog</h1>
        </Link>
        <Link href={"/product"}>
          <h1>Prodcts</h1>
        </Link>

        {/* programaticly navigation */}
        <button onClick={handleClick}>place order</button>
      </div>
    </>
  );
}
