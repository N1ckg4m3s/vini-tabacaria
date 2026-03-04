import { SupabaseClient } from "@supabase/supabase-js";
import suprabase from "../connections/supraBaseConnection";
import { BadRequestError, InternalError } from "@/http/error/erros.handle";

export class ImageRepository {
    private supra: SupabaseClient<any, "public", any>;
    constructor() { this.supra = suprabase }

    async insertImage(buffer: Buffer, fileName: string) {
        const { data, error } = await this.supra
            .storage
            .from("products-images")
            .upload(fileName, buffer, {
                contentType: 'image/webp',
                upsert: true
            })

        if (error) throw new InternalError(error.message);
        return data;
    }

    async getImageUrl(fileName: string) {
        const { data } = await this.supra
            .storage
            .from("products-images")
            .getPublicUrl(fileName);

        return data.publicUrl;
    }
}