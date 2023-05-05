const prepAuftraggeber = (auftraggeber: any) => {
	return {
		...auftraggeber.adresse,
		email: auftraggeber.email ?? undefined,
		name: auftraggeber.name ?? undefined,
		telefon: auftraggeber.telefon ?? undefined,
	};
};

const auftraggeberUtil = {
	prepAuftraggeber,
};

export default auftraggeberUtil;
