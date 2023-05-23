import Image from 'next/image';
import Title from '@/components/Title';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import FileList from '@/components/FileList';

export const metadata = Title('Your files | FConnect');

export default function Files() {
  return (
    <ProtectedRoute>
      <main className="flex h-[90vh] flex-col mt-14 items-center bg-white text-black">
        <h1 className="text-4xl font-bold text-center mt-8">Your Files</h1>
        {/* @ts-expect-error Async Server Component */}
        <FileList />
        <section className="mt-5">
          <h2 className="text-2xl font-bold text-center">Upload a file</h2>
          <Link
            href="/file/upload"
            className="mt-5 text-blue-500 font-bold text-xl hover:text-blue-700 cursor-pointer"
          >
            <button className="btn btn-primary">Start sharing files</button>
          </Link>
        </section>
      </main>
    </ProtectedRoute>
  );
}
