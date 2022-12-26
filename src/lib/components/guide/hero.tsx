import { Heading, Text, Box, ListItem, UnorderedList } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={5}>
        Intraday Trading Guide
      </Heading>
      <Heading as="h2" size="lg" mb={3}>
        What is Intraday Trading?
      </Heading>

      <Text mb={5}>
        Intraday Trading is also called as Day Trading which means buying and
        selling of stock or other financial instruments within the same day.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Basic Rules For Intraday Trading.
      </Heading>

      <Text mb={3}>
        Intraday Trading is also called as Day Trading which means buying and
        selling of stock or other financial instruments within the same day.
      </Text>

      <UnorderedList>
        <ListItem>
          First learn by doing paper trading then start trading with real money.
        </ListItem>
        <ListItem>
          Start with small amount, ideal amount is 10% of your savings account.
        </ListItem>
        <ListItem>
          Set maximum risk you can take for the day according to your risk
          apatite.
        </ListItem>
        <ListItem>
          Select stocks having high volumes, preferably nifty 50 as they have
          high volume.
        </ListItem>
        <ListItem>
          Plan the trade before executing, i.e. set stoploss, entry price,
          target/exit price..
        </ListItem>
        <ListItem>Do not over trade.</ListItem>
        <ListItem>Evaluate your performance by journaling the trade.</ListItem>
      </UnorderedList>
    </Box>
  );
};

export default Hero;
