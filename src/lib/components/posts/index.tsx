import { Heading, Text, Box } from "@chakra-ui/react";

import { RichTextBlock } from "../create-post/rich-text-block/rich-text-block.component";
import type { IPostProps } from "lib/types/post";

const PostPage: React.FC<IPostProps> = ({ title, description, content }) => {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={5}>
        {title}
      </Heading>

      <Text mb={5}>{description}</Text>

      <RichTextBlock initialValue={JSON.parse(content)} isEditable={false} />
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

      <RichTextBlock
        initialValue={JSON.parse(content)}
        isEditable={false}
        noOfLines={3}
      />
    </Box>
  );
};

export default PostPage;
