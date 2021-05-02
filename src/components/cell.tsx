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

interface State {
	onClick: any;
	key: string;
}

class CellVM extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			onClick: props.onClickHandler,
			key: props.key,
		};
	}

	render() {
		var classNames = ClassNames({
			cell: true,
			"selected-cell": this.props.isSelected,
			"fixed-cell": this.props.isFixed,
			"highligted-cell": this.props.isHighligted,
			"highlighted-fixed-cell": this.props.isHighligted && this.props.isFixed,
			"bottom-border": this.props.isBottomBorder,
			"right-border": this.props.isRightBorder,
		});

		var onClick = this.props.isFixed ? null : this.state.onClick;
		var value = this.props.value ? this.props.value : null;

		return (
			<div key={this.state.key} className={classNames} onClick={onClick}>
				<p className="cell-content">{value}</p>
			</div>
		);
	}
}

export default CellVM;
