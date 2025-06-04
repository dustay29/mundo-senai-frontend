import { useState } from "react";
import "../styles/Cadastro.css"; // Importando o estilo
import { useNavigate } from "react-router-dom";


function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const resposta = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, senha })
            });
            const dados = await resposta.json();
            if (resposta.ok) {
                console.log("Cadastro bem-sucedido:", dados);
                navigate ("/")
            } else {
                console.error("Erro no cadastro:", dados.mensagem);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }

    return (
        <div className="cadastro-container">
            <form className="cadastro-form" onSubmit={handleSubmit}>
                <h2>Cadastro</h2>

                <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <button type="submit">Cadastrar</button>
                <p className="login-cadastro" >Já tem uma conta?</p>
                <p className="login-cadastro"><a href="/">Login</a></p>
            </form>
        </div>
    );
}

export default Cadastro;
