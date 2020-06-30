import React from "react";
import { FlexItem, FlexRow, TextLabel } from "@/ui/";
import { Link } from "@/ui/link";

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
