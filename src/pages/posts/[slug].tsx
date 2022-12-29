import { getPosts, getPostBySlug } from "lib/models/api";
import ViewPost from "lib/pages/posts";
import type { IPostProps } from "lib/types/post";

export async function getStaticPaths() {
  const posts = await getPosts();
  const params = posts.map(({ slug }) => {
    return { params: { slug } };
  });
  return {
    paths: params,
    fallback: false,
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: { slug: keyof IPostProps }) {
  const { slug } = context;
  const post = await getPostBySlug(slug);
  return {
    props: { post },
  };
}

export default function Post(props: { post: IPostProps }) {
  const { post } = props;
  return <ViewPost {...post} />;
}
