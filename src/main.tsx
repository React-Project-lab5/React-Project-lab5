import App from './App';
import { RecoilRoot } from 'recoil';
import '@/styles/common/index.scss';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <RecoilRoot>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </RecoilRoot>
  </>
);
