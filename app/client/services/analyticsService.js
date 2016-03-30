import GzipService from './GzipService';
import HashService from './HashService';

class AnalyticsService {

    constructor() {
        this.gameKey = '9f19061b8a3d1248c267ecfc712b4c37';
        this.secretKey = '0f967d10de3af4afbcdc2c946df351795ed4a344';
        this.apiEndpoint = `http://api.gameanalytics.com/v2/${ this.gameKey }/`;
        this.initRoute = this.apiEndpoint + 'init';
        this.eventsRoute = this.apiEndpoint + 'events';
    }

    sendInit() {
        const payload = {
            platform: platform.name,
            os_version: platform.os,
            sdk_version: 'rest api v2'
        };

        this.send(this.initRoute, payload)
            .done(response => {
                console.log(response);
            });
    }

    sendEvents(payload) {
        this.send(this.eventsRoute, payload);
    }

    send(url, payload) {
        const data = GzipService.deflate(payload);
        const authorization = HashService.base64(HashService.hmac(this.secretKey, data));
        const settings = {
            url: url,
            data: data,
            headers: {
                'Authorization': authorization,
                'Content-Type': 'json',
                'Content-Encoding': 'gzip'
            }
        };

        return $.post(settings);
    }

}

export default new AnalyticsService();