import React from 'react';

class Spinbox extends React.Component {

    /**
     * Spinbox의 생성자
     * @constructs
     * @param {Spinbox.propTypes} props
     */
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.initialValue
        };
    }

    /**
     * Spinbox을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <article className="spinbox">
                <div className="spinbox__inner container">
                    <input type="text" ref="inputValue"
                           defaultValue={this.state.value}
                           onChange={this.changeValue.bind(this)}/>
                    <button onClick={this.decrease.bind(this)}>Down</button>
                    <button onClick={this.increase.bind(this)}>Up</button>
                </div>
            </article>
        );
    }

    isValid(value) {
        return this.props.min <= value && value <= this.props.max;
    }

    filterValue(value) {
        return value.replace(/\D/g, '');
    }

    setValue(newValue) {
        if (this.isValid(newValue)) {
            this.refs.inputValue.value = newValue;
            this.setState({value: newValue});
        } else {
            this.refs.inputValue.value = this.state.value;
        }
    }

    increase() {
        this.setValue(this.state.value + this.props.step);
    }

    decrease() {
        this.setValue(this.state.value - this.props.step);
    }

    changeValue() {
        this.setValue(this.filterValue(this.refs.inputValue.value));
    }

}

/**
 * Spinbox의 Props 인터페이스 정의
 */
Spinbox.propTypes = {
    initialValue: React.PropTypes.number.isRequired,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
};

/**
 * Spinbox의 Props 기본값 정의
 */
Spinbox.defaultProps = {
    min: 0,
    max: 100,
    step: 20,
};

export default Spinbox;

