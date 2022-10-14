import React from 'react'
import styles from './addbutton.module.css'
import {IoIosAdd} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

function AddButton(props:{routeParam:string}) {
  const navigate = useNavigate()
  return (
    <div className={styles.container} onClick={(ev)=>navigate("/add/"+props.routeParam)} >
        <IoIosAdd />
    </div>
  )
}

export default AddButton