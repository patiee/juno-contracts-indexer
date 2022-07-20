import express from 'express';

import {
  getRootPgPool,
  cors,
  healthz,
  poweredBy,
  trustProxy
} from '@launchql/server-utils';

import { graphqlUploadExpress } from 'graphql-upload';
import { middleware as parseDomains } from '@pyramation/url-domains';
import { postgraphile } from 'postgraphile';
import { getGraphileSettings } from '@launchql/graphile-settings';
import env from './env';

const { ORIGIN: origin } = env;

const options = {
  ...getGraphileSettings({
    host: env.SERVER_HOST,
    port: env.SERVER_PORT,
    schema: env.SCHEMA,
    simpleInflection: true,
    oppositeBaseNames: true
  }),
  async pgSettings(req) {
    return { role: env.PGUSER };
  },
  graphqlRoute: '/graphql',
  graphiqlRoute: '/graphiql'
};

const pgPool = getRootPgPool(env.PGDATABASE);
const app = express();
healthz(app);
cors(app, origin);
trustProxy(app, env);
app.use(parseDomains());
app.use(poweredBy('launchql'));
app.use(graphqlUploadExpress());
app.use(postgraphile(pgPool, options.schema, options));

export default app;
