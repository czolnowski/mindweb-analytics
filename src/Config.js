var Config = function ()
    {
        this.config = {
            module: 'mindweb-analytics-tracker',
            domain: 'mindweb-tracker.tld',
            port: '80'
        };
    },
    sprintf = require('util').format;

Config.prototype.readFromPath = function (path)
{
    var fromPath = require(path);

    Object.keys(fromPath).forEach(
        function (key)
        {
            this.config[key] = fromPath[key];
        },
        this
    );
};

Config.prototype.readFromObject = function readFromObject(object, prefix)
{
    Object.keys(object).forEach(
        function (key)
        {
            if (key.indexOf(prefix) === 0) {
                this.config[key.substr(prefix.length)] = object[key];
            }
        },
        this
    );
};

Config.prototype.get = function get(key)
{
    if (typeof this.config[key] === 'undefined') {
        throw new Error(sprintf('Invalid %s config key.', key));
    }

    return this.config[key];
};

module.exports = Config;
