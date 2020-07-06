import React from "react";
import style from "./link.module.scss";
import cn from "classnames";
import { useLocation } from "wouter";

type Props = {
  to?: string;
  active?: boolean;
  variant?: "select";
} & React.LinkHTMLAttributes<HTMLAnchorElement>;

export const Link = ({
  children,
  active = false,
  className,
  variant,
  to,
  onClick,
  ...rest
}: Props) => {
  const [_, setLocation] = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (to) {
      e.preventDefault();
      setLocation(to);
    } else {
      onClick && onClick(e);
    }
  };

  const cns = cn(style.link, className, {
    [style.active]: active,
    [style[`variant_${variant}`]]: variant,
  });

  return (
    <a {...rest} className={cns} onClick={handleClick}>
      {children}
    </a>
  );
};
