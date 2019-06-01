function createTodo(root, args, context) {
  return context.prisma.createTodo({
    task: args.task,
  })
}

async function updateTodo(root, { id, ...data }, context) {
  const todo = await context.prisma.todo({ id });

  if (!todo) throw new Error('Not found');

  return await context.prisma.updateTodo({
    data,
    where: { id },
  });
}

async function deleteTodo(root, { id }, context) {
  const todo = await context.prisma.todo({ id });

  if (!todo) throw new Error('Not found');

  return await context.prisma.deleteTodo(
    { id }
  );
}

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo
}