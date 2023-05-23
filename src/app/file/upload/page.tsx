'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Title from '@/components/Title';
import { AiTwotoneFileAdd, AiFillDelete } from 'react-icons/ai';
import { TiDocumentText } from 'react-icons/ti';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useState, Fragment, useRef } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { postFile } from '@/api/fetchFile';
import { Dialog, Transition } from '@headlessui/react';

export const metadata = Title('Upload File');

export default function Upload() {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const redirectInUrl = useSearchParams().get('redirect');
  const [resLocation, setResLocation] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const formref = useRef<any>();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handlerSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const form = event.target as HTMLFormElement;
      const location = await postFile(form, user.token);
      if (location != null) {
        const origin =
          typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';
        const paramArr = new URL(location).pathname.split('/');
        const url = `${origin}/file/${paramArr[paramArr.length - 1]}`;
        setResLocation(url);
        setIsOpen(true);
        formref.current.reset;
      }
    } catch (error: any) {
      alert(error.message);
    }
  }
  return (
    <ProtectedRoute>
      <main className="flex h-[90vh] flex-col mt-14 items-center justify-center bg-white text-black">
        <section className="container">
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        File successfully uploaded!
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-black">
                          Your file have been uploaded. Here is your share url:
                          {resLocation}
                        </p>
                      </div>

                      <div className="mt-4 btn-group">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            navigator.clipboard.writeText(resLocation)
                          }
                        >
                          Copy to clipboard
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => router.push(resLocation)}
                        >
                          Go to your file
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          <form ref={formref} onSubmit={handlerSubmit} method="post">
            <div className="form ">
              <h1 className="text-center font-extrabold text-2xl m-2">
                Upload File
              </h1>
              <div className="input-group">
                <i className="input-icon flex items-center">
                  <AiTwotoneFileAdd />
                </i>
                <input
                  className="input "
                  type="file"
                  name="File"
                  id="username"
                  multiple={false}
                  required
                />
              </div>
              <div className="input-group">
                <i className="input-icon">
                  <TiDocumentText />
                </i>
                <input
                  className="input "
                  type="text"
                  name="Text"
                  id="email"
                  placeholder="johndoe@gmail.com"
                  required
                />
              </div>
              <div className="input-group hidden">
                <input
                  className="input "
                  type="text"
                  name="StorageId"
                  id="StorageId"
                  value={user.id}
                  hidden
                />
              </div>
              <div className="input-group ">
                <i className="input-icon">
                  <AiFillDelete />
                </i>
                <input
                  className="input-checkbox"
                  type="checkbox"
                  name="IsAutoDelEnabled"
                  id="IsAutoDelEnabled"
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Upload
              </button>
            </div>
          </form>
        </section>
      </main>
    </ProtectedRoute>
  );
}
