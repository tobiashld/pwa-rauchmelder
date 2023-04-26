import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import React from "react";
import Transition from "../../transition/slideup";

export default function DeleteDialog(props: {
	title: string;
	message: string;
	isShown: boolean;
	handleClose: any;
	handleDelete: any;
}) {
	return (
		<Dialog
			open={props.isShown}
			TransitionComponent={Transition}
			onClose={props.handleClose}
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle>{props.title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					{props.message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleDelete} color={"error"}>
					Löschen
				</Button>
				<Button onClick={props.handleClose}>Schließen</Button>
			</DialogActions>
		</Dialog>
	);
}
