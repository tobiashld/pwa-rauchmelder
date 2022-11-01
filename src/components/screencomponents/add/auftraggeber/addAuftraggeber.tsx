import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import data from '../../../../services/datafunctions'
import { Adresse, Auftraggeber } from '../../../../types/allgemein'
import { ClientStatus } from '../../../../types/statusenum'
import AddButton from '../../../addbutton/addbutton'
import SaveButton from '../../../savebutton/savebutton'
import TextInput from '../../../textinput/textinput'
import styles from './add.module.css'

type AuftraggeberChangeKeys = 'adresse' | 'email' | 'name' | 'telefon';

function AddAuftraggeber() {
    const [auftraggeber,setAuftraggeber] = useState<Auftraggeber[]>([new Auftraggeber(0,new Adresse(0,"","",""),"","","")])
    const [isSavable,setIsSavable] = useState(false)
    const navigate = useNavigate()

    const handleChange = (key:string,value:any,id:number)=>{
      setIsSavable(true)
      let auftraggeberCopy = [...auftraggeber].map((auftraggeber)=>{
        if(auftraggeber.id === id){
          let berKey = key.split(".")
          if(berKey[0] as AuftraggeberChangeKeys === "adresse"){
            switch(berKey[1]){
              case "hausnummer":
                auftraggeber.adresse.hausnummer = value;
                break;
              case "ort":
                auftraggeber.adresse.ort = value
                break;
              case "plz":
                auftraggeber.adresse.plz = value
                break;
              case "straße":
                auftraggeber.adresse.straße = value
                break;
            }
          }else{
            auftraggeber[berKey[0] as AuftraggeberChangeKeys] = value;
          }
        }
        return auftraggeber
      })
      setAuftraggeber(auftraggeberCopy)
    }

    const handleSave = ()=>{
      auftraggeber.forEach(auftraggeber=>{
        data[ClientStatus.online].auftraggeber.create(auftraggeber,(data)=>{
          
        })
      })
      setTimeout(()=>{
        navigate("/auftraggeber")
      },300)
    }

    const handleAdd = ()=>{
      let newAuftraggeber = new Auftraggeber(auftraggeber.length,new Adresse(0,"","",""),"","","")
      let helperArray = auftraggeber.slice()
      helperArray.push(newAuftraggeber)
      setAuftraggeber(helperArray)
    }

    return (
        <div className={styles.gesamtContainer}>
            <div className={styles.headline}>Auftraggeber</div>
            <div className={styles.actualTable}>
          <div className={styles.columns}>

            <div className={styles.columnsegment}>Name</div>
            <div className={styles.columnsegment}>Straße</div>
            <div className={styles.columnsegment + " "+styles.id}>Hausnummer</div>
            <div className={styles.columnsegment+" "+styles.id} >Plz</div>
            <div className={styles.columnsegment}>Ort</div>
            <div className={styles.columnsegment}>Telefon</div>
            <div className={styles.columnsegment}>Email</div>
            
          </div>
          <div className={styles.dataRow}>
                {
                    auftraggeber.map((auftraggeber,index)=>{
                        return (
                          <div className={styles.datarowelement} onClick={(e)=>{}}>
                            <div  className={styles.rowsegment}><TextInput size={"Small"} placeholder={"Name"} onChange={(event)=>{handleChange("name",event.currentTarget.value,auftraggeber.id)}}/></div>
                            <div  className={styles.rowsegment}><TextInput size={"Small"} placeholder={"Straße"} onChange={(event)=>{handleChange("adresse.straße",event.currentTarget.value,auftraggeber.id)}}/></div>
                            <div  className={styles.rowsegment}><TextInput size={"Small"} placeholder={"Hausnummer"} onChange={(event)=>{handleChange("adresse.hausnummer",event.currentTarget.value,auftraggeber.id)}}/></div>
                            <div  className={styles.rowsegment}><TextInput size={"Small"} placeholder={"Plz"} onChange={(event)=>{handleChange("adresse.plz",event.currentTarget.value,auftraggeber.id)}}/></div>
                            <div  className={styles.rowsegment}><TextInput size={"Small"} placeholder={"Ort"} onChange={(event)=>{handleChange("adresse.ort",event.currentTarget.value,auftraggeber.id)}}/></div>
                            <div  className={styles.rowsegment}><TextInput size={"Small"} placeholder={"Telefon"} onChange={(event)=>{handleChange("telefon",event.currentTarget.value,auftraggeber.id)}}/></div>
                            <div  className={styles.rowsegment}><TextInput size={"Small"} placeholder={"Email"} onChange={(event)=>{handleChange("email",event.currentTarget.value,auftraggeber.id)}}/></div>
                          </div>
                          )
                        })
                     
                }
                              
          </div>
        </div>
        <div className={styles.interactions}>
        <AddButton routeParam='auftraggeber' onClick={handleAdd} />
        <SaveButton onClick={handleSave} isShown={isSavable}/>
      </div>
            
        </div>
    )
}

export default AddAuftraggeber