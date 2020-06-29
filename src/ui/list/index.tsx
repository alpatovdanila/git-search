import React from "react";
import styles from "./list.module.scss";

export const List = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...rest} className={styles.list}>
    {children}
  </div>
);

export const ListItem = ({
  focus = false,
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { focus?: boolean }) => (
  <div
    {...rest}
    className={styles.listItem + (focus ? ` ${styles.focus}` : "")}
  >
    {children}
  </div>
);
