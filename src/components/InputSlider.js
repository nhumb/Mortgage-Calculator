import React from 'react';

class InputSlider extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleChange(e.target.name,e.target.value);
    }
   
    render() {
        return (
            <div className="inputGroupWrapper">
                <div className="inputGroup">
                    <label htmlFor={this.props.name}>{this.props.readName}</label>

                    <div className="textInput">
                        <input 
                            name={this.props.name} 
                            id={this.props.name} 
                            type="number" 
                            step={this.props.step}
                            onChange={this.handleChange}  
                            value={this.props.value}>
                        </input>
                        <span>{this.props.unit}</span>
                    </div>

                    <div className="rangeSlider">
                        <input name={this.props.name} 
                            type="range" 
                            min={this.props.min} 
                            max={this.props.max}
                            step={this.props.step}
                            value={this.props.value}
                            onChange={this.handleChange}>
                        </input>
                    </div>
                    <div className="rangeSlider__key">
                    <span>{this.props.min} {this.props.unit}</span>
                    <span>{this.props.max} {this.props.unit}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default InputSlider;
