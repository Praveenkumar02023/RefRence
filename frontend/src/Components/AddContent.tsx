import { InputCard } from "./Input";

export function AddContent({onClose} : {onClose : ()=> void}){

    return <div className="fixed inset-0 bg-white/70 flex items-center justify-center ">

    <InputCard onClose = {onClose}/>        

    </div>

}