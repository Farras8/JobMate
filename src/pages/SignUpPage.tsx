// src/pages/SignUpPage.tsx
import React from 'react';
import AuthHeader from '../components/AuthComp/AuthHeader';
import SignUpForm from '../components/AuthComp/SignUpForm';
import AuthWrapperSign from '../components/AuthComp/AuthWrapperSign';

const SignUpPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col drop-shadow-sm">
      <AuthHeader />
      <main className="flex-grow flex flex-col">
        <AuthWrapperSign>
          <SignUpForm />
        </AuthWrapperSign>
      </main>
    </div>
  );
};

export default SignUpPage;
