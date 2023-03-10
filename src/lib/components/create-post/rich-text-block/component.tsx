/* eslint-disable no-param-reassign */
import {
  IconButton,
  HStack,
  useColorMode,
  chakra,
  ListItem,
  OrderedList,
  UnorderedList,
  Heading,
  Image,
} from "@chakra-ui/react";
import type { ReactElement } from "react";
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdLooksOne,
  MdLooksTwo,
} from "react-icons/md";
import { Editor, Transforms, Element as SlateElement } from "slate";
import type { HistoryEditor } from "slate-history";
import { useSlate } from "slate-react";
import type {
  ReactEditor,
  RenderLeafProps,
  RenderElementProps,
} from "slate-react";

type EditorProps = (Editor | ReactEditor | HistoryEditor) & {
  id?: string;
  type?: string;
};
const LIST_TYPES = ["numbered-list", "bulleted-list"];

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const isBlockActive = (editor: EditorProps, format: string) => {
  const nodeGen = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  const node = nodeGen.next();
  return !node.done;
};

const isMarkActive = (editor: EditorProps, format: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const marks: any = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleBlock = (editor: EditorProps, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        (!Editor.isEditor(n) && SlateElement.isElement(n) && n.type) as string
      ),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    // eslint-disable-next-line no-nested-ternary
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor: EditorProps, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const MarkButton = ({
  format,
  icon,
}: {
  format: string;
  icon: ReactElement;
}) => {
  const editor = useSlate();
  return (
    <IconButton
      variant="outline"
      colorScheme="blue"
      isActive={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      aria-label={format}
      icon={icon}
      borderWidth={0}
      fontSize="20px"
    />
  );
};

export const BlockButton = ({
  format,
  icon,
}: {
  format: string;
  icon: ReactElement;
}) => {
  const editor = useSlate();
  return (
    <IconButton
      variant="outline"
      colorScheme="blue"
      isActive={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      aria-label={format}
      icon={icon}
      borderWidth={0}
      fontSize="20px"
    />
  );
};

export const Toolbar = () => {
  return (
    <HStack
      borderWidth="0 0 1px 0"
      padding="10px 5px"
      spacing="5px"
      wrap="wrap"
    >
      <MarkButton format="bold" icon={<MdFormatBold />} />
      <MarkButton format="italic" icon={<MdFormatItalic />} />
      <MarkButton format="underline" icon={<MdFormatUnderlined />} />
      <MarkButton format="code" icon={<MdCode />} />
      <BlockButton format="heading-one" icon={<MdLooksOne />} />
      <BlockButton format="heading-two" icon={<MdLooksTwo />} />
      <BlockButton format="block-quote" icon={<MdFormatQuote />} />
      <BlockButton format="numbered-list" icon={<MdFormatListNumbered />} />
      <BlockButton format="bulleted-list" icon={<MdFormatListBulleted />} />
    </HStack>
  );
};

const BlockquoteStyle: React.CSSProperties | undefined = {
  margin: "1.5em 10px",
  padding: "0.5em 10px",
};

export const Element = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  switch (element.type) {
    case "block-quote":
      return (
        <chakra.blockquote
          style={BlockquoteStyle}
          borderLeftWidth="10px"
          borderLeftColor="gray.200"
          {...attributes}
        >
          {children}
        </chakra.blockquote>
      );
    case "list-item":
      return <ListItem {...attributes}>{children}</ListItem>;
    case "numbered-list":
      return <OrderedList {...attributes}>{children}</OrderedList>;
    case "bulleted-list":
      return <UnorderedList {...attributes}>{children}</UnorderedList>;
    case "heading-one":
      return (
        <Heading as="h1" size="3xl" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-two":
      return (
        <Heading as="h2" size="2xl" {...attributes}>
          {children}
        </Heading>
      );
    case "image":
      return (
        <figure contentEditable={false}>
          <Image
            src={`${apiUrl}/picture/${element.id}`}
            alt="Image"
            {...attributes}
            width="500px"
            my={4}
          />
          {children}
        </figure>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const { colorMode } = useColorMode();

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <chakra.code
        padding="3px"
        backgroundColor={colorMode === "dark" ? "gray.700" : "gray.200"}
        fontSize="90%"
      >
        {children}
      </chakra.code>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
