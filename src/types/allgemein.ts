import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class Auftraggeber{
    constructor(
      readonly id:number,
    readonly adresse:Adresse,
    readonly email:string,
    readonly name:string,
    readonly telefon:string
    ){}
    toString(){
      return this.name + " " + this.adresse
    }
}
export const AuftraggeberConverter = {
    toFirestore(auftraggeber: Auftraggeber): DocumentData {
        return {id:auftraggeber.id,adresse:auftraggeber.adresse,email:auftraggeber.email,name:auftraggeber.name,telefon:auftraggeber.telefon};
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Auftraggeber {
        const data = snapshot.data(options)!;
        return new Auftraggeber(data.id,new Adresse(data.adresse.hausnummer,data.adresse.ort,data.adresse.plz,data.adresse.straße),data.email,data.name,data.telefon);
      }
}
export class User{
    constructor(
    readonly full_name:string,
    readonly age:number,
    readonly password:string,
    ){}
}
export const UserConverter = {
    toFirestore(user: User): DocumentData {
        return {full_name:user.full_name,age:user.age,password:user.password};
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): User {
        const data = snapshot.data(options)!;
        return new User(data.full_name,data.age,data.password);
      }
}
export class Objekt{
    constructor(
      readonly id:number,
    readonly adresse:Adresse,
    readonly auftraggeber:Auftraggeber|undefined,
    readonly beschreibung:string,
    readonly objektname:string
    ){}
}
export const ObjektConverter = {
    toFirestore(Objekt: Objekt): DocumentData {
        return {id:Objekt.id,adresse:Objekt.adresse,auftraggeber:Objekt.auftraggeber,beschreibung:Objekt.beschreibung,objektname:Objekt.objektname};
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Objekt {
        const data = snapshot.data(options)!;
        return new Objekt(
          data.id,
          new Adresse(data.adresse.hausnummer,data.adresse.ort,data.adresse.plz,data.adresse.straße),
          new Auftraggeber(data.auftraggeber.id,new Adresse(data.auftraggeber.adresse.hausnummer,data.auftraggeber.adresse.ort,data.auftraggeber.adresse.plz,data.auftraggeber.adresse.straße),data.auftraggeber.email,data.auftraggeber.name,data.auftraggeber.telefon),
          data.beschreibung,
          data.objektname);
      }
}
export class Rauchmelder{
    constructor(
      readonly id:number,
    readonly auftraggeber:Auftraggeber,
    readonly objekt:Objekt,
    readonly produktionsdatum:string,
    readonly raum:string,
    readonly seriennr:string,
    readonly wohnung:Wohnung
    ){}
}
export class GeprRauchmelder{
  grund:number;
  pruefung:{
   baulichUnveraendert:boolean,
   hindernisseUmgebung:boolean,
   oeffnungenFrei:boolean,
   pruefungErfolgreich:boolean,
   relevanteBeschaedigung:boolean,
   selberRaum:boolean,
   warnmelderGereinigt:boolean,
 };
 pruefungsId:number;
 anmerkungGesamt:string;
 anmerkungPruefung:string;
 timestamp:string;
  constructor(
     readonly id:number,
     grund:number,
     pruefung:{
      baulichUnveraendert:boolean,
      hindernisseUmgebung:boolean,
      oeffnungenFrei:boolean,
      pruefungErfolgreich:boolean,
      relevanteBeschaedigung:boolean,
      selberRaum:boolean,
      warnmelderGereinigt:boolean,
    },
    pruefungsId:number,
    anmerkungGesamt:string,
    anmerkungPruefung:string,
    timestamp:string
  ){
    this.grund = grund;
    this.pruefung = pruefung;
    this.pruefungsId = pruefungsId;
    this.anmerkungGesamt = anmerkungGesamt;
    this.anmerkungPruefung = anmerkungPruefung;
    this.timestamp = timestamp;
  }
}
export const RauchmelderConverter = {
    toFirestore(rauchmelder: Rauchmelder): DocumentData {
        return {id:rauchmelder.id,auftraggeber:rauchmelder.auftraggeber,objekt:rauchmelder.objekt,raum:rauchmelder.raum,seriennr:rauchmelder.seriennr,wohnung:rauchmelder.wohnung};
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Rauchmelder {
        const data = snapshot.data(options)!;
        return new Rauchmelder(data.id,new Auftraggeber(data.auftraggeber.id,new Adresse(data.auftraggeber.adresse.hausnummer,data.auftraggeber.adresse.ort,data.auftraggeber.adresse.plz,data.auftraggeber.adresse.straße,),data.auftraggeber.email,data.auftraggeber.name,data.auftraggeber.telefon,),data.objekt,data.produktionsdatum,data.raum,data.seriennr,data.wohnung);
      }
}
export class Wohnung{
    constructor(
    readonly id:number,
    readonly auftraggeber:Auftraggeber,
    readonly objekt:Objekt,
    readonly etage:string,
    readonly haus:string,
    readonly lage:string,
    readonly mieter:string,
    ){}
}
export const WohnungConverter = {
    toFirestore(wohnung: Wohnung): DocumentData {
        return {id:wohnung.id,auftraggeber:wohnung.auftraggeber,objekt:wohnung.objekt,etage:wohnung.etage,haus:wohnung.haus,lage:wohnung.lage,mieter:wohnung.mieter};
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Wohnung {
        const data = snapshot.data(options)!;
        return new Wohnung(data.id,data.auftraggeber,data.objekt,data.etage,data.haus,data.lage,data.mieter);
      }
}
export class Pruefung{
    constructor(
      readonly id:number,
    readonly auftraggeber:Auftraggeber,
    readonly objekt:Objekt,
    readonly etage:string,
    readonly haus:string,
    readonly lage:string,
    readonly mieter:string,
    ){}
}
export const PruefungConverter = {
    toFirestore(pruefung: Pruefung): DocumentData {
        return {id:pruefung.id,auftraggeber:pruefung.auftraggeber,objekt:pruefung.objekt,etage:pruefung.etage,haus:pruefung.haus,lage:pruefung.lage,mieter:pruefung.mieter};
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Pruefung {
        const data = snapshot.data(options)!;
        return new Pruefung(data.id,data.auftraggeber,data.objekt,data.etage,data.haus,data.lage,data.mieter);
      }
}

export class Adresse {
    hausnummer:number;
    ort:string;
    plz:string;
    straße:string;
    constructor(hausnummer:number,ort:string,plz:string,straße:string){
      this.hausnummer = hausnummer;
      this.ort = ort;
      this.plz = plz;
      this.straße = straße;
    }
  
    
    toString(){
      return this.straße + " " + this.hausnummer + ", " + this.plz + " " + this.ort;
    }
}