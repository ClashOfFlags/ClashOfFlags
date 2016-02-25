export default class ObjectsService {
    constructor(game){
        this.objects = {};
    }

    set(name, value){
        this.objects[name] = value;
    }

    byType(type, layer) {
        var result = [];
        this.map().objects[layer].forEach(function(element){
            if(element.properties.type === type) {
                result.push(element);
            }
        });
        return result;
    }

    map(){
        return this.objects.map;
    }

}