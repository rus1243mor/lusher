import pkg from 'luscher-test'
const { TwoStageTest } = pkg
import express from 'express'
import bodyparser from "body-parser"

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', async(req, res) => {
    console.log(req.body)
    res.sendStatus(200)
});

app.post('/', async(req, res) => {
    console.log(req.body);
    res.sendStatus(200)
    get_res(req.body.firstSelection, req.body.secondSelection, req, res)
});
// color codes in order of their selection
const firstSelection = [2, 5, 3, 1, 0, 6, 7, 4];
const secondSelection = [5, 7, 3, 1, 0, 4, 2, 6];

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