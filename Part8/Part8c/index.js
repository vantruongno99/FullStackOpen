const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Author = require('./models/Author')
const jwt = require('jsonwebtoken')

const MONGODB_URI = 'mongodb+srv://truong:Tu0den99@cluster0.rylaa.mongodb.net/Api-test?retryWrites=true&w=majority'
const JWT_SECRET = 'dashnduiwa wmqid'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {})
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
const typeDefs = gql`
type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
}

type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
}

type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
}

type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      born: Int!
    ): Author    
}   
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            try {
                if (args.author && args.genre) {
                    return Book.find({
                        genres: { $all: [args.genre] }
                    }).populate('author')
                } else {
                    if (args.author) {
                        return Book.find({}).populate('author');
                    }
                    if (args.genre) {
                        return Book.find({
                            genres: { $all: [args.genre] }
                        }).populate('author')
                    }
                }
                return Book.find({}).populate('author');
            } catch (err) {
                throw new UserInputError(err.message, {
                    invalidArgs: args
                })
            }


        },
    },
    Author: {
        bookCount: async (root) => {
            const books = await Book.find({ author: root.id })
            return books.length
          }
    },
    Mutation: {
    addBook: async (_root, args) => {
        let author = await Author.findOne({ name: args.author })

        if (!author) {
          author = await new Author({ name: args.author }).save()
        }

        const book = new Book({
          title: args.title,
          published: args.published,
          author,
          genres: args.genres
        })
  
        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
  
  
        return book
    },
    editAuthor: async (_, args) => {
        let author = await Author.findOne({ name: args.name })
  
        if (author) {
          author.born = args.born
          await author.save()
        }
  
        return author
      }
}
    
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})