import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import { ListarTarefas } from '../pages/Tarefas'
import { CriarTarefa } from '../pages/Tarefas'
import { AtualizarTarefa } from '../pages/Tarefas'
import { DeletarTarefa } from '../pages/Tarefas'



function AppRoutes() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path = '/' element={<Login/>}/>
            <Route path = '/cadastro' element={<Cadastro/>}/>
            <Route path = '/tarefas' element={<ListarTarefas/>}/>
            <Route path = '/criartarefa' element={<CriarTarefa/>}/>
            <Route path = '/atualizartarefas' element={<AtualizarTarefa/>}/>
            <Route path = '/deletartarefas' element={<DeletarTarefa/>}/>
        </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes