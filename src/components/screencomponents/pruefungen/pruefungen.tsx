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
          handleDelete={(id)=>{
            data[ClientStatus.online].pruefungen.delete(id)
            setTimeout(()=>{
              data[ClientStatus.online].pruefungen.get(undefined,(data:any[])=>{
                setAllePruefungen(data.map((item)=>toPruefungConverter(item)))
              })
            },300)
          }}
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
            {
              name:"p.datum",
              function:(a:Pruefung,b:Pruefung)=>{
                let aS = a.timestamp.split(" ").map((item,index)=>{
                  return item.split(index === 0?":":".").map(number=>Number(number))
                })
                let bS = b.timestamp.split(" ").map((item,index)=>{
                  return item.split(index === 0?":":".").map(number=>Number(number))
                })
                let aD = new Date(aS[1][2],aS[1][1],aS[1][0],aS[0][0],aS[0][1],aS[0][2])
                let bD = new Date(bS[1][2],bS[1][1],bS[1][0],bS[0][0],bS[0][1],bS[0][2])
                return aD.valueOf()-bD.valueOf()
              },
              icon:<BsArrowDown />
            },
            {
              name:"p.datum",
              function:(a:Pruefung,b:Pruefung)=>{
                let aS = a.timestamp.split(" ").map((item,index)=>{
                  return item.split(index === 0?":":".").map(number=>Number(number))
                })
                let bS = b.timestamp.split(" ").map((item,index)=>{
                  return item.split(index === 0?":":".").map(number=>Number(number))
                })
                let aD = new Date(aS[1][2],aS[1][1],aS[1][0],aS[0][0],aS[0][1],aS[0][2])
                let bD = new Date(bS[1][2],bS[1][1],bS[1][0],bS[0][0],bS[0][1],bS[0][2])
                return bD.valueOf()-aD.valueOf()
              },
              icon:<BsArrowUp />
            },
            
          ]}
        />
        <div className={styles.interactions}>
          <AddButton routeParam='pruefung' />
          
        </div>
      </div>
    </>
  )
}

export default PruefungenComponent