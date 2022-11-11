import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import data from '../../../services/datafunctions'
import { setPruefObjekt } from '../../../store/slice'
import { useAppDispatch } from '../../../store/store'
import { Objekt, Pruefung, toObjektConverter, toPruefungConverter } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import AddButton from '../../addbutton/addbutton'
import Button from '../../button/button'
import DataTable from '../../datatable/datatable'
import Optionbox from '../../optionbox/optionbox'
import styles from './pruefungen.module.css'

function PruefungenComponent() {
  const [allePruefungen,setAllePruefungen] = useState<Pruefung[]>([])
  const [alleObjekte,setAlleObjekte] = useState<Objekt[]>([])
  const [currPruefObjekt,setCurrPruefObjekt] = useState<Objekt>()
  const [showDialog,setShowDialog] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  useEffect(()=>{
    data[ClientStatus.online].pruefungen.get(undefined,(pruefungen:any[])=>{
      setAllePruefungen(pruefungen.map(item=>toPruefungConverter(item)))
    })
    data[ClientStatus.online].objekte.get(undefined,(objekte:any[])=>{
      setAlleObjekte(objekte.map(objekt=>toObjektConverter(objekt)))
    })
  },[])


  const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode)=>{
    setCurrPruefObjekt(JSON.parse(event.target.value))
  }
  const handleNewPruefung = ()=>{
    dispatch(setPruefObjekt({pruefObjekt:JSON.stringify(currPruefObjekt)}))
    navigate("/pruefung")
  }


  return (
    <>
      <div className={styles.table}>
        <DataTable rows={allePruefungen} 
          columns={['id','timestamp','user','objekt']} 
          headline="Prüfungen" 
          options={alleObjekte}
          disabledRows={true}
          handleEdit={(id)=>{}}
          handleRowClick={(id)=>navigate("/pruefung/"+id)}
          handleDelete={(id)=>{
            data[ClientStatus.online].pruefungen.delete(id)
            setTimeout(()=>{
              data[ClientStatus.online].pruefungen.get(undefined,(data:any[])=>{
                setAllePruefungen(data.map((item)=>toPruefungConverter(item)))
              })
            },300)
          }}
           sort={[
            {
              name:"id",
              function:(a:Pruefung,b:Pruefung)=>(a.id-b.id),
              icon:<BsArrowDown />
            },
            {
              name:"id",
              function:(a:Pruefung,b:Pruefung)=>(b.id-a.id),
              icon:<BsArrowUp />
            },
            {
              name:"p.datum",
              function:(a:Pruefung,b:Pruefung)=>{
                let aS = a.timestamp.split(" ").map((item,index)=>{
                  return item.split(index === 0?":":".").map(number=>Number(number))
                })
                let bS = b.timestamp.split(" ").map((item,index)=>{
                  return item.split(index === 0?":":".").map(number=>Number(number))
                })
                let aD = new Date(aS[1][2],aS[1][1],aS[1][0],aS[0][0],aS[0][1],aS[0][2])
                let bD = new Date(bS[1][2],bS[1][1],bS[1][0],bS[0][0],bS[0][1],bS[0][2])
                return aD.valueOf()-bD.valueOf()
              },
              icon:<BsArrowDown />
            },
            {
              name:"p.datum",
              function:(a:Pruefung,b:Pruefung)=>{
                let aS = a.timestamp.split(" ").map((item,index)=>{
                  return item.split(index === 0?":":".").map(number=>Number(number))
                })
                let bS = b.timestamp.split(" ").map((item,index)=>{
                  return item.split(index === 0?":":".").map(number=>Number(number))
                })
                let aD = new Date(aS[1][2],aS[1][1],aS[1][0],aS[0][0],aS[0][1],aS[0][2])
                let bD = new Date(bS[1][2],bS[1][1],bS[1][0],bS[0][0],bS[0][1],bS[0][2])
                return bD.valueOf()-aD.valueOf()
              },
              icon:<BsArrowUp />
            },
            
          ]}
        />
        <div className={styles.interactions}>
          {
            showDialog?
            <div className={styles.objektauswahl}>
            <FormControl sx={{ width:"98%" }} >
              <InputLabel id="pruefObjekt">Objekte</InputLabel>
              <Select
                labelId="pruefObjekt"
                id="single-select"
                value={JSON.stringify(currPruefObjekt)}
                label="Objekte"
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Objekte" />}
                MenuProps={MenuProps}
              >
                {
                  alleObjekte.map(objekt=>(
                          <MenuItem
                              key={objekt.id}
                              value={JSON.stringify(objekt)}
                          >
                              {objekt.name}
                          </MenuItem>
                  ))
                }
                  
              </Select>
            </FormControl>
            <Button 
              onClick={handleNewPruefung}
              value="Prüfung anlegen"

            />
          </div>:<></>
          }
          
          <AddButton  routeParam='/pruefung' onClick={()=>setShowDialog(!showDialog)} />
          
          
        </div>
      </div>
    </>
  )
}

export default PruefungenComponent