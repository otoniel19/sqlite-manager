const lite = require("dblite");
const _ = require("lodash");
const fs = require("fs-extra");

class sqlite {
  constructor(dir) {
    fs.existsSync(dir) ? (this.db = lite(dir)) : null;
  }
  async connect(name, params) {
    let keys = _.keysIn(params);
    var names = [];
    this.models = [];
    for (let i = 0; i < keys.length; i++) {
      //tipo do valor
      names.push(`${keys[i]} ${params[keys[i]]["type"]}`);
      //modelo do valor
      this.models.push({ [keys[i]]: params[keys[i]]["model"] });
      //names.push(`${keys[i]} ${params[keys[i]]}`)
      //this.models.push({[keys[i]]: params[keys[i]]})
    }
    //modelo
    this.objmodel = {};
    for (let i = 0; i < this.models.length; i++) {
      this.objmodel[keys[i]] = this.models[i][keys[i]];
    }
    var values = names.join(",");
    await this.db.query(`CREATE TABLE IF NOT EXISTS ${name}(${values})`);
    var data = this.db;
    var modelo = this.objmodel;
    return await {
      get: async function (call) {
        if (call && typeof call == "function") {
          data.query(`SELECT * FROM ${name}`, modelo, call);
        } else {
          throw new Error("the callback does not exists!");
        }
      },
      create: async function (columms) {
        let keys = _.keysIn(columms);
        let into = [];
        let values = [];
        for (let i = 0; i < keys.length; i++) {
          into.push(`${keys[i]}`);
          values.push(`"${columms[keys[i]]}"`);
        }
        let intoFinal = into.join(",");
        let valuesFinal = values.join(",");
        await data.query(
          `INSERT INTO ${name}(${intoFinal}) VALUES(${valuesFinal})`
        );
      },
      update: async function (columms, where) {
        let keys = _.keysIn(columms);
        let whereKeys = _.keysIn(where);
        let whereName = whereKeys[0];
        let whereValue = where[whereName];
        await data.query("BEGIN TRANSACTION");
        for (let i = 0; i < keys.length; i++) {
          await data.query(
            `UPDATE ${name} SET "${keys[i]}" = "${
              columms[keys[i]]
            }" where "${whereName}" = "${whereValue}"`
          );
        }
        await data.query("COMMIT");
      },
      delete: async function (where) {
        let key = _.keysIn(where);
        let nameKey = key[0];
        let valueKey = where[key[0]];
        await data.query(
          `DELETE FROM ${name} WHERE "${nameKey}" = "${valueKey}"`
        );
      },
    };
  }
}
/*
const conn = new sqlite("./tmp.db");
const model = conn
  .connect("usuarios", {
    nome: {
      type: "TEXT",
      model: String,
    },
    idade: {
      type: "INTEGER",
      model: Number,
    },
  })
  .then((all) => {
    all.get(data => {
      console.log(data)
    })
    all.create({
      nome: "Otoniel",
      idade: 18
    })
    all.update({
      nome:"Otoniell",
      idade: 19
    },{idade: 18})
    all.delete({ idade: 19 })
  });
*/
module.exports = sqlite