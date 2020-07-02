import React from "react";
import style from "./link.module.scss";
import cn from "classnames";
export const Link = ({
  children,
  className,
  to,
  onClick,
  ...rest
}: React.LinkHTMLAttributes<HTMLAnchorElement> & { to?: string }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (to) {
      e.preventDefault();
      window.history.pushState({}, "", to);
    } else {
      onClick && onClick(e);
    }
  };
  return (
    <a {...rest} className={cn(style.link, className)} onClick={handleClick}>
      {children}
    </a>
  );
};
