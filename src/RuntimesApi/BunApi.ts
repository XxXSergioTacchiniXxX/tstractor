import { write } from "./File/bun.ts";

class BunApi implements RuntimeApi {
  write: WritePort = write;
}

export default BunApi;
