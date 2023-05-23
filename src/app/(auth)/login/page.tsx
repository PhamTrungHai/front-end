'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdAlternateEmail } from 'react-icons/md';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { userSignIn } from '@/redux/features/userSlice';
import { useEffect } from 'react';
import type { User } from '@/types/User';

export default function Login() {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const redirectInUrl = useSearchParams().get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  async function handlerSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const email = (
        event.currentTarget.elements.namedItem('email') as HTMLInputElement
      ).value;
      const password = (
        event.currentTarget.elements.namedItem('password') as HTMLInputElement
      ).value;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FETCHURL}/User/SignIn`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.status !== 200) {
        return alert('Email or password is incorrect');
      }
      const data = await response.json();
      const logUser = {
        id: data.id,
        name: data.name,
        email: data.email,
        token: data.token,
      } as User;
      dispatch(userSignIn(logUser));
      localStorage.setItem('user', JSON.stringify(logUser));
      router.push(redirect);
    } catch (error: any) {
      alert(error.message);
    }
  }
  useEffect(() => {
    if (user.token) {
      router.push('/');
    }
  }, [router, user, redirect]);
  return (
    <main className="flex h-[90vh] flex-col mt-14 items-center justify-center bg-white text-black">
      <section className="container">
        <form onSubmit={handlerSubmit} method="post">
          <div className="form ">
            <h1 className="text-center font-extrabold text-2xl m-2">Login</h1>
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
            <Link className="link" href="/signup">
              Don&apos;t have an account?
            </Link>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
