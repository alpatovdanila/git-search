import React from "react";
import { FlexItem, FlexRow } from "@/ui/layout";
import { TextLabel } from "@/ui/text-label";
export const Footer = () => (
  <FlexRow spacing={16} alignCenter block>
    <FlexItem>
      <span role={"img"} aria-label={"Waving hand"}>
        🖐
      </span>
      <TextLabel>
        <a href="//github.com/alpatovdanila/git-search" target="_blank">
          Danila Alpatov
        </a>
      </TextLabel>
    </FlexItem>
  </FlexRow>
);
