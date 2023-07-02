const readline = require('readline');

class Sistema {
  constructor() {
    this.funcionarios = new Funcionarios();
    this.clientes = new Clientes();
    this.pets = new Pets();
    this.consultas = new Consultas();
  }

  cadastrarFuncionario(username, password) {
    const funcionarioExistente = this.funcionarios.listaFuncionarios.find(
      (f) => f.username === username
    );

    if (funcionarioExistente) {
      return "Nome de usuário já cadastrado!";
    } else {
      const id = this.funcionarios.proximoID++;
      const novoFuncionario = new Funcionario(id, username, password);
      this.funcionarios.adicionarFuncionario(novoFuncionario);
      return "Cadastro realizado com sucesso!";
    }
  }

  verificarCredenciais(username, password) {
    const funcionario = this.funcionarios.listaFuncionarios.find(
      (f) => f.username === username && f.password === password
    );

    if (funcionario) {
      return funcionario;
    } else {
      return null;
    }
  }

  atualizarDadosFuncionario(username, password) {
    funcionarioLogado.username = username;
    funcionarioLogado.password = password;
    console.log("Dados do funcionário atualizados com sucesso!");
  }
}

class Funcionarios {
  constructor() {
    this.listaFuncionarios = [];
    this.proximoID = 1;
  }

  adicionarFuncionario(funcionario) {
    this.listaFuncionarios.push(funcionario);
  }
}

class Funcionario {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}

class Cliente {
    constructor(id, nome, petnome, consultas) {
      this.id = id;
      this.nome = nome;
      this.petnome = petnome;
      this.consultas = consultas;
      this.fidelizado = this.verificarFidelizado(consultas);
    }
  
    verificarFidelizado(consultas) {
      return consultas > 4;
    }
  }
  
  class Clientes {
    constructor() {
      this.listaClientes = [];
  
      // Adicionar exemplos de clientes
      this.adicionarCliente(new Cliente("01", "Karine", "Sofia", 5));
      this.adicionarCliente(new Cliente("02", "Weder", "Nick", 2));
      this.adicionarCliente(new Cliente("03", "Fernanda", "Bruno", 1));
    }
  
    adicionarCliente(cliente) {
      this.listaClientes.push(cliente);
    }
  }

  class Pets {
    constructor() {
      this.listaPets = [];
  
      // Adicionar exemplos de pets
      this.adicionarPet(new Pet("01", "Sofia", "Karine"));
      this.adicionarPet(new Pet("02", "Nick", "Weder"));
      this.adicionarPet(new Pet("03", "Bruno", "Fernanda"));
    }
  
    adicionarPet(pet) {
      this.listaPets.push(pet);
    }
  }

class Pet {
  constructor(id, nome, dono) {
    this.id = id;
    this.nome = nome;
    this.dono = dono;
  }
}

class Consultas {
  constructor() {
    this.listaConsultas = [];
  }

  adicionarConsulta(consulta) {
    this.listaConsultas.push(consulta);
  }
}

class Consulta {
  constructor(id, cliente, pet, funcionario, status, data) {
    this.id = id;
    this.cliente = cliente;
    this.pet = pet;
    this.funcionario = funcionario;
    this.status = status;
    this.data = data;
  }
}

const sistema = new Sistema();

const funcionariosAdicionais = [
    {
      id: 9,
      nome: "Maria",
      senha: "123",
    },
    {
      id: 10,
      nome: "Ana",
      senha: "345",
    },
    {
      id: 11,
      nome: "José",
      senha: "567",
    },
  ];
  
  funcionariosAdicionais.forEach((funcionario) => {
    const novoFuncionario = new Funcionario(
      funcionario.id,
      funcionario.nome,
      funcionario.senha
    );
    sistema.funcionarios.adicionarFuncionario(novoFuncionario);
  });

  const consultasAdicionais = [
    {
      id: 25,
      cliente: 'Karine',
      pet: 'Sofia',
      nomeFuncionario: 'Maria',
      status: 'pendente',
      data: '20/08',
    },
    {
      id: 24,
      cliente: 'Fernanda',
      pet: 'Bruno',
      nomeFuncionario: 'Ana',
      status: 'adiada',
      data: '01/07',
    },
    {
      id: 23,
      cliente: 'Weder',
      pet: 'Nick',
      nomeFuncionario: 'Maria',
      status: 'cancelada',
      data: '02/07',
    },
  ];
  
  consultasAdicionais.forEach((consulta) => {
    const novaConsulta = new Consulta(
      consulta.id,
      consulta.cliente,
      consulta.pet,
      consulta.nomeFuncionario,
      consulta.status,
      consulta.data
    );
    sistema.consultas.adicionarConsulta(novaConsulta);
  });

let funcionarioLogado = null; // Variável para armazenar o funcionário logado

function login(rl) {
  rl.question("Digite seu nome de usuário: ", (username) => {
    rl.question("Digite sua senha: ", (password) => {
      const funcionario = sistema.verificarCredenciais(username, password);

      if (funcionario) {
        funcionarioLogado = funcionario; // Armazena o funcionário logado
        console.log("Login bem-sucedido!");
        exibirMenuPrincipal(rl);
      } else {
        console.log("Nome de usuário ou senha incorretos!");
        exibirMenuInicial(rl);
      }
    });
  });
}

