import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Container from './Container';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = React.memo(({ children }) => {
  return (
    <>
      <Container>
        <Header />
        <main className="min-h-screen" role="main">
          {children}
        </main>
        <Footer />
      </Container>
    </>
  );
});

export default Layout;
