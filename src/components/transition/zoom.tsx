import { Zoom } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const ZoomTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Zoom ref={ref} {...props} />;
});

export default ZoomTransition;
