'use client'
import * as s from './style'

type tipoAviso = 'Warning' | 'Sucess' | 'Error' | 'Observation';

interface props {
    titulo?: string;
    tipoAviso: tipoAviso;
    description: string
}

const getTileName = {
    'Warning': 'Aviso',
    'Sucess': 'Sucesso',
    'Error': 'Erro',
    'Observation': 'Observação',
}


/**
 * Componente para gerar uma notificação
 * 
 * @param {string} titulo - Titolo do item
 * @param {tipoAviso} tipoAviso - Qual ot ipo de aviso da tela
 * @param {string} description - Texto do aviso
 * 
 * O tipo da notificação modifica a cor do componente
 *
 * @component
 * @returns {JSX.Element}
*/
const NotificationContainerComponent: React.FC<props> = ({ titulo, tipoAviso, description }) => (
    <s.NotificationContainer $TipoAviso={tipoAviso}>
        <s.TitleNotification>{titulo ?? getTileName[tipoAviso]}</s.TitleNotification>
        <s.DescriptionNotification>{description}</s.DescriptionNotification>
    </s.NotificationContainer>
);

export default NotificationContainerComponent