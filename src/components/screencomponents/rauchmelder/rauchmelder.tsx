import { useSnackbar } from 'notistack'
import React,{useEffect,useState} from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { useQuery } from 'react-query'
import dataFunctions from '../../../services/datafunctions'
import {  Objekt, Rauchmelder, toObjektConverter, toRauchmelderConverter } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import Loadingspinner from '../../loadingspinner/loadingspinner'
import SaveButton from '../../savebutton/savebutton'
import styles from './rauchmelder.module.css'

type RauchmelderChangeKeys = 'objekt'|'produktionsdatum'|'raum'|'seriennr'|'mieter'

function RauchmelderComponent() {
  const [alleRauchmelder,setAlleRauchmelder] = useState<Rauchmelder[]>([])
  const [alleObjekte,setAlleObjekte] = useState<Objekt[]>([])
  const [changedRauchmelder,setChangedRauchmelder] = useState<Rauchmelder[]>([])
  const [isSavable,setIsSavable] = useState(false)
  const {enqueueSnackbar} = useSnackbar()
  const rauchmelderQuery = useQuery('rauchmelder',()=>dataFunctions[ClientStatus.online].rauchmelder.get())
  const objekteQuery = useQuery('objekte',()=>dataFunctions[ClientStatus.online].objekte.get())
  useEffect(()=>{
    dataFunctions[ClientStatus.online].rauchmelder.get(undefined,(data)=>{
        setAlleRauchmelder(data.data!)
    })
    dataFunctions[ClientStatus.online].objekte.get(undefined,(data)=>{
      setAlleObjekte(data.data)
    })
    
  },[])

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
  }

  const handleSave = ()=>{

  }
  return (
    <>
      <div className={styles.table}>
        <DataTable 
          rows={alleRauchmelder} 
          columns={['id','objekt','produktionsdatum','raum','seriennr','mieter']} 
          options={alleObjekte}
          headline="Rauchmelder" 
          editedElementIds={changedRauchmelder.map(rauchmelder=>{
            return rauchmelder.id
          })}
          handleEdit={(id,key,value)=>{
            if(id === -1){
              
            }else{
              let currRauchmelder = alleRauchmelder.slice().find((rauchmelder)=>rauchmelder.id === id)
              let newRauchmelder = currRauchmelder?new Rauchmelder(currRauchmelder.id,currRauchmelder.objekt,currRauchmelder.produktionsdatum,currRauchmelder.raum,currRauchmelder.seriennr,currRauchmelder.letztePruefungsID,currRauchmelder.mieter):undefined
              if(newRauchmelder && (newRauchmelder[key as RauchmelderChangeKeys]!.toString() !== value.toString() && value.toString() !== "")){
                let alreadyChanged = changedRauchmelder.slice().find((rauchmelder)=>rauchmelder.id===id)
                if(alreadyChanged){
                  let addChangedRauchmelder = changedRauchmelder.slice().map((kurzRauchmelder:Rauchmelder)=>{
                    if(kurzRauchmelder.id === id){
                      kurzRauchmelder[key as RauchmelderChangeKeys] = value
                      return kurzRauchmelder
                    }else{
                      return kurzRauchmelder
                    }
                  })
                  setChangedRauchmelder(addChangedRauchmelder)
                }else{
                  let addChangedObjek = changedRauchmelder.slice()
                  addChangedObjek.push(newRauchmelder)
                  setChangedRauchmelder(addChangedObjek)
                }
                
              }else if(newRauchmelder && (newRauchmelder[key as RauchmelderChangeKeys]!.toString() === value.toString() || value.toString() === "")){
                let removeNotChangedObjek = changedRauchmelder.slice().filter((rauchmelder)=>rauchmelder.id!==id)
                setChangedRauchmelder(removeNotChangedObjek)
              }else{
                //error
              }
            }
          }}
          handleDelete={(id)=>{
            dataFunctions[ClientStatus.online].rauchmelder.delete(id)
            setTimeout(()=>{
              dataFunctions[ClientStatus.online].objekte.get(undefined,(data:any[])=>{
                setAlleRauchmelder(data.map((item)=>toRauchmelderConverter(item)))
              })
              setChangedRauchmelder([])
            },300)
          }}
          sort={[
            {
              name:"hinzugefügt",
              functionAsc:(a:Rauchmelder,b:Rauchmelder)=>(a.id-b.id),
              functionDesc:(a:Rauchmelder,b:Rauchmelder)=>(b.id-a.id),
            },
            {
              name:"mieter",
              functionAsc:(a:Rauchmelder,b:Rauchmelder)=>(a.mieter.localeCompare(b.mieter)),
              functionDesc:(a:Rauchmelder,b:Rauchmelder)=>(b.mieter.localeCompare(a.mieter)),
            },
            {
              name:"p.datum",
              functionAsc:(a:Rauchmelder,b:Rauchmelder)=>{
                let aS = a.produktionsdatum.split(".").map(item=>Number(item))
                let bS = b.produktionsdatum.split(".").map(item=>Number(item))
                let aD = new Date(aS[2],aS[1],aS[0])
                let bD = new Date(bS[2],bS[1],bS[0])
                return aD.valueOf()-bD.valueOf()
              },
              functionDesc:(a:Rauchmelder,b:Rauchmelder)=>{
                let aS = a.produktionsdatum.split(".").map(item=>Number(item))
                let bS = b.produktionsdatum.split(".").map(item=>Number(item))
                let aD = new Date(aS[2],aS[1],aS[0])
                let bD = new Date(bS[2],bS[1],bS[0])
                return bD.valueOf()-aD.valueOf()
              },
              
            },
          ]}
        />
        <div className={styles.interactions}>
          <AddButton routeParam='auftraggeber' />
          <SaveButton onClick={handleSave} isShown={isSavable}/>
        </div>
      </div>
    </>
  )
}

export default RauchmelderComponent