import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import Paper from '@mui/material/Paper';
import { useSnackbar } from 'notistack'
import React,{useState,useEffect} from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useMutation, useQuery, useQueryClient } from 'react-query'
import dataFunctions from '../../../services/datafunctions'
import { Objekt } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import Loadingspinner from '../../loadingspinner/loadingspinner'
import SaveButton from '../../savebutton/savebutton'
import styles from './objekte.module.css'

type ObjektChangeKeys = 'name'|'beschreibung'|'adresse'

function ObjekteComponent() {
  const queryClient = useQueryClient()
  const [changedObjekte,setChangedObjekte] = useState<Objekt[]>([])
  const [isSavable,setIsSavable] = useState(false)
  const {enqueueSnackbar} = useSnackbar()
  const {data,isError,isLoading,status} = useQuery('objekte',()=>dataFunctions[ClientStatus.online].objekte.get(),{
    
  })
  const mutate = useMutation({
    mutationFn: (id:number)=> dataFunctions[ClientStatus.online].objekte.delete(id)
  })

  useEffect(()=>{
    if(changedObjekte.length > 0){
      setIsSavable(true)
    }else{
      setIsSavable(false)
    }
  },[changedObjekte])

  if(isLoading){
    return <Loadingspinner size='Big' />
  }

  if(isError || (data && data.error)){
    enqueueSnackbar("Laden der Objekte Fehlgeschlagen!",{variant:"error"})
  }



  

  const handleSave = ()=>{
  }

  return (
    <>
      <div className={styles.table}>
        <DataTable 
          rows={[...data!.data]}
          columns={['name','beschreibung']} 
          headline="Objekte" 
          editedElementIds={changedObjekte.map((objekt)=>objekt.id)}
          handleEdit={(id,key,value)=>{
            if(id === -1){
              
            }else{
              let currObjekt = data!.data.slice().find((objekt)=>objekt.id === id)
              let newObjekt = currObjekt?new Objekt(currObjekt.id,currObjekt.adresse,currObjekt.beschreibung,currObjekt.name,currObjekt.auftraggeberID):undefined
              if(newObjekt && (newObjekt[key as ObjektChangeKeys]!.toString() !== value.toString() && value.toString() !== "")){
                let alreadyChanged = changedObjekte.slice().find((objekt)=>objekt.id===id)
                if(alreadyChanged){
                  let addChangedObjekt = changedObjekte.slice().map((kurzObjekt:Objekt)=>{
                    if(kurzObjekt.id === id){
                      kurzObjekt[key as ObjektChangeKeys] = value
                      return kurzObjekt
                    }else{
                      return kurzObjekt
                    }
                  })
                  setChangedObjekte(addChangedObjekt)
                }else{
                  let addChangedObjek = changedObjekte.slice()
                  addChangedObjek.push(newObjekt)
                  setChangedObjekte(addChangedObjek)
                }
                
              }else if(newObjekt && (newObjekt[key as ObjektChangeKeys]!.toString() === value.toString() || value.toString() === "")){
                let removeNotChangedObjek = changedObjekte.slice().filter((objekt)=>objekt.id!==id)
                setChangedObjekte(removeNotChangedObjek)
              }else{
                //error
              }
            }
          }}
          handleDelete={(id)=>{
            mutate.mutate(id)
            setTimeout(()=>queryClient.invalidateQueries("objekte"),200)
            setChangedObjekte([])
          }}
          sort={[
            {
              name:"hinzugefügt",
              functionAsc:(a:Objekt,b:Objekt)=>(a.id-b.id),
              functionDesc:(a:Objekt,b:Objekt)=>(b.id-a.id),
            },
            {
              name:"name",
              functionAsc:(a:Objekt,b:Objekt)=>(a.name.localeCompare(b.name)),
              functionDesc:(a:Objekt,b:Objekt)=>(b.name.localeCompare(a.name)),
            }
          ]}
        />
      </div>
      <div className={styles.interactions}>
        <AddButton routeParam='auftraggeber' />
        <SaveButton onClick={handleSave} isShown={isSavable}/>
      </div>
    </>
  )
}

export default ObjekteComponent