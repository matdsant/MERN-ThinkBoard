import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Bem-vindo ao Notes App
        </h1>
        <p className="text-gray-300 mb-8">
          Faça login para acessar suas notas
        </p>
        <button
          onClick={login}
          className="bg-[#00FF9D] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#00cc7d] transition"
        >
          Entrar com Keycloak
        </button>
      </div>
    </div>
  );
};

export default LoginPage;