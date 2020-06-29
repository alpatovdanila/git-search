import * as React from "react";
import { Fork } from "../icon";
import { TextLabel } from "../text-label";
import { FlexRow, FlexItem } from "../layout";

export const ForksCount = ({ forks }) => {
  return (
    <FlexRow spacing={2} verticalAlign={"middle"}>
      <FlexItem>
        <TextLabel>
          <Fork fill={"currentColor"} size={18} />
        </TextLabel>
      </FlexItem>
      <FlexItem>
        <TextLabel>{forks}</TextLabel>
      </FlexItem>
    </FlexRow>
  );
};
