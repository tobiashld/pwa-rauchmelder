import React,{useState,useEffect} from 'react'
import dataFunctions from '../../../services/datafunctions'
import { Auftraggeber,  } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import DataTable from '../../datatable/datatable'
import styles from './auftraggeber.module.css'
import SaveButton from '../../savebutton/savebutton'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { Autocomplete, Box, Grid, ListItemIcon, Menu, MenuItem, TextField, Typography } from '@mui/material'
import { GeoDaten } from '../../../types/geodaten'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Delete, Edit } from '@mui/icons-material'

type AuftraggeberChangeKeys = 'adresse' | 'email' | 'name' | 'telefon';

function AuftraggeberComponent() {
  const clientStatus = useSelector((state:RootState)=>state.isOffline)
  const [alleAuftraggeber,setAlleAuftraggeber] = useState<Auftraggeber[]>([])
  const [value, setValue] = React.useState<GeoDaten | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly GeoDaten[]>([]);
  const loaded = React.useRef(false);
  const [changedAuftraggeber,setChangedAuftraggeber] = useState<Auftraggeber[]>([])
  const [isSavable,setIsSavable] = useState(false);
  const [auftraggeberid,setAuftraggeberid] = useState(-1)
  const {enqueueSnackbar} = useSnackbar()
  const [reload,setReload] = useState(false)

  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent,obj:Auftraggeber) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
    setAuftraggeberid(obj.id?obj.id:-1)
    
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  useEffect(()=>{
    dataFunctions[ClientStatus.online].auftraggeber.get(undefined,(data)=>{
      setAlleAuftraggeber(data.data!)
      setReload(true)
    })
    setChangedAuftraggeber([])

  },[clientStatus])

  useEffect(()=>{
    if(changedAuftraggeber.length > 0){
      setIsSavable(true)
    }else{
      setIsSavable(false)
    }
  },[changedAuftraggeber])


  const handleSave = ()=>{
    changedAuftraggeber.forEach(auftraggeber=>{
      let error = undefined
      dataFunctions[ClientStatus.online].auftraggeber.change(auftraggeber,(data)=>{
        //error if error is there
        if(data && data.error)error = data.error
      })
      if(error){
        enqueueSnackbar(error,{variant:"error"})
      }
    })
    
    setTimeout(()=>dataFunctions[ClientStatus.online].auftraggeber.get(undefined,(data)=>{
      setAlleAuftraggeber(data.data!)
    }),400)
    setChangedAuftraggeber([])
    setIsSavable(false)
    setReload(!reload)
  }
  return (
    <>
      <div className={styles.table}>
        <DataTable<Auftraggeber>
          rows={alleAuftraggeber} 
          columns={[
            {
              title:"Addresse",
              render:(obj)=>{
                return <div onContextMenuCapture={(event)=>handleContextMenu(event,obj)}>{obj.adresse.toString()}</div>
              }
            },
            {
              title:"Email",
              render:(obj)=>{
                return <div onContextMenuCapture={(event)=>handleContextMenu(event,obj)}>{obj.email}</div>
              }
            },
            {
              title:"name",
              render:(obj)=>{
                return <div onContextMenuCapture={(event)=>handleContextMenu(event,obj)}>{obj.name}</div>
              }
            },
            {
              title:"Telefon",
              render:(obj)=>{
                return <div onContextMenuCapture={(event)=>handleContextMenu(event,obj)}>{obj.telefon}</div>
              }
            },
            {
              title:"",
              render:(obj)=>{
                return <div onContextMenuCapture={(event)=>handleContextMenu(event,obj)}>delete</div>
              }
            },
            ]} 
          headline="Auftraggeber" 
          // handleEdit={(id,key ,value)=>{
            
          //   if(id === -1){
              
          //   }else{
          //     let currAuftraggeber = alleAuftraggeber.slice().find((auftraggeber)=>auftraggeber.id === id)
          //     let newAuftraggeber = currAuftraggeber?new Auftraggeber(currAuftraggeber.id,currAuftraggeber.adresse,currAuftraggeber.email,currAuftraggeber.name,currAuftraggeber.telefon):undefined
          //     if(newAuftraggeber && (newAuftraggeber[key as AuftraggeberChangeKeys].toString() !== value.toString() && value.toString() !== "")){

          //       let alreadyChanged = changedAuftraggeber.slice().find((auftraggeber)=>auftraggeber.id===id)
                
          //       if(alreadyChanged){
          //         let addChangedAuftraggeber = changedAuftraggeber.map((kurzAuftraggeber)=>{
          //           if(kurzAuftraggeber.id === id){
          //             kurzAuftraggeber[key as AuftraggeberChangeKeys] = value
          //             return kurzAuftraggeber
          //           }else{
          //             return kurzAuftraggeber
          //           }
          //         })
          //         setChangedAuftraggeber(addChangedAuftraggeber)
          //       }else{
          //         newAuftraggeber[key as AuftraggeberChangeKeys] = value
          //         let addChangedAuftraggeber = changedAuftraggeber.slice()
          //         addChangedAuftraggeber.push(newAuftraggeber)
          //         setChangedAuftraggeber(addChangedAuftraggeber)
          //       }
                
          //     }else if(newAuftraggeber && (newAuftraggeber[key as AuftraggeberChangeKeys].toString() === value.toString() || value.toString() === "")){
          //       let removeNotChangedAuftraggeber = changedAuftraggeber.slice().filter((auftraggeber)=>auftraggeber.id!==id)
          //       setChangedAuftraggeber(removeNotChangedAuftraggeber)
          //     }else{
          //       //error
          //     }
          //   }
          // }}
          // handleDelete={(id)=>{
          //   dataFunctions[clientStatus].auftraggeber.delete(id).then((dataParam)=>{
          //     setTimeout(()=>dataFunctions[ClientStatus.online].auftraggeber.get(undefined,data=>{
          //       setAlleAuftraggeber(data.data!)
          //     }),400)
          //     setReload(!reload)
          //   })
          // }} 
          sort={[
            {
              name:"hinzugefügt",
              functionAsc:(a:Auftraggeber,b:Auftraggeber)=>(a.id-b.id),
              functionDesc:(a:Auftraggeber,b:Auftraggeber)=>(b.id-a.id),
            },
            {
              name:"name",
              functionAsc:(a:Auftraggeber,b:Auftraggeber)=>(a.name.localeCompare(b.name)),
              functionDesc:(a:Auftraggeber,b:Auftraggeber)=>(b.name.localeCompare(a.name)),
            }
          ]}
          editedElementIds={changedAuftraggeber.map(auftraggeber=>auftraggeber.id)}

          />
      </div>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        
        <MenuItem onClick={handleClose}><ListItemIcon><Edit /></ListItemIcon>Bearbeiten</MenuItem>
        <MenuItem onClick={handleClose} style={{color:'red'}}><ListItemIcon><Delete htmlColor='red' /></ListItemIcon>Löschen</MenuItem>
      </Menu>
      <div className={styles.interactions}>
        <AddButton routeParam='auftraggeber' />
        <SaveButton onClick={handleSave} isShown={isSavable}/>
      </div>
    </>
    
  )
}

export default AuftraggeberComponent