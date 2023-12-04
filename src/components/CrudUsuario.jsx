import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';


export default function CrudUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [id_usuario, setId_Usuario] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [horarios, setHorarios] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [diaSemana, setDiaSemana] = React.useState('');

    const url = "https://agenda-omega-liart.vercel.app/usuarios/";

    useEffect(() => {
        fetch(url)
            .then((respFetch) => respFetch.json())
            .then((respJson) => setUsuarios(respJson))
            .catch((err) => console.log(err));
    }, [url]);

    const handleChange = (event) => {
        setDiaSemana(event.target.value);
    };

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
                <div className="agendamento">
                    <Button className="botao_agendamento" onClick={handleOpen}>Realizar Agendamento</Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="modal-box">
                        <Button className="fechar-janela" onClick={handleClose}>X</Button>
                        <h1 className="titulo">AGENDE SEU HORÁRIO</h1>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Selecione um dia</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={diaSemana}
                                label="Dia da Semana"
                                onChange={handleChange}
                            >
                                <MenuItem value={"segunda"}>Segunda</MenuItem>
                                <MenuItem value={"terca"}>Terca</MenuItem>
                                <MenuItem value={"quarta"}>Quarta</MenuItem>
                                <MenuItem value={"quinta"}>Quinta</MenuItem>
                                <MenuItem value={"sexta"}>Sexta</MenuItem>
                                <MenuItem value={"sabado"}>Sábado</MenuItem>
                            </Select>
                        </FormControl>
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
                        <div className="banco-de-dados">
                            <TextField className="nome" label="Nome" variant="filled" />
                            <TextField className="telefone" label="(DDD) Telefone" variant="filled" />
                            <Button className="agendar" onClick={() => { }}>Agendar</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}