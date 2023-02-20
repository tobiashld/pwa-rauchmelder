import Dexie from "dexie";
import { Auftraggeber, GeprRauchmelder, Objekt, Pruefung} from "../types/allgemein";
import { RauchmelderOld } from "../types/rauchmelder";
import { Wohnung } from "../types/wohnung";

export class MyAppDatabase extends Dexie {
    rauchmelder!: Dexie.Table<RauchmelderOld,number>;
    wohnungen!:Dexie.Table<Wohnung,number>;
    auftraggeber!:Dexie.Table<Auftraggeber,number>;
    objekte!: Dexie.Table<Objekt,number>;
    pruefungen!: Dexie.Table<Pruefung,number>;
    gepruefteRauchmelder!: Dexie.Table<GeprRauchmelder,number>;

    constructor(){
        super("MartinHerholdRauchmelderVerwaltung");
        this.version(2).stores({
            auftraggeber: 'id,name,straße,hausnummer,plz,ort,telefon,email',
            changedAuftraggeber: 'id,name,straße,hausnummer,plz,ort,telefon,email',
            objekte: 'id,objekt,beschreibung,auftraggeberID,straße,hausnummer,plz,ort',
            changedObjekte: 'id,objekt,beschreibung,auftraggeberID,straße,hausnummer,plz,ort',
            pruefungen: 'id,objektID,userID,timestamp',
            pruefungenListe: 'id,rauchmelderID,selberRaum,baulichUnveraendert,hindernisseUmgebung,relevanteBeschaedigung,oeffnungenFrei,warnmelderGereinigt,pruefungErfolgreich,batterieGut,timestamp,pruefungsID,grund,anmerkungen',
            rauchmelder: 'id,objektID,raum,seriennr,produktionsdatum,letztePruefungsID,wohnungsID',
            changedRauchmelder: 'id,objektID,raum,seriennr,produktionsdatum,letztePruefungsID,wohnungsID',
            wohnungen: 'id,objektID,etage,wohnungslage,haus,vorname,nachname',
            changedWohnungen: 'id,objektID,etage,wohnungslage,haus,vorname,nachname',
        })
    }
}

export const db = new MyAppDatabase();