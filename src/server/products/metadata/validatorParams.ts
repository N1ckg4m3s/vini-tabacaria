export const metadataValidators: Record<string, Record<string, 'text' | 'number' | 'checkbox' | 'select'>> = {
    essencia: {
        sabor: 'text',
        intensidade: 'checkbox',
    },
    acessorio: {
        cor: 'text',
        tamanho: 'checkbox',
        tipo: 'checkbox',
    },
    carvao_aluminio: {
        tipo: 'select',
    },
    outros: {
        especificacao: 'text'
    }
};
