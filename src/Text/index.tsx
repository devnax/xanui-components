'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useBreakpointProps, useBreakpointPropsType } from '@xanui/core';


export type TextProps<T extends TagComponentType = "p"> = TagProps<T> & {
    variant?: useBreakpointPropsType<"text" | "button" | "small" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6">
}

const Text = React.forwardRef(<T extends TagComponentType = "p">({ children, variant, ...props }: TextProps<T>, ref?: React.Ref<any>) => {
    const _p: any = {}
    if (variant) _p.variant = variant
    const p: any = useBreakpointProps(_p)
    variant = p.variant ?? 'text'

    return (
        <Tag
            component={(variant === 'text' || variant === 'small' ? "p" : variant) as any}
            {...props}
            sxr={{
                fontSize: variant,
                lineHeight: variant,
                fontWeight: variant,
                color: "text.primary",
                ...(props as any)?.sx
            }}
            baseClass='text'
            ref={ref}
        >{children}</Tag>
    )
})

export default Text
