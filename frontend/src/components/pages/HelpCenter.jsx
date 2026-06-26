import React from 'react';
import { Mail, Phone, HelpCircle, AlertCircle, ChevronDown } from 'lucide-react';

const HelpCenter = () => {
  const faqs = [
    { question: 'How do I add funds to my account?', answer: 'You can add funds by navigating to the Portfolio section and clicking on "Add Funds" under your available balance.' },
    { question: 'What is the minimum investment amount?', answer: 'The minimum investment amount depends on the specific stock or mutual fund. For stocks, it is the price of a single share.' },
    { question: 'How do I contact support?', answer: 'You can reach us via email at support@investiq.com or call our toll-free number 1800-123-4567.' },
    { question: 'Is my data secure with InvestIQ?', answer: 'Yes, we use bank-level encryption to ensure all your financial and personal data is secure.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-slate-900">InvestIQ Help Center</h1>
          <p className="mt-4 text-lg text-slate-500">We're here to help. Find answers to your questions or get in touch with our support team.</p>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl">
            <Mail className="h-8 w-8 text-indigo-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-900">Email Support</h3>
            <p className="text-slate-500 mt-2">Send us an email anytime.</p>
            <a href="mailto:support@investiq.com" className="mt-4 text-indigo-600 font-medium hover:underline">support@investiq.com</a>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl">
            <Phone className="h-8 w-8 text-indigo-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-900">Toll-Free Number</h3>
            <p className="text-slate-500 mt-2">Available Mon-Fri, 9am - 6pm.</p>
            <a href="tel:18001234567" className="mt-4 text-indigo-600 font-medium hover:underline">1800-123-4567</a>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-slate-50 p-4 rounded-xl cursor-pointer">
                <summary className="flex justify-between items-center font-medium text-slate-900 list-none">
                  {faq.question}
                  <span className="transition group-open:rotate-180">
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </span>
                </summary>
                <p className="text-slate-500 mt-4 leading-relaxed pl-2 border-l-2 border-indigo-200">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
