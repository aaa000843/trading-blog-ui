import { Heading, Text, Box } from "@chakra-ui/react";

import type { IPostProps } from "lib/types/post";

const PostPage: React.FC<IPostProps> = ({ title, description, content }) => {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={5}>
        {title}
      </Heading>

      <Text mb={5}>{description}</Text>

      <Text mb={3}>{content}</Text>
    </Box>
  );
};

export const PostListicle: React.FC<IPostProps> = ({
  title,
  description,
  content,
}) => {
  return (
    <Box p={4} borderWidth="2px" borderRadius="2xl">
      <Heading as="h3" size="sm" mb={3}>
        {title}
      </Heading>

      <Text mb={3}>{description}</Text>

      <Text noOfLines={3} mb={2}>
        {content}
      </Text>
    </Box>
  );
};

export default PostPage;
