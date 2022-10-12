import React, { useState } from 'react'
import styles from './textinput.module.css'

type params = {
    onClick?: ((event:React.MouseEvent<HTMLInputElement, MouseEvent>)=>void),
    onChange?: ((event:React.ChangeEvent<HTMLInputElement>)=>void),
    onKeyDown?: ((event:React.KeyboardEvent<HTMLInputElement>)=>void),
    onKeyUp?: ((event:React.KeyboardEvent<HTMLInputElement>)=>void),
    onBlur?: ((event?:React.FocusEvent<HTMLInputElement,Element>)=>void),
    setFocus?:(value:boolean)=>void,
    dropdownRef?:React.Ref<any>,
    regexValidator?:string,
    style?: string,
    type?:'text'|'password'
    pattern?: string,
    onFocusPointOut?: boolean,
    placeholder?:string,
    children?:any,
    icon?:any,
    focus?:boolean
    size?:'Big' | 'Small'
}

const TextInput = React.forwardRef<HTMLInputElement,params>((props:params,ref)=> {
  
  const [value, setValue] = useState("")

  if(!props){
    return (<div className='container'><input className={styles.big + " " +styles.input}/></div>)
  }
  

  let classNames = props.size && props.size === styles.Small?styles.Small:styles.Big;
  classNames += props.icon?' '+styles.input+' '+styles["input-icon"]:' '+styles.input+' '+styles["input-wo-icon"];

  return (
    <>
      {(props.onFocusPointOut)?<><div className={props.focus?styles.coverup:styles["coverup-gone"]} onClick={(event)=>{if(props.onBlur&&props.setFocus){props.onBlur();props.setFocus(false)}}}></div></>:<></>}
      <div className={styles.container}>
          {props.icon?<div className={styles.icon}>{props.icon}</div>:<></>}
          <input 
              ref={ref}
              type={props.type?props.type:"text"}
              value={value}
              className={classNames}
              onClick={(event)=>{if(props.onClick)props.onClick(event)}}
              onChange={(event)=>{
                if(props.regexValidator){
                  if(event.currentTarget.value.match(props.regexValidator))setValue(event.currentTarget.value)
                }else{
                  setValue(event.currentTarget.value)
                }
                if(props.onChange)props.onChange(event)
              }}
              onKeyDown={(event)=>{
                if(props.regexValidator){
                  if(event.currentTarget.value.match(props.regexValidator))setValue(event.currentTarget.value)
                }else{
                  setValue(event.currentTarget.value)
                }
                if(props.onKeyDown)props.onKeyDown(event)
              }}
              onKeyUp={(event)=>{
                if(props.regexValidator){
                  if(event.currentTarget.value.match(props.regexValidator))setValue(event.currentTarget.value)
                }else{
                  setValue(event.currentTarget.value)
                }
                if(props.onKeyUp)props.onKeyUp(event)
              }}
              placeholder={props.placeholder?props.placeholder:undefined}   
              onFocus={()=>{if(props.setFocus)props.setFocus(true)}}  
              pattern={props.pattern?props.pattern:undefined}   
              onBlur={(event)=>{if(props.onBlur){
                props.onBlur(event)};
                if(props.setFocus){
                //props.setFocus(false)
                //props.onBlur(event)
              }}}
              >{props.children}</input>
      </div>
    </>
  )
})

export default TextInput