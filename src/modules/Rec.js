var Rec = function (rec)
    {
        this.logger = null;

        this.rec = typeof rec === 'string' ? rec : 'rec';
    },
    sprintf = require('util').format;

Rec.prototype.setLogger = function setLogger(logger)
{
    this.logger = logger;
};

Rec.prototype.onConnection = function onConnection(connection)
{
    connection.then(
        function (values)
        {
            var error = null,
                recName = this.rec.charAt(0).toUpperCase() + this.rec.slice(1);

            if (typeof values.request.query[this.rec] === 'undefined') {
                error = new Error(
                    sprintf('%s undefined, do not track.', recName)
                );
                error.key = 'REC_NOT_DEFINED';
            } else if (values.request.query[this.rec] != '1') {
                error = new Error(
                    sprintf('%s != 1, do not track.', recName)
                );
                error.key = 'REC_NOT_DEFINED';
            }

            if (error !== null) {
                throw error;
            }
        }.bind(this)
    );
};

Rec.prototype.onEnd = function onEnd(end)
{
    end.then(
        null,
        function (values)
        {
            this.logger.error(values.err.message);
        }.bind(this)
    );
};

module.exports = Rec;
