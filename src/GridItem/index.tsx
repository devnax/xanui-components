'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType } from '@xanui/core';

export type GridItemProps<T extends TagComponentType = "div"> = TagProps<T> & {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

const GridItem = React.forwardRef(<T extends TagComponentType = "div">({ children, xs, sm, md, lg, xl, ...rest }: GridItemProps<T>, ref?: React.Ref<any>) => {

    let w: any = {}

    xs && (w.xs = (100 / 12 * xs) + "%")
    sm && (w.sm = (100 / 12 * sm) + "%")
    md && (w.md = (100 / 12 * md) + "%")
    lg && (w.lg = (100 / 12 * lg) + "%")
    xl && (w.xl = (100 / 12 * xl) + "%")

    return (
        <Tag
            ref={ref}
            {...rest}
            maxWidth={w}
            flexBasis={w}
            flexGrow={0}
            baseClass="grid-item"
        >
            {children}
        </Tag>
    )
})

export default GridItem