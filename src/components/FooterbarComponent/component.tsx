'use client'
import * as s from './style'
import LogoEstenca from '@assets/LogoEstenca.svg'
import Fone from '@assets/fone.svg'
import Insta from '@assets/Instagram.svg'
import Whatsapp from '@assets/whatsapp.svg'
import Facebook from '@assets/facebook.svg'

/**
 * Componente de rodapé do site.
 *
 * @component
 * @returns {JSX.Element}
 */
const FooterBarComponent = () => {
    return (
        <s.FooterContainer>
            <s.FooterCopyrightText>
                © @ViniTabacaria 2024. All rights reserved.
            </s.FooterCopyrightText>

            <s.FooterLogo>
                <LogoEstenca />
            </s.FooterLogo>

            <s.IconsContainer>
                <Fone />
                <Whatsapp />
                <Facebook />
                <Insta />
            </s.IconsContainer>
        </s.FooterContainer>
    );
}
export default FooterBarComponent;
