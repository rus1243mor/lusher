var pkg = require ('luscher-test')
const { TwoStageTest } = pkg
var express = require('express')
var bodyparser = require("body-parser")

const port = process.env.PORT || 3000;
const app = express();
let cors = require("cors");
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/results', async(req, res) => {
    console.log(req.query)
    res.json({
        text: "get it"
    })
});

app.post('/', async(req, res) => {
    console.log(req.body);
    // get_res(req.body.firstSelection, req.body.secondSelection, req, res)
});
// color codes in order of their selection

async function get_res(firstSelection, secondSelection, req, res) {
    const test = new TwoStageTest(firstSelection, secondSelection);
    const testInterpretation = await test.getInterpretation("multi")
    var result = ""
    for(var i = 0; i < testInterpretation[0].length; i++) {
        if(typeof(testInterpretation[0][i].interpretation[0].ru) == "object") {
            result += testInterpretation[0][i].interpretation[0].ru.physcho
        }
        else {
            result += testInterpretation[0][i].interpretation[0].ru
        }
        result += "\n\n"
    }
    res.send(result)
}

app.listen(port, ()=>{ console.log("Listening to the server on http://localhost:" + port)});

module.exports = app;