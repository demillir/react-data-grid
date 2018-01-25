const React              = require('react');
const ExcelColumn        = require('../../PropTypeShapes/ExcelColumn');
import PropTypes from 'prop-types';

class FilterableHeaderCell extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    column: PropTypes.shape(ExcelColumn)
  };

  state: {filterTerm: string} = {filterTerm: ''};

  handleChange = (e: Event) => {
    let val = e.target.value;
    this.setState({filterTerm: val });
    this.props.onChange({filterTerm: val, column: this.props.column});
  };

  renderInput = (): ?ReactElement => {
    if (this.props.column.filterable === false) {
      return <span/>;
    }

    let inputKey = 'header-filter-' + this.props.column.key;
    let val = this.props.column.filterTerm;
    if (val === undefined) {
      val = _this.state.filterTerm;
    }
    this.props.column.filterTerm = undefined;

    return (<input key={inputKey} type="text" className="form-control input-sm" placeholder="Search" value={val} onChange={this.handleChange}/>);
  };

  render(): ?ReactElement {
    return (
      <div>
        <div className="form-group">
          {this.renderInput()}
        </div>
      </div>
    );
  }
}

module.exports = FilterableHeaderCell;
