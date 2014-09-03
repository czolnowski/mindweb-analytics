var Pixel = function (pixel, type, contentType)
    {
        this.pixel = typeof pixel === 'string' ? pixel : pixelString;
        this.type = typeof type === 'string' ? type : 'hex';
        this.contentType = typeof contentType === 'string' ? contentType : 'image/gif';
    },
    pixelString = '47494638396101000100800000dbdfef00000021f90401000000002c00000000010001000002024401003b';

Pixel.prototype.getPixel = function writePixel()
{
    return new Buffer(this.pixel, this.type);
};

Pixel.prototype.handleResponse = function handleResponse(response)
{
    response.writeHead(
        200,
        {
            'Content-Type': this.contentType
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
