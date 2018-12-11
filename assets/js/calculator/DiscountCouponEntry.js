class DiscountCouponEntry extends AbstractEntry {
    constructor($element, $discountValueField) {
        super($element);

        this._$discountCoupon = $element.find('[data-product-key="discount_coupon"]');
        this._$discountCouponView = $discountValueField;

        this._discountCoupon = null;

        this.configure().then(() => {
            this.enabled = false;
        });
    }

    get key() {
        return 'discount_coupon';
    }

    get price() {
        if (!this._discountCoupon || !this.enabled) {
            return 0;
        }

        return parseFloat(this._discountCoupon.value) * -1;
    }

    set discountCoupon(discountCoupon) {
        this._discountCoupon = discountCoupon;

        this.update();
    }

    update() {
        let value = 0;

        if (this._discountCoupon) {
            value = this._discountCoupon.value;
        }

        HelperService.setMoneyValue(this._$discountCouponView, value);

        return super.update();
    }

    async _handlerChange(e) {
        e.preventDefault();

        const code = e.target.value;
        if (!code) {
            this.discountCoupon = null;
        }

        const discountCoupon = await ApiService.discountCouponData(code);
        if (discountCoupon) {
            this.discountCoupon = discountCoupon;
        }
    }

    /**
     * @protected
     */
    configure() {
        this._$discountCoupon.change(
            this._handlerChange.bind(this)
        );

        return super.configure();
    }
}
