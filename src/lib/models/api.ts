import type { IPostProps } from "lib/types/post";
import { request } from "lib/utils";

export const getPosts = async (): Promise<IPostProps[]> => {
  const posts = await request<IPostProps[]>({ url: "/post" });
  return posts.data;
};

export const getPostBySlug = async (slug: string): Promise<IPostProps> => {
  const post = await request<IPostProps>({ url: `/post/${slug}` });
  return post.data;
};

export const createPost = async (body: IPostProps): Promise<IPostProps> => {
  const post = await request<IPostProps>({
    url: `/post/create`,
    data: body,
    method: "POST",
  });
  return post.data;
};

export const editPost = async (payload: IPostProps): Promise<IPostProps> => {
  const post = await request<IPostProps>({
    url: `/post`,
    data: payload,
    method: "PATCH",
  });
  return post.data;
};
