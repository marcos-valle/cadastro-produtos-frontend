import { useEffect, useState, useRef } from 'react'
import './style.css'
import api from '../../services/api'

function Home() {
  
  const [produtos, setProdutos] = useState([])

  const inputNome = useRef(null)
  const inputValor = useRef(null)
  const inputDescricao = useRef(null)
  const inputDisponivelS = useRef(null)
  const inputDisponivelN = useRef(null)

  async function getProdutos() {
    let produtosApi = await api.get('/produtos')
    
    setProdutos(produtosApi.data)
    console.log(produtos)
  }

  async function createProdutos() {
    await api.post('/cadastro', {
      nome: inputNome.current.value,
      valor: inputValor.current.value,
      descricao: inputDescricao.current.value,
      disponivel: inputDisponivelS.current.checked
    })

    getProdutos()
  }

  useEffect(() => {
    getProdutos()
  }, [])

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Produtos</h1>
        <input name='nome' type='text' placeholder='Nome do Produto' ref={inputNome} />
        <input name='valor' type='number' placeholder='Valor do Produto' ref={inputValor} />
        <input name='descricao' type='text' placeholder='Descrição do Produto' ref={inputDescricao} />
        <div className='disponivel'>
          <label className='disponivelTitle'>Disponível:</label>
          <input name='disponivelS' type='checkbox' ref={inputDisponivelS} />
          <label>Sim</label>
          <input name='disponivelN' type='checkbox' ref={inputDisponivelN} />
          <label>Não</label>
        </div>
        <button type='submit' onClick={createProdutos}>Cadastrar</button>
      </form>

      <h3>Produtos</h3>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Disponível</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (    
            <tr key={produto.produtoId}>
                    <td>{produto.nome}</td>
                    <td>{produto.valor}</td>
                    <td>{produto.descricao}</td>
                    <td>{produto.disponivel ? 'Sim' : 'Não'}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Home
