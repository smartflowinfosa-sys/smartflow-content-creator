import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Auth from "./Auth"; 
import { User, Settings, LogOut, Crown, Trash2, X, Lock, Globe, Palette, Check, Calendar, Clock } from 'lucide-react';

// ==========================================
// 1. مكون كارت المحتوى (مستقل ليتعامل مع الجدولة الخاصة به)
// ==========================================
const ContentCard = ({ item, handleDelete, isDark }) => {
  let aiData: any = null;
  try {
    if (item.ai_generated_json) {
      aiData = typeof item.ai_generated_json === 'string' ? JSON.parse(item.ai_generated_json) : item.ai_generated_json;
    }
  } catch(e) {
    console.error("خطأ", e);
  }

  const hook = aiData?.social_media_copy?.hook || '';
  const caption = aiData?.social_media_copy?.caption || item.user_prompt || 'جاري المعالجة...';

  // حالات الجدولة الخاصة بكل كرت
  const [tiktok, setTiktok] = useState(false);
  const [instagram, setInstagram] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSchedule = async () => {
    if (!tiktok && !instagram) return alert("الرجاء اختيار منصة واحدة على الأقل للنشر");
    if (!scheduleDate || !scheduleTime) return alert("الرجاء تحديد تاريخ ووقت النشر");
    
    setIsPublishing(true);
    
    try {
      // هنا يمكنك لاحقاً ربط الـ Webhook الخاص بنشر N8N وإرسال التاريخ والوقت
      await new Promise(resolve => setTimeout(resolve, 1500)); // محاكاة للتحميل
      alert(`تمت جدولة النشر بنجاح! 📅\nسيتم النشر يوم ${scheduleDate} الساعة ${scheduleTime}`);
    } catch (error) {
      alert("حدث خطأ أثناء الجدولة");
    } finally {
      setIsPublishing(false);
    }
  };

  // تنسيقات الثيم للكارت
  const cardBg = isDark ? 'bg-slate-900/80 border-slate-700/60 text-white shadow-xl' : 'bg-white border-slate-200 text-slate-900 shadow-lg';
  const headerBg = isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200';
  const textPrimary = isDark ? 'text-white border-slate-800/80' : 'text-slate-900 border-slate-200';
  const textSecondary = isDark ? 'text-slate-300' : 'text-slate-600';
  const footerBg = isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200';
  const inputBg = isDark ? 'bg-slate-900 border-slate-700 text-slate-300 focus:border-purple-500' : 'bg-white border-slate-300 text-slate-900 focus:border-purple-500';

  return (
    <div className={`${cardBg} backdrop-blur-xl rounded-[2rem] border overflow-hidden transition-all duration-300 flex flex-col h-full group hover:border-purple-500/50 hover:shadow-[0_10px_40px_-15px_rgba(168,85,247,0.3)]`}>
      
      {/* رأس الكارت */}
      <div className={`p-5 flex justify-between items-center border-b ${headerBg}`}>
        <span className="text-xs font-black text-white bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-1.5 rounded-lg shadow-md">
          {item.content_type === 'promo_video' ? '🎥 فيديو' : '📝 محتوى'}
        </span>
        
        <div className="flex items-center gap-2">
          <button onClick={() => handleDelete(item.id)} className={`p-1.5 rounded-lg transition-colors border border-transparent ${isDark ? 'text-slate-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20' : 'text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100'}`} title="حذف المكتبة">
            <Trash2 size={16} />
          </button>
          <button onClick={() => { navigator.clipboard.writeText(`${hook}\n\n${caption}`); alert('تم النسخ! 📋'); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border flex items-center gap-2 ${isDark ? 'text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border-slate-700' : 'text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border-slate-300 shadow-sm'}`}>
            <span>نسخ</span> <span>📋</span>
          </button>
        </div>
      </div>

      {/* المحتوى النصي */}
      <div className="p-6 flex-1 flex flex-col">
        {hook && <h3 className={`font-black text-lg mb-4 pb-4 border-b leading-snug drop-shadow-sm ${textPrimary}`}>{hook}</h3>}
        <p className={`text-sm leading-relaxed flex-1 whitespace-pre-wrap font-medium ${textSecondary}`}>{caption}</p>
      </div>

      {/* منطقة الجدولة والنشر */}
      <div className={`p-5 border-t ${footerBg}`}>
        <p className={`text-sm font-bold mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>جدولة ونشر المحتوى:</p>
        
        {/* اختيار المنصات */}
        <div className="flex gap-3 mb-4">
          <label className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all select-none ${tiktok ? 'bg-[#25F4EE]/10 border-[#25F4EE]/50 text-[#25F4EE]' : isDark ? 'bg-slate-900/50 border-slate-700 text-slate-400' : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'}`}>
            <input type="checkbox" className="hidden" checked={tiktok} onChange={e=>setTiktok(e.target.checked)}/>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.63 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            <span className="text-sm font-bold">تيك توك</span>
            {tiktok && <Check size={14} className="ml-1" />}
          </label>
          <label className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all select-none ${instagram ? 'bg-pink-500/10 border-pink-500/50 text-pink-500' : isDark ? 'bg-slate-900/50 border-slate-700 text-slate-400' : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'}`}>
            <input type="checkbox" className="hidden" checked={instagram} onChange={e=>setInstagram(e.target.checked)}/>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            <span className="text-sm font-bold">إنستقرام</span>
            {instagram && <Check size={14} className="ml-1" />}
          </label>
        </div>

        {/* اختيار التاريخ والوقت */}
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Calendar className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            <input type="date" value={scheduleDate} onChange={e=>setScheduleDate(e.target.value)} className={`w-full border rounded-xl pr-9 pl-3 py-2.5 text-sm outline-none transition-colors ${inputBg}`} />
          </div>
          <div className="relative flex-1">
            <Clock className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            <input type="time" value={scheduleTime} onChange={e=>setScheduleTime(e.target.value)} className={`w-full border rounded-xl pr-9 pl-3 py-2.5 text-sm outline-none transition-colors ${inputBg}`} />
          </div>
        </div>

        <button onClick={handleSchedule} disabled={isPublishing} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-colors text-sm flex justify-center items-center gap-2 disabled:opacity-50">
          {isPublishing ? "جاري الجدولة..." : "جدولة النشر 🚀"}
        </button>
      </div>
    </div>
  );
};


// ==========================================
// 2. التطبيق الرئيسي (App)
// ==========================================
export default function App() {
  const [session, setSession] = useState<any>(null);
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("promo_video");
  const [activityType, setActivityType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  
  // حالات الواجهة 
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // حالات الإعدادات (تُحفظ تلقائياً عند تغييرها)
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('ar');
  const [newPassword, setNewPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const isDark = theme === 'dark';

  // قائمة الأنشطة المُحدثة
  const saudiActivities = [
    "المطاعم والمقاهي (F&B)",
    "العقارات وإدارة الأملاك",
    "المتاجر الإلكترونية (قطاع التجزئة)",
    "مراكز التجميل والصالونات",
    "العيادات والمراكز الطبية",
    "تنظيم الفعاليات والمؤتمرات",
    "تجهيز المناسبات والضيافة",
    "السياحة والسفر",
    "النوادي الرياضية واللياقة البدنية"
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const fetchResults = async () => {
    if (!session?.user?.id) return; 
    setIsLoadingResults(true);
    try {
      const { data, error } = await supabase.from('content_pipeline').select('*').eq('store_id', session.user.id).order('created_at', { ascending: false }).limit(6); 
      if (error) throw error;
      if (data) setResults(data);
    } catch (error) {
      console.error("خطأ:", error);
    } finally {
      setIsLoadingResults(false);
    }
  };

  useEffect(() => {
    if (session) fetchResults();
  }, [session]);

  const handleDelete = async (id: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذه المكتبة بشكل نهائي؟")) {
      try {
        const { error } = await supabase.from('content_pipeline').delete().eq('id', id);
        if (error) throw error;
        setResults(results.filter(item => item.id !== id));
      } catch (error) {
        alert("حدث خطأ أثناء الحذف.");
      }
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) return alert("كلمة المرور يجب أن تتكون من 6 أحرف أو أرقام على الأقل.");
    setIsUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      alert("تم تحديث كلمة المرور بنجاح! 🔒");
      setNewPassword("");
    } catch (error: any) {
      alert("حدث خطأ: " + error.message);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return alert("الرجاء تسجيل الدخول أولاً");
    if (!activityType) return alert("الرجاء اختيار نوع النشاط التجاري");

    setIsSubmitting(true);
    const webhookUrl = "https://n8n-p10bgpahkliy9hghak21zv3e.178.105.219.96.sslip.io/webhook/generate-content";

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          store_id: session.user.id, 
          activity_type: activityType, 
          content_type: contentType,
          prompt: prompt,
        }),
      });
      alert("تم إرسال طلبك للمصنع! 🚀 سيتم تجهيز المحتوى خلال ثوانٍ.");
      setPrompt("");
      setTimeout(fetchResults, 4000); 
    } catch (error) {
      alert("حدث خطأ أثناء الاتصال بالمصنع.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) return <Auth />;

  // الألوان الديناميكية للواجهة بناءً على الثيم
  const mainBg = isDark ? 'bg-slate-950' : 'bg-slate-50';
  const textMain = isDark ? 'text-white' : 'text-slate-900';
  const panelBg = isDark ? 'bg-slate-900/60 border-slate-700/50' : 'bg-white/80 border-slate-200 shadow-2xl';
  const inputBg = isDark ? 'bg-slate-950/50 border-slate-700/80 text-white' : 'bg-slate-50 border-slate-300 text-slate-900';
  const labelColor = isDark ? 'text-slate-300' : 'text-slate-700';

  return (
    <div className={`relative min-h-screen p-4 font-sans flex flex-col items-center overflow-x-hidden transition-colors duration-500 ${mainBg}`} dir="rtl">

      {/* نافذة الإعدادات المنبثقة (Settings Modal) */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className={`${isDark ? 'bg-slate-900 border-slate-700/80' : 'bg-white border-slate-200'} border rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200 transition-colors`}>
            
            {/* رأس النافذة */}
            <div className={`px-6 py-4 border-b flex justify-between items-center ${isDark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-100 bg-slate-50'}`}>
              <h3 className={`text-lg font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Settings className="text-purple-500" size={20} />
                إعدادات الحساب
              </h3>
              <button onClick={() => setIsSettingsOpen(false)} className={`p-2 rounded-full transition ${isDark ? 'text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700' : 'text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'}`}>
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              
              {/* اللغة (تُحفظ تلقائياً) */}
              <div className="space-y-3">
                <label className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Globe size={16} className="text-blue-400"/> لغة الواجهة
                </label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 outline-none transition-colors ${isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500'}`}
                >
                  <option value="ar">العربية (Arabic)</option>
                  <option value="en">English (الإنجليزية)</option>
                </select>
              </div>

              {/* الثيم (يُحفظ تلقائياً) */}
              <div className="space-y-3">
                <label className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Palette size={16} className="text-pink-400"/> المظهر (الثيم)
                </label>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all border ${theme === 'dark' ? 'bg-purple-600/20 border-purple-500 text-purple-400' : isDark ? 'bg-slate-950 border-slate-700 text-slate-400 hover:bg-slate-800' : 'bg-slate-50 border-slate-300 text-slate-500 hover:bg-slate-200'}`}>
                    داكن (Dark)
                  </button>
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all border ${theme === 'light' ? 'bg-purple-600/10 border-purple-500 text-purple-600' : isDark ? 'bg-slate-950 border-slate-700 text-slate-400 hover:bg-slate-800' : 'bg-slate-50 border-slate-300 text-slate-500 hover:bg-slate-200'}`}>
                    فاتح (Light)
                  </button>
                </div>
              </div>

              <div className={`h-px my-2 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>

              {/* كلمة المرور (مفصولة بزر تحديث خاص بها) */}
              <div className="space-y-3 bg-slate-500/5 p-4 rounded-2xl border border-slate-500/10">
                <label className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Lock size={16} className="text-green-500"/> تغيير كلمة المرور
                </label>
                <div className="flex gap-2">
                  <input 
                    type="password" 
                    placeholder="كلمة المرور الجديدة..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`flex-1 border rounded-xl px-4 py-3 outline-none text-sm transition-colors ${isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-green-500' : 'bg-white border-slate-300 text-slate-900 focus:border-green-500'}`}
                  />
                  <button 
                    onClick={handleUpdatePassword}
                    disabled={isUpdatingPassword}
                    className="bg-green-600 hover:bg-green-500 text-white px-5 rounded-xl font-bold text-sm transition disabled:opacity-50"
                  >
                    {isUpdatingPassword ? "جاري..." : "تحديث"}
                  </button>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  ملاحظة: خيارات اللغة والثيم تُحفظ تلقائياً دون الحاجة لضغط زر التحديث.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* خلفية الاستوديو الزخرفية */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <div className={`text-[35rem] drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] select-none ${isDark ? 'opacity-[0.02]' : 'opacity-[0.04]'}`}>🎥</div>
        <div className={`absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] ${isDark ? 'bg-purple-600/20' : 'bg-purple-400/20'}`}></div>
        <div className={`absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] ${isDark ? 'bg-blue-600/20' : 'bg-blue-400/20'}`}></div>
      </div>

      {/* شريط قائمة البروفايل */}
      <div className="absolute top-4 left-0 right-0 px-6 flex justify-end items-center z-50 w-full max-w-7xl mx-auto">
        <div className="relative inline-block text-right">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center justify-center w-11 h-11 border rounded-full transition-all backdrop-blur-md shadow-lg ${isDark ? 'bg-slate-900/50 hover:bg-slate-800 border-slate-700 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'}`}
          >
            <User size={20} />
          </button>

          {isProfileOpen && (
            <div className={`absolute left-0 mt-3 w-64 border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl z-50 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
              <div className={`px-5 py-4 border-b flex items-center gap-3 ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-50 border-slate-100'}`}>
                <div className="bg-yellow-500/20 p-2 rounded-lg"><Crown size={20} className="text-yellow-500" /></div>
                <div>
                  <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>الباقة الحالية</p>
                  <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>الباقة المجانية (Free)</p>
                </div>
              </div>

              <button onClick={() => { setIsSettingsOpen(true); setIsProfileOpen(false); }} className={`w-full text-right px-5 py-3.5 text-sm flex items-center gap-3 transition-colors font-medium ${isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                <Settings size={18} className={isDark ? 'text-slate-400' : 'text-slate-500'} />
                الإعدادات
              </button>

              <button onClick={() => supabase.auth.signOut()} className={`w-full text-right px-5 py-3.5 text-sm flex items-center gap-3 transition-colors border-t font-medium ${isDark ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10 border-slate-700/50' : 'text-red-500 hover:text-red-600 hover:bg-red-50 border-slate-100'}`}>
                <LogOut size={18} />
                تسجيل الخروج
              </button>
            </div>
          )}
        </div>
      </div>

      {/* كابينة التحكم (لوحة التوليد) */}
      <div className={`relative z-10 backdrop-blur-2xl p-10 rounded-[2.5rem] border w-full max-w-xl mt-20 transition-colors duration-500 ${panelBg}`}>
        <div className="absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

        <div className="text-center mb-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold mb-4 border border-blue-500/20">
            الاستوديو الذكي المتكامل
          </span>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-3 drop-shadow-xl">
            SmartFlow
          </h1>
          <p className={`font-medium text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>وكالتك التسويقية في مكان واحد. ألف، صمم، وانشر بضغطة زر.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className={`block text-sm font-bold px-1 ${labelColor}`}>نوع النشاط التجاري:</label>
            <div className="relative">
              <select value={activityType} onChange={(e) => setActivityType(e.target.value)} required className={`w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none outline-none font-medium ${inputBg}`}>
                <option value="" disabled className="text-slate-500">اختر النشاط التجاري...</option>
                {saudiActivities.map((activity, index) => <option key={index} value={activity} className={isDark ? 'bg-slate-900' : 'bg-white'}>{activity}</option>)}
              </select>
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400">▼</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-bold px-1 ${labelColor}`}>نوع الإنتاج المطلوب:</label>
            <div className="relative">
              <select value={contentType} onChange={(e) => setContentType(e.target.value)} className={`w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none outline-none font-medium ${inputBg}`}>
                <optgroup label="الإنتاج المرئي والترويج" className={isDark ? 'bg-slate-900' : 'bg-slate-100'}>
                  <option value="promo_video">🎥 فيديو إعلاني قصير (تيك توك / ريلز)</option>
                  <option value="delivery_campaign">🛵 تصميم حملة لتطبيقات التوصيل</option>
                  <option value="product_shot">📸 تصميم بوستر عرض خاص</option>
                </optgroup>
                <optgroup label="المحتوى النصي والإدارة" className={isDark ? 'bg-slate-900' : 'bg-slate-100'}>
                  <option value="social_caption">📝 خطة محتوى أسبوعية متكاملة</option>
                  <option value="ad_script">🎙️ كتابة سكريبت إعلاني جذاب</option>
                  <option value="customer_response">💬 رد ذكي واحترافي على التقييمات</option>
                </optgroup>
              </select>
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400">▼</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-bold px-1 ${labelColor}`}>الفكرة التسويقية:</label>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} required className={`w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-none outline-none leading-relaxed ${inputBg}`} rows={4} placeholder="اكتب فكرتك هنا (مثال: إعلان لقهوة مختصة)..."></textarea>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={isSubmitting} className="relative w-full group overflow-hidden py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-black text-lg shadow-[0_10px_40px_-10px_rgba(168,85,247,0.8)] hover:shadow-[0_10px_50px_-10px_rgba(168,85,247,1)] transform active:scale-[0.98] transition-all duration-300 disabled:opacity-50">
              <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? <><span>⏳</span> <span>جاري الإنتاج في الاستوديو...</span></> : <><span>✨</span> <span>أطلق الحملة الآن</span></>}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* أرشيف الحملات */}
      <div className="relative z-10 w-full max-w-5xl mt-24 mb-20">
        <div className={`flex justify-between items-center mb-8 px-4 border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-300'}`}>
          <h2 className={`text-2xl font-black flex items-center gap-3 ${textMain}`}>
            <span className={`p-2 rounded-xl border text-xl ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>📁</span>
            <span>مكتبة الحملات الجاهزة</span>
          </h2>
          <button onClick={fetchResults} disabled={isLoadingResults} className={`px-5 py-2.5 rounded-xl border transition-all text-sm font-bold flex items-center gap-2 backdrop-blur-sm ${isDark ? 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700 hover:border-slate-500 hover:bg-slate-800' : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-400 hover:bg-slate-50 shadow-sm'}`}>
            {isLoadingResults ? "⏳ تحديث..." : "🔄 تزامن القائمة"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.length === 0 && !isLoadingResults ? (
            <div className={`col-span-full flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed backdrop-blur-sm ${isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-100/50 border-slate-300'}`}>
              <span className="text-6xl mb-4 opacity-50">🎬</span>
              <p className={`font-medium text-lg ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>الاستوديو بانتظار إبداعك. أطلق حملتك الأولى!</p>
            </div>
          ) : (
            results.map((item, index) => (
              <ContentCard key={index} item={item} handleDelete={handleDelete} isDark={isDark} />
            ))
          )}
        </div>
      </div>

    </div>
  );
}
