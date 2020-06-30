import React from "react";
import styles from "./icon.module.scss";
import { ReactComponent as SearchSvg } from "./search.svg";
import { ReactComponent as StarSvg } from "./star.svg";
import { ReactComponent as ForkSvg } from "./git-branch.svg";
import { ReactComponent as CircleSvg } from "./circle.svg";
import { ReactComponent as ChevronDownSvg } from "./chevron-down.svg";
import { ReactComponent as ChevronUpSvg } from "./chevron-up.svg";
import { ReactComponent as HalfCircleSvg } from "./half-circle.svg";

type IconProps = React.SVGAttributes<SVGSVGElement> & {
  size?: number;
  color?: string;
};

type StrokedIconProps = IconProps & { strokeWidth?: number };

export const asStrokedIcon = (
  Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
) => ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  ...rest
}: StrokedIconProps) => (
  <Component
    width={size}
    height={size}
    stroke={color}
    strokeWidth={strokeWidth}
    className={styles.icon}
    {...rest}
  />
);

export const asFilledIcon = (
  Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
) => ({ size = 24, color = "currentColor", ...rest }: IconProps) => (
  <Component
    width={size}
    height={size}
    fill={color}
    className={styles.icon}
    {...rest}
  />
);

export const ChevronDown = asStrokedIcon(ChevronDownSvg);
export const ChevronUp = asStrokedIcon(ChevronUpSvg);
export const Search = asStrokedIcon(SearchSvg);
export const StarOutline = asStrokedIcon(StarSvg);
export const Fork = asStrokedIcon(ForkSvg);
export const Circle = asStrokedIcon(CircleSvg);
export const HalfCircle = asStrokedIcon(HalfCircleSvg);
