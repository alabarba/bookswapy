"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_controller_1 = require("@worldsibu/convector-core-controller");
var lending_model_1 = require("./lending.model");
var participant_cc_1 = require("participant-cc");
var LendingController = (function (_super) {
    tslib_1.__extends(LendingController, _super);
    function LendingController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LendingController.prototype.createBook = function (ownerId, isbn, title, author, publisher, genre, year) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var book;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        book = new lending_model_1.Lending(isbn);
                        book.isbn = isbn;
                        book.title = title;
                        book.publisher = publisher;
                        book.genre = genre;
                        book.year = year;
                        book.ownerId = ownerId;
                        book.borrowerId = null;
                        return [4, book.save()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    LendingController.prototype.update = function (isbn, title, author, publisher, genre, year) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var book, owner, ownerCurrentIdentity;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, lending_model_1.Lending.getOne(isbn)];
                    case 1:
                        book = _a.sent();
                        console.log('Book:');
                        console.log(book);
                        if (!book || !book.isbn) {
                            throw new Error("Book with isbn " + isbn + " does not exist");
                        }
                        return [4, participant_cc_1.Participant.getOne(book.ownerId)];
                    case 2:
                        owner = _a.sent();
                        console.log('Owner:');
                        console.log(owner);
                        if (!owner || !owner.id || !owner.identities) {
                            throw new Error('Referenced owner participant does not exist in the ledger');
                        }
                        ownerCurrentIdentity = owner.identities.filter(function (identity) { return identity.status === true; })[0];
                        if (!(ownerCurrentIdentity.fingerprint === this.sender)) return [3, 4];
                        console.log('Identity can update book');
                        book.isbn = isbn;
                        book.title = title;
                        book.author = author;
                        book.publisher = publisher;
                        book.genre = genre;
                        book.year = year;
                        return [4, book.save()];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4: throw new Error("Identity " + this.sender + " is not allowed to update book just " + owner.username + " " + ownerCurrentIdentity.fingerprint + " can");
                    case 5: return [2];
                }
            });
        });
    };
    LendingController.prototype.transfer = function (isbn, borrowerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var book, owner, ownerCurrentIdentity;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, lending_model_1.Lending.getOne(isbn)];
                    case 1:
                        book = _a.sent();
                        if (!book || book.isbn) {
                            throw new Error("Book with id " + isbn + " does not exist");
                        }
                        return [4, participant_cc_1.Participant.getOne(book.ownerId)];
                    case 2:
                        owner = _a.sent();
                        if (!owner || !owner.id || !owner.identities) {
                            throw new Error('Referenced owner participant does not exist in the ledger');
                        }
                        ownerCurrentIdentity = owner.identities.filter(function (identity) { return identity.status === true; })[0];
                        if (!(ownerCurrentIdentity.fingerprint === this.sender)) return [3, 4];
                        book.borrowerId = borrowerId;
                        return [4, book.save()];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4: throw new Error("Identity " + this.sender + " is not allowed to update book just " + owner.username + " " + ownerCurrentIdentity.fingerprint + " can");
                    case 5: return [2];
                }
            });
        });
    };
    LendingController.prototype.get = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, lending_model_1.Lending.getOne(id)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(1, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(2, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(3, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(4, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(5, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(6, convector_core_controller_1.Param(yup.string()))
    ], LendingController.prototype, "createBook", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(1, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(2, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(3, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(4, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(5, convector_core_controller_1.Param(yup.string()))
    ], LendingController.prototype, "update", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string())),
        tslib_1.__param(1, convector_core_controller_1.Param(yup.string()))
    ], LendingController.prototype, "transfer", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(yup.string()))
    ], LendingController.prototype, "get", null);
    LendingController = tslib_1.__decorate([
        convector_core_controller_1.Controller('lending')
    ], LendingController);
    return LendingController;
}(convector_core_controller_1.ConvectorController));
exports.LendingController = LendingController;
//# sourceMappingURL=lending.controller.js.map