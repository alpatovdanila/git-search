import React from "react";
import styles from './list.module.scss';

export const List = ({children, className, ...rest} : React.HTMLAttributes<HTMLDivElement>) => <div {...rest} className={styles.list}>{children}</div>

export const ListItem = ({children, className, ...rest} : React.HTMLAttributes<HTMLDivElement>) => <div {...rest} className={styles.listItem}>{children}</div>