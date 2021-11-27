var PNG = require('pngjs').PNG;
var fs = require("fs");

fs.createReadStream('240p.png').pipe(new PNG({ filterType: 4 })).on('parsed', () => {
    var pixels = [];
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            var r = this.data[idx];
            var g = this.data[idx + 1];
            var b = this.data[idx + 2];
            pixels.push(`${r}, ${g}, ${b}`);
        }
    }
    fs.writeFile('output.json', JSON.stringify({ data: pixels }), 'utf8', (err) => {
        if (err) {
            console.error(err)
        }
    });
});
