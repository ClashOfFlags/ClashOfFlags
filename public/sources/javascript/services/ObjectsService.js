export default class ObjectsService {
    constructor(game) {
        this.collection = {};
    }

    set(name, value) {
        this.collection[name] = value;
    }

    byType(type, layer) {
        return this.byProperties({'type': type}, layer);
    }

    byProperties(properties, layer) {
        var result = [];
        this.map().objects[layer].forEach(function (element) {
            if (element.properties) {
                for (var key in properties) {
                    if(properties.hasOwnProperty(key)){
                        continue;
                    }

                    if (
                        (element[key] && properties[key] == element[key]) ||
                        (properties[key] == element.properties[key])
                    ) {
                        element.y += 64;
                        result.push(element);
                    }
                }
            }

        });
        return result;
    }

    objectHasProperties(properties){

    }

    get(name) {
        return this.collection[name];
    }

    map() {
        return this.get('map');
    }

}
