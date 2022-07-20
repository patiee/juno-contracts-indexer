import { cleanEnv, str, port } from 'envalid';

export default cleanEnv(
  process.env,
  {
    PGUSER: str({ default: 'postgres' }),
    PGHOST: str({ default: 'localhost' }),
    PGPASSWORD: str({ default: 'password' }),
    PGDATABASE: str({ default: 'test_database' }),
    SCHEMA: str({ default: 'app_public' }),
    PGPORT: port({ default: 5432 }),
    SERVER_PORT: port({ default: 5758 })
  },
  { dotEnvPath: null }
);
