import { write } from "./File/bun.ts";

class BunApi implements RuntimeApi {
  write: WritePort = write;
  getCliParams() {
    return process.argv;
  }
}

export default BunApi;
