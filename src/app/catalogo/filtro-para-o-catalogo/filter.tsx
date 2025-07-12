'use client'
import { FormEvent, useEffect, useState } from 'react'
import * as s from './style'
import FiltroSectionComponent from '@/components/FilterComponents/SectionContainer';
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

type FiltroOpcoes = Record<string, boolean>;

type Filtro = {
    titulo: string;
    opcoes: FiltroOpcoes;
};

interface props {
    filter: string
}

const FiltroCatalogoComponent: React.FC<props> = ({ filter }) => {
    const [filtros, setFiltros] = useState<Filtro[]>([
        {
            titulo: 'Opções 1',
            opcoes: { op1: true, op2: true, op3: true },
        },
        {
            titulo: 'Opções 2',
            opcoes: { op1: true, op2: true, op3: true },
        },
        {
            titulo: 'Opções 3',
            opcoes: { op1: true, op2: true, op3: true },
        }
    ])

    useEffect(() => {
        const callApi = async () => {
            const req = await fetch('', {
                method: 'GET'
            })
            const returnData = await req.json();

            console.log(returnData)
        }

        console.log(filter)

        // Chama a api para obter os dados possiveis para o filtro
        // callApi()
    }, [])

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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const selecionados = filtros.map((filtro) => ({
            titulo: filtro.titulo,
            selecionados: Object.entries(filtro.opcoes)
                .filter(([_, checked]) => checked)
                .map(([key]) => key),
        }));
        console.log('Filtros aplicados:', selecionados);
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