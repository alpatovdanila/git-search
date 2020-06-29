import React from "react";
import styles from "./icon.module.scss";
import cn from "classnames";
import { ReactComponent as SearchSvg } from "./search.svg";
import { ReactComponent as StarSvg } from "./star.svg";
import { ReactComponent as ForkSvg } from "./git-branch.svg";
import { ReactComponent as CircleSvg } from "./circle.svg";
import { ReactComponent as TailSpinSvg } from "./tail_spin.svg";
import { ReactComponent as ChevronDownSvg } from "./chevron-down.svg";
import { ReactComponent as ChevronUpSvg } from "./chevron-up.svg";

type Props = {
  size?: number;
  fill?: string;
  spin?: boolean;
} & React.SVGAttributes<SVGSVGElement>;

export const asIcon = (
  Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
) => ({ size = 24, fill = "currentColor", spin = false, ...rest }: Props) => (
  <Component
    width={size}
    height={size}
    fill={fill}
    className={cn(styles.icon, { [styles.spin]: spin })}
    {...rest}
  />
);

export const ChevronDown = asIcon(ChevronDownSvg);
export const ChevronUp = asIcon(ChevronUpSvg);
export const Search = asIcon(SearchSvg);
export const TalSpin = asIcon(TailSpinSvg);
export const StarOutline = asIcon(StarSvg);
export const Fork = asIcon(ForkSvg);
export const Circle = asIcon(CircleSvg);
