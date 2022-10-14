import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../../../services/datafunctions'
import { Objekt } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import Loadingspinner from '../../loadingspinner/loadingspinner'
import styles from './objekte.module.css'

function ObjekteComponent() {
  const [alleObjekte,setAlleObjekte] = useState<Objekt[]>()
  const navigate = useNavigate()
  useEffect(()=>{
    async function handleDataChange(){
      const fetchedData = await data[ClientStatus.online].objekte.get()
      setAlleObjekte(fetchedData)
    }
    handleDataChange()
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
    <div className={styles.datatable}>
      <div>
        <DataTable rows={alleObjekte} columns={['id','adresse','auftraggeber','beschreibung','objektname']} headline="Objekte" handleEdit={(id)=>navigate("/edit/objekte/"+id)}/>
      </div>
      <AddButton routeParam='objekt'/>
    </div>
  )
}

export default ObjekteComponent