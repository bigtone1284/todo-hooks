const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    todoes: (root, args, context, info) => {
      return context.prisma.todoes()
    },
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createTodo({
        done: false,
        task: args.task,
      })
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))