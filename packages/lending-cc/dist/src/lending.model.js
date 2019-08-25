"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_model_1 = require("@worldsibu/convector-core-model");
var Lending = (function (_super) {
    tslib_1.__extends(Lending, _super);
    function Lending() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'io.worldsibu.lending';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required()
    ], Lending.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "isbn", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "title", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "author", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "publisher", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "genre", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "year", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "ownerId", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "borrowerId", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "userId", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "name", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "surname", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "email", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "city", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "region", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "state", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Lending.prototype, "role", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], Lending.prototype, "defaultEscrow", void 0);
    return Lending;
}(convector_core_model_1.ConvectorModel));
exports.Lending = Lending;
//# sourceMappingURL=lending.model.js.map