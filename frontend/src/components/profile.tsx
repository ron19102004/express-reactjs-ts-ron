import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export interface UserInterface{
    id:number,
    name:string,
    email:string,
    role:string
    avatar:string,
    accessToken:string
    password:string
}
export interface ObjectAny {
    obj:JSON;
}
type Props = ObjectAny;
const Profile:React.FC<Props> = (props):any=>{
    const [info,setInfo]= useState({});
    let obj = props.obj;
    let navigate = useNavigate();
    useEffect(()=>{
        if(Object.keys(obj).length === 0) {
            setTimeout(()=>{
                navigate("/profile/login");
            },500)
        } else setInfo(obj);
    },[obj])
    return(
        <>
            <h1>Profile</h1>
        </>
    )
}
export default Profile;