import React from 'react';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar onGetStarted={() => navigate('/')} />
      <main className="flex-1 max-w-4xl mx-auto px-8 py-20 w-full">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 prose prose-slate max-w-none">
          <p className="text-slate-600 mb-4">Last Updated: June 26, 2026</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            By accessing or using the InvestIQ platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Description of Service</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            InvestIQ provides AI-driven financial analysis, portfolio tracking, and related tools. The insights provided by our AI are for informational purposes only and do not constitute financial advice.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. User Responsibilities</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            You are responsible for maintaining the confidentiality of your account credentials. You agree to use the service for lawful purposes and not to attempt unauthorized access to our systems.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
