import React,{useState,useEffect} from 'react'
import dataFunctions from '../../../services/datafunctions'
import { Auftraggeber, toAuftraggeberConverter } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import styles from './auftraggeber.module.css'
import {BsArrowDown, BsArrowUp} from 'react-icons/bs'
import SaveButton from '../../savebutton/savebutton'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

type AuftraggeberChangeKeys = 'adresse' | 'email' | 'name' | 'telefon';

function AuftraggeberComponent() {
  const clientStatus = useSelector((state:RootState)=>state.isOffline)
  const [alleAuftraggeber,setAlleAuftraggeber] = useState<Auftraggeber[]>([])
  const [changedAuftraggeber,setChangedAuftraggeber] = useState<Auftraggeber[]>([])
  const [isSavable,setIsSavable] = useState(false);
  const {enqueueSnackbar} = useSnackbar()
  const [reload,setReload] = useState(false)

  useEffect(()=>{
    dataFunctions[ClientStatus.online].auftraggeber.get(undefined,(data)=>{
      setAlleAuftraggeber(data.data!)
      setReload(true)
    })
    setChangedAuftraggeber([])

  },[clientStatus])

  useEffect(()=>{
    if(changedAuftraggeber.length > 0){
      setIsSavable(true)
    }else{
      setIsSavable(false)
    }
  },[changedAuftraggeber])


  const handleSave = ()=>{
    changedAuftraggeber.forEach(auftraggeber=>{
      let error = undefined
      dataFunctions[ClientStatus.online].auftraggeber.change(auftraggeber,(data)=>{
        //error if error is there
        if(data && data.error)error = data.error
      })
      if(error){
        enqueueSnackbar(error,{variant:"error"})
      }
    })
    
    setTimeout(()=>dataFunctions[ClientStatus.online].auftraggeber.get(undefined,(data)=>{
      setAlleAuftraggeber(data.data!)
    }),400)
    setChangedAuftraggeber([])
    setIsSavable(false)
    setReload(!reload)
  }
  return (
    <>
      <div className={styles.table}>
        <DataTable 
          rows={alleAuftraggeber} 
          columns={['id','adresse','email','name','telefon']} 
          headline="Auftraggeber" 
          handleEdit={(id,key ,value)=>{
            
            if(id === -1){
              
            }else{
              let currAuftraggeber = alleAuftraggeber.slice().find((auftraggeber)=>auftraggeber.id === id)
              let newAuftraggeber = currAuftraggeber?new Auftraggeber(currAuftraggeber.id,currAuftraggeber.adresse,currAuftraggeber.email,currAuftraggeber.name,currAuftraggeber.telefon):undefined
              if(newAuftraggeber && (newAuftraggeber[key as AuftraggeberChangeKeys].toString() !== value.toString() && value.toString() !== "")){

                let alreadyChanged = changedAuftraggeber.slice().find((auftraggeber)=>auftraggeber.id===id)
                
                if(alreadyChanged){
                  let addChangedAuftraggeber = changedAuftraggeber.map((kurzAuftraggeber)=>{
                    if(kurzAuftraggeber.id === id){
                      kurzAuftraggeber[key as AuftraggeberChangeKeys] = value
                      return kurzAuftraggeber
                    }else{
                      return kurzAuftraggeber
                    }
                  })
                  setChangedAuftraggeber(addChangedAuftraggeber)
                }else{
                  newAuftraggeber[key as AuftraggeberChangeKeys] = value
                  let addChangedAuftraggeber = changedAuftraggeber.slice()
                  addChangedAuftraggeber.push(newAuftraggeber)
                  setChangedAuftraggeber(addChangedAuftraggeber)
                }
                
              }else if(newAuftraggeber && (newAuftraggeber[key as AuftraggeberChangeKeys].toString() === value.toString() || value.toString() === "")){
                let removeNotChangedAuftraggeber = changedAuftraggeber.slice().filter((auftraggeber)=>auftraggeber.id!==id)
                setChangedAuftraggeber(removeNotChangedAuftraggeber)
              }else{
                //error
              }
            }
          }}
          handleDelete={(id)=>{
            dataFunctions[clientStatus].auftraggeber.delete(id).then((dataParam)=>{
              setTimeout(()=>dataFunctions[ClientStatus.online].auftraggeber.get(undefined,data=>{
                setAlleAuftraggeber(data.data!)
              }),400)
              setReload(!reload)
            })
          }} 
          sort={[
            {
              name:"hinzugefügt",
              functionAsc:(a:Auftraggeber,b:Auftraggeber)=>(a.id-b.id),
              functionDesc:(a:Auftraggeber,b:Auftraggeber)=>(b.id-a.id),
            },
            {
              name:"name",
              functionAsc:(a:Auftraggeber,b:Auftraggeber)=>(a.name.localeCompare(b.name)),
              functionDesc:(a:Auftraggeber,b:Auftraggeber)=>(b.name.localeCompare(a.name)),
            }
          ]}
          editedElementIds={changedAuftraggeber.map(auftraggeber=>auftraggeber.id)}

          />
      </div>
      <div className={styles.interactions}>
        <AddButton routeParam='auftraggeber' />
        <SaveButton onClick={handleSave} isShown={isSavable}/>
      </div>
    </>
    
  )
}

export default AuftraggeberComponent