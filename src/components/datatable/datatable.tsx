import React,{useEffect,useState} from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { getFittingInputsForKey, KeyType } from '../../services/helperfunctions'
import Loadingspinner from '../loadingspinner/loadingspinner'
import styles from './datatable.module.css'

function DataTable(props:{rows:any[]|undefined,columns:string[],headline:string,handleEdit:(id:number,key:string,value:any)=>void,handleDelete:(id:number)=>void,editedElementIds?:number[],sort?:{name:string,function:(a:any,b:any)=>number,icon?:React.ReactNode}[]}) {
  
  const [currData,setCurrData] = useState<any[]>([])
  const [currIndex, setCurrIndex] = useState(0)
  const [currMaxIndex, setMaxIndex] = useState(0)
  const [currOverflow,setCurrOverflow] = useState(0)
  const [updateTable,setUpdateTable] = useState(false)
  const [activeSortIndex,setActiveSortIndex] = useState(0)

  useEffect(()=>{
    if(props && props.rows && props.columns){
        let newData = props.rows.slice()
        if(props.sort && props.sort.length > 0){
          newData.sort(props.sort[activeSortIndex].function)
        }
        setCurrOverflow(newData.length % 100)
        if(newData.length > 100){
          setMaxIndex(Math.floor(newData.length / 100))
        }else{
          setMaxIndex(0)
        }
        
        if(currIndex < (currMaxIndex)){
          setCurrData(newData.slice((currIndex)*100,(currIndex+1)*100))
        }else if(currIndex === (currMaxIndex)){
          setCurrData(newData.slice((currIndex)*100,(currIndex)*100+currOverflow))
        }
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props, props.rows])

  if(!props || !props.rows || !props.columns){
    return (
      <div className={styles.gesamtContainer + " " + styles.loadingspinner}>
          <Loadingspinner size="Big" />
      </div>
    )
  }
  const setDataToNextPage = (page:number)=>{
    if(page < (currMaxIndex)){
      setCurrData(props.rows!.slice((page)*100+((page >0)?1:0),(page+1)*100))
      setCurrIndex(page)
    }else if(page === (currMaxIndex)){
      setCurrData(props.rows!.slice((page)*100+((page >0)?1:0),(page)*100+currOverflow))
      setCurrIndex(page)
    }
  }

  const filterWithPredicate = (filterfunction:(item:any,index?:number)=>boolean)=>{
    let currFilteredData = currData.filter(filterfunction)
    setCurrData(currFilteredData)
  }
  const sortWithPredicate = (sortfunction:(a:any,b:any)=>number,index:number)=>{
    let currSortedData = props.rows!.slice().sort(sortfunction)
    setActiveSortIndex(index)
    if(currSortedData.length > 100){
      if(currIndex < (currMaxIndex)){
        setCurrData(currSortedData.slice((currIndex)*100,(currIndex+1)*100))
      }else if(currIndex === (currMaxIndex)){
        setCurrData(currSortedData.slice((currIndex)*100,(currIndex)*100+currOverflow))
      }
    }else{
      setCurrData(currSortedData)
    }
    setUpdateTable(!updateTable)
  }

  const prepPagination = ()=>{
    let children : React.ReactNode[] = []

    if(currMaxIndex > 4){
      if(currIndex < 3){
        children.push(
          [
            <div className={(currIndex===0)?styles.pageElement + " " +styles.currActivePage:styles.pageElement} onClick={(event)=>{
              setDataToNextPage(0)
            }}>
              1
            </div>,
            <div className={(currIndex===1)?styles.pageElement + " " +styles.currActivePage:styles.pageElement} onClick={(event)=>{
              setDataToNextPage(1)
            }}>
              2
            </div>,
            <div className={(currIndex===2)?styles.pageElement + " " +styles.currActivePage:styles.pageElement} onClick={(event)=>{
              setDataToNextPage(2)
            }}>
              3
            </div>,
            <div className={styles.pageElement}>
              ...
            </div>,
            <div className={styles.pageElement} onClick={(event)=>{
              setDataToNextPage(currMaxIndex)
            }}>
              {currMaxIndex+1}
            </div>
          ] 
        )
      }else if(currIndex >= currMaxIndex-2){
        children.push(
          [
            <div className={(currIndex===0)?styles.pageElement + " " +styles.currActivePage:styles.pageElement} onClick={(event)=>{
              setDataToNextPage(0)
            }}>
              1
            </div>,
            <div className={styles.pageElement}>
              ...
            </div>,
            <div className={(currIndex===currMaxIndex-2)?styles.pageElement + " " +styles.currActivePage:styles.pageElement} onClick={(event)=>{
              setDataToNextPage(currMaxIndex-2)
            }}>
              {currMaxIndex-1}
            </div>,
            <div className={(currIndex===currMaxIndex-1)?styles.pageElement + " " +styles.currActivePage:styles.pageElement} onClick={(event)=>{
              setDataToNextPage(currMaxIndex-1)
            }}>
              {currMaxIndex}
            </div>,
            <div className={(currIndex===currMaxIndex)?styles.pageElement + " " +styles.currActivePage:styles.pageElement} onClick={(event)=>{
              setDataToNextPage(currMaxIndex)
            }}>
              {currMaxIndex+1}
            </div>
          ] 
        )
      }else{
        children.push(
          [
            <div className={styles.pageElement} onClick={(event)=>{
              setDataToNextPage(0)
            }}>
              1
            </div>,
            <div className={styles.pageElement}>
              ...
            </div>,
            <div className={styles.pageElement + " " +styles.currActivePage} onClick={(event)=>{
              
            }}>
              {currIndex+1}
            </div>,
            <div className={styles.pageElement}>
              ...
            </div>,
            <div className={styles.pageElement} onClick={(event)=>{
              setDataToNextPage(currMaxIndex)
            }}>
              {currMaxIndex+1}
            </div>
          ] 
        )
      }
      
    }else{
      for(let i = 0;i <= currMaxIndex;i++){
        children.push(
          currIndex === i?
            <div className={styles.currActivePage+ " "+styles.pageElement}>
              {i+1}
            </div>:
            <div className={styles.pageElement} onClick={(event)=>setDataToNextPage(i)}>
              {i+1}
            </div>
        )
      }
    }
    
    return (
    <>
      <div className={styles.pageElement} onClick={(event)=>{
        if(currIndex > 0){
          setDataToNextPage(currIndex-1)
        }
      }}>
        <BsArrowLeft />
      </div>
      {children}
      <div className={styles.pageElement} onClick={(event)=>{
        if(currIndex < currMaxIndex){
          setDataToNextPage(currIndex+1)
        }
      }}>
        <BsArrowRight />
      </div>
    </>)
  }

  

  return (
      <div className={styles.gesamtContainer}>
        <div className={styles.headline}>{props.headline}</div>
        <div className={styles.features}>
          {
            props.sort && props.sort.length > 0?
            <div className={styles.sortSection}>
              {props.sort!.map((sort,index)=>{
                return (
                <div key={index} className={styles.sortbutton + (index === activeSortIndex?` ${styles.activesort}`:"")} onClick={(event)=>sortWithPredicate(sort.function,index)}>
                    {sort.icon?sort.icon:<></>}
                    {sort.name}
                </div>
                )
              })}
            </div>
            :
            <></>
          }
          {
            currMaxIndex > 0?
            <div className={styles.pagination}>
              {
                prepPagination()
              }
            </div>
            :
            <></>
          }
        </div>
        <div className={styles.actualTable}>
          <div className={styles.columns}>{props.columns.map((column,index)=>{
            return (
            <div key={index} className={styles.columnsegment+ (column === "id"?" "+styles.id:column ==="adresse"?" "+styles.adresse:"")}>{column}</div>)
            })}
            <div className={styles.columnsegment+ " "+styles.id}></div>
          </div>
          <div className={styles.dataRow}>
            {
              currData.map((item,index)=>{
                return (
                  <div key={index} className={(props.editedElementIds && props.editedElementIds.find((id)=>id===item.id!))?styles.datarowelement+' datarow'+index+" "+styles.edited :styles.datarowelement+' datarow'+index} onClick={(e)=>{}}>
                    {
                      props.columns.map((key,smallIndex)=>{
                        if(Object.keys(item).find(itemkey=>itemkey===key)){
                          return (<div key={smallIndex} className={styles.rowsegment+ (key === "id"?" "+styles.id:key ==="adresse"?" "+styles.adresse:"")}>{getFittingInputsForKey(key as KeyType,item[key],(event,zusatz)=>{
                            if(zusatz){
                              props.handleEdit(item.id?item.id:-1,key+"."+zusatz,event.currentTarget.value)
                            }else{
                              props.handleEdit(item.id?item.id:-1,key,event.currentTarget.value)
                            }
                          })}</div>)
                        }else{
                          return <div key={smallIndex} className={styles.rowsegment+ (key === "id"?" "+styles.id:"")}></div>
                        }
                      })
                    }
                    <div className={styles.rowsegment+" "+styles.id + " "+styles.delete} onClick={(event)=>props&&props.handleDelete?props.handleDelete(item.id):undefined}><RiDeleteBin5Line /></div>
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