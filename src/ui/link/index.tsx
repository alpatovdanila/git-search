import React from "react";
import style from "./link.module.scss";
import cn from "classnames";
export const Link = ({
  children,
  className,
  ...rest
}: React.LinkHTMLAttributes<HTMLAnchorElement>) => (
  <a {...rest} className={cn(style.link, className)}>
    {children}
  </a>
);
