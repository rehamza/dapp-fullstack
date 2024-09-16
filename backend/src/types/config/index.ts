import { Dialect } from "../../config/config";

export type Config = {
    [key: string]: {
      username?: string;
      password?: string;
      database?: string;
      host?: string;
      dialect: Dialect;
      use_env_variable?: string;
    };
  }
