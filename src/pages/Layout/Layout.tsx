import { Footer, Header } from '@/components';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="a11yHidden">슬기로운 N밥생활</h1>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
