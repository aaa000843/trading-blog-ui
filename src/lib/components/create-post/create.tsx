import { Stack, Input, Textarea, Box, Heading } from "@chakra-ui/react";

const CreatePost = () => {
  return (
    <Box width="full">
      <Heading as="h1" size="lg" mb={4}>
        Create Blog
      </Heading>

      <Stack spacing={3}>
        <Input variant="outline" placeholder="Title" />
        <Input variant="outline" placeholder="Description" />
        <Textarea placeholder="Here is a sample placeholder" />
        <Input variant="outline" placeholder="Slug" />
      </Stack>
    </Box>
  );
};

export default CreatePost;
