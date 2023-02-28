import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header /* className={styles.header} */>
      <nav>
        <img src="" alt="" />
        <Link href="/">Events</Link>
        <Link href="/events">Events</Link>
        <Link href="/about-us">about-us</Link>
      </nav>
    </header>
  );
};

export default Header;
