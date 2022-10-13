import Dexie from "dexie";
import { Auftraggeber, GeprRauchmelder, Objekt, Pruefung, Rauchmelder, Wohnung } from "../types/allgemein";

export class MyAppDatabase extends Dexie {
    rauchmelder!: Dexie.Table<Rauchmelder,number>;
    wohnungen!:Dexie.Table<Wohnung,number>;
    auftraggeber!:Dexie.Table<Auftraggeber,number>;
    objekte!: Dexie.Table<Objekt,number>;
    pruefungen!: Dexie.Table<Pruefung,number>;
    gepruefteRauchmelder!: Dexie.Table<GeprRauchmelder,number>;

    constructor(){
        super("OfflineCache");
        this.version(1).stores({
            rauchmelder: 'id,auftraggeber,objekt,produktionsdatum,raum,seriennr,wohnung',
            wohnungen: 'id,auftraggeber,objekt,etage,haus,lage,mieter',
            auftraggeber: 'id,adresse,email,name,telefon',
            objekte: 'id,adresse,auftraggeber,beschreibung,objektname',
            pruefungen: 'id,auftraggeber,objekt,etage,haus,lage,mieter',
            gepruefteRauchmelder: 'id,pruefung,pruefungsId,anmerkungGesamt,anmerkungPruefung,timestamp'
        })
    }
}

export const db = new MyAppDatabase();