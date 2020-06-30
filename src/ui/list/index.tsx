import React from "react";
import cn from "classnames";
import style from "./list.module.scss";

export const List = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...rest} className={style.list}>
    {children}
  </div>
);

export const ListItem = ({
  focus = false,
  children,
  disabled = false,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  focus?: boolean;
  disabled?: boolean;
}) => (
  <div
    {...rest}
    className={cn(style.listItem, {
      [style.disabled]: disabled,
      [style.focus]: focus,
    })}
  >
    {children}
  </div>
);
