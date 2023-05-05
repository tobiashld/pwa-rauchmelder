export const dynamicurl =
	window.location.href.includes("localhost") ||
	window.location.href.includes("127.0.0.1")
		? "http://127.0.0.1:3200"
		: "https://martinherhold.tk/backend/v01";
// export const dynamicurl= window.location.href.includes("localhost")|| window.location.href.includes("127.0.0.1")?"http://127.0.0.1:3200":"https://"+window.location.hostname+"/backend/v01"
export const dynamicwsurl =
	window.location.href.includes("localhost") ||
	window.location.href.includes("127.0.0.1")
		? "ws://127.0.0.1:3200"
		: "ws://martinherhold.tk/backend/v01";
// export const dynamicwsurl= window.location.href.includes("localhost")|| window.location.href.includes("127.0.0.1")?"ws://127.0.0.1:3200":"ws://"+window.location.hostname+"/backend/v01"
export const dateOptions: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "short",
	day: "numeric",
};
export const emailRegex = `(?:[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])`;
export const passwordRequirements = `(?=^.{8,}$)(?=.*\\d)(?=.*[!@#$%^&*]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$`;
