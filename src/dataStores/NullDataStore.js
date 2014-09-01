var NullDataStore = function (logger)
    {
        this.logger = logger;
    },
    prettyjson = require('prettyjson');

NullDataStore.prototype.persist = function persist(visit, action)
{
    this.logger.info('Visit object:\n %s', prettyjson.render(visit), 'debug');

    this.logger.info('Action object:\n %s', prettyjson.render(action), 'debug');
};

module.exports = NullDataStore;
