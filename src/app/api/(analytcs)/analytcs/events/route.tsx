import { AuthError, BadRequestError, NoResponseError } from "@/http/error/erros.handle";
import { createRoute } from "@/http/http.handler";
import { identifyAnalyticsEvent } from "@/server/analytcs/analytics.identify";

export const POST = createRoute(async (req) => {
    const eventData = await req.json();

    const { event } = eventData;
    if (!event) throw new BadRequestError('Evento não informado');

    identifyAnalyticsEvent(event, {
        device: eventData.device,
        productId: eventData.productId
    });

    return null;
}) 