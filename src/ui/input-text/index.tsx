import React from "react";
import styles from './input-text.module.scss';
import cn from 'classnames'

type Props = {
    transparent?:boolean,
    block?:boolean,
    onEnter?:(e:React.KeyboardEvent) => void,
} & React.ButtonHTMLAttributes<HTMLInputElement>

export const InputText = ({className, transparent = false, block = false, onEnter, onKeyDown, ...rest} : Props) => {
    const cns = cn(styles.input, {
        [styles.transparent]:transparent,
        [styles.block]:block,
    });

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'enter' && onEnter) onEnter(e);
        if(onKeyDown) onKeyDown(e);
    }

    return <input {...rest} onKeyDown={onKeyDown} type="text" className={cns} />
}