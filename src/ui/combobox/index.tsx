import React, { useState, useMemo, createRef, useEffect } from "react";
import cn from "classnames";
import { useClickAway } from "react-use";
import { ScrollContainer } from "@/ui/scroll-container";
import { InputSize, InputText } from "@/ui/input-text";
import style from "./combobox.module.scss";

import {
  ComboboxChevron,
  ComboboxList,
  ComboboxValue,
} from "@/ui/combobox/parts";

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
  placeholder?: string;
};

export const Combobox = ({
  options,
  value = null,
  onChange,
  placeholder = "",
  transparent = false,
  block = false,
  size,
}: Props) => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);

  const inputRef = createRef<HTMLInputElement>();
  const containerRef = createRef<HTMLDivElement>();

  const activate = () => setActive(true);

  const deactivate = () => {
    setActive(false);
    setQuery("");
  };

  const handleOptionSelect = (option: ComboboxOption) => {
    onChange(option.value);
    deactivate();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") deactivate();
  };

  // Filter options
  const filteredOptions = useMemo<ComboboxOption[]>(() => {
    return options.filter((option: ComboboxOption) => {
      if (!query || !query.trim()) return true;
      return option.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }, [query, options]);

  // Focus input on combobox focus
  useEffect(() => {
    if (active && inputRef.current) inputRef.current.focus();
  }, [active]);

  useClickAway(containerRef, deactivate);

  const cns = cn(style.combobox, {
    [style[`size_${size}`]]: size,
    [style.transparent]: transparent,
    [style.focus]: active,
    [style.block]: block,
  });

  return (
    <div className={cns} ref={containerRef}>
      {active && (
        <>
          <InputText
            onDebouncedChange={setQuery}
            value={query}
            ref={inputRef}
            size={size}
            onKeyDown={handleInputKeyDown}
            block
            transparent
          />
          <div className={style.dropdown}>
            <ScrollContainer maxHeight={"300px"}>
              <ComboboxList
                options={filteredOptions}
                onItemClick={handleOptionSelect}
              />
            </ScrollContainer>
          </div>
        </>
      )}

      {!active && (
        <ComboboxValue
          value={value}
          placeholder={placeholder}
          onClick={activate}
        />
      )}

      <ComboboxChevron
        up={active}
        onClick={() => (active ? deactivate() : activate())}
      />
    </div>
  );
};
