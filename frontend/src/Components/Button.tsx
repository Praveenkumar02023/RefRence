import type { ReactElement } from "react"

interface buttonProps{
    type : "primary" | "secondary",
    startIcon? : ReactElement,
    title : string,
    endIcon? : ReactElement,
    size : "sm" | "md" | "lg"
}

const typeStyles = {
    primary : "bg-blue-700 text-white hover:bg-blue-600",
    secondary: "bg-blue-200 text-blue-600 hover:bg-blue-100"
}

const sizeStyles = {
    sm : "px-3 py-1.5 text-sm w-24",
    md : "px-4 py-1.5 text-base w-32" ,
    lg : "px-6 py-3 text-md w-48",
}

const defaultStyles = "font-normal rounded-lg cursor-pointer mx-1.5"



export const  Button = (props : buttonProps)=>{
   

    const className = [
        defaultStyles,
        typeStyles[props.type],
        props.size ? sizeStyles[props.size] : sizeStyles.md
    ].join(" ");


    return <button className= {className}>
        <div className="flex items-center justify-center">
            {props.startIcon && <div>{props.startIcon}</div>}
            {props.title}
            {props.endIcon && <div>{props.endIcon}</div>}
        </div>
        </button>

}