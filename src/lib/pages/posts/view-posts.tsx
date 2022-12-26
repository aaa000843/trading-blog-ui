import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PostListicle } from "lib/components/posts/index";
import { getPosts } from "lib/models/api";
import type { IPostProps } from "lib/types/post";

const ViewPosts = () => {
  const [posts, setPost] = useState<IPostProps[]>([]);
  useEffect(() => {
    const returnPosts = getPosts();
    setPost(returnPosts);
  }, []);
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <NextSeo title="Post" />

      {posts.map((post) => {
        return (
          <Link href={`/posts/${post.slug}`} key={post.slug}>
            <PostListicle {...post} />
          </Link>
        );
      })}
    </Flex>
  );
};

export default ViewPosts;
