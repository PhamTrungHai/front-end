import Image from 'next/image';
import Title from '@/components/Title';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export const metadata = Title('FConnect');

export default function Home() {
  return (
    <ProtectedRoute>
      <main className="flex h-[90vh] flex-col mt-14 items-center bg-white text-black">
        <h1 className="text-4xl font-bold text-center mt-8">
          Welcome to FConnect
        </h1>
        <Image
          src="https://res.cloudinary.com/dmh5zjb5c/image/upload/v1684597003/e104e9b66a9b4731bb34dea0e2f092ec_1_lmxl9i.png"
          alt="FConnect logo"
          width={200}
          height={200}
          className="mt-5"
        />
        <Link
          href="/file/upload"
          className="mt-5 text-blue-500 font-bold text-xl hover:text-blue-700 cursor-pointer"
        >
          <button className="btn btn-primary">Start sharing files</button>
        </Link>
      </main>
    </ProtectedRoute>
  );
}
