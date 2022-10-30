import React,{useState,useEffect} from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import data from '../../../services/datafunctions'
import { Pruefung, toPruefungConverter } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import styles from './pruefungen.module.css'

function PruefungenComponent() {
  const [allePruefungen,setAllePruefungen] = useState<Pruefung[] | undefined>(undefined)
  const navigate = useNavigate()
  useEffect(()=>{
    data[ClientStatus.online].pruefungen.get(undefined,(pruefungen:any[])=>{
      setAllePruefungen(pruefungen.map(item=>toPruefungConverter(item)))
    })
  },[])
  return (
    <>
      <div className={styles.table}>
        <DataTable rows={allePruefungen} columns={['id','timestamp','user','objekt']} headline="Prüfungen" handleEdit={(id)=>navigate("/edit/pruefung/"+id)}
           sort={[
            {
              name:"id",
              function:(a:Pruefung,b:Pruefung)=>(a.id-b.id),
              icon:<BsArrowDown />
            },
            {
              name:"id",
              function:(a:Pruefung,b:Pruefung)=>(b.id-a.id),
              icon:<BsArrowUp />
            },
            
          ]}
        />
        <AddButton routeParam='pruefung'/>
      </div>
    </>
  )
}

export default PruefungenComponent