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
interface OwnsProps {
    obj:Object;
}
type Props = OwnsProps;
const MyAccount:React.FC<Props> = (props):any=>{
    let obj = props.obj;
    let navigate = useNavigate();
    return(
        <>
            {console.log(obj)}
        </>
    )
}
export default MyAccount;