import * as React from "react";
import { Circle } from "../icon";
import { TextLabel } from "../text-label";
import { FlexRow, FlexItem } from "../layout";
import colors from "github-language-colors/colors.json";

const getLanguageColor = (language: string) =>
  colors[language] ? colors[language] : "black";

type Props = {
  languageAlias: string;
};

export const Language = ({ languageAlias }: Props) => (
  <FlexRow spacing={2} valignCenter>
    <FlexItem>
      <Circle size={18} fill={getLanguageColor(languageAlias)} />
    </FlexItem>
    <FlexItem>
      <TextLabel>{languageAlias}</TextLabel>
    </FlexItem>
  </FlexRow>
);
