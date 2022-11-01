import React,{useEffect,useState} from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import data from '../../../services/datafunctions'
import { Rauchmelder, toRauchmelderConverter } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import Loadingspinner from '../../loadingspinner/loadingspinner'
import SaveButton from '../../savebutton/savebutton'
import styles from './rauchmelder.module.css'

type RauchmelderChangeKeys = 'objekt'|'produktionsdatum'|'raum'|'seriennr'|'mieter'

function RauchmelderComponent() {
  const [alleRauchmelder,setAlleRauchmelder] = useState<Rauchmelder[]>([])
  const [changedRauchmelder,setChangedRauchmelder] = useState<Rauchmelder[]>([])
  const [isSavable,setIsSavable] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    data[ClientStatus.online].rauchmelder.get(undefined,(data:any[])=>{
      setAlleRauchmelder(data.map((data:any)=>toRauchmelderConverter(data)))
    })
    
  },[])

  useEffect(()=>{
    if(changedRauchmelder.length > 0){
      setIsSavable(true)
    }else{
      setIsSavable(false)
    }
  },[changedRauchmelder])

  const handleSave = ()=>{

  }
  return (
    <>
      <div className={styles.table}>
        <DataTable 
          rows={alleRauchmelder} 
          columns={['id','objekt','produktionsdatum','raum','seriennr','mieter']} 
          headline="Rauchmelder" 
          editedElementIds={changedRauchmelder.map(rauchmelder=>{
            console.log(rauchmelder.id)
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
            data[ClientStatus.online].rauchmelder.delete(id)
            setTimeout(()=>{
              data[ClientStatus.online].objekte.get(undefined,(data:any[])=>{
                setAlleRauchmelder(data.map((item)=>toRauchmelderConverter(item)))
              })
              setChangedRauchmelder([])
            },300)
          }}
          sort={[
            {
              name:"id",
              function:(a:Rauchmelder,b:Rauchmelder)=>(a.id-b.id),
              icon:<BsArrowDown />
            },
            {
              name:"id",
              function:(a:Rauchmelder,b:Rauchmelder)=>(b.id-a.id),
              icon:<BsArrowUp />
            },
            {
              name:"mieter",
              function:(a:Rauchmelder,b:Rauchmelder)=>(a.mieter.localeCompare(b.mieter)),
              icon:<BsArrowDown />
            },
            {
              name:"mieter",
              function:(a:Rauchmelder,b:Rauchmelder)=>(b.mieter.localeCompare(a.mieter)),
              icon:<BsArrowUp />
            },
            {
              name:"p.datum",
              function:(a:Rauchmelder,b:Rauchmelder)=>{
                let aS = a.produktionsdatum.split(".").map(item=>Number(item))
                let bS = b.produktionsdatum.split(".").map(item=>Number(item))
                let aD = new Date(aS[2],aS[1],aS[0])
                let bD = new Date(bS[2],bS[1],bS[0])
                return aD.valueOf()-bD.valueOf()
              },
              icon:<BsArrowDown />
            },
            {
              name:"p.datum",
              function:(a:Rauchmelder,b:Rauchmelder)=>{
                let aS = a.produktionsdatum.split(".").map(item=>Number(item))
                let bS = b.produktionsdatum.split(".").map(item=>Number(item))
                let aD = new Date(aS[2],aS[1],aS[0])
                let bD = new Date(bS[2],bS[1],bS[0])
                return bD.valueOf()-aD.valueOf()
              },
              icon:<BsArrowUp />
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