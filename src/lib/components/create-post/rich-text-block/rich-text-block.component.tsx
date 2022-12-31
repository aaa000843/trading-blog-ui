import { Box } from "@chakra-ui/react";
import type { ChakraProps } from "@chakra-ui/react";
import isHotkey from "is-hotkey";
import React, { useCallback, useMemo, useState } from "react";
import { Editor, Transforms, createEditor } from "slate";
import type { Node } from "slate";
import { withHistory } from "slate-history";
import { Editable, withReact, Slate, ReactEditor } from "slate-react";

import { Element, Leaf, toggleMark, Toolbar } from "./component";

// @refresh reset
const HOTKEYS: { [hotkey: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export interface RichTextBlockProps {
  getValue?: (value: Node[]) => void;
  initialValue?: Node[];
  isEditable?: boolean;
  editableStyle?: React.CSSProperties;
  noOfLines?: ChakraProps["noOfLines"];
}

const exampleValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }],
  },
];

export const RichTextBlock: React.FC<RichTextBlockProps> = ({
  getValue,
  initialValue,
  editableStyle,
  isEditable = true,
  noOfLines,
}) => {
  const [value, setValue] = useState<Node[]>(initialValue ?? exampleValue);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderElement = useCallback((props: any) => <Element {...props} />, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const editor = useMemo(() => {
    const pEditor = withHistory(withReact(createEditor()));
    const { isVoid } = pEditor;
    pEditor.isVoid = (el) => el.id != null || isVoid(el);
    return pEditor;
  }, []);

  // focus selection
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [focused, setFocused] = React.useState(false);
  const savedSelection = React.useRef(editor.selection);

  const onFocus = React.useCallback(() => {
    setFocused(true);
    if (!editor.selection && value?.length) {
      Transforms.select(
        editor,
        savedSelection.current ?? Editor.end(editor, [])
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const onBlur = React.useCallback(() => {
    setFocused(false);
    savedSelection.current = editor.selection;
  }, [editor]);

  const divRef = React.useRef<HTMLDivElement>(null);

  const focusEditor = React.useCallback(
    (e: React.MouseEvent) => {
      if (e.target === divRef.current) {
        ReactEditor.focus(editor);
        e.preventDefault();
      }
    },
    [editor]
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const hotkey in HOTKEYS) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  if (isEditable)
    return (
      <Box ref={divRef} onMouseDown={focusEditor} borderWidth="1px">
        <Slate
          editor={editor}
          value={value}
          onChange={(newValue) => {
            getValue?.(newValue);
            setValue(newValue);
          }}
        >
          <Toolbar />
          <Box padding="15px 5px">
            <Editable
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Enter some rich text…"
              spellCheck
              style={
                { ...editableStyle } || {
                  minHeight: "150px",
                  resize: "vertical",
                  overflow: "auto",
                }
              }
            />
          </Box>
        </Slate>
      </Box>
    );

  return (
    <Box ref={divRef} onMouseDown={focusEditor}>
      <Slate editor={editor} value={value}>
        <Box noOfLines={noOfLines}>
          <Editable
            readOnly
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            spellCheck
            style={
              { ...editableStyle } || {
                minHeight: "150px",
                resize: "vertical",
                overflow: "auto",
              }
            }
          />
        </Box>
      </Slate>
    </Box>
  );
};
