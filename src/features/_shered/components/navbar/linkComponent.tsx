import * as s from './style'

interface linkProps {
    filtro: string,
    titulo: string,
    generateHref: (filtro: string, searchParam?: string) => string
    handleBotoesDrawer: (estado: boolean) => void
}

/**
     * Componente usado para facilitar a geração dos links de recirecionamento.
     * @param {linkProps} {
     *      filtro: string,
     *      titulo: string
     * }
     * @component
     * @returns {JSX.Element}
    */
const GenerateLink: React.FC<linkProps> = ({ filtro, titulo, generateHref, handleBotoesDrawer }) => {
    return (
        <s.LinkStyle
            href={generateHref(filtro)}
            $nodrawer='true'
            onClick={() => handleBotoesDrawer(false)}
        >
            {titulo}
        </s.LinkStyle>
    );
}

export default GenerateLink;