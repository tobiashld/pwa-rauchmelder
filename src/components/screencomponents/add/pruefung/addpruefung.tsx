import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import data from '../../../../services/datafunctions'
import { RootState } from '../../../../store/store'
import { Objekt, Pruefung, toObjektConverter, toPruefungConverter } from '../../../../types/allgemein'
import { ClientStatus } from '../../../../types/statusenum'

function AddPruefung() {
    const currUser = useSelector((state:RootState)=>state.authentication.user)
    const [currPruefung,setCurrPruefung] = useState<Pruefung | undefined>()
    const [pruefObjekt,setPruefObjekt] = useState<Objekt | undefined>()
    const [allePruefObjekte,setAllePruefObjekte] = useState<Objekt[]>([])
    const { id } = useParams()

    if(id){
        data[ClientStatus.online].pruefungen.get({"id":id},(prepData:any[])=>{
            if(prepData.length > 0){
                setCurrPruefung(prepData.map(pruefung=>toPruefungConverter(pruefung))[0])
            }else{
                //TODO error werfen oder anzeigen
            }
            //nur für linter
            if(currUser || currPruefung ||pruefObjekt ||allePruefObjekte){
                setPruefObjekt(undefined)
            }
        })
        return (
            <div>

            </div>
        )
    }else{
        data[ClientStatus.online].objekte.get(undefined,(data:any[])=>{
            setAllePruefObjekte(data.map(objekt=>toObjektConverter(objekt)))
        })
        return (
            <div>
                
            </div>
        )
    }
}

export default AddPruefung