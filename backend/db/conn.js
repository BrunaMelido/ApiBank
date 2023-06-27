const mongoose = require("mongoose");

async function main() {
    
    try {
    mongoose.set("strictQuery", true);

await mongoose.connect("mongodb+srv://melidobru:w2jt6hkuneVMUwIz@cluster0.wyxqjbv.mongodb.net/?retryWrites=true&w=majority")
        console.log("Banco conctado")
    }   catch (error){
        console.log(`Erro: ${error}`);
    }
}
module.exports = main;