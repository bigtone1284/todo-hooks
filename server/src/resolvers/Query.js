function info() { 
  return `This is the API of a Hackernews Clone`
}

async function todoes(root, { orderBy }, context, info) {

  const allTodoes = await context.prisma.todoes({
    orderBy: orderBy || 'createdAt_DESC'
  });

  return allTodoes;
}

module.exports = {
  info,
  todoes
}