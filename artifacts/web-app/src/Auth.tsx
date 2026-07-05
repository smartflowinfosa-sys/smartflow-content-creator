import { useState } from 'react';
import { supabase } from './supabase';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [isArabic, setIsArabic] = useState(true); // حالة اللغة

  // قاموس النصوص للغتين
  const content = {
    ar: {
      title: 'SmartFlow',
      subtitleLogin: 'سجل دخولك لإدارة علامتك التجارية',
      subtitleSignup: 'أنشئ حسابك الجديد وابدأ الأتمتة',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'name@store.com',
      password: 'كلمة المرور',
      passwordPlaceholder: '••••••••',
      loginBtn: 'دخول ✨',
      signupBtn: 'إنشاء حساب 🚀',
      loading: 'جاري التحميل...',
      noAccount: 'ليس لديك حساب؟ ',
      hasAccount: 'لديك حساب بالفعل؟ ',
      switchSignup: 'سجل الآن',
      switchLogin: 'تسجيل الدخول',
      successMsg: 'تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.',
      langToggle: 'English 🌐',
    },
    en: {
      title: 'SmartFlow',
      subtitleLogin: 'Sign in to manage your brand',
      subtitleSignup: 'Create your account to start automation',
      email: 'Email Address',
      emailPlaceholder: 'name@store.com',
      password: 'Password',
      passwordPlaceholder: '••••••••',
      loginBtn: 'Sign In ✨',
      signupBtn: 'Sign Up 🚀',
      loading: 'Loading...',
      noAccount: "Don't have an account? ",
      hasAccount: 'Already have an account? ',
      switchSignup: 'Sign Up now',
      switchLogin: 'Sign In',
      successMsg: 'Account created successfully! You can now log in.',
      langToggle: 'العربية 🌐',
    }
  };

  const t = isArabic ? content.ar : content.en;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage(t.successMsg);
        setIsLogin(true);
      }
    } catch (error: any) {
      setMessage(error.message || 'حدث خطأ ما');
    } finally {
      setLoading(false);
    }
  };

  return (
    // الخلفية الحيوية والتفاعلية
    <div 
      className="relative flex items-center justify-center min-h-screen bg-slate-950 font-sans overflow-hidden transition-all duration-500"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* كرات مضيئة في الخلفية لتعطي طابع 3D وحيوي */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* زر تبديل اللغة (ثابت أعلى يسار الشاشة دائماً) */}
      <button
        onClick={() => setIsArabic(!isArabic)}
        className="absolute top-6 left-6 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-purple-500/20 active:scale-95"
      >
        {t.langToggle}
      </button>

      {/* كارت تسجيل الدخول الزجاجي 3D */}
      <div className="relative z-10 w-full max-w-md p-10 space-y-8 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] hover:shadow-[0_0_60px_-15px_rgba(168,85,247,0.4)] hover:-translate-y-2 transition-all duration-500">

        <div className="text-center">
          <h2 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
            {t.title}
          </h2>
          <p className="mt-3 text-sm text-slate-400 font-medium">
            {isLogin ? t.subtitleLogin : t.subtitleSignup}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5 mt-8">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-300 px-1">{t.email}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:outline-none text-white transition-all shadow-inner"
              placeholder={t.emailPlaceholder}
              dir="ltr"
              style={{ textAlign: isArabic ? 'right' : 'left' }}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-300 px-1">{t.password}</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 bg-slate-950/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:outline-none text-white transition-all shadow-inner"
              placeholder={t.passwordPlaceholder}
              dir="ltr"
              style={{ textAlign: isArabic ? 'right' : 'left' }}
            />
          </div>

          {message && (
            <div className={`p-3 rounded-xl text-sm text-center border ${message.includes('بنجاح') || message.includes('successfully') ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
              {message}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden py-4 text-white font-bold rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-[0_10px_20px_-10px_rgba(168,85,247,0.6)] hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.8)] transform active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:active:scale-100"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full"></div>
              <span className="relative z-10">{loading ? t.loading : (isLogin ? t.loginBtn : t.signupBtn)}</span>
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-slate-400 font-medium">
          {isLogin ? t.noAccount : t.hasAccount}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
            }}
            className="text-purple-400 hover:text-purple-300 hover:underline focus:outline-none transition-colors"
          >
            {isLogin ? t.switchSignup : t.switchLogin}
          </button>
        </p>
      </div>
    </div>
  );
}