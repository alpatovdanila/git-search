import React from "react";
import styles from "./scroll-container.module.scss";

type Props = {
  maxHeight: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const ScrollContainer = ({
  children,
  className,
  style,
  maxHeight = "200px",
  ...rest
}: Props) => (
  <div
    style={{
      ...style,
      maxHeight: maxHeight,
    }}
    {...rest}
    className={styles.container}
  >
    {children}
  </div>
);
