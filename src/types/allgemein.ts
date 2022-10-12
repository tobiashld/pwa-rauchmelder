import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class Auftraggeber{
    constructor(
    readonly adresse:Adresse,
    readonly email:string,
    readonly id:number,
    readonly name:string,
    readonly telefon:string
    ){}
}
export const AuftraggeberConverter = {
    toFirestore(auftraggeber: Auftraggeber): DocumentData {
        return {adresse:auftraggeber.adresse,email:auftraggeber.email,id:auftraggeber.id,name:auftraggeber.name,telefon:auftraggeber.telefon};
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Auftraggeber {
        const data = snapshot.data(options)!;
        return new Auftraggeber(data.adresse,data.email,data.id,data.name,data.telefon);
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
    readonly adresse:Adresse,
    readonly auftraggeber:Auftraggeber|undefined,
    readonly beschreibung:string,
    readonly id:number,
    readonly objektname:string
    ){}
}
export const ObjektConverter = {
    toFirestore(Objekt: Objekt): DocumentData {
        return {adresse:Objekt.adresse,auftraggeber:Objekt.auftraggeber,beschreibung:Objekt.beschreibung,id:Objekt.id,objektname:Objekt.objektname};
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Objekt {
        const data = snapshot.data(options)!;
        return new Objekt(data.adresse,data.auftraggeber,data.beschreibung,data.id,data.objektname);
      }
}
export class Rauchmelder{
    constructor(
    readonly auftraggeber:Auftraggeber,
    readonly objekt:Objekt,
    readonly produktionsdatum:string,
    readonly id:number,
    readonly raum:string,
    readonly seriennr:string,
    readonly wohnung:Wohnung
    ){}
}
export const RauchmelderConverter = {
    toFirestore(rauchmelder: Rauchmelder): DocumentData {
        return {auftraggeber:rauchmelder.auftraggeber,objekt:rauchmelder.objekt,id:rauchmelder.id,raum:rauchmelder.raum,seriennr:rauchmelder.seriennr,wohnung:rauchmelder.wohnung};
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Rauchmelder {
        const data = snapshot.data(options)!;
        return new Rauchmelder(data.auftraggeber,data.objekt,data.produktionsdatum,data.id,data.raum,data.seriennr,data.wohnung);
      }
}
export class Wohnung{
    constructor(
    readonly auftraggeber:Auftraggeber,
    readonly objekt:Objekt,
    readonly etage:string,
    readonly haus:string,
    readonly id:number,
    readonly lage:string,
    readonly mieter:string,
    ){}
}
export const WohnungConverter = {
    toFirestore(wohnung: Wohnung): DocumentData {
        return {auftraggeber:wohnung.auftraggeber,objekt:wohnung.objekt,id:wohnung.id,etage:wohnung.etage,haus:wohnung.haus,lage:wohnung.lage,mieter:wohnung.mieter};
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Wohnung {
        const data = snapshot.data(options)!;
        return new Wohnung(data.auftraggeber,data.objekt,data.etage,data.haus,data.id,data.lage,data.mieter);
      }
}
export class Pruefung{
    constructor(
    readonly auftraggeber:Auftraggeber,
    readonly objekt:Objekt,
    readonly etage:string,
    readonly haus:string,
    readonly id:number,
    readonly lage:string,
    readonly mieter:string,
    ){}
}
export const PruefungConverter = {
    toFirestore(pruefung: Pruefung): DocumentData {
        return {auftraggeber:pruefung.auftraggeber,objekt:pruefung.objekt,id:pruefung.id,etage:pruefung.etage,haus:pruefung.haus,lage:pruefung.lage,mieter:pruefung.mieter};
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): Pruefung {
        const data = snapshot.data(options)!;
        return new Pruefung(data.auftraggeber,data.objekt,data.etage,data.haus,data.id,data.lage,data.mieter);
      }
}

export type Adresse = {
    hausnummer:number,
    ort:string,
    plz:string,
    straße:string
}