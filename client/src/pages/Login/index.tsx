import { createDemoUser, loginUser } from '@api/auth';
import { LoginInput } from '@api/types';
import LoginForm from '@components/login/LoginForm';
import useToast from '@lib/hooks/useToast';
import useAuthStore from '@lib/stores/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { success, errorMessage } = useToast();
  const { authenticate } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (values: LoginInput | {}, type: 'demo' | 'real' = 'real') => {
    try {
      const { user, accessToken } = await (type === 'demo' ? createDemoUser() : loginUser(values as LoginInput));
      success('Login successful');
      authenticate(user, accessToken);
      console.log(user, accessToken);
      navigate('/');
    } catch (err: any) {
      errorMessage(err);
    }
  };

  return (
    <section className="flex items-center justify-center h-full w-full relative">
      <div className="items-center justify-center md:inset-0 overflow-x-hidden overflow-y-auto shadow z-50 rounded-2xl bg-gray-50 dark:bg-gray-700 p-4">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative rounded-lg">
            <h1 className="text-center mb-4 font-semibold text-2xl">Login</h1>
            <LoginForm onLogin={handleLogin} createDemoUser={() => handleLogin({}, 'demo')} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
