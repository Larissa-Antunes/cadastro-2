class Cliente {
    constructor() {
        this.clientes = localStorage.getItem('tbClientes') === null
        ? []
        : JSON.parse(localStorage.getItem('tbClientes'))
    }

    salva(cliente){
        //o registro está sendo editado?
    if(document.getElementById('codigo').getAttribute('disabled')==='disabled'){
        this.apaga(cliente.codigo)
    }
        this.clientes.push(cliente) //adiciona um novo elemento ao array
        localStorage.setItem('tbClientes', JSON.stringify(this.clientes))
        alert('Cliente salvo com sucesso!')
    }

    apaga(codigo){
        let index = this.clientes.findIndex(cliente => cliente.codigo == codigo)
        this.clientes.splice(index, 1) //index é o elemento do array
        //salvamos a alteração
        localStorage.setItem('tbClientes',JSON.stringify(this.clientes))
        cliente.atualiza()
    }

    edita(cliente){
        document.getElementById('codigo').setAttribute('disabled','disabled')
        document.getElementById('codigo').value = cliente.codigo
        document.getElementById('nome').value = cliente.nome
        document.getElementById('cpf').value = cliente.cpf
        document.getElementById('valordoado').value = cliente.valordoado
        document.getElementById('recado').value = cliente.recado
   
    }
    
    lista(){
        const listagem = this.clientes.map((cliente) => (
            `<tr>
            <td>${cliente.codigo}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.valordoado}</td>
            <td>${cliente.recado}</td>
            <td>
                <button id='apagar' onClick='cliente.apaga(${cliente.codigo})'>
                🗑️Apagar</button>
                <button id='editar' onClick='cliente.edita(${JSON.stringify(cliente)})'>
                ✏️Editar</button>
            </td>
            </tr>
            `
        ))
        return (`<table border='1' class='paleBlueRows'>
        <caption>Relação dos Doadores</caption>
        <thead>
            <th>Código</th>  
            <th>Nome</th> 
            <th>CPF</th> 
            <th>Valor Doado</th> 
            <th>Recado</th>
            <th>Opções</th>
        </thead>
        <tbody>${listagem}</tbody>      
        </table>
        `)
    }

    atualiza(){
        document.getElementById('listagem').innerHTML = cliente.lista()
    }
}
//instanciamos um novo objeto
const cliente = new Cliente()
//tratamos o botão salvar

document.getElementById('salvar').onclick = function ()  {
    const registro = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        valordoado: document.getElementById('valordoado').value,
        recado: document.getElementById('recado').value

    } 
    cliente.salva(registro)
}
//tratamos a listagem
window.onload = function(){
    cliente.atualiza()
}
