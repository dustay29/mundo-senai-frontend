import { useState } from "react";
import "../styles/Login.css"; 
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const resposta = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha })
            });
            const dados = await resposta.json();
            if (resposta.ok) {
                console.log("Login bem-sucedido:", dados.token);
                localStorage.setItem("token", dados.token);
                navigate("/tarefas"); 
            } else {
                console.error("Erro no login:", dados.mensagem);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>

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

                <button type="submit">Entrar</button>
                <p className="login-cadastro" >Não tem uma conta?</p>
                <p className="login-cadastro"><a href="/cadastro">Cadastrar</a></p>
            </form>
        </div>
    );
}

export default Login;
