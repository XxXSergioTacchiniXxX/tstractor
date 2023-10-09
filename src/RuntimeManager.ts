import BunApi from "./RuntimesApi/BunApi.ts";
import DenoApi from "./RuntimesApi/DenoApi.ts";

export enum RuntimeTypes {
  Deno,
  Bun,
}

export default class RuntimeManager {
  static readonly runtime: RuntimeTypes = this.defineRunTime();
  static readonly runtimeApi: RuntimeApi = this.setRunTimeApi();

  static defineRunTime(): RuntimeTypes {
    // @ts-ignore
    if (globalThis?.Deno) {
      // @ts-ignore
      return RuntimeTypes.Deno;
    }
    if (globalThis?.Bun) {
      // @ts-ignore
      return RuntimeTypes.Bun;
    }

    throw new Error("Undefined runtime");
  }

  private static setRunTimeApi(): RuntimeApi {
    switch (this.runtime) {
      case RuntimeTypes.Bun:
        return new BunApi();
      case RuntimeTypes.Deno:
        return new DenoApi();
      default:
        throw new Error("Undefined runtime");
    }
  }
}
