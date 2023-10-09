declare interface RuntimeApi {
  write: WritePort;
  getCliParams: () => string[];
}
