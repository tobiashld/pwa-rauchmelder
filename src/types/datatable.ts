export enum DatatableActiveDisplaySetting {
	GRID,
	TABLE,
}
export type DatatableProps<T> = {
	rows: T[] | undefined;
	columns: {
		title: string;
		render: (obj: T) => JSX.Element;
		filter?: {
			func: (obj: T) => T | undefined;
			render: (
				changeFilterState: (
					filterfunc: (obj: T) => T | undefined,
					filterValue: any,
					columnTitle: string
				) => void,
				filterfunc: (obj: T) => T | undefined
			) => JSX.Element;
		};
	}[];
	renderGrid: (obj: T) => JSX.Element;
	headline: string;
	editedElementIds?: number[];
	handleRowClick?: (item: T) => void;
	handleHistory?: (id: number) => void;
	handleContextMenu?: (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		obj: T
	) => void;
	sort?: SortArgument<T>[];
	options?: any[];
	disabledRows?: boolean;
};
export type DatatableDisplayProps<T> = DatatableProps<T> & {
	activeRows: T[];
};

export interface SortArgument<T> {
	name: string;
	functionAsc: (a: T, b: T) => number;
	functionDesc: (a: T, b: T) => number;
}
