import gzipService from './gzipService';

class AnalyticsService {

    constructor() {
        this.gameKey = '9f19061b8a3d1248c267ecfc712b4c37';
        this.secretKey = '0f967d10de3af4afbcdc2c946df351795ed4a344';
        this.apiEndpoint = 'api.gameanalytics.com';
    }

    sendEvents(events) {
        const data = gzipService.deflate(events);

        $.post({
            data: data,
            headers: {
                'Authorization': '',
                'Content-Type': 'json',
                'Content-Encoding': 'gzip'
            }
        });
    }

}

export default new AnalyticsService();