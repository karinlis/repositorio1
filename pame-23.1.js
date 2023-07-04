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
    
    removerFuncionario(nomeFuncionario, listaConsultas) {
      const funcionarioIndex = this.listaFuncionarios.findIndex((funcionario) => funcionario.username === nomeFuncionario);
      if (funcionarioIndex !== -1) {
        const funcionario = this.listaFuncionarios[funcionarioIndex];
        const possuiConsultas = listaConsultas.some((consulta) => consulta.funcionario === funcionario.nome);
        if (!possuiConsultas) {
          this.listaFuncionarios.splice(funcionarioIndex, 1);
          return true;
        }
      }
      return false;
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
  
      // Exemplos de clientes
      this.adicionarCliente(new Cliente("01", "Karine", "Sofia", 5));
      this.adicionarCliente(new Cliente("02", "Weder", "Nick", 2));
      this.adicionarCliente(new Cliente("03", "Fernanda", "Bruno", 1));
    }
  
    adicionarCliente(cliente) {
      this.listaClientes.push(cliente);
    }
  
    removerClienteEPet(nomeCliente) {
      const clienteIndex = this.listaClientes.findIndex((cliente) => cliente.nome === nomeCliente);
      if (clienteIndex !== -1) {
        this.listaClientes.splice(clienteIndex, 1);
        console.log("Cliente e pet removidos com sucesso!");
      } else {
        console.log("Cliente não encontrado.");
      }
    }
  
    adicionarClienteComInput(rl) { 
      rl.question("Digite o nome do cliente: ", (nomeCliente) => {
        rl.question("Digite o nome do pet: ", (nomePet) => {
          const novoCliente = new Cliente(null, nomeCliente, nomePet, 0);
          this.adicionarCliente(novoCliente);
          console.log("Cliente adicionado com sucesso!");
          exibirMenuAdicionar(rl);
        });
      });
    }
  }
  
  
  class Pets {
    constructor() {
      this.listaPets = [];
  
      // Exemplos de pets
      this.adicionarPet(new Pet("01", "Sofia", "Karine"));
      this.adicionarPet(new Pet("02", "Nick", "Weder"));
      this.adicionarPet(new Pet("03", "Bruno", "Fernanda"));
    }
  
    adicionarPet(pet) {
      this.listaPets.push(pet);
    }
  
    adicionarPetComInput(rl) {
      rl.question("Digite o nome do pet: ", (nomePet) => {
        rl.question("Digite o nome do dono: ", (nomeDono) => {
          const novoPet = new Pet(null, nomePet, nomeDono); // Crie um novo objeto Pet com o ID como null
          this.adicionarPet(novoPet); // Adicione o novo pet ao sistema
          console.log("Pet adicionado com sucesso!");
          exibirMenuAdicionar(rl);
        });
      });
    }
  
    removerPet(nomeCliente, nomePet) {
      const petIndex = this.listaPets.findIndex(
        (pet) => pet.nome === nomePet && pet.dono === nomeCliente
      );
      if (petIndex !== -1) {
        this.listaPets.splice(petIndex, 1);
        console.log("Pet removido com sucesso!");
      } else {
        console.log("Pet não encontrado.");
      }
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
  
    marcarConsulta(id, cliente, pet, funcionario, status, data) {
      const novaConsulta = new Consulta(id, cliente, pet, funcionario, status, data);
      this.listaConsultas.push(novaConsulta);
      return "Consulta marcada com sucesso!";
    }
  
    encontrarConsultaPorId(id) {
      return this.listaConsultas.find((consulta) => consulta.id === id);
    }
  
    encontrarConsultaPorCliente(nomeCliente) {
      return this.listaConsultas.find((consulta) => consulta.cliente === nomeCliente);
    }
  
    alterarConsulta(id, cliente, pet, funcionario, status, data) {
      const consulta = this.encontrarConsultaPorId(id);
  
      if (consulta) {
        consulta.cliente = cliente;
        consulta.pet = pet;
        consulta.funcionario = funcionario;
        consulta.status = status;
        consulta.data = data;
  
        return "Informações da consulta atualizadas com sucesso!";
      } else {
        return "Consulta não encontrada.";
      }
    }
  
    removerConsulta(consulta) {
      const indice = this.listaConsultas.indexOf(consulta);
      if (indice !== -1) {
        this.listaConsultas.splice(indice, 1);
        return "Consulta removida com sucesso!";
      } else {
        return "Consulta não encontrada.";
      }
    }
  
    ordenarConsultasPorData() {
      this.listaConsultas.sort((consulta1, consulta2) => {
        const [dia1, mes1] = consulta1.data.split('/');
        const [dia2, mes2] = consulta2.data.split('/');
  
        // Compara primeiro
        if (mes1 < mes2) {
          return -1;
        } else if (mes1 > mes2) {
          return 1;
        }
  
        // Em caso de empate no mês, compara o dia
        if (dia1 < dia2) {
          return -1;
        } else if (dia1 > dia2) {
          return 1;
        }
  
        return 0;
      });
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
  
  const consultas = new Consultas();

const sistema = new Sistema();

//Exemplos de funcionários e suas respectivas senhas
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
//Exemplos de consultas
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

let funcionarioLogado = null;

function login(rl) {
  rl.question("Digite seu nome de usuário: ", (username) => {
    rl.question("Digite sua senha: ", (password) => {
      const funcionario = sistema.verificarCredenciais(username, password);

      if (funcionario) {
        funcionarioLogado = funcionario;
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
    rl.question(
      "Selecione uma opção:\n1 - Meus Dados\n2 - Listas\n3 - Consultas\n4 - Remover cliente/pet/funcionário\n5 - Add cliente ou pet\n6 - Logout\n7 - Verificar fidelização ",
      (opcao) => {
        switch (opcao) {
          case "1":
            exibirMenuDadosFuncionario(rl);
            break;
          case "2":
            console.log("Opção Listas selecionada");
            exibirMenuListas(rl);
            break;
          case "3":
            exibirMenuConsultas(rl);
            break;
            case "4":
                console.log("Opção Remover cliente ou pet ou funcionário selecionada");
                rl.question(
                  "Selecione uma opção:\n1 - Remover cliente e pet\n2 - Remover somente o pet\n3 - Remover funcionário\n",
                  (opcaoRemocao) => {
                    switch (opcaoRemocao) {
                      case "1":
                        console.log("Opção Remover cliente e pet selecionada");
                        rl.question("Digite o nome do cliente: ", (nomeCliente) => {
                          sistema.clientes.removerClienteEPet(nomeCliente);
                          exibirMenuPrincipal(rl);
                        });
                        break;
                      case "2":
                        console.log("Opção Remover somente o pet selecionada");
                        rl.question("Digite o nome do cliente: ", (nomeCliente) => {
                          rl.question("Digite o nome do pet: ", (nomePet) => {
                            sistema.pets.removerPet(nomeCliente, nomePet);
                            exibirMenuPrincipal(rl);
                          });
                        });
                        break;
                      case "3":
                        console.log("Opção Remover funcionário selecionada");
                        rl.question("Digite o nome do funcionário: ", (nomeFuncionario) => {
                          const funcionarioRemovido = sistema.funcionarios.removerFuncionario(
                            nomeFuncionario,
                            sistema.consultas.listaConsultas
                          );
                          if (funcionarioRemovido) {
                            console.log("Funcionário removido com sucesso!");
                          } else {
                            console.log("Funcionário não encontrado ou possui consultas associadas!");
                          }
                          exibirMenuPrincipal(rl);
                        });
                        break;
                      default:
                        console.log("Opção inválida!");
                        exibirMenuPrincipal(rl);
                    }
                  }
                );
                break;
              
          case "5":
            console.log("Opção Add cliente ou pet selecionada")
            exibirMenuAdicionar(rl);
            break;

          case "6":
            exibirMenuPrincipal(rl);
            break;

          case "7":
            console.log("Opção Verificar fidelização selecionada");
            verificarFidelizacao(rl);
            
          default:
            console.log("Opção inválida!");
            exibirMenuPrincipal(rl);
        }
      }
    );
  }
  
  function exibirMenuConsultas(rl) {
    rl.question(
      "Opção Consultas selecionada. Selecione uma opção:\n1 - Marcar Consulta\n2 - Mudar Consulta\n3 - Cancelar Consulta\n4 - Voltar ao Menu Principal\n",
      (opcao) => {
        switch (opcao) {
          case "1":
            console.log("Opção Marcar Consulta selecionada");
            marcarConsulta(rl);
            break;
          case "2":
            console.log("Opção Mudar Consulta selecionada");
            mudarConsulta(rl);
            break;
            case "3":
                console.log("Opção Cancelar Consulta selecionada");
                cancelarConsulta(rl);
                break;
          case "4":
            console.log("Opção Voltar ao Menu Principal selecionada");
            exibirMenuPrincipal(rl);
            break;
          default:
            console.log("Opção inválida!");
            exibirMenuConsultas(rl);
        }
      }
    );
  }

  function verificarFidelizacao(rl) {
    rl.question("Digite o nome do cliente: ", (nomeCliente) => {
      const cliente = sistema.clientes.listaClientes.find((cliente) => cliente.nome === nomeCliente);
  
      if (cliente) {
        if (cliente.fidelizado) {
          console.log(`O cliente ${nomeCliente} é fidelizado.`);
        } else {
          console.log(`O cliente ${nomeCliente} não é fidelizado.`);
        }
      } else {
        console.log("Cliente não encontrado.");
      }
  
      exibirMenuPrincipal(rl);
    });
  }  
  
  function exibirMenuAdicionar(rl) {
    rl.question(
      "Opção Adicionar selecionada. Selecione uma opção:\n1 - Adicionar Pet\n2 - Adicionar Cliente\n3 - Voltar ao Menu Principal\n",
      (opcao) => {
        switch (opcao) {
          case "1":
            console.log("Opção Adicionar Pet selecionada");
            sistema.pets.adicionarPetComInput(rl);
            break;
            case "2":
            console.log("Opção Adicionar Cliente selecionada");
            sistema.clientes.adicionarClienteComInput(rl)
                break;
          case "3":
            console.log("Opção Voltar ao Menu Principal selecionada");
            exibirMenuPrincipal(rl);
            break;
          default:
            console.log("Opção inválida!");
            exibirMenuAdicionar(rl);
        }
      }
    );
  }

  function marcarConsulta(rl) {
    rl.question("Digite o ID da consulta: ", (id) => {
      rl.question("Digite o nome do cliente: ", (cliente) => {
        rl.question("Digite o nome do pet: ", (pet) => {
          rl.question("Digite o nome do funcionário: ", (funcionario) => {
            rl.question("Digite o status da consulta: ", (status) => {
              rl.question("Digite a data da consulta: ", (data) => {
                const mensagem = sistema.consultas.marcarConsulta(
                  id,
                  cliente,
                  pet,
                  funcionario,
                  status,
                  data
                );
                console.log(mensagem);
                exibirMenuPrincipal(rl);
              });
            });
          });
        });
      });
    });
  }
  

  function mudarConsulta(rl) {
    rl.question("Digite o nome do cliente: ", (nomeCliente) => {
      rl.question("Digite a data da consulta: ", (dataConsulta) => {
        const consultaEncontrada = sistema.consultas.listaConsultas.find(
          (consulta) => consulta.cliente === nomeCliente && consulta.data === dataConsulta
        );
  
        if (consultaEncontrada) {
          rl.question("Digite o novo nome do cliente: ", (novoCliente) => {
            rl.question("Digite o novo nome do pet: ", (novoPet) => {
              rl.question("Digite o novo nome do funcionário: ", (novoFuncionario) => {
                rl.question("Digite o novo status da consulta: ", (novoStatus) => {
                  rl.question("Digite a nova data da consulta: ", (novaData) => {
                    consultaEncontrada.cliente = novoCliente || consultaEncontrada.cliente;
                    consultaEncontrada.pet = novoPet || consultaEncontrada.pet;
                    consultaEncontrada.funcionario = novoFuncionario || consultaEncontrada.funcionario;
                    consultaEncontrada.status = novoStatus || consultaEncontrada.status;
                    consultaEncontrada.data = novaData || consultaEncontrada.data;
  
                    console.log("Consulta alterada com sucesso!");
                    exibirMenuPrincipal(rl);
                  });
                });
              });
            });
          });
        } else {
          console.log("Consulta não encontrada!");
          exibirMenuPrincipal(rl);
        }
      });
    });
  }

  function cancelarConsulta(rl) {
    rl.question("Digite o nome do cliente: ", (nomeCliente) => {
      rl.question("Digite a data da consulta: ", (dataConsulta) => {
        const consultaEncontradaIndex = sistema.consultas.listaConsultas.findIndex(
          (consulta) => consulta.cliente === nomeCliente && consulta.data === dataConsulta
        );
  
        if (consultaEncontradaIndex !== -1) {
          // Remover a
          sistema.consultas.listaConsultas.splice(consultaEncontradaIndex, 1);
          console.log('Consulta cancelada com sucesso!');
          exibirMenuPrincipal(rl);
        } else {
          console.log('Consulta não encontrada.');
          exibirMenuPrincipal(rl);
        }
      });
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
      console.log("Pet: " + cliente.petnome);
      console.log("Fidelizado: " + (cliente.fidelizado ? "Sim" : "Não"));
      console.log("------------------------");
    });
  }

  function exibirListaConsultas() {
    console.log("Lista de Consultas (em ordem crescente):");
  
    sistema.consultas.ordenarConsultasPorData();
  
    sistema.consultas.listaConsultas.forEach((consulta) => {
      const [dia, mes] = consulta.data.split('/');
      console.log("ID: " + consulta.id);
      console.log("Nome do Cliente: " + consulta.cliente);
      console.log("Nome do Pet: " + consulta.pet);
      console.log("Nome do Funcionário: " + consulta.funcionario);
      console.log("Status: " + consulta.status);
      console.log("Data da Consulta: " + dia + "/" + mes);
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

iniciarSistema();
