import React,{useState,useEffect} from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import data from '../../../services/datafunctions'
import { toWohnungConverter, Wohnung } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import styles from './wohnungen.module.css'

function WohnungenComponent() {
  const [alleWohnungen,setAlleWohnungen] = useState<Wohnung[] | undefined>(undefined)
  const navigate = useNavigate()
  useEffect(()=>{
    data[ClientStatus.online].wohnungen.get(undefined,(wohnungen:any[])=>{
      setAlleWohnungen(wohnungen.map(item=>toWohnungConverter(item)))
    })
  },[])

  return (
    <>
      <div className={styles.table}>
        <DataTable rows={alleWohnungen} columns={['id','etage','lage','haus','mieter']} headline="Wohnungen" handleEdit={(id)=>navigate("/edit/wohnungen/"+id)}
           sort={[
            {
              name:"id",
              function:(a:Wohnung,b:Wohnung)=>(a.id-b.id),
              icon:<BsArrowDown />
            },
            {
              name:"id",
              function:(a:Wohnung,b:Wohnung)=>(b.id-a.id),
              icon:<BsArrowUp />
            },
            {
              name:"mieter",
              function:(a:Wohnung,b:Wohnung)=>(a.mieter.localeCompare(b.mieter)),
              icon:<BsArrowDown />
            },
            {
              name:"mieter",
              function:(a:Wohnung,b:Wohnung)=>(b.mieter.localeCompare(a.mieter)),
              icon:<BsArrowUp />
            },
          ]}
        />
        <AddButton routeParam='wohnung'/>
      </div>
    </>
  )
}

export default WohnungenComponent