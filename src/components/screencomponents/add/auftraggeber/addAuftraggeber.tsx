import React, { useState } from 'react'
import { Auftraggeber } from '../../../../types/allgemein'
import TextInput from '../../../textinput/textinput'
import styles from './add.module.css'

function AddAuftraggeber() {
    const [auftraggeber,setAuftraggeber] = useState<Auftraggeber[]>([])

    const handleChange = (key:string,value:any,index:number)=>{
        let auftraggeberCopy = [...auftraggeber]
        let changedObject = auftraggeberCopy[index]
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
                        return (<div className={styles.datarowelement} onClick={(e)=>console.log(e)}>
                        
                              <div  className={styles.rowsegment}><TextInput /></div>
                              <div  className={styles.rowsegment}></div>
                              <div  className={styles.rowsegment}></div>
                              <div  className={styles.rowsegment}></div>
                              <div  className={styles.rowsegment}></div>
                              <div  className={styles.rowsegment}></div>
                              <div  className={styles.rowsegment}></div>
                            
                              
                              </div>
                          )
                        })
                     
                }
                              
          </div>
        </div>
            
        </div>
    )
}

export default AddAuftraggeber