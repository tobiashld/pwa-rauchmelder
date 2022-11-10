import React,{useState,useEffect} from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import data from '../../../services/datafunctions'
import { Objekt, toObjektConverter } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import SaveButton from '../../savebutton/savebutton'
import styles from './objekte.module.css'

type ObjektChangeKeys = 'name'|'beschreibung'|'adresse'

function ObjekteComponent() {
  const [alleObjekte,setAlleObjekte] = useState<Objekt[]>([])
  const [changedObjekte,setChangedObjekte] = useState<Objekt[]>([])
  const [isSavable,setIsSavable] = useState(false)
  const [reload,setReload] = useState(false)

  useEffect(()=>{
    data[ClientStatus.online].objekte.get(undefined,(data:any[])=>{
      setAlleObjekte(data.map((item)=>toObjektConverter(item)))
      setReload(true)
    })
    setChangedObjekte([])
  },[])

  useEffect(()=>{
    if(changedObjekte.length > 0){
      setIsSavable(true)
    }else{
      setIsSavable(false)
    }
  },[changedObjekte])

  const handleSave = ()=>{
    if(reload){}
  }

  return (
    <>
      <div className={styles.table}>
        <DataTable 
          rows={alleObjekte} 
          columns={['id','name','beschreibung']} 
          headline="Objekte" 
          editedElementIds={changedObjekte.map((objekt)=>objekt.id)}
          handleEdit={(id,key,value)=>{
            if(id === -1){
              
            }else{
              let currObjekt = alleObjekte.slice().find((objekt)=>objekt.id === id)
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
            data[ClientStatus.online].objekte.delete(id)
            setTimeout(()=>{
              data[ClientStatus.online].objekte.get(undefined,(data:any[])=>{
                setAlleObjekte(data.map((item)=>toObjektConverter(item)))
              })
              setChangedObjekte([])
            },300)
          }}
          sort={[
            {
              name:"id",
              function:(a:Objekt,b:Objekt)=>(a.id-b.id),
              icon:<BsArrowDown />
            },
            {
              name:"id",
              function:(a:Objekt,b:Objekt)=>(b.id-a.id),
              icon:<BsArrowUp />
            },
            {
              name:"name",
              function:(a:Objekt,b:Objekt)=>(a.name.localeCompare(b.name)),
              icon:<BsArrowDown />
            },
            {
              name:"name",
              function:(a:Objekt,b:Objekt)=>(b.name.localeCompare(a.name)),
              icon:<BsArrowUp />
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