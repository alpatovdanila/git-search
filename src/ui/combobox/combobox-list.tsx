import { ComboboxOption, ComboboxOptions, List, ListItem } from "@/ui/";

import React, { useEffect, useRef } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";

type ComboboxListProps = {
  options: ComboboxOptions;
  onItemClick: (option: ComboboxOption) => void;
  focusedItemIndex?: number | null;
};
export const ComboboxList = ({
  options,
  onItemClick,
  focusedItemIndex,
}: ComboboxListProps) => {
  // <any> due to the lack of knowledge of how to type ref to react-window instance todo
  const listRef = useRef<any>();

  useEffect(() => {
    if (focusedItemIndex && listRef)
      listRef.current.scrollTo(focusedItemIndex * 32);
  }, [focusedItemIndex, listRef]);

  const ComboboxListItem = ({ index, style }: ListChildComponentProps) => {
    const option = options[index];
    return (
      <div style={style}>
        <ListItem
          key={index}
          onClick={() => onItemClick(option)}
          focus={focusedItemIndex === index}
        >
          {option.label}
        </ListItem>
      </div>
    );
  };

  if (!!options.length)
    return (
      <List>
        <FixedSizeList
          ref={listRef}
          layout={"vertical"}
          itemSize={32}
          // Show 10 items max and shrink container height when items count < 10
          height={Math.min(options.length * 32, 10 * 32)}
          itemCount={options.length}
          width={"100%"}
        >
          {ComboboxListItem}
        </FixedSizeList>
      </List>
    );

  return <ListItem disabled>No options found</ListItem>;
};
