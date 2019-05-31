function createTodo(root, args, context) {
  return context.prisma.createTodo({
    task: args.task,
  })
}

module.exports = {
  createTodo
}