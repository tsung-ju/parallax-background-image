var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function toFunction(toFunc) {
    if (typeof toFunc === 'function') {
        return toFunc;
    }
    return () => toFunc;
}
export function toAsyncFunction(toFunc) {
    const func = toFunction(toFunc);
    return function () {
        return __awaiter(this, arguments, void 0, function* () { return yield func.apply(this, arguments); });
    };
}