import React, { useState } from 'react'
import {  useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useObjekteGet } from '../../../../hooks/useObjekte'
import dataFunctions from '../../../../services/datafunctions'
import { Rauchmelder,  } from '../../../../types/rauchmelder'
import AddButton from '../../../addbutton/addbutton'
import Loadingspinner from '../../../loadingspinner/loadingspinner'
import SaveButton from '../../../savebutton/savebutton'
import TextInput from '../../../textinput/textinput'
import styles from './add.module.css'


function AddRauchmelder() {    
    const [rauchmelder,setrauchmelder] = useState<Rauchmelder[]>([new Rauchmelder("","",new Date(),true,undefined)])
    const [isSavable,setIsSavable] = useState(false)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const objekteQuery = useObjekteGet()
    const wohnungsQuery = useQuery('wohnungen',()=>dataFunctions[1].wohnungen.get())

    const handleChange = (key:keyof Rauchmelder,value:any,id:number)=>{
      setIsSavable(true)
      setrauchmelder(rauchmelder.map((rauchmelder:Rauchmelder,index)=>{
        if(index === id && key !== undefined){
          // rauchmelder[key as keyof Rauchmelder] = value
        }
        return rauchmelder
      }))
    }

    const handleSave = ()=>{
      rauchmelder.forEach((rauchmelder:any)=>{
        dataFunctions[1].rauchmelder.create(rauchmelder,(data)=>{
          console.log(data)
        }) 
      })
      setTimeout(()=>{  
        queryClient.invalidateQueries('rauchmelder')
        navigate("/rauchmelder")
      },300)
    }

    const handleChangeObjekt = (value:string,index:number)=>{

    }
    const handleChangeWohnung = (value:string,index:number)=>{

    }

    if(wohnungsQuery.isLoading || objekteQuery.isLoading 
      || !wohnungsQuery.data?.data || !objekteQuery.data?.data){
        return <Loadingspinner size='Big' />
      }

    
    const handleAdd = ()=>{
      let newrauchmelder = new Rauchmelder("","",new Date(),true)
      let helperArray = rauchmelder.slice()
      helperArray.push(newrauchmelder)
      setrauchmelder(helperArray)
    }

    return (
        <div className={styles.gesamtContainer}>
            <div className={styles.headline}>Rauchmelder</div>
            <div className={styles.actualTable}>
          <div className={styles.columns}>

            <div className={styles.columnsegment}>Raum</div>
            <div className={styles.columnsegment}>Seriennr</div>
            <div className={styles.columnsegment}>Produktionsdatum</div>
            <div className={styles.columnsegment+" "+styles.id} >Objekt</div>
            <div className={styles.columnsegment}>Wohnung</div>
            
          </div>
          <div className={styles.dataRow}>
                {
                    rauchmelder.map((rauchmelder,index)=>{
                        return (
                          <div className={styles.datarowelement} onClick={(e)=>{}}>
                            <div  className={styles.rowsegment}><TextInput size={"Small"} placeholder={"Raum"} onChange={(event)=>{handleChange('raum',event.currentTarget.value,index)}}/></div>
                            <div  className={styles.rowsegment}><TextInput size={"Small"} placeholder={"Seriennr"} onChange={(event)=>{handleChange("seriennr",event.currentTarget.value,index)}}/></div>
                            <div  className={styles.rowsegment}><TextInput size={"Small"} placeholder={"Produktionsdatum"} onChange={(event)=>{handleChange("produktionsdatum",event.currentTarget.value,index)}}/></div>
                            <div  className={styles.rowsegment}><TextInput size={"Small"} placeholder={"Objekt"} onChange={(event)=>{handleChangeObjekt(event.currentTarget.value,index)}}/></div>
                            <div  className={styles.rowsegment}><TextInput size={"Small"} placeholder={"Wohnung"} onChange={(event)=>{handleChangeWohnung(event.currentTarget.value,index)}}/></div>
                          </div>
                          )
                        })
                     
                }
                              
          </div>
        </div>
        <div className={styles.interactions}>
        <AddButton routeParam='rauchmelder' onClick={handleAdd} />
        <SaveButton onClick={handleSave} isShown={isSavable}/>
      </div>
            
        </div>
    )
}

export default AddRauchmelder