import type { BaseElement, BaseText, BaseEditor } from "slate";
import type { ReactEditor } from "slate-react";

declare module "slate" {
  interface CustomTypes {
    Editor: (BaseEditor | ReactEditor) & {
      id?: string;
      type?: string;
    };
    Element: BaseElement & {
      id?: string;
      type?: string;
      src?: string;
    };
    Text: BaseText & {
      text: string;
      bold?: boolean;
      quote?: boolean;
      italic?: boolean;
      underline?: boolean;
      code?: boolean;
    };
  }
}
