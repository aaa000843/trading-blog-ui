import type { IPictureProps } from "lib/types/picture.type";
import { request } from "lib/utils";
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const parseToImage = (img: Partial<IPictureProps>): IPictureProps => {
  // const url = `${apiUrl}/picture/${img._id}`
  // img.url = url;
  return img as IPictureProps;
};

// export const getPictureById = async (id: string): Promise<Buffer> => {
//   return await request({ url: `/picture/${id}` });
// };

export const uploadPicture = async ({
  image,
  id,
}: {
  image: File;
  id: string;
}): Promise<IPictureProps> => {
  const formdata = new FormData();
  formdata.append("file", image);
  formdata.append("slug", id);
  const img = await request<IPictureProps>({
    url: `/picture/upload`,
    data: formdata,
    method: "POST",
  });
  return parseToImage(img.data);
};
