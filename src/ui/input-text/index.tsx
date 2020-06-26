import React, {createRef, forwardRef, useEffect, useState} from "react";
import styles from './input-text.module.scss';
import cn from 'classnames'

type Props = {
    transparent?: boolean,
    block?: boolean,
    onDebouncedChange?: (value: any) => void,
    debounceChangeTimeout?: number
} & React.ButtonHTMLAttributes<HTMLInputElement>

const InputComponent = ({className, transparent = false, block = false, value, onChange, onDebouncedChange, debounceChangeTimeout = 250, ...rest}: Props, ref: React.Ref<HTMLInputElement>) => {

    const [debouncedValue, setDebouncedValue] = useState(value);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        setDebouncedValue(e.currentTarget.value);
    }

    useEffect(() => {
        const t = setTimeout(() => {
            onDebouncedChange && onDebouncedChange(debouncedValue);
        }, debounceChangeTimeout);

        return () => clearTimeout(t);
    }, [debouncedValue])

    const cns = cn(styles.input, {
        [styles.transparent]: transparent,
        [styles.block]: block,
    });



    return <input {...rest} type="text" value={debouncedValue} onChange={handleChange} className={cns} ref={ref}/>
}

export const InputText = forwardRef(InputComponent);
