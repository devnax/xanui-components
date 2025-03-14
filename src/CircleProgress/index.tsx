"use client"
import React, { ReactElement, useId } from "react"
import { Tag, ColorTemplateColors, useInterface, useBreakpointProps, useBreakpointPropsType } from '@xanui/core';

export type CircleProgressProps = {
    children?: ReactElement;
    color?: useBreakpointPropsType<ColorTemplateColors>;
    trackColor?: useBreakpointPropsType<ColorTemplateColors>;
    thumbColor?: useBreakpointPropsType<ColorTemplateColors>;
    size?: useBreakpointPropsType<number | "small" | "medium" | "large">;
    thumbSize?: useBreakpointPropsType<number>;
    trackSize?: useBreakpointPropsType<number>;
    value?: useBreakpointPropsType<number>;
    hideTrack?: useBreakpointPropsType<boolean>;
    showPercentage?: useBreakpointPropsType<boolean>;
    speed?: useBreakpointPropsType<number>;
}

const CircleProgress = React.forwardRef(({ children, ...props }: CircleProgressProps, ref: React.Ref<any>) => {
    let [{ color, trackColor, thumbColor, size, value, thumbSize, hideTrack, trackSize, showPercentage, speed }] = useInterface<any>("CircleProgress", props, {})
    const _p: any = {}
    if (color) _p.color = color
    if (trackColor) _p.trackColor = trackColor
    if (thumbColor) _p.thumbColor = thumbColor
    if (size) _p.size = size
    if (thumbSize) _p.thumbSize = thumbSize
    if (trackSize) _p.trackSize = trackSize
    if (value) _p.value = value
    if (hideTrack) _p.hideTrack = hideTrack
    if (showPercentage) _p.showPercentage = showPercentage
    if (speed) _p.speed = speed
    const p: any = useBreakpointProps(_p)

    color = p.color ?? "brand"
    trackColor = p.trackColor
    thumbColor = p.thumbColor
    size = p.size ?? "medium"
    thumbSize = p.thumbSize ?? 4
    trackSize = p.trackSize
    value = p.value
    hideTrack = p.hideTrack
    showPercentage = p.showPercentage
    speed = p.speed ?? 1.3

    if (trackColor === 'default') {
        trackColor = "divider"
    }

    if (thumbColor === 'default') {
        thumbColor = "background.secondary"
    }

    let sizes: any = {
        small: 24,
        medium: 32,
        large: 44
    }
    if (typeof size === 'string' && sizes[size]) {
        size = sizes[size]
    }

    let isVal = typeof value === 'number'
    const animrotate = "anim" + useId().replaceAll(":", "")
    const animdash = "anim" + useId().replaceAll(":", "")
    if (isVal && (value as number) > 100) value = 100
    const circumference = 125.66370614359172 //radius * 2 * Math.PI
    const percent = circumference - ((value || 0) / 100) * circumference

    if (showPercentage && !children) {
        children = <Tag
            sxr={{
                color: color === 'default' ? "text.primary" : `${color}.primary`,
                fontSize: size / 4
            }}
        >{value}%</Tag>
    }

    return (
        <Tag
            baseClass='circle-progress'
            sxr={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                "& svg[class='circle-progress-svg']": {
                    zIndex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transform: isVal ? "rotate(-90deg)" : "none",
                    transformOrigin: isVal ? "center" : "initial",
                    animation: isVal ? "none" : `${animrotate} ${speed}s linear infinite`,
                    [`@keyframes ${animrotate}`]: {
                        "100%": {
                            transform: "rotate(360deg)"
                        }
                    },
                    "& circle.circle-progress-thumb": {
                        strokeDasharray: circumference,
                        strokeDashoffset: percent,
                        stroke: thumbColor || (color === 'default' ? `background.secondary` : `${color}.primary`),
                        fill: "none",
                        strokeWidth: thumbSize,
                        strokeLinecap: "round",
                        animation: isVal ? "none" : `${animdash} ${speed}s ease-in-out infinite`,
                        [`@keyframes ${animdash}`]: {
                            "0%": { strokeDasharray: "1, 150", strokeDashoffset: 0 },
                            "50%": { strokeDasharray: "90, 150", strokeDashoffset: -35 },
                            "100%": { strokeDasharray: "90, 150", strokeDashoffset: -124 }
                        }
                    },
                    "& circle.circle-progress-track": {
                        fill: "none",
                        stroke: trackColor || (color === 'default' ? `divider` : `${color}.alpha`),
                        strokeWidth: trackSize ?? thumbSize,
                    }
                },
                width: size,
                height: size,
                position: "relative"
            }}
            ref={ref}
        >
            <svg viewBox="0 0 50 50" className="circle-progress-svg">
                {!hideTrack && <circle className="circle-progress-track" cx="25" cy="25" r={20} />}
                <circle className="circle-progress-thumb" cx="25" cy="25" r={20} />
            </svg>
            {!!children && <Tag
                baseClass="circle-progress-content"
                sxr={{
                    zIndex: 2,
                    width: size - thumbSize,
                    height: size - thumbSize,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    '& *': {
                        maxWidth: size - (thumbSize + 8),
                        maxHeight: size - (thumbSize + 8),
                    }
                }}
            >
                {children}
            </Tag>}
        </Tag >
    )
})

export default CircleProgress

