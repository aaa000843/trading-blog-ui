import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm" color="gray.500">
        &#169; {new Date().getFullYear()}. All rights reserved
      </Text>
    </Flex>
  );
};

export default Footer;
