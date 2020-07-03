import React, { forwardRef, useEffect, useState } from "react";
import styles from "./input-text.module.scss";
import cn from "classnames";

export type InputSize = "l" | "xl";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  transparent?: boolean;
  block?: boolean;
  size?: InputSize;
};

const Component = (
  {
    className,
    transparent = false,
    block = false,
    value,
    size,
    ...rest
  }: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  const cns = cn(styles.input, {
    [styles.transparent]: transparent,
    [styles.block]: block,
    [styles[`size_${size}`]]: size,
  });

  return (
    <input {...rest} type="text" value={value} className={cns} ref={ref} />
  );
};

export const InputText = forwardRef(Component);
