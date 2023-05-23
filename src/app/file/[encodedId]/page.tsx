import Title from '@/components/Title';
import DisplayFile from '@/components/DisplayFile';
import { getOneFile } from '@/api/fetchFile';

export const metadata = Title('File | FConnect');

type Props = {
  params: {
    encodedId: string;
  };
};

async function File({ params }: Props) {
  const id = params.encodedId;
  const file = await getOneFile(id);
  return (
    <main className="flex h-[90vh] flex-col mt-14 items-center bg-white text-black">
      <h1 className="text-4xl font-bold text-center mt-8">File no.{}</h1>
      <section className="mt-5">
        <DisplayFile file={file} />
      </section>
    </main>
  );
}
export default File;
