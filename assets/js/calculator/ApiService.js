const ApiService = (function () {
    "use strict";

    function sendRequest(url, options = []) {
        return fetch(url, options);
    }

    class ApiService {
        static async verifyEmail(email) {
            const response = await sendRequest(API_URL + '/verify-login/' + email);
            const json = await response.json();

            return json.available;
        }

        static async register(data) {
            const response = await sendRequest(API_URL + '/saveData', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
                body: data
            });

            return await response.json();
        }

        static async discountCouponData(code) {
            const response = await sendRequest(API_URL + '/discount-coupons/' + code);

            return await response.json();
        }

        static async listPricing() {
            const response = await sendRequest(API_URL + '/pricing');

            return await response.json();
        }
    }

    return ApiService;
})();
