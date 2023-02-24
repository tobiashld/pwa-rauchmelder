import React,{useEffect,useState} from 'react'
import { BsArrowDown, BsArrowLeft, BsArrowRight, BsArrowUp } from 'react-icons/bs'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { getFittingInputsForKey, KeyType } from '../../services/helperfunctions'
import Loadingspinner from '../loadingspinner/loadingspinner'
import styles from './datatable.module.css'
import {Scrollbars} from 'react-custom-scrollbars-2'
import { Divider, Typography } from '@mui/material';
import useWindowDimensions from '../../hooks/useWindowDimensions';

function DataTable<T>(props:{
  rows:T[]|undefined,
  columns:{
    title:string,
    render:(obj:T)=>JSX.Element,
  }[],
  headline:string,
  editedElementIds?:number[],
  handleRowClick?:(id:number)=>void,
  handleHistory?:(id:number)=>void,
  sort?:SortArgument<T>[],
  options?:any[],
  disabledRows?:boolean
}) {
  
  const [currIndex, setCurrIndex] = useState(0)
  const [currMaxIndex, setMaxIndex] = useState(0)
  const [currOverflow,setCurrOverflow] = useState(0)
  const [activeSortIndex,setActiveSortIndex] = useState(0)
  const { width } = useWindowDimensions()
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

  const getSortDirection = (sortarg:SortArgument<T>)=>{
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
                    
                    {activeSortIndex === index?<BsArrowDown className={styles.sortindicator + " " +(activeSortDirection?styles.downarrow:styles.uparrow)}></BsArrowDown>:<></>}
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
        {
          width > 800?
        <div className={styles.actualTable} style={{display:'grid',gridTemplateAreas:`'tablehead' 'tablebody'`,gridTemplateRows:'50px 1fr'}}>
          <div className={styles.tableHead} style={{gridArea:'tablehead',display:'grid',gridTemplateColumns:`repeat(${props.columns.length},1fr)`}} >
            {props.columns.map(column=>{
              return (
                <div className={styles.tableHeadCell}>
                  <Typography variant={"h6"}>
                  {column.title}
                  </Typography>
                </div>
              )
            })}
          </div>
          <Scrollbars 
            className={styles.scroll}
            
          >
            
            <div 
              className={styles.tableBody}
              style={{display:'grid',gridTemplateColumns:`repeat(${props.columns.length},1fr)`,gridArea:'tablebody',gridTemplateRows:`repeat(${props.rows!.slice(currIndex * 100,currIndex < (currMaxIndex)?(currIndex+1)*100-1:currIndex*100+currOverflow).length},40px)`}}
            >
            {
              props.rows!
                .sort(props.sort && props.sort[activeSortIndex]?getSortDirection(props.sort[activeSortIndex]):(a,b)=>1)
                .slice(currIndex * 100,currIndex < (currMaxIndex)?(currIndex+1)*100-1:currIndex*100+currOverflow)
                .map((item,index,array)=>{
                return (
                  <div className={styles.gridrow}>
                    {props.columns.map(column=>{
                    return column.render(item)})}
                  </div>
                  // <div key={index} className={(props.editedElementIds && props.editedElementIds.find((id)=>id===item.id!))?styles.datarowelement+' datarow'+index+" "+styles.edited+  " "+(props.handleRowClick?styles.clickable:"") :styles.datarowelement+' datarow'+index +  " "+ (props.handleRowClick?styles.clickable:"")} onClick={()=>props.handleRowClick?props.handleRowClick(item.id!):undefined}>
                  //   {
                  //     props.columns.map((key,smallIndex)=>{
                  //       if(key==='id')return <></>
                  //       if(Object.keys(item).find(itemkey=>itemkey===key)){
                  //         return (<div key={smallIndex} className={styles.rowsegment+ (key === "id"?" "+styles.id:key ==="adresse"?" "+styles.adresse:"")}>{getFittingInputsForKey(key as KeyType,item[key],(event,zusatz)=>{
                  //           if(zusatz){
                  //             props.handleEdit(item.id?item.id:-1,key+"."+zusatz,event.currentTarget.value)
                  //           }else{
                  //             props.handleEdit(item.id?item.id:-1,key,event.currentTarget.value)
                  //           }
                  //         },props.options?props.options:undefined,props.disabledRows?props.disabledRows:undefined)}</div>)
                  //       }else{
                  //         return <div key={smallIndex} className={styles.rowsegment+ (key === "id"?" "+styles.id:"")}></div>
                  //       }
                  //     })
                  //   }
                  //   <div className={styles.rowsegment+" "+styles.id + " "+styles.interactions} >{props.handleHistory?<HistoryIcon className={styles.history} onClick={(event)=>props.handleHistory!(item.id)} />:<></>}<RiDeleteBin5Line className={styles.delete} onClick={(event)=>props&&props.handleDelete?props.handleDelete(item.id):undefined}/></div>
                  // </div>
                )
              })
            }
            </div>
          </Scrollbars>
        </div>:<>
        </>
        }
      </div>
      </div>
  )
}
export interface SortArgument<T> 
  {
    name:string,
    functionAsc:(a:T,b:T)=>number,
    functionDesc:(a:T,b:T)=>number
  }


export default DataTable