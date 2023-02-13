import dataFunctions from "../services/datafunctions";
import { smallObjekt } from "./allgemein";
import { toWohnungConverter, Wohnung } from "./wohnung";

export class RauchmelderOld{
    prepForSave(): any {
      throw new Error("Method not implemented.");
    }
    constructor(
      readonly id:number,
      public objekt:smallObjekt,
      public produktionsdatum:string,
      public raum:string,
      public seriennr:string,
      public letztePruefungsID:number,
      public mieter:string
    ){}

    
}
export interface RauchmelderBeziehungI{
    id:number,
    aktuelleHistorienID:number,
    wohnungsID:number,
    wohnungen?:Wohnung[],
    aktuellerRauchmelder?:Rauchmelder
  }
  
  export interface RauchmelderI{
    id?:number,
    rauchmelderbz?:number,
    raum:string,
    seriennr:string,
    produktionsdatum:Date,
    installedAt?:Date,
    outOfOrderAt?:Date,
    isactive:boolean
  }

export class RauchmelderBeziehung implements RauchmelderBeziehungI{
  constructor(
    public id:number,
    public aktuelleHistorienID:number,
    public wohnungsID:number,
    public wohnung?: Wohnung,
    public aktuellerRauchmelder?:Rauchmelder){}
}

export class Rauchmelder implements RauchmelderI{
    constructor(
      public raum:string,
      public seriennr:string,
      public produktionsdatum:Date,
      public isactive:boolean,
      public id?:number,
      public rauchmelderbz?:number,
      public installedAt?:Date,
      public outOfOrderAt?:Date,
    ){}

    speichernOnline(){
      dataFunctions[1].rauchmelder.create(this).then(data=>{
        //connect the new rauchmelder
      })
    }


}

export interface RauchmelderHistorie{
    rauchmelderHistorie:Rauchmelder[],
    wohnung:Wohnung

}

export class RauchmelderHistorie implements RauchmelderHistorie{
    constructor(
        public rauchmelderHistorie:Rauchmelder[]
    ){}
}

export function toRauchmelderHistorienConverter(data:any){
    return new RauchmelderHistorie(
        data.rauchmelder.rauchmelderHistorie.map((item:any)=>toRauchmelderConverter(item),
        toWohnungConverter(data.wohnungen))
    )

}


export function toRauchmelderConverter(data:any){
    return new Rauchmelder(
        data.raum,
        data.seriennr,
        new Date(data.produktionsdatum),
        data.isactive,
        data.id?data.id:-1,
        data.rauchmelderbz,
        data.installedAt?new Date(data.installedAt):undefined,
        data.outOfOrderAt?new Date(data.outOfOrderAt):undefined,
    )
}
export function toRauchmelderBzConverter(data:any){
    return new RauchmelderBeziehung(
       data.id,
       data.aktuelleHistorienID,
       data.wohnungsID,
       toWohnungConverter(data.wohnungen),
       toRauchmelderConverter(data.aktuellerRauchmelder)
    )
}