import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../../../services/datafunctions'
import { Auftraggeber } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import Loadingspinner from '../../loadingspinner/loadingspinner'

function AuftraggeberComponent() {
  const [alleAuftraggeber,setAlleAuftraggeber] = useState<Auftraggeber[]>()
  const navigate = useNavigate()
  useEffect(()=>{
    async function handleDataChange(){
      const fetchedData = await data[ClientStatus.online].auftraggeber.get()
      setAlleAuftraggeber(fetchedData)
      console.log(fetchedData[0])
    }
    handleDataChange()
  },[])
  if(!alleAuftraggeber){
    return (
      <div>
        <Loadingspinner size='Big'/>
      </div>
    )
  }
  return (
    <div>
      <div>
        <DataTable rows={alleAuftraggeber} columns={['id','adresse','email','name','telefon']} headline="Auftraggeber" handleEdit={(id)=>navigate("/edit/auftraggeber/"+id)}/>
      </div>
      <AddButton routeParam='auftraggeber' />
    </div>
  )
}

export default AuftraggeberComponent