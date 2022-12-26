import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import Hero from "lib/components/guide/hero";

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
      <NextSeo title="Guide" />
      <Hero />
    </Flex>
  );
};

export default Guide;
