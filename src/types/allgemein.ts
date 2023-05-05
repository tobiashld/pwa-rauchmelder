import { JwtPayload } from "jwt-decode";
import {
	RauchmelderOld,
	toRauchmelderConverter as toNewRauchmelderConverter,
	Rauchmelder,
} from "./rauchmelder";
import pruefungUtil from "../util/pruefung";

export interface DBResponse<T> {
	status: number;
	data?: T[];
	error?: string;
}

export class Auftraggeber {
	constructor(
		readonly id: number,
		public adresse: Adresse,
		public email: string,
		public name: string,
		public telefon: string
	) {}
	prepForSave() {
		return {
			...this.adresse,
			email: this.email ?? undefined,
			name: this.name ?? undefined,
			telefon: this.telefon ?? undefined,
		};
	}
	dump() {
		return {
			auftraggeberID: this.id,
		};
	}
	toString() {
		return this.name + "\n" + this.adresse.toString();
	}
}

export const toAuftraggeberConverter = (data: any): Auftraggeber => {
	return new Auftraggeber(
		data.id,
		new Adresse(data.hausnummer, data.ort, data.plz, data.straße),
		data.email,
		data.name,
		data.telefon
	);
};

export type ChangeKey = "id";

export class User {
	prepForSave(): any {
		throw new Error("Method not implemented.");
	}
	constructor(readonly id: string, readonly username: string) {}
	dump() {
		return { userid: this.id };
	}
	toString() {
		return this.username;
	}
}
export const toUserConverter = (data: any): User => {
	if (data && data.length === 0)
		return new User(data[0].user_id, data[0].username);
	else return new User(data, "Fehler");
};

export class Objekt {
	constructor(
		readonly id: number,
		public adresse: Adresse,
		public beschreibung: string,
		public name: string,
		public auftraggeberID?: number,
		public auftraggeber?: Auftraggeber
	) {}
	prepForSave() {
		return {
			...this.adresse,
			auftraggeberID: this.auftraggeberID,
			beschreibung: this.beschreibung,
			objekt: this.name,
		};
	}
	toString() {
		return this.name;
	}
	dump() {
		return { objektid: this.id };
	}
}
export const toObjektConverter = (data: any): Objekt => {
	return new Objekt(
		data.id,
		new Adresse(
			data.hausnummer,
			data.ort,
			data.plz,
			data.straße || data.strasse
		),
		data.beschreibung,
		data.objekt ? data.objekt : data.name ? data.name : undefined,
		data.auftraggeberID,
		data.auftraggeber ?? undefined
	);
};

export class GeprRauchmelder {
	constructor(
		public rauchmelderID: number,
		public grund: number,
		public baulichUnveraendert: boolean,
		public hindernisseUmgebung: boolean,
		public oeffnungenFrei: boolean,
		public pruefungErfolgreich: boolean,
		public relevanteBeschaedigung: boolean,
		public selberRaum: boolean,
		public warnmelderGereinigt: boolean,
		public batterieGut: boolean,
		public anmerkungen: string,
		public anmerkungenZwei: string,
		readonly id?: number,
		public rauchmelderhistorie?: Rauchmelder,
		public timestamp?: Date
	) {}
}

export const toGeprRauchmelderConverter = (data: any): GeprRauchmelder => {
	return new GeprRauchmelder(
		data.rauchmelderID,
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
		data.id,
		data.rauchmelderhistorie
			? toNewRauchmelderConverter(data.rauchmelderhistorie)
			: undefined,
		new Date(data.timestamp ?? undefined)
	);
};
export const toRauchmelderConverter = (data: any): RauchmelderOld => {
	return new RauchmelderOld(
		data.id,
		new smallObjekt(data.objektid, data.objektname),
		data.produktionsdatum,
		data.raum,
		data.seriennr,
		data.letztePruefungsID,
		data.mieter
	);
};
export class smallObjekt {
	constructor(public id: number, public name: string) {}
}
// export class Wohnung{
//     prepForSave(): any {
//       return {
//         objektID:this.objektid,
//         etage:this.etage,
//         wohnungslage:this.lage,
//         haus:this.haus,
//         nachname:this.nachname,
//       }
//     }
//     constructor(
//     readonly id:number,
//     public objektid:number,
//     public etage:string,
//     public haus:string,
//     public lage:string,
//     public nachname:string,
//     ){}
// }

export class Pruefung {
	constructor(
		readonly id: number,
		public timestamp: Date,
		public rauchmelder: GeprRauchmelder[],
		public objekt?: Objekt,
		public user?: User
	) {}
}

// export const prepPruefung=(pruefung:Pruefung) =>{
//   return {
//     objektid:pruefung.objekt?.id,
//     rauchmelder:pruefung.rauchmelder.map(rauchmelder=>prepGeprRauchmelder(rauchmelder))
//   }
// }
// export const prepGeprRauchmelder=(geprRauchmelder:GeprRauchmelder)=>{
//   return {
//     id:geprRauchmelder.rauchmelderId,
//     selberRaum: geprRauchmelder.selberRaum,
//     baulichUnveraendert: geprRauchmelder.baulichUnveraendert,
//     hindernisseUmgebung: geprRauchmelder.hindernisseUmgebung,
//     relevanteBeschaedigung: geprRauchmelder.relevanteBeschaedigung,
//     oeffnungenFrei: geprRauchmelder.oeffnungenFrei,
//     warnmelderGereinigt: geprRauchmelder.warnmelderGereinigt,
//     pruefungErfolgreich: geprRauchmelder.pruefungErfolgreich,
//     batterieGut: geprRauchmelder.batterieGut,
//     timestamp:"12.11.2022 22:27",
//     grund: geprRauchmelder.grund,
//     anmerkungen: geprRauchmelder.anmerkungen,
//     anmerkungenZwei: geprRauchmelder.anmerkungenZwei,
//     pruefungsId:!geprRauchmelder.pruefungsId || geprRauchmelder.pruefungsId === 0?undefined:geprRauchmelder.pruefungsId
//   }
// }

export const toPruefungConverter = (data: any): Pruefung => {
	try {
		// db timestamp in vernünftigen timestamp für Date konstruktor

		return new Pruefung(
			data.id,
			pruefungUtil.transformTimestampToDate(data.timestamp),
			data.rauchmelder && data.rauchmelder.length > 0
				? data.rauchmelder.map((geprRauchmelder: any) =>
						toGeprRauchmelderConverter(geprRauchmelder)
				  )
				: data.pruefungenListe && data.pruefungenListe.length > 0
				? data.pruefungenListe.map((geprRauchmelder: any) => {
						return toGeprRauchmelderConverter(geprRauchmelder);
				  })
				: [],
			toObjektConverter(data.objekt),
			data.user
				? toUserConverter(data.user)
				: data.user_id
				? toUserConverter(data.user_id)
				: undefined
		);
	} catch (e: any) {
		throw e;
	}
};

export class Adresse {
	constructor(
		public hausnummer: number,
		public ort: string,
		public plz: string,
		public straße: string
	) {}

	toString() {
		return (
			this.straße + " " + this.hausnummer + ", " + this.plz + " " + this.ort
		);
	}
}

export interface BackendResponse {
	status: number;
	data?: any[];
}

export interface CustomJwtPayload extends JwtPayload {
	id: number;
	username: string;
}
