import React from 'react';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar onGetStarted={() => navigate('/')} />
      <main className="flex-1 max-w-4xl mx-auto px-8 py-20 w-full">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 prose prose-slate max-w-none">
          <p className="text-slate-600 mb-4">Last Updated: June 26, 2026</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We collect information you provide directly to us when you create an account, update your profile, or use our platform. This includes personal information such as your name, email address, phone number, and financial data linked to your portfolio.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Your information is used to provide, maintain, and improve our services. We use your financial data to generate AI insights, track portfolio performance, and personalize your dashboard experience.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Data Security</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We implement bank-level encryption and security measures to protect your personal and financial information. We do not sell your data to third parties.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
