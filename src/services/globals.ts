export const dynamicurl= window.location.href.includes("localhost")|| window.location.href.includes("127.0.0.1")?"http://127.0.0.1:3200":"https://"+window.location.hostname+"/backend/v01"
