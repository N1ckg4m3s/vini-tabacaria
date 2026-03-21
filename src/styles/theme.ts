export const Theme = {
    colors: {
        Borda: {
            white: '#FF0000',
            cinzaEscuro: '#FF0000',
            cinzaEscuro27: '#FF0000',
            notificationColor: {
                Warning: '#FF0000',
                Sucess: '#FF0000',
                Error: '#FF0000',
                Observation: '#FF0000'
            }
        },
        Fundo: {
            background: '#FF0000',       // base geral
            cinzaEscuro_36: '#FF0000',    // cards / blocos
            cinzaEscuro: '#FF0000',       // divisões / containers
            cinzaEscuro_c9: '#FF0000',  // overlays
            CinzaClaro: '#FF0000',        // texto muted
            VerdeEscuro: '#FF0000',       // CTA forte
            VerdeClaro: '#FF0000',        // hover / feedback
            cinzaFooter: '#FF0000',       // fundo secundário
            notificationColor: {
                Warning: '#FF0000',
                Sucess: '#FF0000',
                Error: '#FF0000',
                Observation: '#FF0000'
            }
        },
        Texto: {
            cinzaClaro: '#FF0000',        // texto secundário
            white: '#FF0000',
            black: '#FF0000',
            VerdeEscuro: '#FF0000',
            VerdeClaro: '#FF0000'
        }
    }
}

export const GlobalColors = {
    Neutral: {
        950: '#121212', // fundo absoluto
        900: '#181818', // app background
        850: '#1b1b1b', // 
        800: '#1f1f1f', // seções grandes
        700: '#2A2A2A', // cards
        600: '#363636', // divisões / containers
        550: '#3F3F3F', // 
        500: '#474747', // bordas leves
        400: '#6B6B6B', // texto secundário
        300: '#909090', // texto muted
        200: '#C1C8C0', // texto claro
        0: '#FFFFFF'
    },

    Primary: {
        strong: '#1D8239', // CTA principal
        base: '#25A249',   // hover / foco
        soft: '#B0DDBE',   // fundo leve
        text: '#0F3D1F'
    },

    Feedback: {
        success: {
            strong: '#25A249',
            soft: '#B0DDBE'
        },
        warning: {
            strong: '#F1C21B',
            soft: '#FAE9AD'
        },
        error: {
            strong: '#DA1E28',
            soft: '#F2AEB2'
        },
        info: {
            strong: '#0F62FE',
            soft: '#A9C7FF'
        }
    },

    Text: {
        primary: '#FFFFFF',
        secondary: '#C1C8C0',
        muted: '#909090',
        inverse: '#000000',
        onPrimary: '#052E16',
        onDark: '#FFFFFF',
        focus: '#25A249',
    },

    Border: {
        subtle: '#474747',
        strong: '#363636',
        focus: '#25A249',
    }
}