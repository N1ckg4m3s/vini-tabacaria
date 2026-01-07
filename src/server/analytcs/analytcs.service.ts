import { AnalyticsRepository } from "./analytcs.repo";

export class AnalyticsService {
    private repo: AnalyticsRepository;

    constructor() { this.repo = new AnalyticsRepository() }

    public async UserFirstAccessDaily(device: 'mobile' | 'desktop') {
        await this.repo.logUserFirstAccess(device);
    }

    public async ProductViewed(productId: string) {
        await this.repo.logProductView(productId);
    }

    public async ProductAddedToCart(productId: string) {
        await this.repo.logProductAddedToCart(productId);
    }

    public async ProductRemovedFromCart(productId: string) {
        await this.repo.logProductRemovedFromCart(productId);
    }
}