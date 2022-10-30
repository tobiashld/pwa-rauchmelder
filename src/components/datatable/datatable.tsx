import React,{useEffect,useState} from 'react'
import Loadingspinner from '../loadingspinner/loadingspinner'
import styles from './datatable.module.css'

function DataTable(props:{rows:any[]|undefined,columns:string[],headline:string,handleEdit:(id:number)=>void,sort?:{name:string,function:(a:any,b:any)=>number,icon?:React.ReactNode}[]}) {
  
  const [currData,setCurrData] = useState<any[]>([])
  const [updateTable,setUpdateTable] = useState(false)
  const [activeSortIndex,setActiveSortIndex] = useState(0)

  useEffect(()=>{
    if(props && props.rows && props.columns){
      
        setCurrData(props.rows)
      
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props, props.rows])

  if(!props || !props.rows || !props.columns){
    return (
      <div>
          <Loadingspinner size="Big" />
      </div>
    )
  }
  

  const filterWithPredicate = (filterfunction:(item:any,index?:number)=>boolean)=>{
    let currFilteredData = currData.filter(filterfunction)
    setCurrData(currFilteredData)
  }
  const sortWithPredicate = (sortfunction:(a:any,b:any)=>number,index:number)=>{
    let currSortedDate = currData.sort(sortfunction)
    setActiveSortIndex(index)
    setCurrData(currSortedDate)
    setUpdateTable(!updateTable)
  }

  return (
      <div className={styles.gesamtContainer}>
        <div className={styles.headline}>{props.headline}</div>
        {
          props.sort && props.sort.length > 0?
          <div className={styles.sortSection}>
            {props.sort!.map((sort,index)=>{
              return (
              <div className={styles.sortbutton + (index === activeSortIndex?` ${styles.activesort}`:"")} onClick={(event)=>sortWithPredicate(sort.function,index)}>
                  {sort.icon?sort.icon:<></>}
                  {sort.name}
              </div>
              )
            })}
          </div>
          :
          <></>
        }
        <div className={styles.actualTable}>
          <div className={styles.columns}>{props.columns.map((column,index)=>{
            return (
            <div key={index} className={styles.columnsegment+ (column === "id"?" "+styles.id:"")}>{column}</div>)
            })}
          </div>
          <div className={styles.dataRow}>
            {
              props.rows.map((item,index)=>{

                return (
                  <div key={index} className={styles.datarowelement+' datarow'+index} onClick={(e)=>props.handleEdit(item.id)}>
                    {
                      props.columns.map((key,smallIndex)=>{
                        if(item[key]){
                          return (<div key={smallIndex} className={styles.rowsegment+ (key === "id"?" "+styles.id:"")}>{item[key].toString()}</div>)
                        }else{
                          return <div key={smallIndex} className={styles.rowsegment+ (key === "id"?" "+styles.id:"")}></div>
                        }
                      })
                      // Object.keys(item).map((key,smallIndex)=>{
                      //   let findIndex = props.columns.findIndex((item)=>item===key)
                      //   if( findIndex >= 0){
                      //     // if(typeof item[key] === 'object'){
                      //     //   return (<div key={smallIndex}className={styles.rowsegment}>{Object.keys(item[key]).map((objectkey)=>{return item[key][objectkey]}).join(" ")}</div>)
                      //     // }
                      //     console.log(key)
                      //     console.log(item[key])
                          
                      //   }
                        
                        // return <></>
                      // })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
  )
}

export default DataTable