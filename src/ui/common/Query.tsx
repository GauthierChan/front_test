import React, {useEffect, useRef, useState} from 'react';
import type {FC, ChangeEvent, KeyboardEvent, FocusEvent} from 'react';
import {IconButton, InputBase} from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

interface QueryProps {
    disabled: boolean;
    autoFocusOnMount: boolean;
    onChange: (newQuery: string) => void;
    onlyWhenEnterPressed: boolean; // If true: onChange will be called only when enter is pressed, otherwise on every press
    value: string;
}

const QueryRoot = styled('div')(
    (({theme}) => ({
        alignItems: 'center',
        backgroundColor: 'background.paper',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '25px',
        boxShadow: "0 0.1px 6px 0.1px rgba(33, 56, 97, 0.3)",
        display: 'flex',
        height: 42,
        width: '100%'
    }))
);


export const Query: FC<QueryProps> = (props) => {
    const {disabled, autoFocusOnMount, onChange, onlyWhenEnterPressed, value, ...other} = props;
    const [autoFocus, setAutoFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [tempValue, setTempValue] = useState('');

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    useEffect(() => {
        if (!disabled && autoFocus && inputRef?.current) {
            inputRef.current.focus();
        }
    }, [disabled]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTempValue(event.target.value);
    };

    const handleKeyup = (event: KeyboardEvent<HTMLInputElement>): void => {
        if(tempValue ===''){
            onChange(tempValue)
        }else if(onlyWhenEnterPressed) {
            if (event.keyCode === 13 && onChange) {
                onChange(tempValue);
            }
        }else {
            onChange(tempValue);
        }

    };

    const handleFocus = (): void => {
        setAutoFocus(true);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
        /*
         There is a situation where an input goes from not disabled to disabled and DOM emits a blur
         event, with event as undefined. This means, that sometimes we'll receive an React Synthetic
         event and sometimes undefined because when DOM triggers the event, React is unaware of it,
         or it simply does not emit the event. To bypass this behaviour, we store a local variable
         that acts as autofocus.
         */

        if (event) {
            setAutoFocus(false);
        }
    };

    return (
        <QueryRoot {...other}>

            <InputBase
                disabled={disabled}
                autoFocus={autoFocusOnMount}
                fullWidth={true}
                inputProps={{
                    ref: inputRef,
                    sx: {
                        height: '100%',
                        p: 2,
                        '&::placeholder': {
                            color: '#C4C4C4',
                            fontSize: '12px',
                            opacity: 1
                        }
                    }
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onKeyUp={handleKeyup}
                placeholder="Chercher un produit"
                value={tempValue}
            />
            <IconButton
                aria-label="recherche"
                sx={{ height: '32px', width: '32px', m: 1, backgroundColor: '#00FFB3',}}
                onClick={() => {onChange(tempValue);}}
            >
                <SearchIcon
                    sx={{ color:'#FFFFFF', borderRadius: '12px'}}
                    fontSize="medium"
                />
            </IconButton>

        </QueryRoot>
    );
};