import React from "react";
import { FlexItem, FlexRow, TextLabel, Link } from "@/ui/";

export const Footer = () => (
  <FlexRow spacing={16} alignCenter block>
    <FlexItem>
      <span role={"img"} aria-label={"Waving hand"}>
        🖐
      </span>
      <TextLabel>
        <Link href="//github.com/alpatovdanila/git-search">Danila Alpatov</Link>
      </TextLabel>
    </FlexItem>
  </FlexRow>
);
