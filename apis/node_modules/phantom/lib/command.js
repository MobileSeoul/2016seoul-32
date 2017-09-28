'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _random_id = require('./util/random_id');

var _random_id2 = _interopRequireDefault(_random_id);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A simple command class that gets deserialized when it is sent to phantom
 */
class Command {

    constructor(id, target, name) {
        let params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

        this.id = id || (0, _random_id2.default)(16);
        this.target = target;
        this.name = name;
        this.params = params;
        this.deferred = null;
    }
}
exports.default = Command;