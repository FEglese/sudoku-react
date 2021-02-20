import React from 'react';
import ClassNames from 'classnames';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: this.props.onClick,
      suggestedValues: null,
    }
  }

  render() {
    var classNames = ClassNames({
      'cell': true,
      'selected-cell': this.props.isSelected,
      'fixed-cell': this.props.isFixed,
      'highligted-cell': this.props.isHighligted,
      'highlighted-fixed-cell': this.props.isHighligted & this.props.isFixed,
      'bottom-border': this.props.row % 3 === 2 & this.props.row !== 8,
      'right-border': this.props.col % 3 === 2 & this.props.col !== 8,
    })

    var onClick = this.props.isFixed ? null : this.state.onClick;
    var value = this.props.value ? this.props.value : null;

    return (
      <div className={classNames} onClick={onClick}>
        <p className='cell-content'>
            {value}
        </p>
      </div>
    )
  }
}

export default Cell;
