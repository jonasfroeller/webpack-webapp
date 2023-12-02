// import {create} from '../public/lib/script/api/api';
// import {User} from '../public/lib/script/types';
import {describe, test} from '@jest/globals';
import * as express from 'express';
import * as cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`FRONTEND listening on http://localhost:${PORT}`);
});

describe('API Functions', () => {
  test('create', async () => {
    // const data = await create();
    // expect(data).toBeDefined();
    // expect(data).toHaveProperty('xxx');
  });
});

global.afterAll(() => {
  server.close();
});
