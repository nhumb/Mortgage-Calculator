import React from 'react';

class RadioButtonSet extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleChange(e.target.name,e.target.value);
    }
   
    render() {

        let radioOptionName = this.props.name;
        let selected = this.props.selected;

        let radioOptionList = this.props.radioOptionList.map((x, i) => 
            <div key={i}>
                <label htmlFor={x}>
                    <input 
                        type="radio" 
                        id={x} 
                        name={radioOptionName} 
                        value={x} 
                        checked={selected === x}
                    />
                    {x}
                </label>
            </div>
        )

        return (
            <div className="inputGroupWrapper">
                <div className="inputGroup" onChange={this.handleChange} >
                    <label htmlFor={radioOptionName}>{this.props.readName}</label>
                    
                    <div className="radioGroup">
                        {radioOptionList}
                    </div>

                </div>
            </div>
        )
    }
}

export default RadioButtonSet;
