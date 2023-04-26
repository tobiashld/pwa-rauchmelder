import React from "react";
import { StyledDialogScaffold } from "./StyledDialogScaffold/StyledDialogScaffold";
import { StyledDialogTitle } from "./DialogTitle/DialogTitle";
import { DialogTitleProps } from "../../../types/dialog";
import { DialogProps } from "@mui/material";

export const StyledDialog = (props: {
	props: { title: DialogTitleProps; general: DialogProps };
	children: any;
}) => {
	return (
		<StyledDialogScaffold {...props.props.general}>
			<StyledDialogTitle {...props.props.title} />
			{props.children}
		</StyledDialogScaffold>
	);
};
