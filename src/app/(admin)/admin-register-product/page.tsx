'use client';
import { renderCamposAcessorios, renderCamposCarvaoAluminio, renderCamposEssencia } from './render-campos-especificos';
import * as s from './style';
import { FormEvent, useState } from 'react';

const _AdmRegisterProductPage = () => {
    const [tipo, setTipo] = useState('');

    // Função para renderizar os campos específicos com base no tipo selecionado
    const renderCamposEspecificos = () => {
        switch (tipo) {
            case 'essencia':
                return renderCamposEssencia();
            case 'acessorio':
                return renderCamposAcessorios();
            case 'carvaoAluminio':
                return renderCamposCarvaoAluminio();
            default:
                return null;
        }
    };

    /**
     * Função para lidar com o envio do formulário
     * Processa os dados do formulário e os converte em um objeto simples
     * 
     * @param event Evento de submissão do formulário
     */
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Aqui você pode processar os dados do formulário
        const formData = new FormData(event.currentTarget); // pega o formulário que enviou

        // Converte FormData para um objeto simples
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log(data);
    };

    return (
        <s.ContainerRegistrarProduto>
            <h1>Adicionar Produto</h1>
            <s.Form onSubmit={handleSubmit}>
                <s.FormRow>
                    <s.FormLabel>Nome</s.FormLabel>
                    <s.FormRowInput name="nome" required />
                </s.FormRow>

                <s.FormRow>
                    <s.FormLabel>Marca</s.FormLabel>
                    <s.FormRowInput name="marca" required />
                </s.FormRow>

                <s.Row>
                    <s.FormRow>
                        <s.FormLabel>Valor</s.FormLabel>
                        <s.FormRowInput type="number" step="0.01" name="valor" required />
                    </s.FormRow>

                    <s.FormRow>
                        <s.FormLabel>Tipo</s.FormLabel>
                        <s.Select name='tipo' value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                            <option value="">Selecione</option>
                            <option value="essencia">Essência</option>
                            <option value="acessorio">Acessório</option>
                            <option value="carvaoAluminio">Carvão/Alumínio</option>
                        </s.Select>
                    </s.FormRow>
                </s.Row>

                <s.FormRow>
                    <s.FormLabel>Imagem</s.FormLabel>
                    <s.FormRowInput type="file" name="imagem" />
                </s.FormRow>

                {renderCamposEspecificos()}

                <s.Button type="submit">Cadastrar Produto</s.Button>
            </s.Form>
        </s.ContainerRegistrarProduto>
    );
};

export default _AdmRegisterProductPage;