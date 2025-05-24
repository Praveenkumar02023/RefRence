import { useState } from "react"
import { CancelIcon } from "../icons/CancelIcon";

export function InputCard({onClose} : {onClose : ()=>void}){

    const [type,setType] = useState(true); 

    let selectYoutube = "bg-gray-400";
    let selectTwitter = "bg-gray-400";
    
    if(type){
        selectYoutube = "bg-blue-400"
        selectTwitter = "bg-gray-400";
    }else{
        selectTwitter = "bg-blue-400";
        selectYoutube = "bg-gray-400";
    }

    return <>
        <div className=" p-6 h-2/4 w-1/4 bg-white rounded-lg shadow-2xl text-center">
            
            <div className="flex justify-end" >
                <span onClick={onClose}>
                <CancelIcon  size="md"/>

                </span>
            </div>

            <h2>Add Content</h2>
            
            <input className="mt-6 bg-gray-300 h-8 w-full " type="text" placeholder="title...." />
            <input className="mt-6 bg-gray-300 h-8 w-full " type="text" placeholder="Link" />
           
           <div className="mt-6 flex justify-around">
            <button className={selectYoutube + " rounded-md cursor-pointer h-12 w-24" } onClick = {()=> setType(true)}>Youtube</button>
            <button className={selectTwitter + " rounded-md cursor-pointer  h-12 w-24" } onClick = {()=> setType(false)}>Twitter</button>
           </div>


            
           <button className={"mt-12 hover:bg-green-600 bg-emerald-700 rounded-md cursor-pointer  h-12 w-24" }>Add</button>

        </div>
    </>
}