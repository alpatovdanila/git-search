import React from "react";

import { StarOutline } from "../icon";

import { FlexRow, FlexItem } from "../layout";

export const StarsCount = ({ stars = 0 }) => {
  return (
    <FlexRow spacing={4} valignCenter>
      <FlexItem>
        <StarOutline color="currentColor" />
      </FlexItem>
      <FlexItem>{stars}</FlexItem>
    </FlexRow>
  );
};