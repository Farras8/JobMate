// src/pages/LoginPage.tsx
import React from 'react';
import AuthHeader from '../components/AuthComp/AuthHeader';
import AuthPatternWrapper from '../components/AuthComp/AuthPatternWrapper';
import LoginForm from '../components/AuthComp/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <AuthHeader />
        <main className="flex-grow flex flex-col">
          <AuthPatternWrapper>
            <LoginForm />
          </AuthPatternWrapper>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;