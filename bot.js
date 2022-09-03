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
    if(req.body.language == "en") {
        await get_res_en(req.body.firstSelection, req.body.secondSelection, req, res)
    }
    else if(eq.body.language == "ru"){
        await get_res_ru(req.body.firstSelection, req.body.secondSelection, req, res)
    }
});
// color codes in order of their selection

async function get_res_ru(firstSelection, secondSelection, req, res) {
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

async function get_res_en(firstSelection, secondSelection, req, res) {
    const test = new TwoStageTest(firstSelection, secondSelection);
    const testInterpretation = await test.getInterpretation("multi")
    var result = ""
    for(var i = 0; i < testInterpretation[0].length; i++) {
        if(typeof(testInterpretation[0][i].interpretation[0].en) == "object") {
            result += testInterpretation[0][i].interpretation[0].en.physcho
        }
        else {
            result += testInterpretation[0][i].interpretation[0].en
        }
        result += "\n\n"
    }
    res.send(result)
}

app.listen(port, ()=>{ console.log("Listening to the server on http://localhost:" + port)});

module.exports = app;
