import { getPosts, getPostsBySlug } from "lib/models/api";
import ViewPost from "lib/pages/posts";
import type { IPostProps } from "lib/types/post";

export async function getStaticPaths() {
  const paths = getPosts().map(({ slug }) => {
    return { params: { slug } };
  });
  return {
    paths,
    fallback: false,
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: { slug: keyof IPostProps }) {
  const { slug } = context;
  const post = getPostsBySlug(slug);
  return {
    props: { post },
  };
}

export default function Post(props: { post: IPostProps }) {
  const { post } = props;
  return <ViewPost {...post} />;
}
