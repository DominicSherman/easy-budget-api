export const getServiceAccount = (): string | null => {
    try {
        const serviceAccount = require('../service-account.json');

        return serviceAccount;
    } catch (error) {
        return null;
    }
};
