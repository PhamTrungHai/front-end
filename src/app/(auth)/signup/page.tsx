'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RiLockPasswordFill, RiUser2Fill } from 'react-icons/ri';
import { MdAlternateEmail } from 'react-icons/md';
import Link from 'next/link';

export default function SignUp() {
  const router = useRouter();
  async function handlerSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = (
      event.currentTarget.elements.namedItem('username') as HTMLInputElement
    ).value;
    const email = (
      event.currentTarget.elements.namedItem('email') as HTMLInputElement
    ).value;
    const password = (
      event.currentTarget.elements.namedItem('password') as HTMLInputElement
    ).value;
    const confirmPassword = (
      event.currentTarget.elements.namedItem(
        'confirmPassword'
      ) as HTMLInputElement
    ).value;
    if (password !== confirmPassword) {
      return alert("Password doesn't match");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FETCHURL}/User/SignUp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      }
    );
    const data = await response.json();
    alert(data.message);
    router.push('/login');
  }
  return (
    <main className="flex h-[90vh] flex-col mt-14 items-center justify-center bg-white text-black">
      <section className="container">
        <form onSubmit={handlerSubmit} method="post">
          <div className="form ">
            <h1 className="text-center font-extrabold text-2xl m-2">Sign Up</h1>
            <div className="input-group">
              <i className="input-icon flex items-center">
                <RiUser2Fill />
              </i>
              <input
                className="input "
                type="text"
                name="username"
                id="username"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="input-group">
              <i className="input-icon">
                <MdAlternateEmail />
              </i>
              <input
                className="input "
                type="email"
                name="email"
                id="email"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>
            <div className="input-group">
              <i className="input-icon">
                <RiLockPasswordFill />
              </i>
              <input
                className="input "
                type="password"
                name="password"
                id="password"
                required
              />
            </div>
            <div className="input-group">
              <i className="input-icon">
                <RiLockPasswordFill />
              </i>
              <input
                className="input "
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
              />
            </div>
            <Link className="link" href="/login">
              Already have an account?
            </Link>
            <button className="btn btn-primary" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
