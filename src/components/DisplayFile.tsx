'use client';
import { downloadFile, getOneFile } from '@/api/fetchFile';

type Props = {
  file: {
    id: string;
    text: string;
    fileName: string;
    shareURL: string;
  };
};

function DisplayFile(props: Props): JSX.Element {
  const { file } = props;

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
  return (
    <div className="relative flex justify-between py-5 px-4 sm:px-6 lg:px-8 w-[30em] bg-gray-50 rounded-lg">
      <div className="tag absolute top-0 left-0">{file && file.id}</div>
      <div className="flex gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {file && file.text}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-blue-500">
            {file && file.fileName}
          </p>
        </div>
      </div>
      <div className="btn-group text-sm">
        {/*copy to clipboard button */}
        <button
          className="group btn"
          onClick={() => navigator.clipboard.writeText(file.shareURL)}
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
      </div>
    </div>
  );
}

export default DisplayFile;
