import { Pruefung } from "../types/allgemein";

// db timestamp zu nem vom date konstruktor akzeptierten Format bringen
const feedTimestamp = (props: {
	date: string;
	month: string;
	year: string;
	hour: string;
	minute: string;
	second: string;
}) => {
	for (let key of Object.keys(props)) {
		if (props[key as keyof typeof props].length <= 1) {
			props[key as keyof typeof props] = "0" + props[key as keyof typeof props];
		}
	}
	return `${props.year}-${props.month}-${props.date}T${props.hour}:${props.minute}:${props.second}`;
};

const transformDBTimestampToDate = (dbTimestamp: string) => {
	let [timestampUhrzeit, timestampDatum] = dbTimestamp.split(" ");
	let [timestampUhrHour, timestampUhrMin, timestampUhrSec] =
		timestampUhrzeit.split(":");
	let [timestampDatumTag, timestampDatumMonat, timestampDatumJahr] =
		timestampDatum.split(".");
	return new Date(
		feedTimestamp({
			date: timestampDatumTag,
			month: timestampDatumMonat,
			year: timestampDatumJahr,
			hour: timestampUhrHour,
			minute: timestampUhrMin,
			second: timestampUhrSec,
		})
	);
};

// prepare pruefung for backend (recursive shit wegmachen)
const prepPruefung = (pruefung: any) => {
	let prepareTimestamp = `${pruefung.timestamp.getHours()}:${pruefung.timestamp.getMinutes()}:${pruefung.timestamp.getSeconds()} ${pruefung.timestamp.getDate()}.${pruefung.timestamp.getMonth()}.${pruefung.timestamp.getFullYear()}`;

	let newPruefung: Omit<Pruefung, "timestamp"> & { timestamp: string } = {
		...pruefung,
		timestamp: prepareTimestamp,
		rauchmelder: pruefung.rauchmelder.map((geprRauchmelder: any) => {
			return {
				...geprRauchmelder,
				rauchmelderhistorie: undefined,
			};
		}),
	};
	return newPruefung;
};

const pruefungUtil = {
	prepPruefung,
	feedTimestamp,
	transformTimestampToDate: transformDBTimestampToDate,
};

export default pruefungUtil;
