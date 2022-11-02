import React,{useState,useEffect} from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import data from '../../../services/datafunctions'
import { toWohnungConverter, Wohnung } from '../../../types/allgemein'
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
  useEffect(()=>{
    data[ClientStatus.online].wohnungen.get(undefined,(wohnungen:any[])=>{
      setAlleWohnungen(wohnungen.map(item=>toWohnungConverter(item)))
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
            data[ClientStatus.online].wohnungen.delete(id)
            setTimeout(()=>{
              data[ClientStatus.online].objekte.get(undefined,(data:any[])=>{
                setAlleWohnungen(data.map((item)=>toWohnungConverter(item)))
              })
              setChangedWohnungen([])
            },300)
          }}
            sort={[
              {
                name:"id",
                function:(a:Wohnung,b:Wohnung)=>(a.id-b.id),
                icon:<BsArrowDown />
              },
              {
                name:"id",
                function:(a:Wohnung,b:Wohnung)=>(b.id-a.id),
                icon:<BsArrowUp />
              },
              {
                name:"mieter",
                function:(a:Wohnung,b:Wohnung)=>(a.mieter.localeCompare(b.mieter)),
                icon:<BsArrowDown />
              },
              {
                name:"mieter",
                function:(a:Wohnung,b:Wohnung)=>(b.mieter.localeCompare(a.mieter)),
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

export default WohnungenComponent