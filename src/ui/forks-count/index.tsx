import React from "react";
import { Fork } from "../icon";

import { FlexRow, FlexItem } from "../layout";

export const ForksCount = ({ forks }: { forks: number }) => {
  return (
    <FlexRow spacing={4} valignCenter>
      <FlexItem>
        <Fork color={"currentColor"} />
      </FlexItem>
      <FlexItem>{forks}</FlexItem>
    </FlexRow>
  );
};
