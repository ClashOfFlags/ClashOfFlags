module.exports = {
    name: 'required',
    validate(value) {
        if(value === undefined || value === null || value.length === 0) {
            return false;
        }

        return true;
    }
};