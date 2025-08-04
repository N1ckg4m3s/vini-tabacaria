'use client'
import { FormEvent, useEffect, useState } from 'react'
import * as s from './style'
import FiltroSectionComponent from '@/components/CatalogComponents/FilterComponents/SectionContainer';
import { Filtro } from '@/controller/types';
import { apiCaller } from '@/controller/apiCaller';
// import { apiCaller } from '@/controller/apiCaller';
/**
 * Essa pagina exibe o filtro para o catalogo, incluindo:
 * o filtro é customizavel para cada tipo de procura, sendo:
 * - Base para todos:
 *      - MARCA
 *      - VALOR
 *      
 * - Essencia:
 *      - TIPO [doce, citrica, gelada, quente, mentolada]
 *      - SABOR
 * 
 * - Acessorio:
 *      - TIPO: [Rosh, Vaso, Borracha, Corpo, Prato, Mangueira]
 *      - COR
 *      - TAMANHO: [kilo, meioKilo, 250g, saquinho, unidade, box]
 * 
 * - Carvão e Aluminio:
 *      - KIT: [unidade, caixa]
*/

interface props {
    filter: string
}

const FiltroCatalogoComponent: React.FC<props> = ({ filter }) => {
    /* Dados para manter o filtro atualizado e atualiar o conteudo com base nele */
    const [filtros, setFiltros] = useState<Filtro[]>([
        {
            titulo: 'MARCA',
            opcoes: {
                'ZIGGY': true,
                'ONIX': true
            }
        }
    ])

    const obterDadosDoFiltro = async () => {
        const data = await apiCaller({
            url: '/api/get-filter-data',
        })

        setFiltros(data)
    }

    /* UseEffect para obter da API os valores do filtro */
    useEffect(() => {
        // obterDadosDoFiltro();

    }, [filter])

    /**
     * Atualiza o Estado do filtro alterado.
     * 
     * @param {number} secaoIndex - id da sessão que esta o valor 
     * @param {string} key - filtro que vai ser invertido o estado
    */
    const handleCheckboxChange = (secaoIndex: number, key: string) => {
        setFiltros((prev) => {
            const updated = [...prev];
            updated[secaoIndex] = {
                ...updated[secaoIndex],
                opcoes: {
                    ...updated[secaoIndex].opcoes,
                    [key]: !updated[secaoIndex].opcoes[key],
                },
            };
            return updated;
        });
    };

    /**
     * Manipula o envio do formulário filtragem.
     * Evita recarregamento da página, gera um texto com todos os valores positivos do filtro.
     * 
     * @param {FormEvent<HTMLFormElement>} event - Evento. 
     */
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const selecionados = filtros.map((filtro) => ({
            titulo: filtro.titulo,
            selecionados: Object.entries(filtro.opcoes)
                .filter(([_, checked]) => checked)
                .map(([key]) => key),
        }));
        console.log(selecionados)
    };

    return (
        <s.FilterContainer onSubmit={handleSubmit}>
            <s.FilterTitle>Filtrar</s.FilterTitle>
            {filtros.map((filtro, i) => (
                <FiltroSectionComponent
                    key={i}
                    titulo={filtro.titulo}
                    opcoes={filtro.opcoes}
                    sectionIndex={i}
                    onChange={handleCheckboxChange}
                />
            ))}
            <s.FilterButtonSubmit>Filtrar</s.FilterButtonSubmit>
        </s.FilterContainer>
    );
};

export default FiltroCatalogoComponent;