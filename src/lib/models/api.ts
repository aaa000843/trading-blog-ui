import type { IPostProps } from "lib/types/post";
import { axiosUtils } from "lib/utils";

export const getPosts = async (): Promise<IPostProps[]> => {
  const posts = await axiosUtils.instance.get<IPostProps[]>("/post");
  return posts.data;
};

export const getPostBySlug = async (slug: string): Promise<IPostProps> => {
  const post = await axiosUtils.instance.get(`/post/${slug}`);
  return post.data;
};

export const createPost = async (body: IPostProps): Promise<IPostProps> => {
  const post = await axiosUtils.instance.post(`/post/create`, body);
  return post.data;
};

export const editPost = async (payload: IPostProps): Promise<IPostProps> => {
  const post = await axiosUtils.instance.patch(`/post`, payload);
  return post.data;
};
