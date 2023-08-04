import { component$ } from "@builder.io/qwik";
import { NotionClientRenderer } from "./react-wrapper";
import type { ExtendedRecordMap } from "notion-types";
import { StyledNotionClientRenderer } from "./styled-react-wrapper";

export const NRenderer = component$(
  (props: {
    recordMap: ExtendedRecordMap;
    class?: string;
    styled?: boolean;
    dark?: boolean;
  }) => {
    return props.styled ? (
      <StyledNotionClientRenderer
        darkMode={props.dark}
        class={props.class}
        recordMap={props.recordMap}
      />
    ) : (
      <NotionClientRenderer
        darkMode={props.dark}
        class={props.class}
        recordMap={props.recordMap}
      />
    );
  }
);
