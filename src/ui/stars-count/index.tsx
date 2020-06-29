import * as React from "react";

import { StarOutline } from "../icon";
import { TextLabel } from "../text-label";
import { FlexRow, FlexItem } from "../layout";

export const StarsCount = ({ stars = 0 }) => {
  return (
    <FlexRow spacing={2} valignCenter>
      <FlexItem>
        <TextLabel>
          <StarOutline size={18} fill="currentColor" />
        </TextLabel>
      </FlexItem>
      <FlexItem>
        <TextLabel>{stars}</TextLabel>
      </FlexItem>
    </FlexRow>
  );
};
