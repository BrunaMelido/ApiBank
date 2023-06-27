const { Card: CriarCartao } = require("../models/Card");
//const criar = require(CriarCartao)

// Valida idade
function ValidaIdade(aniversario) {

    const dataAniversario = new Date(aniversario);
    const dataAtual = new Date();
    const diffAnos = dataAtual.getFullYear() - dataAniversario.getFullYear();

    if (diffAnos < 18) {
        return "A idade é menor do que a estipulada para utilizar o sistema.";
    }

    return 0;
}

// Estipula o Limite do Cartão
function LimiteCartao() {
    const limite = [200, 500, 1000, 1500, 2000];
    return limite[Math.floor(Math.random() * limite.length)];
}

// Gera um número aleatório para o cartao
function NumeroCartao() {
    let numeroAleatorio = "";
    for (let i = 0; i < 10; i++) {
        const numero = Math.floor(Math.random() * 10);
        numeroAleatorio += numero;
    }
    return parseInt(numeroAleatorio);
}

// Valida senha do cartão
function CriacaoSenha(senha, confirmarSenha, aniversario) {

    // Verifica se tem 6 dígitos
    if (!senha || senha.toString().length !== 6) {
        return "A senha deve ter 6 dígitos.";
    }

    // Confirma se sao iguais
    if (senha !== confirmarSenha) {
        return "A senha e a confirmação devem ser as mesmas.";
    }

    // Tem o ano de nascimento pela data de nascimento
    const anoAniversario = parseInt(aniversario.toString().slice(-2));
    const senhaAniversario = parseInt(aniversario.toString().slice(0, 4) + anoAniversario.toString());
    if (senha === senhaAniversario) {
        return "A senha não pode ser igual à data de nascimento ou conter os dois últimos dígitos do ano de nascimento.";
    }

    // Verifica se a senha não possui números sequenciais
    for (let i = 0; i < numero.length - 1; i++) {
        const numeroAtual = parseInt(numero[i]);
        const proximoNumero = parseInt(numero[i + 1]);
        if (numeroAtual + 1 === proximoNumero) {
            return "A senha não pode ter números em sequencia.";
        }
    }

    return 0;
}

// Função para validar os dados do cartão em comparação com os dados armazenados no banco de dados
function ComparaComBD(senha, confirmarSenha, numero, agencia, conta, cartaoNoBD) {
    if (numero !== cartaoNoBD.numero) {
        return "Numero incorreto.";
    }
    if (senha !== confirmarSenha) {
        return "As senhas devem ser as mesmas.";
    }
    if (senha !== cartaoNoBD.senha) {
        return "Senha incorreta.";
    }
    if (agencia !== cartaoNoBD.agencia) {
        return "Agencia incorreta.";
    }
    if (conta !== cartaoNoBD.conta) {
        return "Conta incorreta.";
    }
    return 0;
}

const mainCartao = {
    // Método para criar um novo cartão
    create: async (req, res) => {
        try {
            const cartao = {
                agencia: req.body.agencia,
                conta: req.body.conta,
                cpf: req.body.cpf,
                aniversario: req.body.aniversario,
                nomeCompleto: req.body.nomeCompleto,
                nomeCartao: req.body.nomeCartao,
                bandeira: req.body.bandeira,
                tipo: req.body.tipo,
                dataDeValidade: req.body.dataDeValidade,
                senha: req.body.senha,
                confirmarSenha: req.body.confirmarSenha,
                status: "solicitado",
                numero: NumeroCartao(),
                cvv: Math.floor(Math.random() * 900) + 100,
                limit: LimiteCartao(),
            };

            // Valida a criação de senha do cartão
            const validacaoSenhaMensagem = CriacaoSenha(cartao.senha, cartao.confirmarSenha, cartao.aniversario);

            // Valida a idade mínima
            const validacaoIdadeMensagem = ValidaIdade(cartao.aniversario);

            if (validacaoSenhaMensagem !== " " && validacaoIdadeMensagem !== " ") {
                // Cria o cartão no banco de dados
                //criar = await CriarCartao.create(cartao);
                return res.status(201).json({cartao, mensagem:"Cartao Criado!"});
            }

        } catch (error) {
            console.log(error);
        }
    },

    // Método para obter todos os cartões
    getAll: async (req, res) => {
        try {
            const cartoes = await CriarCartao.find();
            return res.json(cartoes);
        } catch (error) {
            console.log(error);
        }
    },

    // Método para alterar o estado de um cartão
    changestatus: async (req, res) => {
        try {
            const numero = req.body.numero;
            const cartaoNoBD = await CriarCartao.findOne({ numero });

            if (!cartaoNoBD) {
                return res.status(404).json({ mensagem: "Cartão não encontrado" });
            }

            const status = req.body.status;
            const motivo = req.body.motivo;

            // Valida os dados do cartão em comparação com os dados armazenados no banco de dados
            const validacaoGeral = ComparaComBD(senha, confirmarSenha, numero, agencia, conta, cartaoNoBD);

            if (validacaoGeral !== 0) {
                return res.status(406).json({ mensagem: "ok" });
            }

            // Verifica as regras para alterar o estado do cartão
            if (
                !(
                    (status === "entregue" && cartaoNoBD.status === "solicitado") ||
                    (status === "ativado" && cartaoNoBD.status === "entregue") ||
                    (status === "bloqueado" && cartaoNoBD.status === "ativado") ||
                    status === "cancelado"
                )
            ) {
                return res.status(400).json({ mensagem: "error." });
            }

            // Atualiza o estado do cartão no banco de dados
            cartaoNoBD.status = status;
            cartaoNoBD.motivo = motivo;
            await cartaoNoBD.save();

            return res.status(200).json({ mensagem: "ok" });
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = mainCartao;