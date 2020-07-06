import * as React from "react";
import cn from "classnames";
import styles from "./layout.module.scss";

export type FlexProps = {
  spacing?: 2 | 4 | 8 | 16 | 20 | 24 | 28 | 32 | 48;
  block?: boolean;
  fullHeight?: boolean;
  wrap?: boolean;
  col?: boolean;
  alignCenter?: boolean;
  valignCenter?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export type FlexItemProps = {
  block?: boolean;
  col?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
} & React.HTMLAttributes<HTMLDivElement>;

export const FlexItem = ({
  block = false,
  col,
  children,
  ...props
}: FlexItemProps) => {
  const cns = cn(styles.flexItem, {
    [styles.blockItem]: block,
    [styles[`col_${col}`]]: col,
  });
  return (
    <div {...props} className={cns}>
      {children}
    </div>
  );
};

const Flex = ({
  children,
  spacing,
  wrap = false,
  alignCenter = false,
  valignCenter = false,
  col = false,
  block = false,
  fullHeight = false,
}: FlexProps & { col?: boolean }) => {
  const classNames = cn({
    [styles.flexRow]: !col,
    [styles.flexCol]: col,
    [styles[`spacing${spacing}`]]: spacing,
    [styles.wrap]: wrap,
    [styles.alignCenter]: alignCenter,
    [styles.valignCenter]: valignCenter,
    [styles.block]: block,
    [styles.fullHeight]: fullHeight,
  });
  return <div className={classNames}>{children}</div>;
};

export const FlexRow = ({ children, ...props }: FlexProps) => (
  <Flex {...props}>{children}</Flex>
);

export const FlexCol = ({ children, ...props }: FlexProps) => (
  <Flex {...props} col>
    {children}
  </Flex>
);
