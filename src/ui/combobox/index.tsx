import React, { useState, createRef, useEffect } from "react";
import cn from "classnames";
import { useClickAway } from "react-use";
import { InputSize, InputText } from "@/ui/input-text";
import style from "./combobox.module.scss";
import { ComboboxChevron } from "@/ui/combobox/combobox-chevron";
import { ComboboxList } from "@/ui/combobox/combobox-list";
import { ComboboxValue } from "@/ui/combobox/combobox-value";
import { useFilteredOptions } from "@/ui/combobox/useFilteredOptions";

export type ComboboxOption = {
  value: string | null;
  label: string;
  key?: React.Key;
};

export type ComboboxOptions = ComboboxOption[];

type Props = {
  options: ComboboxOptions;
  value: string | null;
  onChange: (value: string | null) => void;
  size?: InputSize;
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
  const filteredOptions = useFilteredOptions(options, query);
  const inputRef = createRef<HTMLInputElement>();
  const containerRef = createRef<HTMLDivElement>();

  const activate = () => setActive(true);

  const deactivate = () => setActive(false);

  const submit = (value: string | null) => {
    onChange(value);
    deactivate();
  };

  const handleOptionSelect = (option: ComboboxOption) => submit(option.value);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") deactivate();
  };

  useClickAway(containerRef, deactivate);

  useEffect(() => {
    if (active && inputRef.current) inputRef.current.focus();
    if (!active) setQuery("");
  }, [active]);

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
            debounceChangeTimeout={50}
            value={query}
            ref={inputRef}
            size={size}
            onKeyDown={handleInputKeyDown}
            block
            transparent
          />
          <div className={style.dropdown}>
            <ComboboxList
              options={filteredOptions}
              onItemClick={handleOptionSelect}
            />
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
