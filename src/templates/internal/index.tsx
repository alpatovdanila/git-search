import styles from "./internal.module.scss";
import React from "react";

export const InternalTemplate = ({
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={styles.template}>
    <main className={styles.content}>{children}</main>
  </div>
);
