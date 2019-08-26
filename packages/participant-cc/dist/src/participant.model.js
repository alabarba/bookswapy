"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_1 = require("@worldsibu/convector-core");
var x509Identities = (function (_super) {
    tslib_1.__extends(x509Identities, _super);
    function x509Identities() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'io.worldsibu.examples.x509identity';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_1.ReadOnly()
    ], x509Identities.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_1.Validate(yup.boolean()),
        convector_core_1.Required()
    ], x509Identities.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_1.Validate(yup.string()),
        convector_core_1.Required()
    ], x509Identities.prototype, "fingerprint", void 0);
    return x509Identities;
}(convector_core_1.ConvectorModel));
exports.x509Identities = x509Identities;
var Participant = (function (_super) {
    tslib_1.__extends(Participant, _super);
    function Participant() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'io.worldsibu.examples.participant';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_1.ReadOnly()
    ], Participant.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_1.ReadOnly(),
        convector_core_1.Required(),
        convector_core_1.Validate(yup.string())
    ], Participant.prototype, "username", void 0);
    tslib_1.__decorate([
        convector_core_1.ReadOnly(),
        convector_core_1.Validate(yup.string())
    ], Participant.prototype, "msp", void 0);
    tslib_1.__decorate([
        convector_core_1.Validate(yup.array(x509Identities.schema()))
    ], Participant.prototype, "identities", void 0);
    tslib_1.__decorate([
        convector_core_1.Validate(yup.string())
    ], Participant.prototype, "name", void 0);
    tslib_1.__decorate([
        convector_core_1.Validate(yup.string())
    ], Participant.prototype, "surname", void 0);
    tslib_1.__decorate([
        convector_core_1.Validate(yup.string())
    ], Participant.prototype, "email", void 0);
    tslib_1.__decorate([
        convector_core_1.Validate(yup.string())
    ], Participant.prototype, "city", void 0);
    tslib_1.__decorate([
        convector_core_1.Validate(yup.string())
    ], Participant.prototype, "region", void 0);
    tslib_1.__decorate([
        convector_core_1.Validate(yup.string())
    ], Participant.prototype, "state", void 0);
    tslib_1.__decorate([
        convector_core_1.Validate(yup.string())
    ], Participant.prototype, "role", void 0);
    tslib_1.__decorate([
        convector_core_1.Validate(yup.number())
    ], Participant.prototype, "defaultEscrow", void 0);
    return Participant;
}(convector_core_1.ConvectorModel));
exports.Participant = Participant;
//# sourceMappingURL=participant.model.js.map