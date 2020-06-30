import cn from "classnames";
import style from "@/ui/combobox/combobox.module.scss";
import React from "react";

type ComboboxValueProps = {
  value?: string | null;
  placeholder: string;
  onClick: () => void;
};
export const ComboboxValue = ({
  value,
  placeholder,
  onClick,
}: ComboboxValueProps) => (
  <div
    className={cn(style.value, { [style.placeholder]: placeholder && !value })}
    onClick={onClick}
  >
    {value ? value : placeholder}
  </div>
);
