module.exports = {
    name: 'required',
    validate(value) {
        if(value === undefined || value === null) {
            return false;
        }

        return true;
    }
};