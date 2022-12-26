import type { IPostProps } from "lib/types/post";
import { dummyPosts } from "lib/utils";

export const getPosts = (): IPostProps[] => {
  return dummyPosts;
};

export const getPostsBySlug = (slug: string): IPostProps => {
  const postIndex = dummyPosts.findIndex((post) => post.slug === slug);
  if (postIndex > -1) return dummyPosts[postIndex];
  return dummyPosts[0];
};
