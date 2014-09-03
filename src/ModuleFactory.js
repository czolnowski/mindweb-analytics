var ModuleFactory = function ModuleFactory()
    {};

ModuleFactory.prototype.factory = function factory(constructor, args)
{
    if (!Array.isArray(args)) {
        args = [];
    }

    function F() {
        return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;

    return new F();
};

module.exports = ModuleFactory;
