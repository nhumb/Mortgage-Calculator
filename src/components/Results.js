import React from 'react';

// p = principal, i = interest rate, t = term
function monthlyPaymentCalc(p, i, t, f) {
    // annual interest rate
    let air = i/100/f;
    // number of payments
    let nop = t*f;
    
    return Math.floor(p * ( (air*Math.pow((1+air),nop)) / (Math.pow((1+air),nop) - 1) ) ); 
}

function Results({mortgageAmount, interest, term, frequency, mortgageType}) {

    let numericFrequency = frequency === "monthly" ? 12 : frequency === "fortnightly" ? 26 : 52;
    let repayment = mortgageType === "repayment" ? monthlyPaymentCalc(mortgageAmount,interest,term, numericFrequency) : Math.floor(interest/numericFrequency/100 * mortgageAmount);
    let totalCost = repayment * term * numericFrequency;
    
    return (
        <div className="results">
            <p><strong>Total Cost:</strong> ${totalCost}</p>
            <p><strong>{frequency} Payment:</strong> ${repayment}</p>
        </div>
    )
}

export default Results;