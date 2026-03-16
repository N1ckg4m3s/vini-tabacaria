import sharp from "sharp";
import { ImageRepository } from "./image.repository";

export class ImageService {
    private imageRepo: ImageRepository;
    constructor() {
        this.imageRepo = new ImageRepository();
    }

    async addImageToProduct(image: File, productId: string) {
        const fileName = await this.generateFileName(productId)// o id é UUID
        const optimizedImageBuffer = await this.optimizeImage(image)

        await this.imageRepo.insertImage(optimizedImageBuffer, fileName)

        const publicUrl = await this.imageRepo.getImageUrl(fileName)

        return publicUrl
    }

    private async optimizeImage(image: File): Promise<Buffer> {
        const arrayBuffer = await image.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const optimizedBuffer = await sharp(buffer)
            .resize({ width: 1200 })
            .webp({ quality: 80 })
            .toBuffer()

        return optimizedBuffer
    }

    private async generateFileName(productId: string): Promise<string> { return `image-${productId}.webp` }
}