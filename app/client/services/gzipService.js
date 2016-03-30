export default class GzipService {

    static deflate(data) {
        return GzipService.deflate(JSON.stringify(data), { to: 'string' });
    }

}