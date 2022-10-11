export type ErrorType = 'error' | 'warning' | 'success' | 'log'
export type Error = {id:number,type:ErrorType,message:string,title:string,handleClose:(id:number)=>void}
export type ErrorList = Error[]