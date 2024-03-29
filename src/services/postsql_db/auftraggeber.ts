import {
	Auftraggeber,
	DBResponse,
	toAuftraggeberConverter,
} from "../../types/allgemein";
import auftraggeberUtil from "../../util/auftraggeber";
import { dynamicurl } from "../globals";

async function get(
	params?: { [key: string]: any },
	cb?: (data: DBResponse<Auftraggeber>) => void
): Promise<DBResponse<Auftraggeber>> {
	const url =
		dynamicurl +
		"/auftraggeber" +
		(params
			? "?".concat(
					Object.keys(params!)
						.map((key) => `${key}=${params![key]}`)
						.join("&")
			  )
			: "");
	return fetch(url, {
		credentials: "include",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((obj: DBResponse<Auftraggeber>) => {
			if (obj.error) return obj;
			if (cb)
				cb({
					...obj,
					data: obj.data!.map((item: any) => toAuftraggeberConverter(item)),
				});
			return {
				...obj,
				data: obj.data!.map((item: any) => toAuftraggeberConverter(item)),
			};
		});
}

async function add(auftraggeber: Auftraggeber, cb?: (data: any) => void) {
	const url = dynamicurl + "/auftraggeber";
	return fetch(url, {
		credentials: "include",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(auftraggeberUtil.prepAuftraggeber(auftraggeber)),
	})
		.then((response) => {
			return response.json();
		})
		.then((obj) => {
			if (obj && obj.data) {
				if (cb) cb(obj.data);
			}
			return obj;
		});
}
async function change(
	auftraggeber: Partial<Auftraggeber>,
	cb?: (data: any) => void
) {
	if (auftraggeber) {
		const url = dynamicurl + "/auftraggeber/" + auftraggeber.id;
		return fetch(url, {
			credentials: "include",
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(auftraggeberUtil.prepAuftraggeber(auftraggeber)),
		})
			.then((response) => {
				return response.json();
			})
			.then((obj) => {
				if (obj && obj.data) {
					if (cb) cb(obj.data);
				}
				return obj;
			});
	} else {
		return new Promise((resolve) => resolve);
	}
}
async function deleteA(id: number, cb?: (data: any) => void) {
	const url = dynamicurl + "/auftraggeber/" + id;
	return fetch(url, {
		credentials: "include",
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((obj) => {
			if (obj && obj.data) {
				if (cb) cb(obj.data);
			}
			return obj;
		});
}

const functions = {
	get,
	add,
	change,
	deleteA,
};

export default functions;
