import { createContext, useContext, useState, useEffect } from 'react';
import keycloak from '../keycloak';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    keycloak
      .init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
      })
      .then((auth) => {
        setAuthenticated(auth);
        
        if (auth) {
          keycloak.loadUserProfile().then((profile) => {
            setUser({
              username: profile.username,
              email: profile.email,
              firstName: profile.firstName,
              lastName: profile.lastName,
            });
          });
        }
        
        setLoading(false);
      })
      .catch((error) => {
        console.error('Keycloak init error:', error);
        setLoading(false);
      });

    // Atualizar token automaticamente
    setInterval(() => {
      keycloak.updateToken(70).catch(() => {
        console.error('Failed to refresh token');
      });
    }, 60000);
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout({
      redirectUri: window.location.origin,
    });
  };

  const getToken = () => {
    return keycloak.token;
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        loading,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};