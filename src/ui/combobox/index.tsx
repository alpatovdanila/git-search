import React, { useState, useMemo, createRef, useEffect } from "react";
import { InputSize, InputText } from "@/ui/input-text";
import style from "./combobox.module.scss";
import { useClickAway } from "react-use";
import { List, ListItem } from "@/ui/list";
import { ScrollContainer } from "@/ui/scroll-container";

import { ChevronDown, ChevronUp } from "@/ui/icon";
import cn from "classnames";

export type ComboboxOption = {
  value: string;
  label: string;
  key?: React.Key;
};

export type ComboboxOptions = ComboboxOption[];

type Props = {
  options: ComboboxOptions;
  value: string | null;
  size?: InputSize;
  onChange: (value: string) => void;
  transparent?: boolean;
  block?: boolean;
  emptyItem?: null | string;
};

export const Combobox = ({
  options,
  value = null,
  onChange,
  emptyItem = null,
  transparent = false,
  block = false,
  size,
}: Props) => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [focusedItemIndex, setFocusedItemIndex] = useState(0);
  const inputRef = createRef<HTMLInputElement>();
  const containerRef = createRef<HTMLDivElement>();

  const activate = () => {
    setActive(true);
  };

  const deactivate = () => {
    setActive(false);
    setQuery("");
  };

  const handleOptionSelect = (option: ComboboxOption) => {
    onChange(option.value);
    deactivate();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") setFocusedItemIndex(focusedItemIndex + 1);
    if (event.key === "ArrowUp") setFocusedItemIndex(focusedItemIndex - 1);
  };

  const filteredOptions = useMemo<ComboboxOption[]>(() => {
    return options.filter((option: ComboboxOption) => {
      if (!query || !query.trim()) return true;
      return option.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }, [query, options]);

  useEffect(() => {
    if (active && inputRef.current) inputRef.current.focus();
  }, [active]);

  useClickAway(containerRef, deactivate);

  const cns = cn(style.combobox, {
    [style[`size_${size}`]]: size,
    [style.transparent]: transparent,
    [style.focus]: active,
  });

  return (
    <div className={cns} ref={containerRef}>
      {active ? (
        <InputText
          onDebouncedChange={setQuery}
          value={query}
          ref={inputRef}
          size={size}
          onKeyDown={handleInputKeyDown}
          block
          transparent
        />
      ) : (
        <div className={style.value} onClick={() => setActive(true)}>
          {value || emptyItem}
        </div>
      )}
      <div
        className={style.chevron}
        onClick={() => (active ? deactivate() : activate())}
      >
        {!active ? <ChevronDown /> : <ChevronUp />}
      </div>

      {active && (
        <div className={style.dropdown}>
          <ScrollContainer maxHeight={"300px"}>
            <List>
              {options.map((option, index) => (
                <ListItem
                  focus={focusedItemIndex === index}
                  key={option.key ? option.key : index}
                  onClick={() => handleOptionSelect(option)}
                  onMouseOver={() => setFocusedItemIndex(index)}
                >
                  {option.label}
                </ListItem>
              ))}
            </List>
          </ScrollContainer>
        </div>
      )}
    </div>
  );
};

type ItemProps = {
  options: ComboboxOption[];
  onOptionClick: (option: ComboboxOption) => void;
};
