const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    } else {
        return ''
    }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
]

let maxId = persons.length + 1

console.log('Starting server...')

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/info', (request, response) => {
    let content = ''
    content += `<p>Phonebook has info for ${ persons.length } people</p>`
    content += `<p>${ (new Date()).toString() }</p>`
    response.send(content)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    if (!request.body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (!request.body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!request.body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    if (persons.find(person => person.name === request.body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = { 
        name: request.body.name,
        number: request.body.number, 
        id: Math.floor(Math.random() * 10000)
    }
    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.put('/api/persons/:id', (request, response) => {
    if (!request.body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (!request.body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!request.body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    const edited = {
        id: request.params.id,
        name: request.body.name,
        number: request.body.number
    }
    persons = persons.map(person => person.id === edited.id? edited : person)
    response.status(200).json(edited)
})

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})