import type { ReactElement } from "react"

interface SidebarProps{

    Icon : ReactElement,
    title : string,
    size : "sm" | "md" | "lg",
    hover? : string
}

const titleSizeStyles = {
    sm : "text-md",
    md : "text-xl",
    lg : "text-3xl"
}

export const Sidebar = (props : SidebarProps)=>{

    const classes = props.hover === "true" ? "hover:bg-gray-200" : ""

    return <div className={"cursor-pointer pl-8 py-2 flex justify-start items-center " + classes}>
        <div>{props.Icon}</div>
        <div className={titleSizeStyles[props.size] + " ml-2 font-semibold"}>{props.title}</div>
    </div>
}