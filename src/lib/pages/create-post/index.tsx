import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import CreatePost from "lib/components/create-post/create";

const Guide = () => {
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
      <NextSeo title="Create-post" />
      <CreatePost />
    </Flex>
  );
};

export default Guide;
