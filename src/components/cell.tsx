import React from "react";
import ClassNames from "classnames";

interface Props {
	onClickHandler: Function;
	value: number;
	key: string;

	isSelected: boolean;
	isFixed: boolean;
	isHighligted: boolean;

	isBottomBorder: boolean;
	isRightBorder: boolean;
}

const CellVM = (props: Props) => {
	const classNames = ClassNames({
		cell: true,
		"selected-cell": props.isSelected,
		"fixed-cell": props.isFixed,
		"highligted-cell": props.isHighligted,
		"highlighted-fixed-cell": props.isHighligted && props.isFixed,
		"bottom-border": props.isBottomBorder,
		"right-border": props.isRightBorder,
	});

	const onClick = props.isFixed ? () => {} : props.onClickHandler;
	const value = props.value ? props.value : null;

	return (
		<div key={props.key} className={classNames} onClick={() => onClick()}>
			<p className="cell-content">{value}</p>
		</div>
	);
};

export default CellVM;
