'use client';
import { useAppSelector } from '@/redux/hooks';
import { redirect } from 'next/navigation';

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user } = useAppSelector((state) => state.userReducer);
  // const router = useRouter();
  return user.token ? children : redirect('/login');
}
