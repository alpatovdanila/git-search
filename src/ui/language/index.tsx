import * as React from "react";
import { Circle, Fork } from "../icon";

import { FlexRow, FlexItem } from "../layout";
import colors from "github-language-colors/colors.json";

const getLanguageColor = (language: string) =>
  colors[language] ? colors[language] : "black";

type Props = {
  languageAlias: string;
};

export const Language = ({ languageAlias }: Props) => (
  <FlexRow spacing={4} valignCenter>
    <FlexItem>
      <Circle
        color={getLanguageColor(languageAlias)}
        size={18}
        strokeWidth={1.5}
      />
    </FlexItem>
    <FlexItem>{languageAlias}</FlexItem>
  </FlexRow>
);
