import { BadRequestError } from "@/http/error/erros.handle";
import { AnalyticsEventData, AnalyticsEventValidator } from "./analytcs.types";
import { AnalyticsEvent } from "@/features/system/analytics/types/analytics.events";

const requireProductId: AnalyticsEventValidator = (data) => {
    if (!data || !data.productId) {
        throw new BadRequestError("productId is required for this event");
    }
};

export const analyticsEventValidators: Record<AnalyticsEvent, (data: AnalyticsEventData) => void> = {
    [AnalyticsEvent.UserFirstAccessDaily]: () => { },

    [AnalyticsEvent.ProductViewed]: requireProductId,

    [AnalyticsEvent.ProductAddedToCart]: requireProductId,

    [AnalyticsEvent.ProductRemovedFromCart]: requireProductId,
};
