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
import axios from "axios";
import { styled } from '@mui/material/styles';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { getNextValidDate } from '../helpers/date';

const ReiInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(-1),
        color: '#ffde59',
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: 'transparent',
        border: '1px solid #ced4da',
        color: '#ffde59',
        borderColor: '#ffde59',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        fontFamily: [
            '"Ruslan Display" , cursive',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#ffde59',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

export default function CrudUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [id_usuario, setId_Usuario] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [horarios, setHorarios] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [popupOpen, setPopUpOpen] = React.useState(false);
    const [diaSemana, setDiaSemana] = React.useState('');
    const [servico, setServico] = React.useState('');
    const [operacao, setOperacao] = useState("");

    const handleChangeDia = (event) => {
        setDiaSemana(event.target.value);
    };
    const handleChangeServico = (event) => {
        setServico(event.target.value);
    };
    const handleChangeHorario = (event) => {
        setHorarios(event.target.value);
    };

    const handleOpen = () => {
        setOpen(true);
        setOperacao("criarRegistro");
    };
    const handleClose = () => setOpen(false);
    const handlePopUpOpen = () => setPopUpOpen(true);
    const handlePopUpClose = () => setOpen(false);

    const url = "https://agenda-omega-liart.vercel.app/usuarios/";

    useEffect(() => {
        fetch(url)
            .then((respFetch) => respFetch.json())
            .then((respJson) => setUsuarios(respJson))
            .catch((err) => console.log(err));
    }, [url]);

    function limparDados() {
        setId_Usuario("");
        setNome("");
        setTelefone("");
        setHorarios("");
    }

    function novoUsuario(response) {
        console.log(response);
        let { id_usuario, nome, telefone, horarios, servico } = response.data;
        let obj = { "id": id_usuario, "nome": nome, "telefone": telefone, "horarios": horarios, "servico": servico };
        let users = usuarios;
        users.push(obj);
        setUsuarios(users);
        limparDados("");
    }

    function gravarDados() {
        if (nome !== "" && telefone !== "" && horarios !== "" && servico !== "") {
            if (operacao === "criarRegistro") {
                const nextValidDate = getNextValidDate(diaSemana, new Date().getHours()).toDateString() + " " + horarios;
                axios
                    .post(url, {
                        nome: nome,
                        telefone: telefone,
                        horarios: nextValidDate,
                        servico: servico,
                    })
                    .then((response) => {
                        novoUsuario(response);
                        handleClose();
                    })
                    .catch((err) => console.log
                        (err));
            }
        } else {
            window.open("Preencha todos os campos");
        }
    }


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
                    <li><a target="_blank" className='endereco' href="https://www.google.com/maps/place/Barbearia+Reis+da+Navalha/@-19.5144816,-42.6319578,17z/data=!3m1!4b1!4m6!3m5!1s0xa55790d47c44d5:0x4f4794979a609191!8m2!3d-19.5144816!4d-42.6293829!16s%2Fg%2F11jvk3v1f8?entry=ttu"><PinDropIcon /> ENDEREÇO</a></li>
                    <li><a target="_blank" className='whatsapp' href='https://api.whatsapp.com/send/?phone=553195922625&text&type=phone_number&app_absent=0'><WhatsAppIcon /> 3195922625</a></li>
                    <li><a target="_blank" className='instagram' href="https://www.instagram.com/reisdanavalha_/"><InstagramIcon /> @reisdanavalha</a></li>
                </ul>
            </div>
            <div id="body">
                <div className="agendamento">
                    <Button variant="contained" className="botao_agendamento" onClick={handleOpen}>Realizar Agendamento</Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box className="modal-box">
                        <Button variant="contained" className="fechar_janela" onClick={handleClose}>X</Button>
                        <h1 className="marcar-horario">AGENDE SEU HORÁRIO</h1>
                        <FormControl>
                            <InputLabel id="selecionar-dia">Selecione um dia</InputLabel>
                            <Select
                                labelId="selecionar-dia"
                                id="selecionar_dia"
                                value={diaSemana}
                                label="Dia da Semana"
                                onChange={handleChangeDia}
                                input={<ReiInput />}
                            >
                                <MenuItem id="menu-item" value={"terca"}>Segunda {getNextValidDate("terca", new Date().getHours()).toDateString()}</MenuItem>
                                <MenuItem id="menu-item" value={"quarta"}>Terça {getNextValidDate("quarta", new Date().getHours()).toDateString()}</MenuItem>
                                <MenuItem id="menu-item" value={"quinta"}>Quarta {getNextValidDate("quinta", new Date().getHours()).toDateString()}</MenuItem>
                                <MenuItem id="menu-item" value={"sexta"}>Quinta {getNextValidDate("sexta", new Date().getHours()).toDateString()}</MenuItem>
                                <MenuItem id="menu-item" value={"sabado"}>Sexta {getNextValidDate("sabado", new Date().getHours()).toDateString()}</MenuItem>
                                <MenuItem id="menu-item" value={"domingo"}>Sábado {getNextValidDate("domingo", new Date().getHours()).toDateString()}</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="servicos">Selecione um serviço</InputLabel>
                            <Select
                                labelId="servicos"
                                id="servicosid"
                                value={servico}
                                label="Serviços"
                                onChange={handleChangeServico}
                                input={<ReiInput />}
                            >
                                <MenuItem id="menu-item" value={"corte"}>Corte R$ 30,00</MenuItem>
                                <MenuItem id="menu-item" value={"corte_barba"}>Corte + Barba R$ 35,00</MenuItem>
                                <MenuItem id="menu-item" value={"pe_barba"}>Pé + Barba R$ 10,00</MenuItem>
                                <MenuItem id="menu-item" value={"descolorir"}>Descolorir R$ 40,00</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="horarios">Selecione um horário</InputLabel>
                            <Select
                                labelId="horarios"
                                id="horariosid"
                                value={horarios}
                                label="Horários"
                                onChange={handleChangeHorario}
                                input={<ReiInput />}
                            >
                                <MenuItem id="menu-item" value={"10:00"}>10:00h</MenuItem>
                                <MenuItem id="menu-item" value={"11:00"}>11:00h</MenuItem>
                                <MenuItem id="menu-item" value={"12:00"}>12:00h</MenuItem>
                                <MenuItem id="menu-item" value={"14:00"}>14:00h</MenuItem>
                                <MenuItem id="menu-item" value={"15:00"}>15:00h</MenuItem>
                                <MenuItem id="menu-item" value={"16:00"}>16:00h</MenuItem>
                                <MenuItem id="menu-item" value={"17:00"}>17:00h</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="banco-de-dados">
                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel id="name-label" htmlFor="name-input">Nome</InputLabel>
                                <ReiInput id="name-input" className="nome" value={nome} onChange={(e) => { setNome(e.target.value); }} />
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel id="telefone-label" htmlFor="telefone-input">DDD Telefone</InputLabel>
                                <ReiInput id="telefone-input" className="telefone" value={telefone} onChange={(e) => { setTelefone(e.target.value); }} />
                            </FormControl>
                            <br /><Button variant="contained" className="agendar" onClick={gravarDados}>Agendar</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div >
    )
}