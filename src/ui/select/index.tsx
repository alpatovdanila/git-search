import React from "react";
import styles from "./select.module.scss";
import cn from "classnames";

export type SelectOption<T> = {
  value: T;
  label: string | number;
  key?: React.Key;
};

export type SelectOptions<T> = SelectOption<T>[];

type Props<T> = {
  options: SelectOptions<T>;
  value: T | null;
  onChange: (value: T) => void;
  transparent?: boolean;
  block?: boolean;
  emptyItem?: null | string;
};

export const Select = <T,>({
  options,
  value = null,
  onChange,
  transparent = false,
  block = false,
  emptyItem = null,
}: Props<T>) => {
  const cns = cn([styles.select], {
    [styles.transparent]: transparent,
    [styles.block]: block,
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value ? options[event.target.value].value : null);
  };

  return (
    <select
      value={value ? options.findIndex((option) => option.value === value) : ""}
      className={cns}
      onChange={handleSelectChange}
    >
      {!!emptyItem && <option value={""}>{emptyItem}</option>}
      <MemoizedSelectOptions options={options} />
    </select>
  );
};

const SelectOptions = <T,>({ options }: { options: SelectOptions<T> }) => (
  <>
    {options.map((option, index) => (
      <option key={option.key ? option.key : index} value={index}>
        {option.label}
      </option>
    ))}
  </>
);

const MemoizedSelectOptions = React.memo(
  SelectOptions,
  (prev, next) => prev.options.length === next.options.length
);
