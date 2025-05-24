const sizeStyles = {
    sm : "size-4",
    md : "size-5",
    lg : "size-6"
}

const marginStyles = {
    sm : "mx-1",
    md : "mx-1.5",
    lg : "mx-2"
}


export function CancelIcon(props : {
    size : "sm" | "md" | "lg"
}){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={sizeStyles[props.size] + " cursor-pointer " + marginStyles[props.size]} >
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

}