import style from "./combobox.module.scss";
import { ChevronDown, ChevronUp } from "@/ui/";
import React from "react";

type ChevronProps = {
  up?: boolean;
  onClick: () => void;
};
export const ComboboxChevron = ({ up = false, onClick }: ChevronProps) => {
  return (
    <div className={style.chevron} onClick={onClick}>
      {up ? (
        <ChevronUp size={14} strokeWidth={1.5} />
      ) : (
        <ChevronDown size={14} strokeWidth={1.5} />
      )}
    </div>
  );
};
