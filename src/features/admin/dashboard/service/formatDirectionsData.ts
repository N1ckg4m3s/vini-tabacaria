import { formateText } from "@/features/_shered/services/formaters/text.formater";
import { TableItem } from "../types/components.types";

export const formatDirectionsData = (data: any): TableItem => ({
    name: formateText(`${data.productType} | ${data.productBrand} - ${data.productName}`),
    value: data.views,
    variant: 'positive'
})

export const formatCartDirectionsData = (data: any): TableItem => ({
    name: formateText(`${data.productType} | ${data.productBrand} - ${data.productName}`),
    value: `added: ${data.addedCount} | removed: ${data.removedCount}`,
})
