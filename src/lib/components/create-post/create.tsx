import {
  Stack,
  Input,
  Textarea,
  Box,
  Heading,
  Button,
  Spinner,
  Badge,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useReducer, useEffect } from "react";

import { useFetch } from "lib/hooks/fetch.hook";
import { createPost } from "lib/models/api";

const CreatePost = () => {
  const initialState = {
    post: {
      title: "",
      description: "",
      content: "",
      slug: "",
    },
    clicked: 0,
    status: "",
    error: "",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formReducer = (state: any, { type, payload }: any) => {
    switch (type) {
      case "title":
        return { ...state, post: { ...state.post, title: payload } };
      case "description":
        return { ...state, post: { ...state.post, description: payload } };
      case "content":
        return { ...state, post: { ...state.post, content: payload } };
      case "slug":
        return { ...state, post: { ...state.post, slug: payload } };
      case "clicked":
        return { ...state, clicked: state.clicked + 1 };
      case "status":
        return { ...state, status: payload };
      case "error":
        return { ...state, error: payload };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const { status, run } = useFetch(createPost);

  useEffect(() => {
    if (state.clicked > 0)
      run(state.post).then(({ data, error }) => {
        if (data) dispatch({ type: "status", payload: "data" });
        else {
          dispatch({ type: "status", payload: "error" });
          if (typeof error?.message === "string")
            dispatch({ type: "error", payload: error.message });
          else {
            dispatch({ type: "error", payload: error?.message.join(", ") });
          }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.clicked]);

  return (
    <Box width="full">
      <Heading as="h1" size="lg" mb={4}>
        Create Blog
      </Heading>

      {state.clicked > 0 && (
        <Stack direction="row" mb={4}>
          {state.status !== "error" ? (
            <Badge colorScheme="green">Success</Badge>
          ) : (
            <Flex align="center" columnGap={4}>
              <Badge colorScheme="red">Error</Badge>
              <Text fontSize="xs">{state.error}</Text>
            </Flex>
          )}
        </Stack>
      )}

      <Stack spacing={3} mb={5}>
        <Input
          variant="outline"
          placeholder="Title"
          value={state.title}
          onChange={(e) => dispatch({ type: "title", payload: e.target.value })}
        />
        <Input
          variant="outline"
          placeholder="Description"
          value={state.description}
          onChange={(e) =>
            dispatch({ type: "description", payload: e.target.value })
          }
        />
        <Textarea
          placeholder="Here is a sample placeholder"
          value={state.content}
          onChange={(e) =>
            dispatch({ type: "content", payload: e.target.value })
          }
        />
        <Input
          variant="outline"
          placeholder="Slug"
          value={state.slug}
          onChange={(e) => dispatch({ type: "slug", payload: e.target.value })}
        />
      </Stack>

      {status === "FETCHING" ? (
        <Button>
          <Spinner size="md" />
        </Button>
      ) : (
        <Button
          colorScheme="blue"
          onClick={() => {
            dispatch({ type: "clicked" });
          }}
        >
          Save
        </Button>
      )}
    </Box>
  );
};

export default CreatePost;
