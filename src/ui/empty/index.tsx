import React from "react";
import styles from "./empty.module.scss";

export const Empty = ({
                          children,
                          ...props
                      }: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} className={styles.empty}>
        {children}
    </div>
);