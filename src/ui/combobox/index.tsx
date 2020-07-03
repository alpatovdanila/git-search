import React, { useState, createRef, useEffect } from "react";
import cn from "classnames";
import { useClickAway } from "react-use";
import { InputSize, InputText } from "@/ui/";
import style from "./combobox.module.scss";
import { ComboboxChevron } from "./combobox-chevron";
import { ComboboxList } from "./combobox-list";
import { ComboboxValue } from "./combobox-value";
import { useFilteredOptions } from "./useFilteredOptions";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.currentTarget.value);

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
            onChange={handleInputChange}
            value={query}
            ref={inputRef}
            size={size}
            onKeyDown={handleInputKeyDown}
            onBlur={deactivate}
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
