import React, {useState, useMemo, createRef, useEffect, memo, useCallback} from 'react';
import {InputText} from "@/ui/input-text";
import style from './combobox.module.scss';
import {useClickAway} from 'react-use';
import {List, ListItem} from "@/ui/list";
import {ScrollContainer} from "@/ui/scroll-container";


export type ComboboxOption = {
    value: string,
    label: string | number,
    key?: React.Key
}

export type ComboboxOptions = ComboboxOption[];

type Props = {
    options: ComboboxOptions,
    value: string | null,
    onChange: (value: string) => void,
    transparent?: boolean,
    block?: boolean,
    emptyItem?: null | string,
}

export const Combobox = ({options, value = null, onChange, transparent = false, block = false, emptyItem = null}: Props) => {
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(false);

    const inputRef = createRef<HTMLInputElement>();
    const containerRef = createRef<HTMLDivElement>();

    const activate = () => {
        setActive(true)
    };

    const deactivate = () => {
        setActive(false);
        setQuery('')
    };

    const handleOptionSelect = (option: ComboboxOption) => {
        onChange(option.value);
        deactivate();
    }

    const filteredOptions = useMemo<ComboboxOption[]>(() => {
        return options.filter((option: ComboboxOption) => {
            if (!query || !query.trim()) return true;
            return option.value.toLowerCase().indexOf(query.toLowerCase()) > -1
        });
    }, [query, options]);

    useEffect(() => {
        if (active && inputRef.current) inputRef.current.focus();
    }, [active]);

    useClickAway(containerRef, deactivate);

    return <div className={style.combobox} ref={containerRef}>
        {active && (<>
                <InputText onDebouncedChange={setQuery} value={query} ref={inputRef} transparent block/>
                <div className={style.dropdown}>
                    <ScrollContainer maxHeight={'300px'}>
                        <ComboboxOptionsList options={filteredOptions} onOptionClick={handleOptionSelect}/>
                    </ScrollContainer>
                </div>
            </>
        )}
        {!active && <div className={style.listItem} onClick={() => setActive(true)}>{value || emptyItem}</div>}
    </div>
};


type ItemProps = {
    options: ComboboxOption[],
    onOptionClick: (option: ComboboxOption) => void,
}

const ComboboxOptionsList = ({options, onOptionClick}: ItemProps) => {
    return <List>
        {options.map((option, index) => <ListItem
            key={option.key ? option.key : index}
            onClick={() => onOptionClick(option)}>
            {option.label}
        </ListItem>)}
    </List>
};


