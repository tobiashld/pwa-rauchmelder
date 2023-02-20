import React,{useEffect,useState} from 'react'
import { BsArrowDown, BsArrowLeft, BsArrowRight, BsArrowUp } from 'react-icons/bs'
import { RiDeleteBin5Line } from 'react-icons/ri'
import HistoryIcon from '@mui/icons-material/History';
import { getFittingInputsForKey, KeyType } from '../../services/helperfunctions'
import Loadingspinner from '../loadingspinner/loadingspinner'
import styles from './datatable.module.css'

function DataTable(props:{
  rows:any[]|undefined,
  columns:string[],
  headline:string,
  handleEdit:(id:number,key:string,value:any)=>void,
  handleDelete:(id:number)=>void,editedElementIds?:number[],
  handleRowClick?:(id:number)=>void,
  handleHistory?:(id:number)=>void,
  sort?:SortArgument[],
  options?:any[],
  disabledRows?:boolean
}) {
  
  const [currIndex, setCurrIndex] = useState(0)
  const [currMaxIndex, setMaxIndex] = useState(0)
  const [currOverflow,setCurrOverflow] = useState(0)
  const [activeSortIndex,setActiveSortIndex] = useState(0)
  const [activeSortDirection,setActiveSortDirection] = useState(true) // true -> asc, false -> desc

  useEffect(()=>{
    if(props && props.rows && props.columns){
        
        setCurrOverflow(props.rows.length % 100)
        if(props.rows.length > 100){
          setMaxIndex(Math.floor(props.rows.length / 100))
        }else{
          setMaxIndex(0)
        }
        
        
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props, props.rows])

  if(!props || !props.rows || !props.columns || props.rows.length <= 0){
    return (
      <div className={styles.gesamtContainer + " " + styles.loadingspinner}>
          <Loadingspinner size="Big" />
      </div>
    )
  }
  

  

  const prepPagination = ()=>{
    let children : React.ReactNode[] = []

    if(currMaxIndex > 4){
      if(currIndex < 3){
        children.push(
          [
            <div className={(currIndex===0)?styles.pageElement + " " +styles.currActivePage:styles.pageElement} onClick={(event)=>{
              setCurrIndex(0)
            }}>
              1
            </div>,
            <div className={(currIndex===1)?styles.pageElement + " " +styles.currActivePage:styles.pageElement} onClick={(event)=>{
              setCurrIndex(1)
            }}>
              2
            </div>,
            <div className={(currIndex===2)?styles.pageElement + " " +styles.currActivePage:styles.pageElement} onClick={(event)=>{
              setCurrIndex(2)
            }}>
              3
            </div>,
            <div className={styles.pageElement}>
              ...
            </div>,
            <div className={styles.pageElement} onClick={(event)=>{
              setCurrIndex(currMaxIndex)
            }}>
              {currMaxIndex+1}
            </div>
          ] 
        )
      }else if(currIndex >= currMaxIndex-2){
        children.push(
          [
            <div className={(currIndex===0)?styles.pageElement + " " +styles.currActivePage:styles.pageElement} onClick={(event)=>{
              setCurrIndex(0)
            }}>
              1
            </div>,
            <div className={styles.pageElement}>
              ...
            </div>,
            <div className={(currIndex===currMaxIndex-2)?styles.pageElement + " " +styles.currActivePage:styles.pageElement} onClick={(event)=>{
              setCurrIndex(currMaxIndex-2)
            }}>
              {currMaxIndex-1}
            </div>,
            <div className={(currIndex===currMaxIndex-1)?styles.pageElement + " " +styles.currActivePage:styles.pageElement} onClick={(event)=>{
              setCurrIndex(currMaxIndex-1)
            }}>
              {currMaxIndex}
            </div>,
            <div className={(currIndex===currMaxIndex)?styles.pageElement + " " +styles.currActivePage:styles.pageElement} onClick={(event)=>{
              setCurrIndex(currMaxIndex)
            }}>
              {currMaxIndex+1}
            </div>
          ] 
        )
      }else{
        children.push(
          [
            <div className={styles.pageElement} onClick={(event)=>{
              setCurrIndex(0)
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
              setCurrIndex(currMaxIndex)
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
            <div className={styles.pageElement} onClick={(event)=>setCurrIndex(i)}>
              {i+1}
            </div>
        )
      }
    }
    
    return (
    <>
      <div className={styles.pageElement} onClick={(event)=>{
        if(currIndex > 0){
          setCurrIndex(currIndex-1)
        }
      }}>
        <BsArrowLeft />
      </div>
      {children}
      <div className={styles.pageElement} onClick={(event)=>{
        if(currIndex < currMaxIndex){
          setCurrIndex(currIndex+1)
        }
      }}>
        <BsArrowRight />
      </div>
    </>)
  }

  const getSortDirection = (sortarg:SortArgument)=>{
    if(activeSortDirection){
      return sortarg.functionAsc
    }else{
      return sortarg.functionDesc
    }
  }

  

  return (
    <div className={styles.paddingcontainer}>
      <div className={styles.gesamtContainer}>
        <div className={styles.headline}>{props.headline}</div>
        <div className={styles.features}>
          {
            props.sort && props.sort.length > 0?
            <div className={styles.sortSection}>
              {props.sort!.map((sort,index)=>{
                return (
                <div key={index} className={styles.sortbutton + (index === activeSortIndex?` ${styles.activesort}`:"")} onClick={(event)=>{
                  if(activeSortIndex === index){
                    setActiveSortDirection(!activeSortDirection)
                  }else{
                    setActiveSortDirection(true)
                    setActiveSortIndex(index)
                  }
                }}>
                    {activeSortIndex === index? activeSortDirection?<BsArrowDown />:<BsArrowUp />:<></>}
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
            if(column === 'id')return <></>
            return (
            <div key={index} className={styles.columnsegment+ (column === "id"?" "+styles.id:column ==="adresse"?" "+styles.adresse:"")}>{column}</div>)
            })}
            <div className={styles.columnsegment+ " "+styles.id}></div>
          </div>
          <div className={styles.dataRow}>
            {
              props.rows!
                .sort(props.sort && props.sort[activeSortIndex]?getSortDirection(props.sort[activeSortIndex]):(value)=>value)
                .slice(currIndex * 100,currIndex < (currMaxIndex)?(currIndex+1)*100-1:currIndex*100+currOverflow)
                .map((item,index)=>{
                return (
                  <div key={index} className={(props.editedElementIds && props.editedElementIds.find((id)=>id===item.id!))?styles.datarowelement+' datarow'+index+" "+styles.edited+  " "+(props.handleRowClick?styles.clickable:"") :styles.datarowelement+' datarow'+index +  " "+ (props.handleRowClick?styles.clickable:"")} onClick={()=>props.handleRowClick?props.handleRowClick(item.id!):undefined}>
                    {
                      props.columns.map((key,smallIndex)=>{
                        if(key==='id')return <></>
                        if(Object.keys(item).find(itemkey=>itemkey===key)){
                          return (<div key={smallIndex} className={styles.rowsegment+ (key === "id"?" "+styles.id:key ==="adresse"?" "+styles.adresse:"")}>{getFittingInputsForKey(key as KeyType,item[key],(event,zusatz)=>{
                            if(zusatz){
                              props.handleEdit(item.id?item.id:-1,key+"."+zusatz,event.currentTarget.value)
                            }else{
                              props.handleEdit(item.id?item.id:-1,key,event.currentTarget.value)
                            }
                          },props.options?props.options:undefined,props.disabledRows?props.disabledRows:undefined)}</div>)
                        }else{
                          return <div key={smallIndex} className={styles.rowsegment+ (key === "id"?" "+styles.id:"")}></div>
                        }
                      })
                    }
                    <div className={styles.rowsegment+" "+styles.id + " "+styles.interactions} >{props.handleHistory?<HistoryIcon className={styles.history} onClick={(event)=>props.handleHistory!(item.id)} />:<></>}<RiDeleteBin5Line className={styles.delete} onClick={(event)=>props&&props.handleDelete?props.handleDelete(item.id):undefined}/></div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      </div>
  )
}
export interface SortArgument 
  {
    name:string,
    functionAsc:(a:any,b:any)=>number,
    functionDesc:(a:any,b:any)=>number
  }


export default DataTable