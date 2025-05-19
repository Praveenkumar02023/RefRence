const sizeStyles = {
    sm : "size-6",
    md : "size-8",
    lg : "size-12"
}

const marginStyles = {
    sm : "mx-1",
    md : "mx-1.5",
    lg : "ml-2"
}


export function Logo(props : {
    size : "sm" | "md" | "lg"
}){
   
    return <div>
        <img src="/icons8-link-96.png" alt="Logo" className={sizeStyles[props.size] + " " + marginStyles[props.size]} />
    </div>
}