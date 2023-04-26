export interface MessageI{
    id?:string,
    nachricht:string,
    userid?:string,
    chatid?:string,
    user?:{
        username:string,
        email:string,
    }
    seen?:boolean
}

export class Message implements MessageI{
    constructor(
        public nachricht:string,
        public chatid?:string,
        public userid?:string,
        public user?:{
            username:string,
            email:string,
        },
        public seen?:boolean,
        public id?:string,
    ){}
}

export interface ChatI{
    id?:string,
    chatteilnehmer?:ChatTeilnehmerI[],
    nachrichten?:Message[]
}

export class Chat{
    constructor(
        public id?:string,
        public chatteilnehmer?:ChatTeilnehmerI[],
        public nachrichten?:Message[]
    ){}
}

export interface ChatTeilnehmerI{
    id?:string,
    userid?:string,
    chatid?:string,
    user?:{
        username:string,
        email:string,
    }
}
export class ChatTeilnehmer{
    constructor(
        public id?:string,
        public userid?:string,
        public chatid?:string,
        public user?:{
            username:string,
            email:string,
        }){}
}