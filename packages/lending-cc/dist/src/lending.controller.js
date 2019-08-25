"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var convector_core_1 = require("@worldsibu/convector-core");
var lending_model_1 = require("./lending.model");
var LendingController = (function (_super) {
    tslib_1.__extends(LendingController, _super);
    function LendingController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LendingController.prototype.create = function (lending) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, lending.save()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    tslib_1.__decorate([
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(lending_model_1.Lending))
    ], LendingController.prototype, "create", null);
    LendingController = tslib_1.__decorate([
        convector_core_1.Controller('lending')
    ], LendingController);
    return LendingController;
}(convector_core_1.ConvectorController));
exports.LendingController = LendingController;
//# sourceMappingURL=lending.controller.js.map