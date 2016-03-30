export default class HashService {

    static hmac(key, input) {
        const hasher = new jsSHA('SHA-256', 'TEXT');

        hasher.setHMACKey(key, 'TEXT');
        hasher.update(input);

        return hasher.getHMAC('HEX');
    }

}