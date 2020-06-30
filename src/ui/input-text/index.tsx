import React, { forwardRef, useEffect, useState } from "react";
import styles from "./input-text.module.scss";
import cn from "classnames";

export type InputSize = "l" | "xl";

type Props = {
  transparent?: boolean;
  block?: boolean;
  onDebouncedChange?: (value: any) => void;
  debounceChangeTimeout?: number;
  size?: InputSize;
} & React.ButtonHTMLAttributes<HTMLInputElement>;

const InputComponent = (
  {
    className,
    transparent = false,
    block = false,
    value,
    size,
    onChange,
    onDebouncedChange,
    debounceChangeTimeout = 250,
    ...rest
  }: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    setDebouncedValue(e.currentTarget.value);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      onDebouncedChange && onDebouncedChange(debouncedValue);
    }, debounceChangeTimeout);

    return () => clearTimeout(t);
  }, [debouncedValue]);

  const cns = cn(styles.input, {
    [styles.transparent]: transparent,
    [styles.block]: block,
    [styles[`size_${size}`]]: size,
  });

  return (
    <input
      {...rest}
      type="text"
      value={debouncedValue}
      onChange={handleChange}
      className={cns}
      ref={ref}
    />
  );
};

export const InputText = forwardRef(InputComponent);
