var Rec = function ()
    {
        this.logger = null;
    };

Rec.prototype.register = function register(tracker)
{
    tracker.register(
        'Rec',
        this
    );
};

Rec.prototype.setLogger = function setLogger(logger)
{
    this.logger = logger;
};

Rec.prototype.onConnection = function onConnection(connection)
{
    connection.then(
        function (values)
        {
            var error = null;

            if (typeof values.request.query.rec === 'undefined') {
                error = new Error('Rec undefined, do not track.');
                error.key = 'REC_NOT_DEFINED';
            } else if (values.request.query.rec != '1') {
                error = new Error('Rec != 1, do not track.');
                error.key = 'REC_NOT_DEFINED';
            }

            if (error !== null) {
                throw error;
            }
        }
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
