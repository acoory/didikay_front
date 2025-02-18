import Api from './api';

export class StripeService extends Api {
    async createPayment(data:any) {
        return this.instance.post(`/client/stripe/create-checkout-session`, data);
    }
}

export default new StripeService();