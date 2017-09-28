'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _phantom = require('./phantom');

var _phantom2 = _interopRequireDefault(_phantom);

var _random_id = require('./util/random_id');

var _random_id2 = _interopRequireDefault(_random_id);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OutObject {

    constructor(phantom) {
        this._phantom = phantom;
        this.target = 'OutObject$' + (0, _random_id2.default)(16);
    }

    property(name) {
        return this._phantom.execute(this.target, 'property', [name]);
    }
}
exports.default = OutObject;