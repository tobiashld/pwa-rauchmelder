import { useSnackbar } from 'notistack'
import React,{useState,useEffect} from 'react'
import { useQuery } from 'react-query'
import dataFunctions from '../../../services/datafunctions'
import { ClientStatus } from '../../../types/statusenum'
import { Wohnung } from '../../../types/wohnung'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import Loadingspinner from '../../loadingspinner/loadingspinner'
import SaveButton from '../../savebutton/savebutton'
import styles from './wohnungen.module.css'


function WohnungenComponent() {
  const wohnungenQuery = useQuery(["wohnungen"],()=>dataFunctions[1].wohnungen.get())
  const [changedWohnungen,setChangedWohnungen] = useState<Wohnung[]>([])
  const [isSavable,setIsSavable] = useState(false)
  const {enqueueSnackbar} = useSnackbar()

 

  

  useEffect(()=>{
    if(changedWohnungen.length > 0){
      setIsSavable(true)
    }else{
      setIsSavable(false)
    }
  },[changedWohnungen])

  if(wohnungenQuery.isLoading)return <div><Loadingspinner size="Big"/> </div>
  if(wohnungenQuery.isError){
    enqueueSnackbar("Error in Wohnungencomponent",{variant:"error"})
    return <div>Error</div>
  }

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
  }


  return (
    <>
      <div className={styles.table}>
        <DataTable<Wohnung> 
          rows={wohnungenQuery.data?.data} 
          columns={[
            {
              title:"Etage",
              render:(obj)=>{
                return <div>
                  {obj.etage}
                </div>
              }
            },
            {
              title:"Lage",
              render:(obj)=>{
                return <div>
                  {obj.wohnungslage}
                </div>
              }
            },
            {
              title:"Haus",
              render:(obj)=>{
                return <div>
                  {obj.haus}
                </div>
              }
            },
            {
              title:"Vorname",
              render:(obj)=>{
                return <div>
                  {obj.vorname}
                </div>
              }
            },
            {
              title:"Nachname",
              render:(obj)=>{
                return <div>
                  {obj.nachname}
                </div>
              }
            },
            {
              title:"",
              render:(obj)=>{
                return <div>
                  delete
                </div>
              }
            },
          ]} 
          headline="Wohnungen" 
          // handleEdit={(id,key,value)=>{
          //   if(id === -1){
              
          //   }else{
            //   let currWohnung = alleWohnungen.slice().find((wohnung)=>wohnung.id === id)
            //   let newWohnung = currWohnung?new Wohnung(currWohnung.id,currWohnung.objektid,currWohnung.etage,currWohnung.haus,currWohnung.lage,currWohnung.mieter):undefined
            //   if(newWohnung && (newWohnung[key as WohnungChangeKeys]!.toString() !== value.toString() && value.toString() !== "")){
            //     let alreadyChanged = changedWohnungen.slice().find((wohnung)=>wohnung.id===id)
            //     if(alreadyChanged){
            //       let addChangedObjek = changedWohnungen.slice().map((kurzWohnung:Wohnung)=>{
            //         if(kurzWohnung.id === id){
            //           kurzWohnung[key as WohnungChangeKeys] = value
            //           return kurzWohnung
            //         }else{
            //           return kurzWohnung
            //         }
            //       })
            //       setChangedWohnungen(addChangedObjek)
            //     }else{
            //       let addChangedObjek = changedWohnungen.slice()
            //       addChangedObjek.push(newWohnung)
            //       setChangedWohnungen(addChangedObjek)
            //     }
                
            //   }else if(newWohnung && (newWohnung[key as WohnungChangeKeys]!.toString() === value.toString() || value.toString() === "")){
            //     let removeNotChangedObjek = changedWohnungen.slice().filter((objekt)=>objekt.id!==id)
            //     setChangedWohnungen(removeNotChangedObjek)
            //   }else{
            //     //error
            //   }
            // }
          // }}}
          editedElementIds={changedWohnungen.map(wohnung=>wohnung.id!)}
          // handleDelete={(id)=>{
          //   dataFunctions[ClientStatus.online].wohnungen.delete(id)
          //   setTimeout(()=>{
          //     dataFunctions[ClientStatus.online].wohnungen.get(undefined,(data)=>{
          //       // setAlleWohnungen(data.data!)
          //     })
          //     setChangedWohnungen([])
          //   },300)
          // }}
            sort={[
              {
                name:"hinzugefügt",
                functionAsc:(a:Wohnung,b:Wohnung)=>(a.id!-b.id!),
                functionDesc:(a:Wohnung,b:Wohnung)=>(b.id!-a.id!),
              },
              {
                name:"mieter",
                functionAsc:(a:Wohnung,b:Wohnung)=>(a.nachname.localeCompare(b.nachname)),
                functionDesc:(a:Wohnung,b:Wohnung)=>(b.nachname.localeCompare(a.nachname)),
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