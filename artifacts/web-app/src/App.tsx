import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Auth from "./Auth"; 
import { User, Settings, LogOut, Crown, Trash2, X, Lock, Globe, Palette, Check } from 'lucide-react';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("promo_video");
  const [activityType, setActivityType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  
  // حالات الواجهة الجديدة
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [publishTikTok, setPublishTikTok] = useState(false);
  const [publishInstagram, setPublishInstagram] = useState(false);
  
  // حالة كلمة المرور الجديدة
  const [newPassword, setNewPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const saudiActivities = [
    "المطاعم والمقاهي (F&B)",
    "العقارات وإدارة الأملاك",
    "المتاجر الإلكترونية (قطاع التجزئة)",
    "مراكز التجميل والصالونات",
    "العيادات والمراكز الطبية",
    "تنظيم الفعاليات والمؤتمرات",
    "الخدمات التقنية والبرمجيات",
    "السياحة والسفر",
    "النوادي الرياضية واللياقة البدنية"
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchResults = async () => {
    if (!session?.user?.id) return; 

    setIsLoadingResults(true);
    try {
      const { data, error } = await supabase
        .from('content_pipeline') 
        .select('*')
        .eq('store_id', session.user.id) 
        .order('created_at', { ascending: false }) 
        .limit(6); 

      if (error) throw error;
      if (data) setResults(data);
    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
    } finally {
      setIsLoadingResults(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchResults();
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذه المكتبة بشكل نهائي؟")) {
      try {
        const { error } = await supabase.from('content_pipeline').delete().eq('id', id);
        if (error) throw error;
        setResults(results.filter(item => item.id !== id));
      } catch (error) {
        console.error("خطأ في الحذف:", error);
        alert("حدث خطأ أثناء الحذف.");
      }
    }
  };

  // دالة تغيير كلمة المرور الفعالة
  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      return alert("كلمة المرور يجب أن تتكون من 6 أحرف أو أرقام على الأقل.");
    }
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
          publish_tiktok: publishTikTok,       // إرسال خيار تيك توك للمصنع
          publish_instagram: publishInstagram  // إرسال خيار إنستقرام للمصنع
        }),
      });
      alert("تم إرسال طلبك للمصنع! 🚀 سيتم تجهيز المحتوى خلال ثوانٍ.");
      setPrompt("");
      setPublishTikTok(false);
      setPublishInstagram(false);
      setTimeout(fetchResults, 4000); 
    } catch (error) {
      alert("حدث خطأ أثناء الاتصال بالمصنع.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="relative min-h-screen bg-slate-950 p-4 font-sans flex flex-col items-center overflow-x-hidden" dir="rtl">

      {/* نافذة الإعدادات المنبثقة (Settings Modal) */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Settings className="text-purple-500" size={20} />
                إعدادات الحساب
              </h3>
              <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 p-2 rounded-full transition">
                <X size={18} />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Language */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                  <Globe size={16} className="text-blue-400"/> لغة الواجهة
                </label>
                <select className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500">
                  <option value="ar">العربية (Arabic)</option>
                  <option value="en">English (الإنجليزية)</option>
                </select>
              </div>

              {/* Theme */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                  <Palette size={16} className="text-pink-400"/> المظهر (الثيم)
                </label>
                <div className="flex gap-3">
                  <button className="flex-1 bg-purple-600/20 border border-purple-500 text-purple-400 py-2.5 rounded-xl font-bold text-sm">داكن (Dark)</button>
                  <button className="flex-1 bg-slate-950 border border-slate-700 text-slate-400 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800">فاتح (Light)</button>
                </div>
              </div>

              <div className="h-px bg-slate-800 my-4"></div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                  <Lock size={16} className="text-green-400"/> تغيير كلمة المرور
                </label>
                <div className="flex gap-2">
                  <input 
                    type="password" 
                    placeholder="كلمة المرور الجديدة..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-green-500 text-sm"
                  />
                  <button 
                    onClick={handleUpdatePassword}
                    disabled={isUpdatingPassword}
                    className="bg-green-600 hover:bg-green-500 text-white px-5 rounded-xl font-bold text-sm transition disabled:opacity-50"
                  >
                    {isUpdatingPassword ? "جاري..." : "تحديث"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* خلفية الاستوديو */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <div className="text-[35rem] opacity-[0.02] drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] select-none">🎥</div>
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]"></div>
      </div>

      {/* شريط الأزرار العلوي */}
      <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center z-50 w-full max-w-7xl mx-auto">
        
        {/* قائمة البروفايل */}
        <div className="relative inline-block text-right">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center justify-center w-11 h-11 bg-slate-900/50 hover:bg-slate-800 border border-slate-700 text-white rounded-full transition-all backdrop-blur-md shadow-lg"
          >
            <User size={20} className="text-slate-300" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl z-50">
              <div className="px-5 py-4 bg-slate-800/50 border-b border-slate-700/50 flex items-center gap-3">
                <div className="bg-yellow-500/20 p-2 rounded-lg">
                  <Crown size={20} className="text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">الباقة الحالية</p>
                  <p className="text-xs text-slate-400 font-medium">الباقة المجانية (Free)</p>
                </div>
              </div>

              <button 
                onClick={() => {
                  setIsSettingsOpen(true);
                  setIsProfileOpen(false);
                }}
                className="w-full text-right px-5 py-3.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-3 transition-colors font-medium"
              >
                <Settings size={18} className="text-slate-400" />
                الإعدادات والمظهر
              </button>

              <button 
                onClick={() => supabase.auth.signOut()}
                className="w-full text-right px-5 py-3.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-3 transition-colors border-t border-slate-700/50 font-medium"
              >
                <LogOut size={18} />
                تسجيل الخروج
              </button>
            </div>
          )}
        </div>
      </div>

      {/* القسم الأول: كابينة التحكم */}
      <div className="relative z-10 bg-slate-900/60 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_0_80px_-20px_rgba(124,58,237,0.3)] border border-slate-700/50 w-full max-w-xl mt-20">
        <div className="absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

        <div className="text-center mb-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-4 border border-blue-500/20">
            الاستوديو الذكي المتكامل
          </span>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-3 drop-shadow-xl">
            SmartFlow
          </h1>
          <p className="text-slate-400 font-medium text-sm">وكالتك التسويقية في مكان واحد. ألف، صمم، وانشر بضغطة زر.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-300 px-1">نوع النشاط التجاري:</label>
            <div className="relative">
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                required
                className="w-full px-5 py-4 bg-slate-950/50 border border-slate-700/80 text-white rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none outline-none font-medium"
              >
                <option value="" disabled className="text-slate-500">اختر النشاط التجاري...</option>
                {saudiActivities.map((activity, index) => (
                  <option key={index} value={activity} className="bg-slate-900">
                    {activity}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400">▼</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-300 px-1">نوع الإنتاج المطلوب:</label>
            <div className="relative">
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-5 py-4 bg-slate-950/50 border border-slate-700/80 text-white rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none outline-none font-medium"
              >
                <optgroup label="الإنتاج المرئي والترويج" className="bg-slate-900">
                  <option value="promo_video">🎥 فيديو إعلاني قصير (تيك توك / ريلز)</option>
                  <option value="delivery_campaign">🛵 تصميم حملة لتطبيقات التوصيل</option>
                  <option value="product_shot">📸 تصميم بوستر عرض خاص</option>
                </optgroup>
                <optgroup label="المحتوى النصي والإدارة" className="bg-slate-900">
                  <option value="social_caption">📝 خطة محتوى أسبوعية متكاملة</option>
                  <option value="ad_script">🎙️ كتابة سكريبت إعلاني جذاب</option>
                  <option value="customer_response">💬 رد ذكي واحترافي على التقييمات</option>
                </optgroup>
              </select>
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400">▼</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-300 px-1">الفكرة التسويقية:</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              className="w-full px-5 py-4 bg-slate-950/50 border border-slate-700/80 text-white rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-none outline-none leading-relaxed"
              rows={4}
              placeholder="اكتب فكرتك هنا (مثال: أريد إعلان لقهوة مختصة بمناسبة الصيف...)"
            ></textarea>
          </div>

          {/* أزرار النشر التلقائي (Checkboxes) الجديدة */}
          <div className="space-y-3 pt-2">
            <label className="block text-sm font-bold text-slate-300 px-1">النشر التلقائي بعد الإنتاج (اختياري):</label>
            <div className="flex gap-3">
              {/* تيك توك */}
              <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200 select-none ${publishTikTok ? 'bg-[#25F4EE]/10 border-[#25F4EE]/50 text-[#25F4EE]' : 'bg-slate-950/50 border-slate-700/80 text-slate-400 hover:border-slate-600'}`}>
                <input type="checkbox" className="hidden" checked={publishTikTok} onChange={(e) => setPublishTikTok(e.target.checked)} />
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.63 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                <span className="text-sm font-bold">تيك توك</span>
                {publishTikTok && <Check size={16} className="ml-1" />}
              </label>

              {/* إنستقرام */}
              <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200 select-none ${publishInstagram ? 'bg-pink-500/10 border-pink-500/50 text-pink-400' : 'bg-slate-950/50 border-slate-700/80 text-slate-400 hover:border-slate-600'}`}>
                <input type="checkbox" className="hidden" checked={publishInstagram} onChange={(e) => setPublishInstagram(e.target.checked)} />
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                <span className="text-sm font-bold">إنستقرام</span>
                {publishInstagram && <Check size={16} className="ml-1" />}
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full group overflow-hidden py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-black text-lg shadow-[0_10px_40px_-10px_rgba(168,85,247,0.8)] hover:shadow-[0_10px_50px_-10px_rgba(168,85,247,1)] transform active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <><span>⏳</span> <span>جاري الإنتاج في الاستوديو...</span></>
                ) : (
                  <><span>✨</span> <span>أطلق الحملة الآن</span></>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* القسم الثاني: أرشيف الحملات */}
      <div className="relative z-10 w-full max-w-5xl mt-24 mb-20">
        <div className="flex justify-between items-center mb-8 px-4 border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <span className="bg-slate-800 p-2 rounded-xl border border-slate-700 text-xl">📁</span>
            <span>مكتبة الحملات الجاهزة</span>
          </h2>
          <button 
            onClick={fetchResults}
            disabled={isLoadingResults}
            className="px-5 py-2.5 bg-slate-900/80 text-slate-300 hover:text-white rounded-xl border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all text-sm font-bold flex items-center gap-2 backdrop-blur-sm"
          >
            {isLoadingResults ? "⏳ تحديث..." : "🔄 تزامن القائمة"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.length === 0 && !isLoadingResults ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed backdrop-blur-sm">
              <span className="text-6xl mb-4 opacity-50">🎬</span>
              <p className="text-slate-400 font-medium text-lg">الاستوديو بانتظار إبداعك. أطلق حملتك الأولى!</p>
            </div>
          ) : (
            results.map((item, index) => {
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

              return (
                <div key={index} className="bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-slate-700/60 overflow-hidden hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-[0_10px_40px_-15px_rgba(168,85,247,0.3)] flex flex-col h-full group">
                  
                  {/* رأس الكارت المنظف */}
                  <div className="p-5 flex justify-between items-center bg-slate-950/50 border-b border-slate-800/80">
                    <span className="text-xs font-black text-white bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-1.5 rounded-lg shadow-md">
                      {item.content_type === 'promo_video' ? '🎥 فيديو' : '📝 محتوى'}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20" title="حذف المكتبة">
                        <Trash2 size={16} />
                      </button>
                      <button onClick={() => { navigator.clipboard.writeText(`${hook}\n\n${caption}`); alert('تم النسخ! 📋'); }} className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-slate-700 flex items-center gap-2">
                        <span>نسخ</span> <span>📋</span>
                      </button>
                    </div>
                  </div>

                  {/* المحتوى النصي */}
                  <div className="p-6 flex-1 flex flex-col">
                    {hook && <h3 className="text-white font-black text-lg mb-4 pb-4 border-b border-slate-800/80 leading-snug drop-shadow-sm">{hook}</h3>}
                    <p className="text-slate-300 text-sm leading-relaxed flex-1 whitespace-pre-wrap font-medium">{caption}</p>
                  </div>
                  
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
