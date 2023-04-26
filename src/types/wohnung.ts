import { Objekt, toObjektConverter } from "./allgemein";

export interface Wohnung {
	id?: number;
	objektID: number;
	etage: string;
	wohnungslage: Wohnungslage;
	haus: WohnungsHausArt;
	vorname: string;
	nachname: string;
	objekt?: Objekt;
}
export class Wohnung implements Wohnung {
	constructor(
		public objektID: number,
		public etage: string,
		public wohnungslage: Wohnungslage,
		public haus: WohnungsHausArt,
		public vorname: string,
		public nachname: string,
		public id?: number,
		public objekt?: Objekt
	) {}
}
export type Wohnungslage =
	| "V"
	| "H"
	| "L"
	| "R"
	| "-"
	| "VL"
	| "VR"
	| "HL"
	| "HR"
	| "M"
	| "MM"
	| " ";

export type WohnungsHausArt = "Haupthaus" | "Anbau" | "-";
export const toWohnungConverter = (data: any): Wohnung => {
	return new Wohnung(
		data.objektID,
		data.etage,
		data.wohnungslage,
		data.haus,
		data.vorname,
		data.nachname,
		data.id ? data.id : undefined,
		data.objekte ? toObjektConverter(data.objekte) : undefined
	);
};
