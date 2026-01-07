import { SupabaseClient } from "@supabase/supabase-js";
import suprabase from "../connections/supraBaseConnection";

export class AnalyticsRepository {
    private supra: SupabaseClient<any, "public", any>;
    constructor() { this.supra = suprabase }

    public async logUserFirstAccess(device: 'mobile' | 'desktop') {
        const { error } = await this.supra.rpc("log_user_access", { device });
        if (error) throw error;
    }

    public async logProductView(product_id: string) {
        const { error } = await this.supra.rpc("log_product_view", { p_product_id: product_id });
        if (error) throw error;
    }

    public async logProductAddedToCart(product_id: string) {
        const { error } = await this.supra.rpc("log_product_intention", { p_product_id: product_id, intention: 'add' });
        if (error) throw error;
    }

    public async logProductRemovedFromCart(product_id: string) {
        const { error } = await this.supra.rpc("log_product_intention", { p_product_id: product_id, intention: 'remove' });
        if (error) throw error;
    }
}