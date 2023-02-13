import { useSnackbar } from 'notistack'
import React,{useState,useEffect} from 'react'
import dataFunctions from '../../../services/datafunctions'
import {  Wohnung } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import SaveButton from '../../savebutton/savebutton'
import styles from './wohnungen.module.css'

type WohnungChangeKeys = 'etage'|'haus'|'lage'|'mieter'

function WohnungenComponent() {
  const [alleWohnungen,setAlleWohnungen] = useState<Wohnung[]>([])
  const [changedWohnungen,setChangedWohnungen] = useState<Wohnung[]>([])
  const [isSavable,setIsSavable] = useState(false)
  const {enqueueSnackbar} = useSnackbar()
  const [reload,setReload] = useState(false)
  useEffect(()=>{
    dataFunctions[ClientStatus.online].wohnungen.get(undefined,(wohnungen)=>{
      // setAlleWohnungen(wohnungen.data!)
    })
    setChangedWohnungen([])
  },[])

  useEffect(()=>{
    if(changedWohnungen.length > 0){
      setIsSavable(true)
    }else{
      setIsSavable(false)
    }
  },[changedWohnungen])

  const handleSave = ()=>{
    changedWohnungen.forEach(wohnung=>{
      let error = undefined
      // dataFunctions[ClientStatus.online].wohnungen.change(wohnung,(data)=>{
      //   //error if error is there
      //   if(data && data.error)error = data.error
      // })
      if(error){
        enqueueSnackbar(error,{variant:"error"})
      }
    })
    
    setTimeout(()=>dataFunctions[ClientStatus.online].wohnungen.get(undefined,(data)=>{
      // setAlleWohnungen(data.data!)
    }),400)
    setChangedWohnungen([])
    setIsSavable(false)
    setReload(!reload)
  }


  return (
    <>
      <div className={styles.table}>
        <DataTable 
          rows={alleWohnungen} 
          columns={['id','etage','lage','haus','mieter']} 
          headline="Wohnungen" 
          handleEdit={(id,key,value)=>{
            if(id === -1){
              
            }else{
              let currWohnung = alleWohnungen.slice().find((wohnung)=>wohnung.id === id)
              let newWohnung = currWohnung?new Wohnung(currWohnung.id,currWohnung.objektid,currWohnung.etage,currWohnung.haus,currWohnung.lage,currWohnung.mieter):undefined
              if(newWohnung && (newWohnung[key as WohnungChangeKeys]!.toString() !== value.toString() && value.toString() !== "")){
                let alreadyChanged = changedWohnungen.slice().find((wohnung)=>wohnung.id===id)
                if(alreadyChanged){
                  let addChangedObjek = changedWohnungen.slice().map((kurzWohnung:Wohnung)=>{
                    if(kurzWohnung.id === id){
                      kurzWohnung[key as WohnungChangeKeys] = value
                      return kurzWohnung
                    }else{
                      return kurzWohnung
                    }
                  })
                  setChangedWohnungen(addChangedObjek)
                }else{
                  let addChangedObjek = changedWohnungen.slice()
                  addChangedObjek.push(newWohnung)
                  setChangedWohnungen(addChangedObjek)
                }
                
              }else if(newWohnung && (newWohnung[key as WohnungChangeKeys]!.toString() === value.toString() || value.toString() === "")){
                let removeNotChangedObjek = changedWohnungen.slice().filter((objekt)=>objekt.id!==id)
                setChangedWohnungen(removeNotChangedObjek)
              }else{
                //error
              }
            }
          }}
          editedElementIds={changedWohnungen.map(wohnung=>wohnung.id)}
          handleDelete={(id)=>{
            dataFunctions[ClientStatus.online].wohnungen.delete(id)
            setTimeout(()=>{
              dataFunctions[ClientStatus.online].wohnungen.get(undefined,(data)=>{
                // setAlleWohnungen(data.data!)
              })
              setChangedWohnungen([])
            },300)
          }}
            sort={[
              {
                name:"hinzugefügt",
                functionAsc:(a:Wohnung,b:Wohnung)=>(a.id-b.id),
                functionDesc:(a:Wohnung,b:Wohnung)=>(b.id-a.id),
              },
              {
                name:"mieter",
                functionAsc:(a:Wohnung,b:Wohnung)=>(a.mieter.localeCompare(b.mieter)),
                functionDesc:(a:Wohnung,b:Wohnung)=>(b.mieter.localeCompare(a.mieter)),
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

export default WohnungenComponent