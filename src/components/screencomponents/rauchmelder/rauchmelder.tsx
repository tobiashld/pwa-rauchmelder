import { useSnackbar } from 'notistack'
import React,{useEffect,useState} from 'react'
import { useQuery, useQueryClient } from 'react-query'
import dataFunctions from '../../../services/datafunctions'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import RauchmelderHistorienDialog from '../../dialogs/rauchmelderhistorienDialog/rauchmelderhistorienDialog'
import Loadingspinner from '../../loadingspinner/loadingspinner'
import SaveButton from '../../savebutton/savebutton'
import styles from './rauchmelder.module.css'
import { RauchmelderI, RauchmelderBeziehung } from '../../../types/rauchmelder'


function RauchmelderComponent() {
  const [changedRauchmelder,setChangedRauchmelder] = useState<RauchmelderBeziehung[]>([])
  const [isSavable,setIsSavable] = useState(false)
  const [showHistoryDialog,setShowHistoryDialog] = useState(false)
  const [historyid,setHistoryid] = useState(1)
  const {enqueueSnackbar} = useSnackbar()
  const rauchmelderQuery = useQuery('rauchmelder',()=>dataFunctions[ClientStatus.online].rauchmelder.get())
  const objekteQuery = useQuery('objekte',()=>dataFunctions[ClientStatus.online].objekte.get())
  const queryClient = useQueryClient()
  
  useEffect(()=>{
    if(changedRauchmelder.length > 0){
      setIsSavable(true)
    }else{
      setIsSavable(false)
    }
  },[changedRauchmelder])

 

  

  if(rauchmelderQuery.isLoading || objekteQuery.isLoading){
    return <div className={styles.table}><Loadingspinner size='Big' /></div>
  }

  if(rauchmelderQuery.isError || objekteQuery.isError || (rauchmelderQuery.data && rauchmelderQuery.data.error) || (objekteQuery.data && objekteQuery.data.error)){
    enqueueSnackbar("Laden Fehlgeschlagen!",{variant:"error"})
    return <>Error</>
  }

  const handleSave = ()=>{

  }
  return (
    <>
      <div className={styles.table}>
        <RauchmelderHistorienDialog 
          handleClose={(e:any)=>setShowHistoryDialog(false)} 
          isShown={showHistoryDialog}
          rauchmelderHistorienId={historyid}
          />
        <DataTable 
          rows={rauchmelderQuery.data?.data.map((rauchmelderBz:RauchmelderBeziehung)=>rauchmelderBz.aktuellerRauchmelder)} 
          columns={['id','produktionsdatum','raum','seriennr']} 
          options={objekteQuery.data?.data!}
          headline="Rauchmelder" 
          editedElementIds={changedRauchmelder.map(rauchmelder=>{
            return rauchmelder.id
          })}
          handleEdit={(id,key,value)=>{
            if(id === -1){
              
            }else{
              // let currRauchmelder = alleRauchmelder.slice().find((rauchmelder)=>rauchmelder.id === id)
              // // let newRauchmelder = currRauchmelder?{currRauchmelder.id,currRauchmelder.objekt,currRauchmelder.produktionsdatum,currRauchmelder.raum,currRauchmelder.seriennr,currRauchmelder.letztePruefungsID,currRauchmelder.mieter):undefined
              // if(newRauchmelder && (newRauchmelder[key as RauchmelderChangeKeys]!.toString() !== value.toString() && value.toString() !== "")){
              //   let alreadyChanged = changedRauchmelder.slice().find((rauchmelder)=>rauchmelder.id===id)
              //   if(alreadyChanged){
              //     let addChangedRauchmelder = changedRauchmelder.slice().map((kurzRauchmelder:RauchmelderBeziehung)=>{
              //       if(kurzRauchmelder.id === id){
              //         // kurzRauchmelder[key as RauchmelderChangeKeys] = value
              //         return kurzRauchmelder
              //       }else{
              //         return kurzRauchmelder
              //       }
              //     })
              //     setChangedRauchmelder(addChangedRauchmelder)
              //   }else{
              //     let addChangedObjek = changedRauchmelder.slice()
              //     addChangedObjek.push(newRauchmelder)
              //     setChangedRauchmelder(addChangedObjek)
              //   }
                
              // }else if(newRauchmelder && (newRauchmelder[key as RauchmelderChangeKeys]!.toString() === value.toString() || value.toString() === "")){
              //   let removeNotChangedObjek = changedRauchmelder.slice().filter((rauchmelder)=>rauchmelder.id!==id)
              //   setChangedRauchmelder(removeNotChangedObjek)
              // }else{
              //   //error
              // }
            }
          }}
          handleHistory={(id)=>{
            setHistoryid(id)
            setShowHistoryDialog(true)
          }}
          handleDelete={(id)=>{
            dataFunctions[ClientStatus.online].rauchmelder.delete(id)

            setTimeout(()=>{
              queryClient.invalidateQueries("rauchmelder")
              setChangedRauchmelder([])
            },300)
          }}
          sort={[
            {
              name:"hinzugefügt",
              functionAsc:(a:RauchmelderI,b:RauchmelderI)=>(a.id!-b.id!),
              functionDesc:(a:RauchmelderI,b:RauchmelderI)=>(b.id!-a.id!),
            },
            {
              name:"p.datum",
              functionAsc:(a:RauchmelderI,b:RauchmelderI)=>{
                let aS = a.produktionsdatum
                let bS = b.produktionsdatum
                return aS.valueOf()-bS.valueOf()
              },
              functionDesc:(a:RauchmelderI,b:RauchmelderI)=>{
                let aS = a.produktionsdatum
                let bS = b.produktionsdatum
                return bS.valueOf()-aS.valueOf()
              },
              
            },
            {
              name:"seriennr",
              functionAsc:(a:RauchmelderI,b:RauchmelderI)=>{
                return (a.seriennr.localeCompare(b.seriennr))
              },
              functionDesc:(a:RauchmelderI,b:RauchmelderI)=>{
                return (b.seriennr.localeCompare(a.seriennr))
              }
            }
          ]}
        />
        <div className={styles.interactions}>
          <AddButton routeParam='rauchmelder' />
          <SaveButton onClick={handleSave} isShown={isSavable}/>
        </div>
      </div>
    </>
  )
}

export default RauchmelderComponent