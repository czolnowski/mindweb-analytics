var Pixel = function ()
    {};

Pixel.prototype.register = function register(tracker)
{
    tracker.register(
        'Pixel',
        this
    );
};

Pixel.prototype.getPixel = function writePixel()
{
    return new Buffer(
        '47494638396101000100800000dbdfef00000021f90401000000002c00000000010001000002024401003b',
        'hex'
    );
};

Pixel.prototype.handleResponse = function handleResponse(response)
{
    response.writeHead(
        200,
        {
            'Content-Type': 'image/gif'
        }
    );

    response.end(
        this.getPixel(),
        'binary'
    );
};

Pixel.prototype.onEnd = function onEnd(promise)
{
    var handler = function (values) {
        this.handleResponse(values.response);
    }.bind(this);

    promise.then(handler, handler);
};

module.exports = Pixel;
