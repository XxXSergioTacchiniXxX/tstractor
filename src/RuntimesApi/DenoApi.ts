import { write } from "./File/deno.ts";

class DenoApi implements RuntimeApi {
  write: WritePort = write;
}

export default DenoApi;
