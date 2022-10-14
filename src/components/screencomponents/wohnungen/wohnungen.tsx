import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../../../services/datafunctions'
import { Wohnung } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import DataTable from '../../datatable/datatable'

function WohnungenComponent() {
  const [alleWohnungen,setAlleWohnungen] = useState<Wohnung[] | undefined>(undefined)
  const navigate = useNavigate()
  useEffect(()=>{
    data[ClientStatus.online].wohnungen.get().then((wohnungen:Wohnung[])=>setAlleWohnungen(wohnungen))
  })

  return (
    <div>
      <div>
        <DataTable rows={alleWohnungen} columns={['id','etage']} headline="Wohnungen" handleEdit={(id)=>navigate("/edit/wohnungen/"+id)}/>
      </div>
    </div>
  )
}

export default WohnungenComponent