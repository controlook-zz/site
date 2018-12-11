class HelperService {
    static async verifyEmail($btnEmail, $email, $erroEmail, callback) {
        $btnEmail.spinning('start');

        const email = $email.val();

        if (!email) {
            return $erroEmail.text('Por favor, informe seu e-mail.').show();
        }

        let verified = await (async () => {
            try {
                return await ApiService.verifyEmail(email)
            } catch (e) {
                return false;
            }
        })();

        $btnEmail.spinning('stop');

        if (verified) {
            return callback();
        }

        $erroEmail.text('Esse e-mail não está disponível.').show();
    }

    static setNiche($select, niche) {
        const addNiche = niche => {
            $select.append(`
                <option value="${niche.id}" data-niche-name="${niche.name}" ${niche.default ? 'selected' : ''}>
                    ${niche.name_view}
                </option>
            `);
        };

        niche.children.forEach(addNiche);
    }

    static getRegisterDataFromForm($form) {
        const data = {};

        $form.serializeArray().forEach(({name, value}) => data[name] = value);

        return $.param(data);
    }

    static async register($form) {
        const data = this.getRegisterDataFromForm($form);

        return await ApiService.register(data);
    }

    static setMoneyValue($field, value, fnName = 'text') {
        $field[fnName](
            parseFloat(value)
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2
                })
        );
    }
}
