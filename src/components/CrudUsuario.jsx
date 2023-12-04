import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PinDropIcon from '@mui/icons-material/PinDrop';

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
                    <li><a className='endereco' href="https://www.google.com/maps/place/Barbearia+Reis+da+Navalha/@-19.5144816,-42.6319578,17z/data=!3m1!4b1!4m6!3m5!1s0xa55790d47c44d5:0x4f4794979a609191!8m2!3d-19.5144816!4d-42.6293829!16s%2Fg%2F11jvk3v1f8?entry=ttu"><PinDropIcon />ENDEREÇO</a></li>
                    <li><a className='whatsapp' href='https://api.whatsapp.com/send/?phone=553195922625&text&type=phone_number&app_absent=0'><WhatsAppIcon />WHATSAPP</a></li>
                    <li><a className='instagram' href="https://www.instagram.com/reisdanavalha_/"><InstagramIcon />INSTAGRAM</a></li>
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
                    <Button variant="contained" className="botao_agendamento" onClick={handleOpen}>Realizar Agendamento</Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="modal-box">
                        <Button variant="contained" className="fechar_janela" onClick={handleClose}>X</Button>
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
                        <div className='botoes-serviços'>
                            <div className="div_botao_corte">
                                <p>Corte</p>
                                <p>Duração: 1 hora</p>
                                <p>Preço: R$ 30,00</p>
                                <Button variant="contained" className="botao_corte" onClick={() => { }}>Selecionar Horário</Button>
                            </div>
                            <div className="div_botao_descolorir">
                                <p>Descolorir</p>
                                <p>Duração: 1 hora</p>
                                <p>Preço: R$ 40,00</p>
                                <Button variant="contained" className="botao_descolorir" onClick={() => { }}>Selecionar Horário</Button>
                            </div>
                        </div>
                        <div className="banco-de-dados">
                            <TextField fullWidth className="nome" label="Nome" variant="filled" />
                            <TextField className="telefone" label="(DDD) Telefone" variant="filled" />
                            <br /><Button variant="contained" className="agendar" onClick={() => { }}>Agendar</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}