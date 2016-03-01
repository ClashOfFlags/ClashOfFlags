const co = require('co');
const _ = require('lodash');
const eventBus = require('../events/event-bus');
const SocketConnectEvent = require('../events/SocketConnectEvent');
const endpoints = require('./endpoints');
const rules = require('./rules');
const SERVER_ERROR = { error: true };

endpoints.forEach(endpoint => {
    replaceEndpointHandle(endpoint);
    replaceEndpointRules(endpoint);
});

eventBus.register(new SocketConnectEvent(), onSocketConnect);

function onSocketConnect(event) {
    const socket = event.socket;

    endpoints.forEach(endpoint => {
        registerEndpoint(socket, endpoint);
    });
}

function registerEndpoint(socket, endpoint) {
    socket.on(endpoint.event, (request, callback) => {
        onEndpointEvent(endpoint, request, callback);
    });
}

function onEndpointEvent(endpoint, request, callback) {
    const rules = endpoint.rules;
    const result = validateRequest(request, rules);

    if(!result.valid) {
        return callback({ error: result.error });
    }

    handleRequest(endpoint, request, callback);
}

function handleRequest(endpoint, request, callback) {
    endpoint.handle(request)
        .then(response => {
            return callback(response);
        })
        .catch(err => {
            console.error(err);

            return callback(SERVER_ERROR);
        });
}

function validateRequest(request, rules) {
    const propertyNames = Object.keys(rules);
    const result = {
        valid: true,
        error: {}
    };

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

function requireEndpoint(name) {
    return require('./endpoints/' + name);
}

function requireRule(name) {
    return require('./rules/' + name);
}

function replaceEndpointHandle(endpoint) {
    endpoint.handle = co.wrap(endpoint.handle);
}

function replaceEndpointRules(endpoint) {
    const rules = endpoint.rules;
    const propertyNames = Object.keys(rules);

    propertyNames.forEach(propertyName => {
        const propertyRules = rules[propertyName];
        const ruleNames = Object.keys(propertyRules);

        ruleNames.forEach(ruleName => {
            const rule = findRuleByName(ruleName);
            const ruleOptions = propertyRules[ruleName];
            propertyRules[ruleName] = createRule(rule, ruleOptions);
        });
    });
}

function findRuleByName(name) {
    const rule = _.find(rules, { name });

    if(!rule) {
        throw new Error('No rule found for: ' + name + '!');
    }

    return rule;
}

function createRule(rule, ruleOptions) {
    return value => {
        return rule(value, ruleOptions);
    };
}