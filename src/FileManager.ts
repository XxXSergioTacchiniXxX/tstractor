import RuntimeManager from "./RuntimeManager.ts";

class FileManager {
  private runtimeApi: RuntimeApi;

  constructor() {
    this.runtimeApi = RuntimeManager.runtimeApi;
  }

  write: WritePort = async (...params) => {
    await this.runtimeApi.write(...params);
  };
}

export default FileManager;
