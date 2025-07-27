import * as s from './style';

/**
 * funções responsaveis por renderizar os campos especifico de cada produto
*/

/**
 * Renderiza itens para os acessorios
 * 
 * Tipo -- tipo do acessorio
 * Cor -- cor do acessorio
 * Tamanho -- tamanho do acessorio
 * 
 * @returns 
 */
export const renderCamposAcessorios = () => (
    <>
        <s.FormRow>
            <s.FormLabel>Tipo</s.FormLabel>
            <s.FormRowInput name="especificacao.tipo" required />
        </s.FormRow>
        <s.FormRow>
            <s.FormLabel>Cor</s.FormLabel>
            <s.FormRowInput name="especificacao.cor" required />
        </s.FormRow>
        <s.FormRow>
            <s.FormLabel>Tamanho</s.FormLabel>
            <s.FormRowInput name="especificacao.tamanho" required />
        </s.FormRow>
    </>
)

/**
 * Renderiza itens para carvão/alumínio
 * 
 * Kit -- kit do carvão/alumínio
 * 
 * @returns 
*/
export const renderCamposCarvaoAluminio = () => (
    <s.FormRow>
        <s.FormLabel>Kit</s.FormLabel>
        <s.FormRowInput name="especificacao.kit" required />
    </s.FormRow>
)

/**
 * Renderiza itens para essência
 * 
 * Tipo -- tipos da essência: 'Doce','Citrica,'Quente', 'Gelada','Mentolada'
 * Sabor -- sabor da essência
 * 
 * @returns 
 */
export const renderCamposEssencia = () => (
    <>
        <s.FormRow>
            <s.FormLabel>Tipo</s.FormLabel>
            <s.FormRowInput name="especificacao.tipo" required />
        </s.FormRow>
        <s.FormRow>
            <s.FormLabel>Sabor</s.FormLabel>
            <s.FormRowInput name="especificacao.sabor" required />
        </s.FormRow>
    </>
)