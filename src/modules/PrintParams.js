var PrintParams = function ()
    {
        this.logger = null;
    },
    prettyjson = require('prettyjson');

PrintParams.prototype.register = function register(tracker)
{
    tracker.register(
        'PrintParams',
        this
    );
};

PrintParams.prototype.setLogger = function setLogger(logger)
{
    this.logger = logger;
};

PrintParams.prototype.onConnection = function onConnection(connection)
{
    connection.then(
        function (values)
        {
            if (Object.keys(values.request.query).length < 1) {
                this.logger.error('No query params.');
            } else {
                this.logger.info(
                    prettyjson.render(values.request.query),
                    'debug'
                );
            }
        }.bind(this)
    );
};

module.exports = PrintParams;
