import { ClickAwayListener } from '@mui/material'
import React from 'react'
import styles from './chat.module.css'
import useWebSocket from 'react-use-websocket'
import {dynamicwsurl} from '../../services/globals'

function Chat(props:{isShown:boolean,onClose:()=>void}) {
    useWebSocket(dynamicwsurl+"/chat/5555",{
        share:true,
        onOpen:(event)=>{
            console.log('WebSocket connection established.');
        }
    })


  return (
    <ClickAwayListener onClickAway={props.onClose}>
        <div className={styles.chatWrapper}>
            test
        </div>
    </ClickAwayListener>
    
  )
}

export default Chat