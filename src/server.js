#!/usr/bin/env node

import app from './index';
import env from './env';

app.listen(env.SERVER_PORT, () => {
  // eslint-disable-next-line
    console.log(`Server: http://localhost:${env.SERVER_PORT}/graphiql`);
});
