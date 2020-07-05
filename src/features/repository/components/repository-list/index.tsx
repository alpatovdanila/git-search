import React from "react";
import { FlexCol, FlexItem, Empty } from "@/ui/";
import { Repository } from "@/features/repository/components/repository";
import type { Repository as RepositoryType } from "@/features/repository/model/repository";

type Props = {
  repositories: RepositoryType[];
};

export const RepositoryList = ({ repositories }: Props) => (
  <FlexCol spacing={48} block>
    {!repositories.length && <Empty>Nothing found</Empty>}
    {repositories.map((repo) => (
      <FlexItem block col={6}>
        <Repository repository={repo} />
      </FlexItem>
    ))}
  </FlexCol>
);
