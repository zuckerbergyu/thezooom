const getImageFromHtml = (html: string): string[] => {
  if (html) {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, 'text/html');
    const imgHtmlCollection = htmlDoc.getElementsByTagName('img');
    const imgList = Array.from(imgHtmlCollection);
    return imgList.map((img) => img.src);
  }
  return [];
};
export default getImageFromHtml;
