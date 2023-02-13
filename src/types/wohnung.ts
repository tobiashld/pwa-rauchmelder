export interface Wohnung{
    id?:number,
    objektID:number,
    etage:string,
    wohnungslage:'V'|'H'|'L'|'R'|'-'|'VL'|'VR'|'HL'|'HR'|'M'|'MM'
    haus:'Haupthaus'|'Anbau'|'-'
    vorname:string
    nachname:string
}
export class Wohnung implements Wohnung{
    constructor(
        public objektID:number,
        public etage:string,
        public wohnungslage:'V'|'H'|'L'|'R'|'-'|'VL'|'VR'|'HL'|'HR'|'M'|'MM',
        public haus:'Haupthaus'|'Anbau'|'-',
        public vorname:string,
        public nachname:string,
        public id?:number,

    ){

    }
}
export const toWohnungConverter = (
    data:any
  ): Wohnung =>{
    return new Wohnung(data.objektID,data.etage,data.wohnungslage,data.haus,data.vorname,data.nachname,data.id);
  }