import React from "react";

interface Props {
	value: number;
	onClick: any;
}

const NumButton = (props: Props) => {
	const numVal = props.value ? props.value : "X";
	return (
		<button
			type="button"
			className="btn btn-outline-primary btn-lg"
			onClick={props.onClick}>
			{numVal}
		</button>
	);
};

export default NumButton;
