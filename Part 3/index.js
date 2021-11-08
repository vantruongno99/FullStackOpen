require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const app = express()
morgan.token('payload', function (req) {
    return JSON.stringify(req.body)
})
app.use(express.static('build'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'))

const cors = require('cors')

app.use(cors())

app.use(express.json())


app.get('/info', async (request, response) => {
    const persons = await Person.find({})
    const num = persons.length
    const date = Date(Date.now())
    const message = `<p>Phonebook has info for ${num} people <p/>
    <p> ${date}<p/>`
    response.send(message)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => response.json(persons))
})

app.get('/api/persons/:id', async (request, response, next) => {
    try {
        const findPerson = await Person.findOne({ id: request.params.id })
        if (findPerson) {
            response.json(findPerson)
        } else {
            response.status(404).end()
        }
    } catch (error) { next(error) }

})


app.delete('/api/persons/:id', async (request, response, next) => {
    try {
        const result = await Person.findOneAndDelete({ id: request.params.id })
        response.status(204).send(result)
    }
    catch (error) {
        next(error)
    }
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        id: body.id,
        name: body.name,
        number: body.number
    }

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    Person.findOneAndUpdate({ id: request.params.id }, person, { new: true }).then(updatedNote => {
        response.json(updatedNote)
    })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})