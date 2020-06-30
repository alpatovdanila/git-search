import React from "react";
import { ChevronDown, ChevronUp } from "@/ui/icon";
import { ListItem, List } from "@/ui/list";
import style from "@/ui/combobox/combobox.module.scss";
import { ComboboxOption, ComboboxOptions } from "@/ui/combobox/index";

type ChevronProps = {
  up?: boolean;
  onClick: () => void;
};
export const ComboboxChevron = ({ up = false, onClick }: ChevronProps) => {
  return (
    <div className={style.chevron} onClick={onClick}>
      {up ? (
        <ChevronUp size={14} strokeWidth={1.5} />
      ) : (
        <ChevronDown size={14} strokeWidth={1.5} />
      )}
    </div>
  );
};

type ComboboxValueProps = {
  value?: string | null;
  placeholder: string;
  onClick: () => void;
};
export const ComboboxValue = ({
  value,
  placeholder,
  onClick,
}: ComboboxValueProps) => (
  <div className={style.value} onClick={onClick}>
    {value ? value : placeholder}
  </div>
);

type ComboboxListProps = {
  options: ComboboxOptions;
  onItemClick: (option: ComboboxOption) => void;
};
export const ComboboxList = ({ options, onItemClick }: ComboboxListProps) => (
  <List>
    {options.map((option, index) => (
      <ListItem
        key={option.key ? option.key : index}
        onClick={() => onItemClick(option)}
      >
        {option.label}
      </ListItem>
    ))}
  </List>
);
