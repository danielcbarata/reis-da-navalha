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
            <div
                id="sobre-nos"
                className={`sobre-nos-label ${showLabel ? 'show-label' : ''}`}
                onMouseEnter={() => setShowLabel(true)}
                onMouseLeave={() => setShowLabel(false)}>
                Sobre Nós
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
                <Button onClick={handleOpen}>Realizar Agendamento</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="modal-box">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}