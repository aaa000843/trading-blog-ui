import { Box, Flex, Text } from "@chakra-ui/react";

import MenuBar from "lib/components/Menu";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex mx={5} mt={2} as="header" align="center">
      <MenuBar />
      <Text ml={2} as="h1">
        NoobbTrader
      </Text>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
