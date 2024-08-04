import React from 'react';

// List of financial tips
const financialTips = [
    "Start by tracking your expenses to understand your spending habits.",
    "Set a budget and stick to it by prioritizing essential expenses.",
    "Build an emergency fund that covers at least 3-6 months of living expenses.",
    "Pay off high-interest debt as quickly as possible to avoid paying more in interest.",
    "Invest in your future by contributing regularly to your retirement accounts.",
    "Regularly review and adjust your budget as your financial situation changes.",
    "Use budgeting tools and apps to help manage your finances effectively.",
    "Save a portion of your income each month, even if it's a small amount.",
    "Avoid impulse purchases by making a shopping list and sticking to it.",
    "Understand your credit score and work to improve it over time."
];

// Function to get a random tip
const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * financialTips.length);
    return financialTips[randomIndex];
};

const FinancialTipHeader = () => {
    const tip = getRandomTip(); // Get a random tip when the component renders

    return (
        <header>
            <h3>{tip}</h3>
        </header>
    );
};

export default FinancialTipHeader;
