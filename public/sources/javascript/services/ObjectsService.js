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
        this.map().objects[layer].forEach((element) => {
            if (element.properties && this.objectHasProperties(element, properties)) {
                element.y += 64;
                result.push(element);
            }

        });
        return result;
    }

    objectHasProperties(object, properties) {
        for (var key in properties) {
            if (!properties.hasOwnProperty(key)) {
                continue;
            }

            const hasAttribute = object[key] && properties[key] == object[key];
            const hasProperty = properties[key] == object.properties[key];

            if (hasAttribute || hasProperty) {
                return true;
            }
        }

        return false;
    }

    get(name) {
        return this.collection[name];
    }

    map() {
        return this.get('map');
    }

}
