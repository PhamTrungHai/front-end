import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Menu from './Menu';

function Header() {
  return (
    <section className="flex items-center justify-between p-1 bg-blue-600 fixed w-full top-0 left-0">
      <Link className="flex items-center" href="/">
        <Image
          className="mix-blend-multiply"
          src="https://res.cloudinary.com/dmh5zjb5c/image/upload/v1684597003/e104e9b66a9b4731bb34dea0e2f092ec_1_lmxl9i.png"
          width={48}
          height={48}
          alt="logo"
        />
        <p className="text-white font-bold text-lg">FConnect</p>
      </Link>
      <Menu />
    </section>
  );
}

export default Header;
