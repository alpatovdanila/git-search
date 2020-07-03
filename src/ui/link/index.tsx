import React from "react";
import style from "./link.module.scss";
import cn from "classnames";
import { useLocation } from "wouter";

export const Link = ({
  children,
  className,
  to,
  onClick,
  ...rest
}: React.LinkHTMLAttributes<HTMLAnchorElement> & { to?: string }) => {
  const [_, setLocation] = useLocation();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (to) {
      e.preventDefault();
      setLocation(to);
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
