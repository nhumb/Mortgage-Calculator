import React from 'react';
import InputSlider from './InputSlider';
import RadioButtonSet from './RadioButtonSet';
import Results from './Results';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.updateValues = this.updateValues.bind(this);
    }
    
    componentWillMount() {
        let localProps = localStorage.getItem('props');
        if (localProps) {
            this.setState(JSON.parse(localProps));
        } else {
            let defaultProps = {
                propertyValue: 500000,
                depositValue: 100000,
                mortgageTerm: 30,
                interestRate: 5,
                mortgageType: "repayment",
                paymentFrequency : "monthly"
            };
            this.setState(defaultProps);
            localStorage.setItem('props', JSON.stringify(defaultProps));
        }
    }

    componentDidUpdate() {
        let currentState = this.state;
        localStorage.setItem('props', JSON.stringify(currentState));
    }

    updateValues(prop,val) {
        this.setState({
            [prop]: val
        })
    }
  
    render () {

        return (
            <form>
                <InputSlider
                    name="propertyValue"
                    readName="Property Value"
                    value={this.state.propertyValue}
                    handleChange={this.updateValues}
                    min={50000} 
                    max={1500000} 
                    step={10000}
                    unit="NZD"
                />

                <InputSlider
                    name="depositValue"
                    readName="Deposit value"
                    value={this.state.depositValue}
                    handleChange={this.updateValues}
                    min={10000} 
                    max={1000000} 
                    step={10000}
                    unit="NZD"
                />

                <InputSlider
                    name="mortgageTerm"
                    readName="Mortgage Term"
                    value={this.state.mortgageTerm}
                    handleChange={this.updateValues}
                    min={1} 
                    max={50} 
                    step={1}
                    unit="years"
                />

                <InputSlider
                    name="interestRate"
                    readName="Interest Rate"
                    value={this.state.interestRate}
                    handleChange={this.updateValues}
                    min={1} 
                    max={10} 
                    step={0.05}
                    unit="% per annum"
                />

                <RadioButtonSet
                    name="mortgageType"
                    readName="Mortgage Type"
                    radioOptionList={["repayment","interest"]}
                    selected={this.state.mortgageType}
                    handleChange={this.updateValues}
                />

                <RadioButtonSet
                    name="paymentFrequency"
                    readName="Payment Frquency"
                    radioOptionList={["weekly","fortnightly","monthly"]}
                    selected={this.state.paymentFrequency}
                    handleChange={this.updateValues}
                />

                <Results
                    mortgageAmount = {this.state.propertyValue - this.state.depositValue}
                    interest = {this.state.interestRate}
                    term = {this.state.mortgageTerm}
                    frequency = {this.state.paymentFrequency}
                    mortgageType={this.state.mortgageType}
                />

            </form>
        );
    }
}

export default Calculator;
