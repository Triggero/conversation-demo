export const blobToBase64 = (blob: Blob): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const base64String = reader.result?.toString().split(",")[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};
