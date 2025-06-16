import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lia",
  description: "Modern AI chatbot with speech and copy capabilities with Lia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css"
        />
      </head>
      <body className="bg-slate-900 text-slate-100">
        <div className="modern-grid min-h-screen">
          <div className="electric-line"></div>
          <div className="electric-line"></div>
          <div className="electric-line"></div>
          <div className="electric-line"></div>
          
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-indigo-500/20">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              <div className="text-3xl font-bold gradient-text tracking-tight">Lia</div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-slate-300 hover:text-indigo-400 transition-colors">Features</a>
                <a href="#pricing" className="text-slate-300 hover:text-indigo-400 transition-colors">Pricing</a>
                <a href="https://helaart.online" className="gradient-bg text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
                  Contact us
                </a>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="pt-20">
            {/* Hero Section */}
            <section className="hero-pattern py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
                    Experience the Future of AI Communication
                  </h1>
                  <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                    Meet Lia, your intelligent AI companion that understands, learns, and grows with you.
                    Experience natural conversations and seamless interactions.
                  </p>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4 gradient-text">Powerful Features</h2>
                  <p className="text-xl text-slate-300">Discover what makes Lia unique</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="feature-card p-6 rounded-2xl">
                    <div className="w-12 h-12 gradient-bg rounded-xl mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Smart Conversations</h3>
                    <p className="text-slate-300">Natural language processing for fluid, human-like interactions</p>
                  </div>
                  <div className="feature-card p-6 rounded-2xl">
                    <div className="w-12 h-12 gradient-bg rounded-xl mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Voice Interaction</h3>
                    <p className="text-slate-300">Speak naturally with state-of-the-art speech recognition</p>
                  </div>
                  <div className="feature-card p-6 rounded-2xl">
                    <div className="w-12 h-12 gradient-bg rounded-xl mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Copy Capabilities</h3>
                    <p className="text-slate-300">Easily copy and share your conversations with one click</p>
                  </div>
                  <div className="feature-card p-6 rounded-2xl">
                    <div className="w-12 h-12 gradient-bg rounded-xl mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">AI Learning</h3>
                    <p className="text-slate-300">Continuously improves through advanced machine learning</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4 gradient-text">Flexible Pricing Plans</h2>
                  <p className="text-xl text-slate-300">Choose the perfect plan for your needs</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="pricing-card p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-4 text-white">Starter</h3>
                    <div className="text-4xl font-bold mb-6 gradient-text">Coming Soon</div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-center text-slate-300">
                        <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Limited Messages
                      </li>
                      <li className="flex items-center text-slate-300">
                        <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Email Support
                      </li>
                    </ul>
                    <a href="https://helaart.online" className="block text-center gradient-bg text-white px-6 py-3 rounded-full hover:shadow-lg transition-all">
                      Contact Us
                    </a>
                  </div>
                  <div className="pricing-card p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-4 text-white">Professional</h3>
                    <div className="text-4xl font-bold mb-6 gradient-text">Coming Soon</div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-center text-slate-300">
                        <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Unlimited Messages
                      </li>
                      <li className="flex items-center text-slate-300">
                        <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        24/7 Priority Support
                      </li>
                    </ul>
                    <a href="https://helaart.online" className="block text-center gradient-bg text-white px-6 py-3 rounded-full hover:shadow-lg transition-all">
                      Contact Us
                    </a>
                  </div>
                  <div className="pricing-card p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-4 text-white">Enterprise</h3>
                    <div className="text-4xl font-bold mb-6 gradient-text">Custom</div>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-center text-slate-300">
                        <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Custom AI Solutions
                      </li>
                      <li className="flex items-center text-slate-300">
                        <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Dedicated Support
                      </li>
                      <li className="flex items-center text-slate-300">
                        <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Custom Integration
                      </li>
                    </ul>
                    <a href="https://helaart.online" className="block text-center gradient-bg text-white px-6 py-3 rounded-full hover:shadow-lg transition-all">
                      Contact Sales
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold mb-6 gradient-text">Ready to Experience the Future?</h2>
                <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                  Join thousands of users who are already transforming their communication with Lia.
                </p>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="py-8 text-center text-slate-400">
            <p>© 2025 Helaart. All rights reserved.</p>
          </footer>
        </div>
        {children}
      </body>
    </html>
  );
}
