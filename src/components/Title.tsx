import { Metadata } from 'next';

export default function Title(title: string) {
  const metadata: Metadata = {
    title: title,
  };
  return metadata;
}
