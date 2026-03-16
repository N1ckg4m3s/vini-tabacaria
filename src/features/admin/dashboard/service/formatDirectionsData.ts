import { formateText } from "../../../_shered/services/formaters/text.formater";
import { TableItem } from "../types/components.types";
import { DataInsite } from "../types/service.types";

export const formatDirectionsData = (data: DataInsite): TableItem => ({
    name: formateText(`${data.productType} | ${data.productBrand} - ${data.productName}`),
    value: data.views,
    variant: 'positive'
})

export const formatCartDirectionsData = (data: DataInsite): TableItem => ({
    name: formateText(`${data.productType} | ${data.productBrand} - ${data.productName}`),
    value: `added: ${data.addedCount} | removed: ${data.removedCount}`,
})
