/*
  All imports will be in this format.
  default is path to file e.g. /static/media/A#4_0.e3b45d53.ogg
*/
export interface Module {
  __esModule: boolean;
  default: string;
  'Symbol(Symbol.toStringTag())': 'Module';
}

export const importAll = (r: any): Module[] => r.keys().map(r);
