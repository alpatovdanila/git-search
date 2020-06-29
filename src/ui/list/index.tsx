import React from "react";
import styles from './list.module.scss';


export const List = ({children, className, ...rest}: React.HTMLAttributes<HTMLDivElement>) => <div {...rest}
                                                                                                   className={styles.list}>{children}</div>

export const ListItem = ({active = false, children, className, ...rest}: React.HTMLAttributes<HTMLDivElement> & { active?: boolean }) =>
    <div
        {...rest}
        className={styles.listItem + (active ? ` ${styles.active}` : '')}
    >{children}</div>