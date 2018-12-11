class ProductEntry extends AbstractEntry {
    constructor($element, config, preset) {
        super($element);

        this._$btnLess = $element.find('[data-product-key="less"]');
        this._$btnMore = $element.find('[data-product-key="more"]');
        this._$name = $element.find('[data-product-key="name"]');
        this._$description = $element.find('[data-product-key="description"]');
        this._$price = $element.find('[data-product-key="price"]');
        this._$quantity = $element.find('[data-product-key="quantity"]');
        this._$inputQuantity = $element.find('[data-product-key="input_quantity"]');

        this._name = config.name;
        this._description = config.description;
        this._productKey = config.product_key;
        this._initialPrice = parseFloat(config.initial_price);
        this._initialQuantity = parseInt(config.initial_quantity);
        this._interval = parseInt(config.interval);
        this._p1Range = parseInt(config.p1_range);
        this._p1Value = parseFloat(config.p1_value);
        this._p2Range = parseInt(config.p2_range);
        this._p2Value = parseFloat(config.p2_value);
        this._p3Value = parseFloat(config.p3_value);
        this._quantity = parseInt(config.initial_quantity);

        const then = () => {
            if (this.key in preset) {
                this.quantity = preset[this.key];
            }
        };

        this.configure().then(then);
    }

    get key() {
        return this._productKey;
    }

    set onUpdate(onUpdate) {
        this._onUpdate = onUpdate;
    }

    get quantity() {
        if (!this.enabled) {
            return 0;
        }

        return this._quantity;
    }

    set quantity(quantity) {
        if (0 > quantity) {
            quantity = 0;
        }

        this.enabled = 0 !== (this._quantity = quantity)
    }

    get price() {
        if (!this.enabled) {
            return 0;
        }

        const addQuantity = this._quantity - this._initialQuantity;
        const addValue = this._getCurrentAdditionalValueByRange();
        const addGroup = addQuantity / this._interval;

        return this._initialPrice + (addGroup * addValue);
    }

    more() {
        this.quantity += this._interval;
    }

    less() {
        if (this._quantity === this._initialQuantity) {
            this.enabled = false;

            return;
        }

        this.quantity -= this._interval;
    }

    async update() {
        this._$name.text(this._name);
        this._$description.text(this._description);
        this._$quantity.text(this._quantity);
        this._$inputQuantity.val(this._quantity);

        HelperService.setMoneyValue(this._$price, this.price);

        await super.update();
    }

    _getCurrentAdditionalValueByRange() {
        const quantity = this._quantity;

        if (quantity <= this._initialQuantity) {
            return 0;
        }

        if (quantity <= this._p1Range) {
            return this._p1Value;
        }

        if (quantity <= this._p2Range) {
            return this._p2Value;
        }

        return this._p3Value;
    }

    /** @protected */
    configure() {
        this._$inputQuantity.attr('name', `pricing[${this._productKey}_amount]`);

        this._$btnLess.click(
            this.less.bind(this)
        );

        this._$btnMore.click(
            this.more.bind(this)
        );

        return super.configure();
    }
}
