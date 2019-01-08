/**
 * @abstract
 */
class AbstractEntry {
    constructor($element, required = false) {
        this._$element = $element;
        this._$enabled = $element.find('[data-product-key="enabled"]');

        this._required = required;
        this._enabled = true;
        this._onUpdate = null;
    }

    /**
     * @public
     * @abstract
     */
    get key() {
    }

    /**
     * @public
     * @abstract
     */
    get price() {
    }

    /**
     * @public
     */
    set onUpdate(onUpdate) {
        this._onUpdate = onUpdate;
    }

    /**
     * @protected
     */
    get enabled() {
        return this._enabled;
    }

    /**
     * @protected
     */
    set enabled(enabled) {
        this._enabled = this._required || enabled;

        this.update();
    }

    /**
     * @protected
     */
    get required() {
        return this._required;
    }

    /**
     * @protected
     */
    async update() {
        this._$enabled.prop('checked', this._enabled);

        if (this._enabled) {
            this._$element.removeClass('cinza').addClass('ativo');
            this._$enabled.parent().addClass('ativo');
        } else {
            this._$element.removeClass('ativo').addClass('cinza');
            this._$enabled.parent().removeClass('ativo');
        }

        if (this._onUpdate) {
            this._onUpdate();
        }
    }

    /**
     * @protected
     */
    configure() {
        this._required && this._$enabled
            .parents('.checkbox')
            .addClass('disabled');

        this._$enabled.change(
            this._handleChange.bind(this)
        );

        return this.update();
    }

    _handleChange(e) {
        e.preventDefault();

        this.enabled = $(e.target).prop('checked');
    }
}
