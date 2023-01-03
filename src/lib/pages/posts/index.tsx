import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import PostPage from "lib/components/posts/index";
import type { IPostProps } from "lib/types/post";

const Post: React.FC<IPostProps> = (props) => {
  const { title, description } = props;
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
      <NextSeo title={title} description={description} />
      <PostPage {...props} />
    </Flex>
  );
};

export default Post;
