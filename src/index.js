import express from 'express';

import {
  getRootPgPool,
  cors,
  healthz,
  poweredBy,
  trustProxy
} from '@launchql/server-utils';

import { NodePlugin } from 'graphile-build';

import PgSimpleInflector from 'graphile-simple-inflector';

import ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter';

import FulltextFilterPlugin from '@pyramation/postgraphile-plugin-fulltext-filter';

import PgManyToMany from '@graphile-contrib/pg-many-to-many';
import { middleware as parseDomains } from '@pyramation/url-domains';
import { postgraphile } from 'postgraphile';
import env from './env';

const { ORIGIN: origin } = env;

const plugins = [ConnectionFilterPlugin, FulltextFilterPlugin, PgManyToMany, PgSimpleInflector]

const options = {
  appendPlugins: plugins.length > 0 ? plugins : undefined,
  skipPlugins: [NodePlugin], // to skip NodeId
  dynamicJson: true,
  disableGraphiql: false,
  enhanceGraphiql: true,
  enableQueryBatching: true,
  graphiql: true,
  watch: true,
  port: env.SERVER_PORT,
  host: env.SERVER_HOST,
  schema: env.SCHEMA,
  ignoreRBAC: false,
  // legacyRelations: 'omit',
  showErrorStack: false,
  extendedErrors: false,
  disableQueryLog: false,
  includeExtensionResources: true,
  setofFunctionsContainNulls: false,
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
app.use(poweredBy('juno-1'));
app.use(postgraphile(pgPool, options.schema, options));

export default app;
