import { cache } from 'react';

const getFiles = cache(async (userId: number, token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FETCHURL}/File/GetFiles?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
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
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
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
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
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
          'Access-Control-Allow-Origin': '*',
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
          'Access-Control-Allow-Origin': '*',
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
