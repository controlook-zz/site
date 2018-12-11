const API_URL = 'https://sys.controlook.com/signup';

async function main() {
    const ROW_TEMPLATE = `
        <div class="linha ativo">
            <input type="hidden" data-product-key="input_quantity">
            <label class="checkbox">
                <input type="checkbox" data-product-key="enabled">
                <p data-product-key="name"></p>
            </label>
            <div class="valor_direita" data-product-key="controls">
                <a  href="javascript:void(0);" class="menos" data-product-key="less"></a>
                <div class="informacoes">
                    <p class="cinza">
                        <span data-product-key="quantity"></span>
                        <span data-product-key="description"></span>
                    </p>
                    <p class="verde" data-product-key="price"></p>
                </div>
                <a  href="javascript:void(0);" class="mais" data-product-key="more"></a>
            </div>
        </div>
    `;

    const DISCOUNT_COUPON_TEMPLATE = `
        <div class="linha desconto">
            <label class="checkbox">
                <input type="checkbox" data-product-key="enabled">
                <p>Cupom de Desconto</p>
            </label>
            <div class="valor_direita">
                <div class="informacoes">
                    <input type="text"
                           class="discount_coupon"
                           placeholder="Digite aqui seu Cupom"
                           data-product-key="discount_coupon"
                           name="discount_coupon">
                </div>
            </div>
        </div>
    `;

    const presets = {
        small: {
            users: 1,
            members: 200,
            sms: 0
        },
        medium: {
            users: 2,
            members: 800,
            sms: 0
        },
        large: {
            users: 5,
            members: 1500,
            sms: 0
        }
    };

    const packages = await ApiService.listPricing();

    /**
     * @type {Array<AbstractEntry>}
     */
    const entries = [];
    const $total = $('.calculator [data-product-key="total"]');

    function update() {
        const reduce = (old, entry) => {
            return old + entry.price;
        };

        const value = entries.reduce(reduce, 0);

        const $planValue = $('[data-product-key="plan_value"]');

        HelperService.setMoneyValue($total, value);
        HelperService.setMoneyValue($planValue, value, 'val');
    }

    function renderProduct(config) {
        const $element = $(ROW_TEMPLATE);
        const productEntry = new ProductEntry($element, config, presets.light);

        productEntry.onUpdate = update;

        entries.push(productEntry);

        $element.appendTo('.calculator [data-product-list]');
    }

    function renderDiscountCoupon() {
        const $element = $(DISCOUNT_COUPON_TEMPLATE);
        const discountCouponEntry = new DiscountCouponEntry($element, $('.calculator [data-product-key="discount_value"]'));

        discountCouponEntry.onUpdate = update;

        entries.push(discountCouponEntry);

        $element.appendTo('.calculator [data-product-list]');
    }

    const $btnPresets = $('[data-preset]').click(function () {
        $btnPresets.removeClass('ativo');

        $(this).addClass('ativo');

        const presetName = $(this).data('preset');
        const preset = presets[presetName];

        for (let key in preset) {
            const find = entry => entry.key === key;

            const entry = entries.find(find);

            if (!entry) {
                continue;
            }

            entry.quantity = preset[key];
        }
    });

    packages.forEach(renderProduct);

    renderDiscountCoupon();

    update();
}

$(document).ready(function () {
    main();
});
