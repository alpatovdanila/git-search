import React, { useMemo } from "react";
import { Link } from "@/ui/link";
import { FlexItem, FlexRow } from "@/ui";

type Props = {
  pagesCount: number;
  activePage: number;
  onPageChange: (page: number) => void;
};

export const Paginator = ({ pagesCount, activePage, onPageChange }: Props) => {
  const pages = useMemo<number[]>(() => {
    return Array.from({ length: pagesCount }, (_, i) => i + 1);
  }, [pagesCount]);

  return (
    <FlexRow spacing={8} wrap>
      {pages.map((pageNumber) => (
        <FlexItem>
          <Link onClick={() => onPageChange(pageNumber)}>{pageNumber}</Link>
        </FlexItem>
      ))}
    </FlexRow>
  );
};
