import { withStyles } from "@mui/styles";


import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";


const Accordion = withStyles({
	root: {
		"border": "1px solid rgba(0, 0, 0, .125)",
		"boxShadow": "none",
		"&:not(:last-child)": {
			borderBottom: 0
		},
		"&:before": {
			display: "none"
		},
		"&$expanded": {
			margin: "auto"
		}
	},
	expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
	root: {
		"background": "#F8F9FA",
		"borderBottom": "1px solid rgba(0, 0, 0, .125)",
		"marginBottom": -1,
		"minHeight": 56,
		"&$expanded": {
			minHeight: 56
		}
	},
	content: {
		"&$expanded": {
			margin: "12px 0"
		}
	},
	expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
	root: {
		padding: 16
	}
}))(MuiAccordionDetails);

export { AccordionSummary, AccordionDetails, Accordion };
