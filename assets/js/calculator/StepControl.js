const StepControl = (function () {
    "use strict";

    const listeners = [];

    class StepControl {
        static next() {
            if (!this._$passo) {
                return;
            }

            this._$passo = this._$passo
                .slideToggle("400")
                .next(".passo")
                .slideToggle("400");
        }

        static prev() {
            if (!this._$passo) {
                return;
            }

            this._$passo = this._$passo
                .slideToggle("400")
                .prev(".passo")
                .slideToggle("400");
        }

        static is(clazz) {
            return this._$passo.hasClass(clazz);
        }

        static load(selector) {
            this._$passo = $($(selector)[0]);
        }

        static step(selector) {
            this._$passo.slideToggle("400");
            this._$passo = $(selector).slideToggle("400");
        }

        static addListener(callback) {
            listeners.push(callback);
        }
    }

    StepControl._$passo = null;

    return StepControl;
})();
