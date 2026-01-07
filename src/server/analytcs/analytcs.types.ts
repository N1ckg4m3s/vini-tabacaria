export type AnalyticsEventData = {
    productId?: string;
    device?: 'mobile' | 'desktop';
};

export type AnalyticsEventValidator = (data?: AnalyticsEventData) => void;