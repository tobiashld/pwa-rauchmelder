import React from 'react'
import styles from './addbutton.module.css'
import {IoIosAdd} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

function AddButton(props:{routeParam:string,onClick?:()=>void,className?:string}) {
  const navigate = useNavigate()
  return (
    <div className={props&& props.className?styles.container+ " "+props.className:styles.container} onClick={(ev)=>{
      if(props&& props.onClick){
        props.onClick()
      }else{
        navigate("/"+props.routeParam+"/add")
      }  
      }} >
        <IoIosAdd />
    </div>
  )
}

export default AddButton