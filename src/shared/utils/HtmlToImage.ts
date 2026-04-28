import { toPng } from "html-to-image";

export const HtmlToImage = async () => {
  const node = document.getElementById("ImageSet");
  if (!node) return;

    try {
      const dataUrl = await toPng(node,{
        fontEmbedCSS : '',
        cacheBust : true
      });

      const link = document.createElement("a");
      link.download = "my-image.png"; //TODO: 저장될 파일 이름
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("이미지 저장에 실패했어요!", error);
    }
};