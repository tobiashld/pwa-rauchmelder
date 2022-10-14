import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../../../services/datafunctions'
import { Rauchmelder } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import DataTable from '../../datatable/datatable'
import Loadingspinner from '../../loadingspinner/loadingspinner'

function RauchmelderComponent() {
  const [alleRauchmelder,setAlleRauchmelder] = useState<Rauchmelder[]>()
  const navigate = useNavigate()
  useEffect(()=>{
    async function handleDataChange(){
      const fetchedData = await data[ClientStatus.online].rauchmelder.get()
      setAlleRauchmelder(fetchedData)
      console.log(fetchedData[0])
    }
    handleDataChange()
  },[])
  if(!alleRauchmelder){
    return (
      <div>
        <Loadingspinner size='Big'/>
      </div>
    )
  }
  return (
    <div>
      <div>
        <DataTable rows={alleRauchmelder} columns={['id','auftraggeber','objekt','produktionsdatum','raum','seriennr','wohnung']} headline="Rauchmelder" handleEdit={(id)=>navigate("/edit/rauchmelder/"+id)}/>
      </div>
    </div>
  )
}

export default RauchmelderComponent