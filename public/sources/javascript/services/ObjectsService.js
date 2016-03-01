export default class ObjectsService {
    constructor(game) {
        this.collection = {};
    }

    set(name, value) {
        this.collection[name] = value;
    }

    byType(type, layer) {
        var result = [];
        this.map().objects[layer].forEach(function (element) {
          if(element.properties) {
            if (element.properties.type === type) {
                element.y += 64;
                result.push(element);
            }
          }

        });
        return result;
    }

    get(name){
        return this.collection[name];
    }

    map() {
        return this.get('map');
    }

}