function exibirMenuPrincipal(rl) {
  rl.question("Selecione uma opção:\n1 - Meus Dados\n2 - Listas\n3 - Consultas\n4 - Remover cliente ou pet\n5 - Sair\n", (opcao) => {
    switch (opcao) {
      case "1":
        exibirMenuDadosFuncionario(rl);
        break;
      case "2":
        console.log("Opção Listas selecionada");
        exibirMenuListas(rl);
        break;
      case "3":
        console.log("Opção Consultas selecionada");
        exibirMenuPrincipal(rl);
        break;
      case "4":
        console.log("Opção Remover cliente ou pet selecionada");
        exibirMenuPrincipal(rl);
        break;
      case "5":
        sair();
        break;
      default:
        console.log("Opção inválida!");
        exibirMenuPrincipal(rl);
    }
  });
}

function exibirMenuListas(rl) {
  rl.question("Selecione uma opção:\n1 - Lista de Pets\n2 - Lista de Clientes\n3 - Lista de Consultas\n4 - Lista de Funcionários\n", (opcao) => {
    switch (opcao) {
      case "1":
        exibirListaPets();
        break;
      case "2":
        exibirListaClientes();
        break;
      case "3":
        exibirListaConsultas();
        break;
      case "4":
        exibirListaFuncionarios();
        break;
      default:
        console.log("Opção inválida!");
        exibirMenuListas(rl);
    }
    exibirMenuPrincipal(rl);
  });
}

function exibirListaPets() {
  console.log("Lista de Pets (em ordem alfabética):");
  const listaOrdenada = sistema.pets.listaPets.sort((a, b) => a.nome.localeCompare(b.nome));
  listaOrdenada.forEach((pet) => {
    console.log("Nome: " + pet.nome + ", Dono: " + pet.dono);
  });
}

function exibirListaClientes() {
    console.log("Lista de Clientes (em ordem alfabética):");
    const listaOrdenada = sistema.clientes.listaClientes.sort((a, b) => a.nome.localeCompare(b.nome));
    listaOrdenada.forEach((cliente) => {
      console.log("ID: " + cliente.id + ", Nome: " + cliente.nome);
      console.log("Pet: " + cliente.petnome); // Exibir o nome do pet
      console.log("Fidelizado: " + (cliente.fidelizado ? "Sim" : "Não"));
      console.log("------------------------");
    });
  }

  function exibirListaConsultas() {
    console.log("Lista de Consultas (em ordem cronológica):");
  
    const listaOrdenada = sistema.consultas.listaConsultas.sort(
        (a, b) => new Date(a.data) - new Date(b.data)
      );      
  
    listaOrdenada.forEach((consulta) => {
      console.log("ID: " + consulta.id);
      console.log("Nome do Cliente: " + consulta.cliente);
      console.log("Nome do Pet: " + consulta.pet);
      console.log("Nome do Funcionário: " + consulta.funcionario); // Alterado para 'funcionario'
      console.log("Status: " + consulta.status);
      console.log("Data da Consulta: " + consulta.data);
      console.log("------------------------");
    });
  }
   

function exibirListaFuncionarios() {
    console.log("Lista de Funcionários (em ordem alfabética):");
    const listaOrdenada = sistema.funcionarios.listaFuncionarios.sort((a, b) => a.username.localeCompare(b.username));
    listaOrdenada.forEach((funcionario) => {
      console.log("ID: " + funcionario.id + ", Nome de Usuário: " + funcionario.username);
    });
  }

function exibirDadosFuncionario() {
  console.log("Dados do Funcionário:");
  console.log("ID: " + funcionarioLogado.id);
  console.log("Nome de Usuário: " + funcionarioLogado.username);
  console.log("Senha: " + funcionarioLogado.password);
}

function exibirMenuDadosFuncionario(rl) {
  rl.question("Selecione uma opção:\n1 - Visualizar meus dados\n2 - Mudar meus dados\n", (opcao) => {
    switch (opcao) {
      case "1":
        exibirDadosFuncionario();
        break;
      case "2":
        mudarDadosFuncionario(rl);
        break;
      default:
        console.log("Opção inválida!");
        exibirMenuDadosFuncionario(rl);
    }
    exibirMenuPrincipal(rl);
  });
}

function mudarDadosFuncionario(rl) {
  rl.question("Digite o novo nome de usuário: ", (username) => {
    rl.question("Digite a nova senha: ", (password) => {
      sistema.atualizarDadosFuncionario(username, password);
      exibirMenuPrincipal(rl);
    });
  });
}

function sair() {
  console.log("Saindo...");
  process.exit(0);
}

function iniciarSistema() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  exibirMenuInicial(rl);
}

function exibirMenuInicial(rl) {
  console.log("Bem-vindo ao sistema de gerenciamento do Pet Shop!");
  console.log("Selecione uma opção:");
  console.log("1 - Cadastro de funcionário");
  console.log("2 - Login");
  console.log("3 - Sair");

  rl.question("Opção selecionada: ", (opcao) => {
    switch (opcao) {
      case "1":
        cadastrarFuncionario(rl);
        break;
      case "2":
        login(rl);
        break;
      case "3":
        sair();
        break;
      default:
        console.log("Opção inválida!");
        exibirMenuInicial(rl);
    }
  });
}

function cadastrarFuncionario(rl) {
  rl.question("Digite o nome de usuário: ", (username) => {
    rl.question("Digite a senha: ", (password) => {
      const mensagem = sistema.cadastrarFuncionario(username, password);
      console.log(mensagem);
      exibirMenuInicial(rl);
    });
  });
}

// Inicia o sistema
iniciarSistema();
