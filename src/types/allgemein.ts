import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

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

export class Rauchmelder{
    prepForSave(): any {
      throw new Error("Method not implemented.");
    }
    constructor(
      readonly id:number,
      public objekt:string,
      public produktionsdatum:string,
      public raum:string,
      public seriennr:string,
      public letztePruefungsID:number,
      public mieter:string
    ){}

    
}
export class GeprRauchmelder{
  constructor(
     readonly id:number,
     public grund:number,
     public  baulichUnveraendert:boolean,
     public  hindernisseUmgebung:boolean,
     public  oeffnungenFrei:boolean,
     public  pruefungErfolgreich:boolean,
     public  relevanteBeschaedigung:boolean,
     public  selberRaum:boolean,
     public  warnmelderGereinigt:boolean,
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
          data.grund,
          data.baulichUnveraendert,
          data.hindernisseUmgebung,
          data.oeffnungenFrei,
          data.pruefungErfolgreich,
          data.relevanteBeschaedigung,
          data.selberRaum,
          data.warnmelderGereinigt,
          data.anmerkungen,
          data.anmerkungenZwei,
        )
      }
export const toRauchmelderConverter = (
        data:any
      ): Rauchmelder =>{
        return new Rauchmelder(data.id,data.objekt,data.produktionsdatum,data.raum,data.seriennr,data.letztePruefungsID,data.mieter);
      }

export class Wohnung{
    prepForSave(): any {
      throw new Error("Method not implemented.");
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
export const toWohnungConverter = (
        data:any
      ): Wohnung =>{
        return new Wohnung(data.id,data.objektID,data.etage,data.wohnungslage,data.haus,data.nachname);
      }

export class Pruefung{
    constructor(
      readonly id:number,
      public timestamp:string,
      public user:User,
      public objekt:Objekt,
      public rauchmelder:GeprRauchmelder[]
    ){}

    prepForSave(){
      return {
        ...this.objekt.dump(),
        ...this.user.dump(),
        rauchmelder:this.rauchmelder
      }
    }
    dump(){
      return {
        ...this.objekt.dump(),
        ...this.user.dump(),
        rauchmelder:this.rauchmelder
      }
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