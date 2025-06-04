import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Tarefas.css'
import { useNavigate } from "react-router-dom";

export function ListarTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            buscarTarefas();
        }
    }, []);

    async function buscarTarefas() {
        try {
            const token = localStorage.getItem("token");
            const resposta = await axios.get("http://localhost:3000/tarefas", {
                headers: {
                    Authorization: token,
                },
            });
            setTarefas(resposta.data);
        } catch (erro) {
            console.error("Erro ao buscar API:", erro);
        }
    }

    return (
        <div className="tarefa-container">
            <h2>Lista de Tarefas</h2>
            {tarefas.map((item) => (
                <div key={item.id} className="tarefa">
                    <p><strong>ID:</strong> {item.id}</p>
                    <p><strong>Título:</strong> {item.titulo}</p>
                    <p><strong>Descrição:</strong> {item.descricao}</p>
                    <p><strong>Usuário ID:</strong> {item.usuario_id}</p>
                </div>
            ))}
            <button  className= "button-lista-c" onClick={() => navigate('/criartarefa')}>Criar Tarefa</button>
            <button  className= "button-lista-a" onClick={() => navigate('/atualizartarefas')}>Atualizar Tarefa</button>
            <button  className= "button-lista-d" onClick={() => navigate('/deletartarefas')}>Deletar Tarefa</button>
        </div>
    );
}

// CRIAR TAREFA
export function CriarTarefa() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); 

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const resposta = await fetch('http://localhost:3000/tarefas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({ titulo, descricao }),
            });
            const dados = await resposta.json();
            if (resposta.ok) {
                console.log("Tarefa adicionada:", dados);
                navigate("/tarefas")
            } else {
                console.error("Erro na tarefa:", dados.mensagem);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }

    return (
        <div className="tarefa-container">
            <h2>Criar Tarefa</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título da Tarefa"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
}

// ATUALIZAR TAREFA
export function AtualizarTarefa() {
    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const resposta = await fetch(`http://localhost:3000/tarefas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({ titulo, descricao }),
            });
            const dados = await resposta.json();
            if (resposta.ok) {
                console.log("Tarefa atualizada:", dados);
                navigate("/tarefas")
            } else {
                console.error("Erro na tarefa:", dados.mensagem);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }

    return (
        <div className="tarefa-container">
            <h2>Atualizar Tarefa</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ID da Tarefa"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Novo Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nova Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                />
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
}

// DELETAR TAREFA
export function DeletarTarefa() {
    const [id, setId] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const resposta = await fetch(`http://localhost:3000/tarefas/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: token,
                },
            });
            if(resposta.status == 401){
                localStorage.removeItem("token")
                navigate("/")
            }
            if (resposta.ok) {
                console.log("Tarefa deletada:", resposta);
                navigate("/tarefas")
            } else {
                console.error("Erro ao deletar:", resposta, token);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }

    return (
        <div className="tarefa-container">
            <h2>Deletar Tarefa</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ID da Tarefa"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
                <button type="submit">Deletar</button>
            </form>
        </div>
    );
}
