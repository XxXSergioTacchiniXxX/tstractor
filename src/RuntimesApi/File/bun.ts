export async function write(...params: WriteParam) {
  await Bun.write(...params);
}
