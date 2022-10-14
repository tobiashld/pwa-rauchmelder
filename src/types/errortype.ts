export type ErrorType = 'error' | 'warning' | 'success' | 'log'
export type Error = {id:number,type:ErrorType,message:string,title:string}
export type ErrorList = Error[]