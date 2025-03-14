'use client'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { useTagProps, TagProps, TagComponentType, useTheme, ThemeProvider } from '@xanui/core';
export type PortalProps<T extends TagComponentType = "div"> = TagProps<T> & {
    appendTo?: HTMLElement;
    container?: HTMLElement;
}

const Portal = React.forwardRef(<T extends TagComponentType = "div">({ children, component, appendTo, container, ...rest }: PortalProps<T>, ref?: React.Ref<any>) => {
    const [_container, setContainer] = useState<HTMLElement | undefined>(container)
    let props = useTagProps(rest)
    const theme = useTheme()

    useEffect(() => {
        appendTo = appendTo || document.body
        let _con: HTMLElement = _container || document.createElement(component as any || "div");
        appendTo.appendChild(_con);
        for (let prop in props) {
            _con.setAttribute(prop, (props as any)[prop])
        }
        if (!_container) {
            setContainer(_con)
        }
        if (ref) {
            (ref as any).current = _con
        }
        return () => {
            (appendTo as any).removeChild(_con);
        }
    }, [])

    if (!_container) return <></>

    return ReactDOM.createPortal(
        <ThemeProvider theme={theme.name}>
            {children}
        </ThemeProvider>,
        _container,
    );
})

export default Portal