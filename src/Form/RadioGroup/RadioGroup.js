import React, { Component, cloneElement } from 'preact';
import PropTypes from 'prop-types';
import { StyledRadioGroup } from './styles';

/**
 * Radio are switches used for selection from multiple options
 *
 * @example ./../../../docs/components/Form/RadioGroup.md
 */
class RadioGroup extends Component {
	static propTypes = {

		/**
		 * Custom styles
		 */
		style: PropTypes.object,

		/**
		 * Default selected value
		 */
		defaultSelected: PropTypes.string,

		onChange: PropTypes.func
	};

	get selectedValue () {
		const { defaultSelected } = this.props;
		const { selected } = this.state;
		if (defaultSelected) {
			return defaultSelected;
		}
		return selected;
	}

	handleOnChange = (input) => {
		const { onChange } = this.props;
		this.setState({
			selected: input.value
		}, () => {
			if (typeof onChange === 'function') {
				onChange(input.value, input);
			}
		});
	}

	renderRadio = (child, index) => {
		const selectedValue = this.selectedValue;

		return cloneElement(child, {
			checked: selectedValue ? child.props.value === selectedValue : index === 0,
			key: index,
			onChange: this.handleOnChange,
			...child.props
		});
	}

	render() {
		const { style = {}, className, children } = this.props;
		return (
			<StyledRadioGroup
				style={style}
				className={className}
			>
				{
					children.map((child, index) => {
						return (<div className="radio-item">{this.renderRadio(child, index)}</div>)
					})
				}
			</StyledRadioGroup>
		);
	}
}

export default RadioGroup;