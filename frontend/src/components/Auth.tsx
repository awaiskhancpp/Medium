import { ChangeEvent , useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import {SignupInput} from "@mawais_se/medium-common/dist"
import { BACKEND_URL } from "../config";

import axios from "axios";

export const Auth = ({type}:{type:"signup" | "signin"}) => {

    const [postInputs,setPostInputs]=useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
    const navigate=useNavigate()
    async function sendRequest(){
        try{
            const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signin"?"signin":"signup"}`,postInputs)
            console.log(response)
            const jwt=response.data.str;
            localStorage.setItem("token",jwt)
            navigate('/blogs')
        }catch(err){

        }
    }
  return (
    <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div>
                <div>
                    <div className="text-3xl font-extrabold ">
                        Create an Account
                    </div>
                    <div className="text-slate-400">
                        {type=="signin"?"Don't have an account?":"Already have an account?"}
                        <Link className="pl-2 underline" to={type=="signin"?"/signup":"/signin"}>{type=="signin"?"Sign up":"Sign in"}</Link>
                    </div>
                </div>
                {type=="signin"?"":<LabelledInput label="Name" placeholder="John Doe" onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                        setPostInputs({
                            ...postInputs,
                            name:e.target.value
                        })
                    }} />}
                <LabelledInput label="Email" placeholder="DoeJohn@gmail.com" onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                        setPostInputs({
                            ...postInputs,
                            email:e.target.value
                        })
                    }} />
                <LabelledInput label="Password"placeholder="123456" type="password" onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                        setPostInputs({
                            ...postInputs,
                            password:e.target.value
                        })
                    }} />
                <button onClick={sendRequest} type="button" className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type=="signup"?"Sign up":"Sign in"}</button>
            </div>
        </div>
    </div>
  )
  
}
interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string
}
function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
    return <div>
        <label htmlFor={label} className="block mb-2 text-sm font-medium text-black pt-1">{label}</label>
        <input id={label} onChange={onChange} type={type || "text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}
