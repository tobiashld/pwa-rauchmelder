import React,{useState,useEffect} from 'react'
import data from '../../../services/datafunctions'
import { Auftraggeber, toAuftraggeberConverter } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import styles from './auftraggeber.module.css'
import {BsArrowDown, BsArrowUp} from 'react-icons/bs'
import SaveButton from '../../savebutton/savebutton'
import { useSnackbar } from 'notistack'

type AuftraggeberChangeKeys = 'adresse' | 'email' | 'name' | 'telefon';

function AuftraggeberComponent() {
  const [alleAuftraggeber,setAlleAuftraggeber] = useState<Auftraggeber[]>([])
  const [changedAuftraggeber,setChangedAuftraggeber] = useState<Auftraggeber[]>([])
  const [isSavable,setIsSavable] = useState(false);
  const {enqueueSnackbar} = useSnackbar()
  const [reload,setReload] = useState(false)

  useEffect(()=>{
    data[ClientStatus.online].auftraggeber.get(undefined,(data)=>{
      const convertedAuftraggeber = data.map((auftraggeber:any)=>toAuftraggeberConverter(auftraggeber))
      console.log("converted first useeffect")
      console.log(convertedAuftraggeber)
      setAlleAuftraggeber(convertedAuftraggeber)
      setReload(true)
    })
    setChangedAuftraggeber([])

  },[])
  useEffect(()=>{
    if(changedAuftraggeber.length > 0){
      setIsSavable(true)
    }else{
      setIsSavable(false)
    }
  },[changedAuftraggeber])
  useEffect(()=>{
    console.log("auftraggeber changed")
    console.log(alleAuftraggeber)
  },[alleAuftraggeber])


  const handleSave = ()=>{
    changedAuftraggeber.forEach(auftraggeber=>{
      let error = undefined
      data[ClientStatus.online].auftraggeber.change(auftraggeber,(data)=>{
        //error if error is there
        if(data && data.error)error = data.error
      })
      if(error){
        enqueueSnackbar(error,{variant:"error"})
      }
    })
    
    setTimeout(()=>data[ClientStatus.online].auftraggeber.get(undefined,(data)=>{
      const convertedAuftraggeber = data.map((auftraggeber:any)=>toAuftraggeberConverter(auftraggeber))
      console.log(convertedAuftraggeber)
      setAlleAuftraggeber(convertedAuftraggeber)
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
            data[ClientStatus.online].auftraggeber.delete(id).then((dataParam)=>{
              setTimeout(()=>data[ClientStatus.online].auftraggeber.get(undefined,(data)=>{
                const convertedAuftraggeber = data.map((auftraggeber:any)=>toAuftraggeberConverter(auftraggeber))
                setAlleAuftraggeber(convertedAuftraggeber)
              }),400)
              setReload(!reload)
            })
          }} 
          sort={[
            {
              name:"id",
              function:(a:Auftraggeber,b:Auftraggeber)=>(a.id-b.id),
              icon:<BsArrowDown />
            },
            {
              name:"id",
              function:(a:Auftraggeber,b:Auftraggeber)=>(b.id-a.id),
              icon:<BsArrowUp />
            },
            {
              name:"name",
              function:(a:Auftraggeber,b:Auftraggeber)=>(a.name.localeCompare(b.name)),
              icon:<BsArrowDown />
            },
            {
              name:"name",
              function:(a:Auftraggeber,b:Auftraggeber)=>(b.name.localeCompare(a.name)),
              icon:<BsArrowUp />
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