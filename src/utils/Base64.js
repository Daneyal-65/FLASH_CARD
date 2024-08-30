const toBase64 = (file) => {
  // file conversion to base 64 string for easy accessibility
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
export default toBase64;

// https://flashcardgenrater.netlify.app/
