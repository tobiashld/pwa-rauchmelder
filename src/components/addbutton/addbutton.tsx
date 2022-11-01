import React from 'react'
import styles from './addbutton.module.css'
import {IoIosAdd} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

function AddButton(props:{routeParam:string,onClick?:()=>void}) {
  const navigate = useNavigate()
  return (
    <div className={styles.container} onClick={(ev)=>{
      if(props&& props.onClick){
        props.onClick()
      }else{
        navigate("/add/"+props.routeParam)
      }  
      }} >
        <IoIosAdd />
    </div>
  )
}

export default AddButton