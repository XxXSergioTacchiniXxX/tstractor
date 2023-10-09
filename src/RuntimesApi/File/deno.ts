export async function write(...params: WriteParam) {
  // @ts-ignore
  await Deno?.writeTextFile(...params);
}
