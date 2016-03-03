export default function email(value) {
    if(value === undefined || value === null || value.length === 0) {
        return false;
    }

    if(value.indexOf('@') === -1) {
        return false;
    }

    if(value.length < 5 || value.length > 254) {
        return false;
    }

    const simpleEmailRegex = /\S+@\S+/;

    if(!simpleEmailRegex.test(value)) {
        return false;
    }

    return true;
};