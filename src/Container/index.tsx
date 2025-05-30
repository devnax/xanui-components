'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useTheme, useBreakpointProps, useBreakpointPropsType } from '@xanui/core';


export type ContainerProps<T extends TagComponentType = "div"> = TagProps<T> & {
    maxWidth?: useBreakpointPropsType<'lg' | 'md' | "sm" | 'xs'>
}

const Container = React.forwardRef(<T extends TagComponentType = "div">({ children, maxWidth, ...rest }: ContainerProps<T>, ref?: React.Ref<any>) => {
    const _p: any = {}
    if (maxWidth) _p.maxWidth = maxWidth
    const p: any = useBreakpointProps(_p)
    maxWidth = p.maxWidth

    const { breakpoints } = useTheme()
    maxWidth = maxWidth || "lg"
    return (
        <Tag
            {...rest}
            sxr={{
                width: "100%",
                maxWidth: {
                    xs: "100%",
                    [maxWidth as any]: (breakpoints as any)[maxWidth as any]
                },
                mx: "auto",
                px: 2,
            }}
            baseClass="container"
            ref={ref}
        >{children}</Tag>
    )
})

export default Container


