'use client'
import React, { ReactElement } from 'react'
import Scrollbar, { ScrollbarProps } from '../Scrollbar'
import { Tag, TagProps, TagComponentType, useInterface, useBreakpointProps, useBreakpointPropsType } from '@xanui/core';


export type ViewBoxProps<T extends TagComponentType = "div"> = TagProps<T> & {
    startContent?: useBreakpointPropsType<ReactElement>;
    endContent?: useBreakpointPropsType<ReactElement>;
    horizental?: useBreakpointPropsType<boolean>;
    slotProps?: {
        scrollbar?: Omit<ScrollbarProps, 'children'>;
    }
}


const ViewBox = React.forwardRef(({ children, ...rest }: ViewBoxProps, ref?: any) => {
    let [{ startContent, endContent, slotProps, horizental, ...props }] = useInterface<any>("ViewBox", rest, {})
    const _p: any = {}
    if (startContent) _p.startContent = startContent
    if (endContent) _p.endContent = endContent
    if (horizental) _p.horizental = horizental
    const p: any = useBreakpointProps(_p)
    startContent = p.startContent
    endContent = p.endContent
    horizental = p.horizental

    return (
        <Tag
            {...props}
            sxr={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: horizental ? "row" : "column"
            }}
            baseClass='viewbox'
            ref={ref}
        >
            {startContent && <Tag baseClass='viewbox-start-content' flexBox flexDirection={horizental ? "row" : "column"}>{startContent}</Tag>}
            <Scrollbar
                {...slotProps?.scrollbar}
                className='viewbox-content'
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: horizental ? "row" : "column",
                    ...(slotProps?.scrollbar?.style || {})
                }}
            >
                {children}
            </Scrollbar>
            {endContent && <Tag baseClass='viewbox-end-content' flexBox flexDirection={horizental ? "row" : "column"}>{endContent}</Tag>}
        </Tag>
    )
})

export default ViewBox
