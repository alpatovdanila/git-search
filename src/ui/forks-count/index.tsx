import React from "react";
import { Fork } from "../icon";

import { FlexRow, FlexItem } from "../layout";

export const ForksCount = ({ forks }: { forks: number }) => {
  return (
    <FlexRow spacing={4} valignCenter>
      <FlexItem>
        <Fork color={"currentColor"} size={18} strokeWidth={1.5} />
      </FlexItem>
      <FlexItem>{forks}</FlexItem>
    </FlexRow>
  );
};
