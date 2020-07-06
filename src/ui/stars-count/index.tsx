import React from "react";

import { Circle, StarOutline } from "../icon";

import { FlexRow, FlexItem } from "../layout";

export const StarsCount = ({ stars = 0 }) => {
  return (
    <FlexRow spacing={4} valignCenter>
      <FlexItem>
        <StarOutline color="currentColor" size={18} strokeWidth={1.5} />
      </FlexItem>
      <FlexItem>{stars}</FlexItem>
    </FlexRow>
  );
};
