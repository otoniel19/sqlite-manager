# sqlite-manager

- gerenciador de banco de dados sqlite com node
- criado dia 29/09/2021

# como usar

- como criar uma tabela

```
 const manager = require('sqlite-manager')
 const conn = new manager("database.db")

 const model = conn.connect("usuarios",{
     id: {
         type: "INTEGER NOT NULL PRIMARY KEY",
         model: Number
     },
     nome: {
         type: "TEXT NOT NULL",
         model: String
     },
     idade: {
         type: "INTEGER NOT NULL",
         model: Number
     }
 })
```

- voce precisa informar o model para que o os dados sejam formatados

# como obter dados

```
 const manager = require('sqlite-manager')
 const conn = new manager("database.db")

 const model = conn.connect("usuarios",{
     id: {
         type: "INTEGER NOT NULL PRIMARY KEY",
         model: Number
     },
     nome: {
         type: "TEXT NOT NULL",
         model: String
     },
     idade: {
         type: "INTEGER NOT NULL",
         model: Number
     }
 })
 model.then(all => {
     all.get(data => {
       //faca oq quiser com a data
     })
 })
```

# como inserir dados

```
 const manager = require('sqlite-manager')
 const conn = new manager("database.db")

 const model = conn.connect("usuarios",{
     id: {
         type: "INTEGER NOT NULL PRIMARY KEY",
         model: Number
     },
     nome: {
         type: "TEXT NOT NULL",
         model: String
     },
     idade: {
         type: "INTEGER NOT NULL",
         model: Number
     }
 })
 model.then(all => {
     all.create({
     nome: "Fogo",
     idade: 1000
   })
 })
```

# como atualizar dados

```
 const manager = require('sqlite-manager')
 const conn = new manager("database.db")

 const model = conn.connect("usuarios",{
     id: {
         type: "INTEGER NOT NULL PRIMARY KEY",
         model: Number
     },
     nome: {
         type: "TEXT NOT NULL",
         model: String
     },
     idade: {
         type: "INTEGER NOT NULL",
         model: Number
     }
 })
 model.then(all => {
   all.update({
       nome: "Fogao",
       idade: 2827
   },{id: 1})
 })
```
* o segundo parametro e onde voce vai atualizar
# como deletar dados
```
 const manager = require('sqlite-manager')
 const conn = new manager("database.db")

 const model = conn.connect("usuarios",{
     id: {
         type: "INTEGER NOT NULL PRIMARY KEY",
         model: Number
     },
     nome: {
         type: "TEXT NOT NULL",
         model: String
     },
     idade: {
         type: "INTEGER NOT NULL",
         model: Number
     }
 })
 model.then(all => {
     all.delete({id: 1})
 })
```
* aqui voce so informa onde sera deletado
# e isso obrigado por testar!