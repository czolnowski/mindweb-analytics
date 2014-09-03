var Site = function (site)
    {
        this.logger = null;
        this.dataStore = null;

        this.site = typeof site === 'string' ? site : 'site';
    },
    sprintf = require('util').format;

Site.prototype.onConnection = function onConnection(connection)
{
    connection.then(
        function (values)
        {
            var error = null,
                siteName = this.site.charAt(0).toUpperCase() + this.site.slice(1);

            if (typeof values.request.query[this.site] === 'undefined') {
                error = new Error(
                    sprintf('%s undefined, do not track.', siteName)
                );
                error.key = 'SITE_NOT_DEFINED';
            }

            if (Number.isNaN(parseInt(values.request.query[this.site], 10))) {
                error = new Error(
                    sprintf('%s is not numeric, do not track.', siteName)
                );
                error.key = 'SITE_NOT_NUMERIC';
            }

            if (error !== null) {
                throw error;
            }
        }.bind(this)
    );
};

Site.prototype.onNewVisit = function onNewVisit(newVisit)
{
    newVisit.then(
        function (values)
        {
            values.visit.site = parseInt(values.request.query[this.site], 10);
        }.bind(this)
    );
};

module.exports = Site;
