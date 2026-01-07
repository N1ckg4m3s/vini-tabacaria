import { AnalyticsEvent } from "@/features/analytics/types/analytics.events";
import { analyticsEventValidators } from "./analytics.validators";
import { BadRequestError } from "@/http/error/erros.handle";
import { AnalyticsService } from "./analytcs.service";
import { AnalyticsEventData } from "./analytcs.types";

export const identifyAnalyticsEvent = (event: AnalyticsEvent, data: AnalyticsEventData) => {
    // Verifica os dados necessários para o evento
    analyticsEventValidators[event](data);

    const service = new AnalyticsService();

    switch (event) {
        case AnalyticsEvent.UserFirstAccessDaily:
            service.UserFirstAccessDaily(data.device!);
            break;
        case AnalyticsEvent.ProductViewed:
            service.ProductViewed(data.productId!);
            break;
        case AnalyticsEvent.ProductAddedToCart:
            service.ProductAddedToCart(data.productId!);
            break;
        case AnalyticsEvent.ProductRemovedFromCart:
            service.ProductRemovedFromCart(data.productId!);
            break;
        default:
            throw new BadRequestError(`Evento de Analytics desconhecido [${event}]`);
    }
};