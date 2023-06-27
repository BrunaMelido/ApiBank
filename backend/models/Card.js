const mongoose = require("mongoose")

const { Schema } = mongoose

const cardSchema = new Schema({
  agencia: {
    type: Number,
  },
  conta: {
    type: Number,
  },
  cpf: {
    type: String,
  },
  aniversario: {
    type: Number,
  },
  nomeCompleto: {
    type: String,
  },
  nomeCartao: {
    type: String,
  },
  bandeira: {
    type: String,
  },
  tipo: {
    type: String,
  },
  dataDeValidade: {
    type: String,
  },
  senha: {
    type: Number,
  },
  confirmarSenha: {
    type: Number,
  },
  status: {
    type: String
  },
  numbero: {
    type: Number,
  },
  cvv: {
    type: Number
  },
  limite:{
    type: Number
  },
  motivo:{
    type: String
  }

}, { timestamps: true })

const Card = mongoose.model("Card", cardSchema)
module.exports = { Card, cardSchema }