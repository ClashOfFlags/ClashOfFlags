module.exports = validateRequest;

function validateRequest(request, rules) {
    const result = {
        valid: true,
        error: {}
    };

    if(!rules) {
        return result;
    }

    const propertyNames = Object.keys(rules);

    propertyNames.forEach(propertyName => {
        const propertyValue = request[propertyName];
        const propertyRules = rules[propertyName];
        const propertyResult = validateRequestProperty(propertyValue, propertyRules);

        if(!propertyResult.valid) {
            result.valid = false;
            result.error[propertyName] = propertyResult.error;
        }
    });

    return result;
}

function validateRequestProperty(value, rules) {
    const result = {
        valid: true,
        error: {}
    };
    const ruleNames = Object.keys(rules);

    ruleNames.forEach(ruleName => {
        const rule = rules[ruleName];
        const ruleResult = rule(value);

        if(ruleResult !== true) {
            result.valid = false;
            result.error[ruleName] = ruleResult;
        }
    });

    return result;
}