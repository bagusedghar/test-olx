const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { v4: uuidv4 } = require('uuid');

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

app.use(cors())
app.options('*', cors());


let data = [];

app.get('/', (req,res) => {
    console.log('get')
    res.send(data)
})

app.get('/:id', (req,res) => {
    console.log('getById')
    const id = req.params.id;
    const found = data.find((task) => task.id === id);
    res.send(found);
})

app.post('/', (req,res) => {
    console.log('create')
    const newData = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description
    }
    data.push(newData)
    res.send(newData)
})

app.put('/:id', (req,res) => {
    console.log('update')
    const id = req.params.id;
    const { title, description } = req.body;
    const task = data.find((task) => task.id === id);
    task.title = title;
    task.description = description;
    res.send(task)
})

app.delete('/:id', (req,res) => {
    console.log('delete')
    const id = req.params.id;
    const found = data.find((task) => task.id === id);
    data = data.filter((task) => task.id !== found.id);
    res.send({success:true})
})

app.listen(8000, () => {
    console.log('listen 8000')
})