import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

export default function CrudUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [id_usuario, setId_Usuario] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [horarios, setHorarios] = useState("");

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
                <h1 class="titulo">Reis da Navalha</h1>
            </div>
            <div id="menu">
                <p>Sobre Nós</p>
            </div>
            <div id="menu-sobre">
                {usuarios ? usuarios.map((item) => {
                    return (
                        <div key={item.id_usuario}>
                            {item.id_usuario} - {item.nome} - {item.telefone} - {item.horarios}
                        </div>
                    );
                })
                    : false}
            </div>
            <div id="body">
                <p>Realizar Agendamento</p>
            </div>
            <Modal aria-labelledby="modal-title" aria-describedby="modal-description">
                <h2 id="modal-title">My Title</h2>
                <p id="modal-description">My Description</p>
            </Modal>
        </div>
    )
}
