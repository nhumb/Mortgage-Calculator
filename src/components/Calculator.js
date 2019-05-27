import React from 'react';
import InputSlider from './InputSlider';
import RadioButtonSet from './RadioButtonSet';

// p = principal, i = interest rate, t = term
function monthlyPaymentCalc(p, i, t, f) {
    // annual interest rate
    let air = i/100/f;
    // number of payments
    let nop = t*f;
    
    return Math.floor(p * ( (air*Math.pow((1+air),nop)) / (Math.pow((1+air),nop) - 1) ) ); 
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            propertyValue: 500000,
            depositValue: 100000,
            mortgageTerm: 30,
            interestRate: 5,
            mortgageType: "repayment",
            paymentFrequency : "monthly"
            
        }
        this.updateValues = this.updateValues.bind(this);
    }

    updateValues(prop,val) {
        this.setState({
            [prop]: val
        })
    }
  
    render () {
        let mortgageAmount = this.state.propertyValue - this.state.depositValue;
        let interest = this.state.interestRate;
        let term = this.state.mortgageTerm;
        let frequency = this.state.paymentFrequency === "monthly" ? 12 : this.state.paymentFrequency === "fortnightly" ? 26 : 52;
        let result = this.state.mortgageType === "repayment" ? <p><strong>{this.state.paymentFrequency} Repayment:</strong> £{monthlyPaymentCalc(mortgageAmount,interest,term, frequency)}</p> : <p><strong>{this.state.paymentFrequency} Interest Only Payment:</strong> £{Math.floor(interest/frequency/100 * mortgageAmount)}</p>;

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
                    unit="pounds"
                />

                <InputSlider
                    name="depositValue"
                    readName="Deposit value"
                    value={this.state.depositValue}
                    handleChange={this.updateValues}
                    min={10000} 
                    max={1000000} 
                    step={10000}
                    unit="pounds"
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

                <div className="results">
                    {result}
                </div>

            </form>
        );
    }
}

export default Calculator;
