export function singleton(Class) {
    function extend(sub, sup) {

        for (var prop in sup)
            if (sup.hasOwnProperty(prop))
                sub[prop] = sup[prop];

        function __() {
            this.constructor = sub;
        }

        __.prototype = sup.prototype;
        sub.prototype = new __();
    };

    const Singleton = <any>function (...args) {
        if (Singleton._instance) {
            return Singleton._instance;
        }

        Class.apply(this, args);

        Singleton._instance = this;
    }

    extend(Singleton, Class);

    return Singleton;
}