import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../../../services/datafunctions'
import { Auftraggeber, toAuftraggeberConverter } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import Loadingspinner from '../../loadingspinner/loadingspinner'
import styles from './auftraggeber.module.css'
import {BsArrowDown, BsArrowUp} from 'react-icons/bs'

function AuftraggeberComponent() {
  const [alleAuftraggeber,setAlleAuftraggeber] = useState<Auftraggeber[]>()
  const navigate = useNavigate()
  useEffect(()=>{
    data[ClientStatus.online].auftraggeber.get(undefined,(data)=>{
      const convertedAuftraggeber = data.map((auftraggeber:any)=>toAuftraggeberConverter(auftraggeber))
      console.log(convertedAuftraggeber)
      setAlleAuftraggeber(convertedAuftraggeber)
    })
  },[])
  if(!alleAuftraggeber){
    return (
      <div>
        <Loadingspinner size='Big'/>
      </div>
    )
  }
  return (
    <>
      <div className={styles.table}>
        <DataTable rows={alleAuftraggeber} columns={['id','adresse','email','name','telefon']} headline="Auftraggeber" handleEdit={(id)=>navigate("/edit/auftraggeber/"+id)} 
          sort={[
            {
              name:"id",
              function:(a:Auftraggeber,b:Auftraggeber)=>(a.id-b.id),
              icon:<BsArrowDown />
            },
            {
              name:"id",
              function:(a:Auftraggeber,b:Auftraggeber)=>(b.id-a.id),
              icon:<BsArrowUp />
            },
            {
              name:"name",
              function:(a:Auftraggeber,b:Auftraggeber)=>(a.name.localeCompare(b.name)),
              icon:<BsArrowDown />
            },
            {
              name:"name",
              function:(a:Auftraggeber,b:Auftraggeber)=>(b.name.localeCompare(a.name)),
              icon:<BsArrowUp />
            }
          ]}/>
      </div>
      <AddButton routeParam='auftraggeber' />
    </>
    
  )
}

export default AuftraggeberComponent