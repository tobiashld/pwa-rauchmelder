import React,{useState,useEffect} from 'react'
import data from '../../../services/datafunctions'
import { Wohnung } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import DataTable from '../../datatable/datatable'

function WohnungenComponent() {
  // const [alleWohnungen,setAlleWohnungen] = useState<Wohnung[] | undefined>(undefined)
  // useEffect(()=>{
  //   data[ClientStatus.online].objekte.get().then((objekte:Wohnung[])=>setAlleObjekte(objekte))
  // })

  return (
    <div>
      <div>
        {/* <DataTable rows={alleWohnungen}/> */}
      </div>
    </div>
  )
}

export default WohnungenComponent