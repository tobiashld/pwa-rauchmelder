import React from 'react'
import styles from './datatable.module.css'

function DataTable(props:{rows:any[]|undefined,columns:string[],headline:string,handleEdit:(id:number)=>void}) {
  if(!props || !props.rows || !props.columns){
    return (
      <div>

      </div>
    )
  }
  return (
      <div className={styles.gesamtContainer}>
        <div className={styles.headline}>{props.headline}</div>
        <div className={styles.columns}>{props.columns.map((column,index)=>{return (<div key={index} className={styles.columnsegment}>{column}</div>)})}</div>
        <div className={styles.dataRow}>
          {
            props.rows.map((item,index)=>{

              return (
                <div key={index} className={styles.datarowelement+' datarow'+index} onClick={(e)=>props.handleEdit(item.id)}>
                  {
                    Object.keys(item).map((key,smallIndex)=>{
                      let findIndex = props.columns.findIndex((item)=>item===key)
                      if( findIndex >= 0){
                        // if(typeof item[key] === 'object'){
                        //   return (<div key={smallIndex}className={styles.rowsegment}>{Object.keys(item[key]).map((objectkey)=>{return item[key][objectkey]}).join(" ")}</div>)
                        // }
                        return (<div key={smallIndex}className={styles.rowsegment}>{item[key].toString()}</div>)
                      }
                      
                      return <></>
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
  )
}

export default DataTable