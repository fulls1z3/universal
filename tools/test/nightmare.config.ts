import * as Nightmare from 'nightmare';

const browser = new Nightmare({ show: true });
const baseUrl = 'http://localhost:4000'; // TODO: get from `build-config.json`

export { browser, baseUrl };
