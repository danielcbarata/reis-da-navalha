import React, { useState, useEffect } from 'react';

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
        </div>
    )
}
