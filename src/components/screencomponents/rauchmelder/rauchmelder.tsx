import React,{useEffect,useState} from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import data from '../../../services/datafunctions'
import { Rauchmelder, toRauchmelderConverter } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import Loadingspinner from '../../loadingspinner/loadingspinner'
import styles from './rauchmelder.module.css'

function RauchmelderComponent() {
  const [alleRauchmelder,setAlleRauchmelder] = useState<Rauchmelder[]>()
  const navigate = useNavigate()
  useEffect(()=>{
    data[ClientStatus.online].rauchmelder.get(undefined,(data:any[])=>{
      setAlleRauchmelder(data.map((data:any)=>toRauchmelderConverter(data)))
    })
    
  },[])
  if(!alleRauchmelder){
    return (
      <div>
        <Loadingspinner size='Big'/>
      </div>
    )
  }
  return (
    <>
      <div className={styles.table}>
        <DataTable rows={alleRauchmelder} columns={['id','objekt','produktionsdatum','raum','seriennr','mieter']} headline="Rauchmelder" handleEdit={(id)=>navigate("/edit/rauchmelder/"+id)}
          sort={[
            {
              name:"id",
              function:(a:Rauchmelder,b:Rauchmelder)=>(a.id-b.id),
              icon:<BsArrowDown />
            },
            {
              name:"id",
              function:(a:Rauchmelder,b:Rauchmelder)=>(b.id-a.id),
              icon:<BsArrowUp />
            },
            {
              name:"mieter",
              function:(a:Rauchmelder,b:Rauchmelder)=>(a.mieter.localeCompare(b.mieter)),
              icon:<BsArrowDown />
            },
            {
              name:"mieter",
              function:(a:Rauchmelder,b:Rauchmelder)=>(b.mieter.localeCompare(a.mieter)),
              icon:<BsArrowUp />
            },
            {
              name:"p.datum",
              function:(a:Rauchmelder,b:Rauchmelder)=>{
                let aS = a.produktionsdatum.split(".").map(item=>Number(item))
                let bS = b.produktionsdatum.split(".").map(item=>Number(item))
                let aD = new Date(aS[2],aS[1],aS[0])
                let bD = new Date(bS[2],bS[1],bS[0])
                return aD.valueOf()-bD.valueOf()
              },
              icon:<BsArrowDown />
            },
            {
              name:"p.datum",
              function:(a:Rauchmelder,b:Rauchmelder)=>{
                let aS = a.produktionsdatum.split(".").map(item=>Number(item))
                let bS = b.produktionsdatum.split(".").map(item=>Number(item))
                let aD = new Date(aS[2],aS[1],aS[0])
                let bD = new Date(bS[2],bS[1],bS[0])
                return bD.valueOf()-aD.valueOf()
              },
              icon:<BsArrowUp />
            },
          ]}
        />
        <AddButton routeParam='rauchmelder'/>
      </div>
    </>
  )
}

export default RauchmelderComponent