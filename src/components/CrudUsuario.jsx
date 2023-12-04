import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function CrudUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showLabel, setShowLabel] = useState(true);

    const url = "https://agenda-omega-liart.vercel.app/usuarios/";

    useEffect(() => {
        fetch(url)
            .then((respFetch) => respFetch.json())
            .then((respJson) => setUsuarios(respJson))
            .catch((err) => console.log(err));
    }, [url]);

    return (
        <div id="page">
            <div id="header">
                <h1 className="titulo">Reis da Navalha</h1>
            </div>
            <div id="hide-sobre-nos">
                <p>Sobre Nós</p>
            </div>
            <div
                id="menu"
                className={`menu-bar ${showMenu ? 'show-menu' : ''}`}
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
            >
                <ul>
                    <li>Endereço: Av. Gov. José de Magalhães Pinto, 917 - Giovanini, Cel. Fabriciano - MG, 35170-097</li>
                    <li>Telefone de Contato: +55 31 9592-2625</li>
                    <li>Instagram: @reisdanavalhaoficial</li>
                </ul>
            </div>
            <div id="menu-sobre" className="menu-sobre">
                {/* Conteúdo do menu suspenso */}
                {usuarios ? usuarios.map((item) => {
                    return (
                        <div key={item.id_usuario}>
                            {item.id_usuario} - {item.nome} - {item.telefone} - {item.horarios}
                        </div>
                    );
                }) : null}
            </div>
            <div id="body">
                <Button className="agendamento" onClick={handleOpen}>Realizar Agendamento</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="modal-box">
                        <Button className="fechar-janela" onClick={handleClose}>X</Button>
                        <h1 className="titulo">AGENDE SEU HORÁRIO</h1>
                        <select className="dia_semana" name="dia_semana">
                            <option value="selecionar">Selecione um dia</option>
                            <option value="segunda">Segunda-feira</option>
                            <option value="terca">Terça-feira</option>
                            <option value="quarta">Quarta-feira</option>
                            <option value="quinta">Quinta-feira</option>
                            <option value="sexta">Sexta-feira</option>
                            <option value="sabado">Sábado</option>
                        </select>
                        <div className="div_botao_corte">
                            <p>Corte</p>
                            <p>Duração: 1 hora</p>
                            <p>Preço: R$ 30,00</p>
                            <button class="botao_corte" type="button" onclick="mostrarHorarios('Corte')">Selecionar Horário</button>
                        </div>
                        <div className="div_botao_descolorir">
                            <p>Descolorir</p>
                            <p>Duração: 1 hora</p>
                            <p>Preço: R$ 40,00</p>
                            <button class="botao_descolorir" type="button" onclick="mostrarHorarios('Descolorir')">Selecionar
                                Horário</button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}