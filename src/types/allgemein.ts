import { JwtPayload } from "jwt-decode";
import { RauchmelderOld } from "./rauchmelder";

export interface DBResponse<T>{
  status:number,
  data?:T[] 
  error?:string
}

export class Auftraggeber{
    constructor(
      readonly id:number,
      public adresse:Adresse,
      public email:string,
      public name:string,
      public telefon:string
    ){}
    prepForSave(){
      return {
        ...this.adresse,
        email:this.email,
        name:this.name,
        telefon:this.telefon
      }
    }
    dump(){
      return {
        auftraggeberID:this.id
      }
    }
    toString(){
      return this.name + "\n" + this.adresse.toString()
    }
}
export const toAuftraggeberConverter = (
        data:any
      ): Auftraggeber => {
        return new Auftraggeber(data.id,new Adresse(data.hausnummer,data.ort,data.plz,data.straße),data.email,data.name,data.telefon);
      }


export type ChangeKey = 'id'

export class User{
    prepForSave(): any {
        throw new Error("Method not implemented.");
    }
    constructor(
      readonly id:number,
      readonly username:string,
    ){}
    dump(){
      return {"userid":this.id}
    }
    toString(){
      return this.username
    }
}
export const toUserConverter =(
        data:any
      ): User =>{
        return new User(data[0].user_id,data[0].username);
      }

export class Objekt{
    constructor(
      readonly id:number,
      public adresse:Adresse,
      public beschreibung:string,
      public name:string,
      public auftraggeberID?:number
    ){}
    prepForSave(){
      return {
        ...this.adresse,
        auftraggeberID:this.auftraggeberID,
        beschreibung:this.beschreibung,
        objekt:this.name, 
      }  
    }
    toString(){
      return this.name
    }
    dump(){
      return {"objektid":this.id}
    }
}
export const toObjektConverter = (
       data:any
      ): Objekt =>{
        
        return new Objekt(
          data.id,
          new Adresse(data.hausnummer,data.ort,data.plz,data.straße),
          data.beschreibung,
          data.objekt,
          data.auftraggeberID);
      }




export class GeprRauchmelder{
  constructor(
     readonly id:number,
     readonly rauchmelderId:number,
     public grund:number,
     public  baulichUnveraendert:boolean,
     public  hindernisseUmgebung:boolean,
     public  oeffnungenFrei:boolean,
     public  pruefungErfolgreich:boolean,
     public  relevanteBeschaedigung:boolean,
     public  selberRaum:boolean,
     public  warnmelderGereinigt:boolean,
     public batterieGut:boolean,
     public anmerkungen:string,
     public anmerkungenZwei:string,
     public timestamp?:string,
     public pruefungsId?:number,
  ){}

}

export const toGeprRauchmelderConverter = (
        data:any
      ): GeprRauchmelder => {
        return new GeprRauchmelder(
          data.id,
          data.rauchmelderId,
          data.grund,
          data.baulichUnveraendert,
          data.hindernisseUmgebung,
          data.oeffnungenFrei,
          data.pruefungErfolgreich,
          data.relevanteBeschaedigung,
          data.selberRaum,
          data.warnmelderGereinigt,
          data.batterieGut,
          data.anmerkungen,
          data.anmerkungenZwei,
        )
      }
export const toRauchmelderConverter = (
        data:any
      ): RauchmelderOld =>{
        return new RauchmelderOld(data.id,new smallObjekt(data.objektid,data.objektname),data.produktionsdatum,data.raum,data.seriennr,data.letztePruefungsID,data.mieter);
      }
export class smallObjekt {
  constructor(
    public id:number,
    public name:string, 
  ){}
}
export class Wohnung{
    prepForSave(): any {
      return {
        objektID:this.objektid,
        etage:this.etage,
        wohnungslage:this.lage,
        haus:this.haus,
        nachname:this.mieter,
      }
    }
    constructor(
    readonly id:number,
    public objektid:number,
    public etage:string,
    public haus:string,
    public lage:string,
    public mieter:string,
    ){}
}


export class Pruefung{
  
  

    constructor(
      readonly id:number,
      public timestamp:string,
      public user:User,
      public objekt:Objekt,
      public rauchmelder:GeprRauchmelder[]
    ){}

    
}

export const prepPruefung=(pruefung:Pruefung) =>{
  return {
    objektid:pruefung.objekt.id,
    rauchmelder:pruefung.rauchmelder.map(rauchmelder=>prepGeprRauchmelder(rauchmelder))
  }
}
export const prepGeprRauchmelder=(geprRauchmelder:GeprRauchmelder)=>{
  return {
    id:geprRauchmelder.rauchmelderId,
    selberRaum: geprRauchmelder.selberRaum,
    baulichUnveraendert: geprRauchmelder.baulichUnveraendert,
    hindernisseUmgebung: geprRauchmelder.hindernisseUmgebung,
    relevanteBeschaedigung: geprRauchmelder.relevanteBeschaedigung,
    oeffnungenFrei: geprRauchmelder.oeffnungenFrei,
    warnmelderGereinigt: geprRauchmelder.warnmelderGereinigt,
    pruefungErfolgreich: geprRauchmelder.pruefungErfolgreich,
    batterieGut: geprRauchmelder.batterieGut,
    timestamp:"12.11.2022 22:27",
    grund: geprRauchmelder.grund,
    anmerkungen: geprRauchmelder.anmerkungen,
    anmerkungenZwei: geprRauchmelder.anmerkungenZwei,
    pruefungsId:!geprRauchmelder.pruefungsId || geprRauchmelder.pruefungsId === 0?undefined:geprRauchmelder.pruefungsId
  }
}

export const toPruefungConverter = (
        data:any
      ): Pruefung =>{
        return new Pruefung(
          data.id,
          data.timestamp,
          new User(data.user.id,data.user.username),
          new Objekt(data.objekt.id,new Adresse(data.objekt.hausnummer,data.objekt.ort,data.objekt.plz,data.objekt.straße),data.objekt.beschreibung,data.objekt.name),
          (data.rauchmelder.length > 0)?data.rauchmelder.map((geprRauchmelder:any)=>toGeprRauchmelderConverter(geprRauchmelder)):[],
          
          );
      }


export class Adresse {
    
    constructor(
      public hausnummer:number,
      public ort:string,
      public plz:string,
      public straße:string
      ){}
  
    toString(){
      return this.straße + " " + this.hausnummer + ", " + this.plz + " " + this.ort;
    }
}

export interface BackendResponse {
  status:number,
  data?:any[]
}

export interface CustomJwtPayload extends JwtPayload{
    id:number,
    username:string
}