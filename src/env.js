import { cleanEnv, str, port } from 'envalid';

export default cleanEnv(
  process.env,
  {
    PGUSER: str({ default: 'postgres' }),
    PGHOST: str({ default: 'localhost' }),
    PGPASSWORD: str({ default: 'postgres' }),
    PGDATABASE: str({ default: 'postgres' }),
    SCHEMA: str({ default: 'app' }),
    PGPORT: port({ default: 5432 }),
    SERVER_PORT: port({ default: 5758 }),
    SERVER_HOST: str({ default: 'localhost' }),
  },
  { dotEnvPath: null }
);
