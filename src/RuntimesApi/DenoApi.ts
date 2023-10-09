import { write } from "./File/deno.ts";

class DenoApi implements RuntimeApi {
  write: WritePort = write;
  getCliParams() {
    // @ts-ignore
    return Deno?.args;
  }
}

export default DenoApi;
