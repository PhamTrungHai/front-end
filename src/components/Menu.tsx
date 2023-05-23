'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { userSignOut } from '@/redux/features/userSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Menu() {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handlerSignOut() {
    localStorage.removeItem('user');
    dispatch(userSignOut());
    router.push('/login');
  }

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <nav className="group relative dropdown inline px-4 text-gray-100 hover:text-gray-400 cursor-pointer font-bold text-base uppercase tracking-wide">
      {hydrated &&
        (user.token ? (
          <a>Hello, {user.name}</a>
        ) : (
          <Link href="/login">Sign In</Link>
        ))}
      {hydrated &&
        (user.token ? (
          <div className="group-hover:block dropdown-menu absolute hidden h-auto pt-4">
            <ul className="block w-full bg-white shadow px-4 py-5 rounded-lg">
              <li className="py-1">
                <Link
                  href={'/file'}
                  className="block text-blue-400 font-bold text-base uppercase hover:text-blue-700 cursor-pointer"
                >
                  Your Files
                </Link>
              </li>
              <li className="py-1">
                <a
                  className="block text-blue-400 font-bold text-base uppercase hover:text-blue-700 cursor-pointer"
                  onClick={handlerSignOut}
                >
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        ) : null)}
    </nav>
  );
}

export default Menu;
