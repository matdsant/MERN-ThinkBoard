import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'mern-notes', // Use o nome do seu Realm
  clientId: 'notes-app',
});

export default keycloak;