'use client';
import Image from 'next/image';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import getFiles, { deleteFile, downloadFile } from '@/api/fetchFile';
import { useRouter } from 'next/navigation';

async function FileList() {
  const { user } = useAppSelector((state) => state.userReducer);
  const router = useRouter();
  const files = await getFiles(user.id, user.token);

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? `${window.location.origin}/file`
      : '';

  const handlerDownload = async (encodedID: string, filename: string) => {
    const blob = await downloadFile(encodedID);
    if (blob != null) {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();
    }
  };

  const handlerDelete = async (encodedId: string, token: string) => {
    if (prompt('Type anything to delete')) await deleteFile(encodedId, token);
    router.refresh();
    return;
  };
  return (
    <ul
      role="list"
      className="flex flex-wrap justify-center gap-3 w-[90vw] m-3 divide-y divide-gray-100 "
    >
      {files.map((file: any) => (
        <li
          key={file.id}
          className="relative flex justify-between py-5 px-4 sm:px-6 lg:px-8 w-[30em] bg-gray-50 rounded-lg"
        >
          <div className="tag absolute top-0 left-0">{file.id}</div>
          <div className="flex gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {file.text}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-blue-500">
                {file.fileName}
              </p>
            </div>
          </div>
          <div className="btn-group text-sm">
            {/*copy to clipboard button */}
            <button
              className="group btn"
              onClick={() =>
                navigator.clipboard.writeText(`${origin}/${file.shareURL}`)
              }
            >
              <span className="tooltip" id="tooltip">
                Copy to clipboard
              </span>
              Share URL
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handlerDownload(file.shareURL, file.fileName)}
            >
              Download
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handlerDelete(file.shareURL, user.token)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FileList;
