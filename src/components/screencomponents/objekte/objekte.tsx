import React,{useState,useEffect} from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import data from '../../../services/datafunctions'
import { Objekt, toObjektConverter } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import Loadingspinner from '../../loadingspinner/loadingspinner'
import styles from './objekte.module.css'

function ObjekteComponent() {
  const [alleObjekte,setAlleObjekte] = useState<Objekt[]>()
  const navigate = useNavigate()
  useEffect(()=>{
    data[ClientStatus.online].objekte.get(undefined,(data:any[])=>{
      setAlleObjekte(data.map((item)=>toObjektConverter(item)))
    })
  },[])
  if(!alleObjekte){
    return (
      <div>
        <Loadingspinner size='Big'/>
      </div>
    )
  }
  console.log(alleObjekte[0].adresse.toString())
  return (
    <>
      <div className={styles.table}>
        <DataTable rows={alleObjekte} columns={['id','name','beschreibung']} headline="Objekte" handleEdit={(id)=>navigate("/edit/objekte/"+id)}
          sort={[
            {
              name:"id",
              function:(a:Objekt,b:Objekt)=>(a.id-b.id),
              icon:<BsArrowDown />
            },
            {
              name:"id",
              function:(a:Objekt,b:Objekt)=>(b.id-a.id),
              icon:<BsArrowUp />
            },
            {
              name:"name",
              function:(a:Objekt,b:Objekt)=>(a.name.localeCompare(b.name)),
              icon:<BsArrowDown />
            },
            {
              name:"name",
              function:(a:Objekt,b:Objekt)=>(b.name.localeCompare(a.name)),
              icon:<BsArrowUp />
            }
          ]}
        />
      </div>
      <AddButton routeParam='objekt'/>
    </>
  )
}

export default ObjekteComponent