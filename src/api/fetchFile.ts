import { cache } from 'react';

const getFiles = cache(async (userId: number, token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FETCHURL}/File/GetFiles?userId=${userId}`,
      {
        method: 'GET',
      }
    );
    const file = response.json();
    return file;
  } catch (err) {
    console.log(err);
    return;
  }
});

const getOneFile = cache(async (encodedId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FETCHURL}/File/${encodedId}`,
      {
        method: 'GET',
      }
    );
    const file = response.json();
    return file;
  } catch (err) {
    console.log(err);
    return;
  }
});

const downloadFile = async (encodedId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FETCHURL}/File/Download/${encodedId}`,
      {
        method: 'GET',
      }
    );
    const file = response.blob();
    return file;
  } catch (err) {
    console.log(err);
    return;
  }
};

const postFile = async (form: HTMLFormElement, token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FETCHURL}/File/Upload`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: new FormData(form),
      }
    );
    const location = response.headers.get('location');
    return location;
  } catch (error) {
    console.log(error);
    return;
  }
};

const deleteFile = async (encodedId: string, token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FETCHURL}/File/${encodedId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      alert('Delete Success!');
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
export default getFiles;
export { postFile, downloadFile, deleteFile, getOneFile };
