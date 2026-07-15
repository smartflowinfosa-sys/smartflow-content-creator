import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Auth from "./Auth"; 
import { User, Settings, LogOut, Crown, Trash2, X, Lock, Globe, Palette, Copy, CheckCircle2, Instagram, Info, Loader2, Wallet, CreditCard, Shield, Sliders } from 'lucide-react';

// ==========================================
// 1. قاموس الترجمة المحدث (عربي / إنجليزي)
// ==========================================
const translations = {
  ar: {
    dir: "rtl",
    appTitle: "SmartFlow",
    appDesc: "وكالتك التسويقية في مكان واحد. ألف، صمم، وانشر بضغطة زر.",
    badge: "الاستوديو الذكي المتكامل",
    currentPlan: "الباقة الحالية",
    freePlan: "الباقة المجانية (Free)",
    settings: "إعدادات الحساب",
    logout: "تسجيل الخروج",
    langUi: "لغة الواجهة",
    theme: "المظهر (الثيم)",
    dark: "داكن (Dark)",
    light: "فاتح (Light)",
    changePass: "تغيير كلمة المرور",
    passPlaceholder: "كلمة المرور الجديدة...",
    update: "تحديث",
    updating: "جاري التحديث...",
    passNote: "ملاحظة: خيارات اللغة والثيم تُحفظ تلقائياً دون الحاجة لضغط زر التحديث.",
    socialAuth: "ربط حسابات التواصل",
    connectIg: "ربط حساب إنستقرام",
    disconnectIg: "فصل الحساب",
    disconnectConfirm: "هل أنت متأكد أنك تريد فصل حساب إنستقرام عن المنصة؟ سيتم إيقاف النشر التلقائي.",
    disconnected: "تم فصل الحساب بنجاح.",
    igTrustMsg: "نحن نطلب الصلاحيات الأساسية فقط لجدولة ونشر المحتوى بالنيابة عنك. لا نصل أبداً لرسائلك الخاصة ولا نشارك بياناتك مع أي طرف.",
    bizCategory: "نوع النشاط التجاري:",
    bizPlaceholder: "اختر النشاط التجاري...",
    contentType: "نوع الإنتاج المطلوب:",
    videoPromo: "🎥 فيديو إعلاني قصير (تيك توك / ريلز)",
    deliveryApp: "🛵 تصميم حملة لتطبيقات التوصيل",
    poster: "📸 تصميم بوستر عرض خاص",
    contentPlan: "📝 خطة محتوى أسبوعية متكاملة",
    adScript: "🎙️ كتابة سكريبت إعلاني جذاب",
    reply: "💬 رد ذكي واحترافي على التقييمات",
    idea: "الفكرة التسويقية:",
    ideaPlaceholder: "اكتب فكرتك هنا (مثال: إعلان لقهوة مختصة)...",
    launchBtn: "أطلق الحملة الآن",
    producing: "جاري الإنتاج في الاستوديو...",
    libraryTitle: "مكتبة الحملات الجاهزة",
    syncBtn: "تزامن القائمة",
    syncing: "تحديث...",
    emptyLib: "الاستوديو بانتظار إبداعك. أطلق حملتك الأولى!",
    videoBadge: "🎥 فيديو",
    textBadge: "📝 محتوى",
    copy: "نسخ",
    copied: "تم النسخ!",
    scheduleTitle: "جدولة ونشر المحتوى:",
    tiktok: "تيك توك",
    instagram: "إنستقرام",
    post: "بوست",
    story: "ستوري",
    reelsPost: "ريلز/بوست",
    scheduleBtn: "جدولة النشر 🚀",
    scheduling: "جاري الجدولة...",
    deleteConfirm: "هل أنت متأكد من حذف هذه المكتبة بشكل نهائي؟",
    platformValidation: "الرجاء اختيار منصة واحدة ونوع نشر على الأقل",
    dateValidation: "الرجاء تحديد تاريخ ووقت النشر",
    scheduleSuccess: "تمت جدولة النشر بنجاح! 📅\nسيتم النشر يوم {date} الساعة {time}",
    visualGroup: "الإنتاج المرئي والترويج",
    textGroup: "المحتوى النصي والإدارة",
    activities: [
      "المطاعم والمقاهي (F&B)", "العقارات وإدارة الأملاك", "المتاجر الإلكترونية (قطاع التجزئة)",
      "مراكز التجميل والصالونات", "العيادات والمراكز الطبية", "تنظيم الفعاليات والمؤتمرات",
      "تجهيز المناسبات والضيافة", "السياحة والسفر", "النوادي الرياضية واللياقة البدنية"
    ],
    // إضافات جديدة للرصيد والقائمة الجانبية
    credits: "الرصيد المتاح",
    points: "نقطة",
    buyCredits: "شراء رصيد إضافي",
    tabGeneral: "إعدادات عامة",
    tabBilling: "الباقة والأرصدة",
    tabSecurity: "الأمان والمرور",
    tabConnections: "ربط الحسابات"
  },
  en: {
    dir: "ltr",
    appTitle: "SmartFlow",
    appDesc: "Your marketing agency in one place. Prompt, design, and publish.",
    badge: "Integrated Smart Studio",
    currentPlan: "Current Plan",
    freePlan: "Free Plan",
    settings: "Account Settings",
    logout: "Logout",
    langUi: "Interface Language",
    theme: "Theme",
    dark: "Dark",
    light: "Light",
    changePass: "Change Password",
    passPlaceholder: "New password...",
    update: "Update",
    updating: "Updating...",
    passNote: "Note: Language and Theme settings are saved automatically.",
    socialAuth: "Social Connections",
    connectIg: "Connect Instagram",
    disconnectIg: "Disconnect Account",
    disconnectConfirm: "Are you sure you want to disconnect your Instagram account? Auto-publishing will stop.",
    disconnected: "Account disconnected successfully.",
    igTrustMsg: "We only request essential permissions to schedule and publish content on your behalf. We never access your DMs or share your data.",
    bizCategory: "Business Category:",
    bizPlaceholder: "Select business category...",
    contentType: "Content Type:",
    videoPromo: "🎥 Short Promo Video (TikTok/Reels)",
    deliveryApp: "🛵 Delivery App Campaign",
    poster: "📸 Special Offer Poster",
    contentPlan: "📝 Full Weekly Content Plan",
    adScript: "🎙️ Engaging Ad Script",
    reply: "💬 Smart Review Responses",
    idea: "Marketing Idea:",
    ideaPlaceholder: "Type your idea here (e.g., Specialty coffee summer promo)...",
    launchBtn: "Launch Campaign Now",
    producing: "Producing in studio...",
    libraryTitle: "Campaign Library",
    syncBtn: "Sync List",
    syncing: "Syncing...",
    emptyLib: "Studio is waiting for your creativity. Launch your first campaign!",
    videoBadge: "🎥 Video",
    textBadge: "📝 Content",
    copy: "Copy",
    copied: "Copied!",
    scheduleTitle: "Schedule & Publish Content:",
    tiktok: "TikTok",
    instagram: "Instagram",
    post: "Post",
    story: "Story",
    reelsPost: "Reels/Post",
    scheduleBtn: "Schedule Publish 🚀",
    scheduling: "Scheduling...",
    deleteConfirm: "Are you sure you want to delete this permanently?",
    platformValidation: "Please select at least one platform and post type",
    dateValidation: "Please select both date and time",
    scheduleSuccess: "Scheduled successfully! 📅\nWill be published on {date} at {time}",
    visualGroup: "Visual Production",
    textGroup: "Text & Management",
    activities: [
      "Restaurants & Cafes (F&B)", "Real Estate & Property Mgt", "E-commerce (Retail)",
      "Beauty Salons & Centers", "Clinics & Medical Centers", "Events & Conferences",
      "Event Planning & Hospitality", "Travel & Tourism", "Sports & Fitness Clubs"
    ],
    // إضافات جديدة للرصيد والقائمة الجانبية
    credits: "Available Credits",
    points: "pts",
    buyCredits: "Buy More Credits",
    tabGeneral: "General",
    tabBilling: "Billing & Credits",
    tabSecurity: "Security",
    tabConnections: "Connections"
  }
};

// ==========================================
// 2. مكون كارت المحتوى المستقل
// ==========================================
const ContentCard = ({ item, handleDelete, isDark, t }) => {
  let aiData: any = null;
  try {
    if (item.ai_generated_json) {
      aiData = typeof item.ai_generated_json === 'string' ? JSON.parse(item.ai_generated_json) : item.ai_generated_json;
    }
  } catch(e) {
    console.error(e);
  }

  const hook = aiData?.social_media_copy?.hook || '';
  const caption = aiData?.social_media_copy?.caption || item.user_prompt || '...';

  const [tkPost, setTkPost] = useState(false);
  const [tkStory, setTkStory] = useState(false);
  const [igPost, setIgPost] = useState(false);
  const [igStory, setIgStory] = useState(false);
  
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSchedule = async () => {
    if (!tkPost && !tkStory && !igPost && !igStory) return alert(t.platformValidation);
    if (!scheduleDate || !scheduleTime) return alert(t.dateValidation);
    
    setIsPublishing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const successMsg = t.scheduleSuccess.replace('{date}', scheduleDate).replace('{time}', scheduleTime);
      alert(successMsg);
    } catch (error) {
      alert("Error scheduling");
    } finally {
      setIsPublishing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${hook}\n\n${caption}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardBg = isDark ? 'bg-slate-900/80 border-slate-700/60 text-white shadow-xl' : 'bg-white border-slate-200 text-slate-900 shadow-lg';
  const headerBg = isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200';
  const textPrimary = isDark ? 'text-white border-slate-800/80' : 'text-slate-900 border-slate-200';
  const textSecondary = isDark ? 'text-slate-300' : 'text-slate-600';
  const inputBg = isDark ? 'bg-slate-900 border-slate-700 text-slate-300 focus:border-purple-500' : 'bg-white border-slate-300 text-slate-900 focus:border-purple-500';

  return (
    <div className={`${cardBg} backdrop-blur-xl rounded-[2rem] border overflow-hidden transition-all duration-300 flex flex-col h-full group hover:border-purple-500/50`}>
      <div className={`p-5 flex justify-between items-center border-b ${headerBg}`}>
        <span className="text-xs font-black text-white bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-1.5 rounded-lg shadow-md">
          {item.content_type === 'promo_video' ? t.videoBadge : t.textBadge}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={copyToClipboard} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border flex items-center gap-2 ${copied ? 'bg-green-500/20 text-green-500 border-green-500/50' : isDark ? 'text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border-slate-700' : 'text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border-slate-300'}`}>
            <span>{copied ? t.copied : t.copy}</span> {copied ? <CheckCircle2 size={14}/> : <Copy size={14}/>}
          </button>
          <button onClick={() => handleDelete(item.id)} className={`p-1.5 rounded-lg transition-colors border border-transparent ${isDark ? 'text-slate-500 hover:text-red-400 hover:bg-red-500/10' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'}`}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {hook && <h3 className={`font-black text-lg mb-4 pb-4 border-b leading-snug ${textPrimary}`}>{hook}</h3>}
        <p className={`text-sm leading-relaxed flex-1 whitespace-pre-wrap font-medium ${textSecondary}`}>{caption}</p>
      </div>

      <div className={`p-5 border-t ${headerBg}`}>
        <p className={`text-sm font-bold mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.scheduleTitle}</p>
        
        <div className="flex gap-3 mb-4">
          <div className={`flex-1 p-3 rounded-xl border transition-all ${isDark ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
            <div className="flex justify-center items-center gap-1.5 mb-3 text-sm font-bold">تيك توك</div>
            <div className="flex gap-2">
               <button onClick={()=>setTkPost(!tkPost)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${tkPost ? 'bg-[#25F4EE]/10 text-[#25F4EE] border-[#25F4EE]/50' : isDark ? 'text-slate-500 border-slate-700 hover:text-slate-300' : 'text-slate-500 border-slate-200 hover:bg-slate-50'}`}>{t.post}</button>
               <button onClick={()=>setTkStory(!tkStory)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${tkStory ? 'bg-[#25F4EE]/10 text-[#25F4EE] border-[#25F4EE]/50' : isDark ? 'text-slate-500 border-slate-700 hover:text-slate-300' : 'text-slate-500 border-slate-200 hover:bg-slate-50'}`}>{t.story}</button>
            </div>
          </div>

          <div className={`flex-1 p-3 rounded-xl border transition-all ${isDark ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
            <div className="flex justify-center items-center gap-1.5 mb-3 text-sm font-bold">إنستقرام</div>
            <div className="flex gap-2">
               <button onClick={()=>setIgPost(!igPost)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${igPost ? 'bg-pink-500/10 text-pink-500 border-pink-500/50' : isDark ? 'text-slate-500 border-slate-700 hover:text-slate-300' : 'text-slate-500 border-slate-200 hover:bg-slate-50'}`}>{t.reelsPost}</button>
               <button onClick={()=>setIgStory(!igStory)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${igStory ? 'bg-pink-500/10 text-pink-500 border-pink-500/50' : isDark ? 'text-slate-500 border-slate-700 hover:text-slate-300' : 'text-slate-500 border-slate-200 hover:bg-slate-50'}`}>{t.story}</button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-4" dir="ltr">
          <div className="flex-1">
            <input 
              type="date" 
              required
              lang="en-US"
              value={scheduleDate} 
              onChange={e=>setScheduleDate(e.target.value)} 
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', direction: 'ltr', colorScheme: isDark ? 'dark' : 'light' }}
              className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${inputBg}`} 
            />
          </div>
          <div className="flex-1">
            <input 
              type="time" 
              required
              lang="en-US"
              value={scheduleTime} 
              onChange={e=>setScheduleTime(e.target.value)} 
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', direction: 'ltr', colorScheme: isDark ? 'dark' : 'light' }}
              className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${inputBg}`} 
            />
          </div>
        </div>

        <button onClick={handleSchedule} disabled={isPublishing} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors text-sm flex justify-center items-center gap-2 disabled:opacity-50">
          {isPublishing ? <Loader2 className="animate-spin" size={16} /> : null}
          {isPublishing ? t.scheduling : t.scheduleBtn}
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 3. التطبيق الرئيسي (App)
// ==========================================
export default function App() {
  const [session, setSession] = useState<any>(null);
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("social_caption");
  const [activityType, setActivityType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  
  // حالة الرصيد الوهمية للتجربة (قم بربطها مع قاعدة البيانات لاحقاً)
  const [credits, setCredits] = useState(150);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general'); // حالة القائمة الجانبية للإعدادات
  
  const [isIgConnected, setIsIgConnected] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [langCode, setLangCode] = useState('ar');
  const [newPassword, setNewPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const isDark = theme === 'dark';
  const t = translations[langCode]; 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
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
      console.error(error);
    } finally {
      setIsLoadingResults(false);
    }
  };

  useEffect(() => {
    if (session) fetchResults();
  }, [session]);

  const handleDelete = async (id: string) => {
    if (window.confirm(t.deleteConfirm)) {
      try {
        await supabase.from('content_pipeline').delete().eq('id', id);
        setResults(results.filter(item => item.id !== id));
      } catch (error) {}
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) return alert("Password must be at least 6 characters.");
    setIsUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      alert("تم التحديث بنجاح"); 
      setNewPassword("");
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;
    if (!activityType) return alert(t.platformValidation);
    
    // التحقق من الرصيد قبل الإرسال
    if (credits < 10) {
      return alert("عفواً، رصيدك لا يكفي لإتمام هذه العملية. يرجى شحن أرصدة إضافية.");
    }

    setIsSubmitting(true);
    const webhookUrl = "https://n8n-p10bgpahkliy9hghak21zv3e.178.105.219.96.sslip.io/webhook/generate-content";

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ store_id: session.user.id, activity_type: activityType, content_type: contentType, prompt: prompt }),
      });
      
      // خصم رصيد تجريبي عند النجاح
      setCredits(prev => prev - 10);
      setPrompt("");
      setTimeout(fetchResults, 4000); 
    } catch (error) {} finally {
      setIsSubmitting(false);
    }
  };

  if (!session) return <Auth />;

  const mainBg = isDark ? 'bg-[#0b1121]' : 'bg-slate-50';
  const textMain = isDark ? 'text-white' : 'text-slate-900';
  const panelBg = isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/80 border-slate-200 shadow-2xl';
  const inputBg = isDark ? 'bg-slate-950/50 border-slate-700/80 text-white' : 'bg-white border-slate-300 text-slate-900';
  const labelColor = isDark ? 'text-slate-300' : 'text-slate-700';

  return (
    <div className={`relative min-h-screen p-4 font-sans flex flex-col items-center overflow-x-hidden transition-colors duration-500 ${mainBg}`} dir={t.dir}>
      
      {/* 
        ====================================================
        نافذة الإعدادات الذكية الجديدة (بتصميم Sidebar)
        ====================================================
      */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className={`${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200`}>
            
            {/* هيدر النافذة */}
            <div className={`px-6 py-4 border-b flex justify-between items-center shrink-0 ${isDark ? 'border-slate-800 bg-[#0f172a]' : 'border-slate-100 bg-slate-50'}`}>
              <h3 className={`text-lg font-black flex items-center gap-2 ${textMain}`}>
                <Settings className="text-blue-500" size={20} /> {t.settings}
              </h3>
              <button onClick={() => setIsSettingsOpen(false)} className={`p-2 rounded-full transition ${isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'}`}>
                <X size={20} />
              </button>
            </div>
            
            {/* المحتوى الداخلي مع القائمة الجانبية */}
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              
              {/* القائمة الجانبية */}
              <div className={`w-full md:w-1/3 p-4 flex flex-col gap-2 overflow-y-auto border-b md:border-b-0 ${t.dir === 'rtl' ? 'md:border-l' : 'md:border-r'} ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-100 bg-slate-50/50'}`}>
                <button onClick={() => setActiveTab('general')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'general' ? (isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600') : (isDark ? 'text-slate-400 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100')}`}>
                  <Sliders size={18} /> {t.tabGeneral}
                </button>
                <button onClick={() => setActiveTab('billing')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'billing' ? (isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-50 text-yellow-600') : (isDark ? 'text-slate-400 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100')}`}>
                  <CreditCard size={18} /> {t.tabBilling}
                </button>
                <button onClick={() => setActiveTab('connections')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'connections' ? (isDark ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-50 text-pink-600') : (isDark ? 'text-slate-400 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100')}`}>
                  <Globe size={18} /> {t.tabConnections}
                </button>
                <button onClick={() => setActiveTab('security')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'security' ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600') : (isDark ? 'text-slate-400 hover:bg-slate-800/50' : 'text-slate-600 hover:bg-slate-100')}`}>
                  <Shield size={18} /> {t.tabSecurity}
                </button>
              </div>

              {/* منطقة العرض الرئيسية للإعدادات */}
              <div className="w-full md:w-2/3 p-6 overflow-y-auto flex-1 space-y-6">
                
                {/* الإعدادات العامة */}
                {activeTab === 'general' && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="space-y-3">
                      <label className={`text-sm font-bold flex items-center gap-2 ${labelColor}`}>
                        <Globe size={16} className="text-blue-400"/> {t.langUi}
                      </label>
                      <select value={langCode} onChange={(e) => setLangCode(e.target.value)} className={`w-full border rounded-xl px-4 py-3 outline-none ${isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}>
                        <option value="ar">العربية (Arabic)</option>
                        <option value="en">English (الإنجليزية)</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className={`text-sm font-bold flex items-center gap-2 ${labelColor}`}>
                        <Palette size={16} className="text-pink-400"/> {t.theme}
                      </label>
                      <div className="flex gap-3">
                        <button onClick={() => setTheme('dark')} className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all ${theme === 'dark' ? 'bg-purple-600/20 border-purple-500 text-purple-400' : isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-300 text-slate-500'}`}>{t.dark}</button>
                        <button onClick={() => setTheme('light')} className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all ${theme === 'light' ? 'bg-purple-600/10 border-purple-500 text-purple-600' : isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-300 text-slate-500'}`}>{t.light}</button>
                      </div>
                      <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{t.passNote}</p>
                    </div>
                  </div>
                )}

                {/* إعدادات الأرصدة والباقات */}
                {activeTab === 'billing' && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center text-center ${isDark ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200'}`}>
                      <Wallet size={40} className={`mb-3 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} />
                      <h4 className={`text-sm font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.credits}</h4>
                      <p className={`text-4xl font-black mb-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        {credits} <span className="text-lg font-bold opacity-70">{t.points}</span>
                      </p>
                      <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                        {t.buyCredits}
                      </button>
                    </div>
                  </div>
                )}

                {/* إعدادات ربط الحسابات */}
                {activeTab === 'connections' && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="space-y-3">
                      <label className={`text-sm font-bold flex items-center gap-2 ${labelColor}`}>
                        <Instagram size={16} className="text-pink-500"/> {t.socialAuth}
                      </label>
                      <div className={`p-3 rounded-xl border flex gap-3 items-start ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
                        <Info size={16} className={`mt-0.5 shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        <p className={`text-xs leading-relaxed font-medium ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
                          {t.igTrustMsg}
                        </p>
                      </div>
                      <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all border flex justify-center items-center gap-2 hover:bg-pink-500 hover:text-white hover:border-pink-500 ${isDark ? 'bg-slate-950 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-700'}`}>
                        <Instagram size={18} />
                        {t.connectIg}
                      </button>
                    </div>
                  </div>
                )}

                {/* إعدادات الأمان */}
                {activeTab === 'security' && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="space-y-3 bg-slate-500/5 p-4 rounded-2xl border border-slate-500/10">
                      <label className={`text-sm font-bold flex items-center gap-2 ${labelColor}`}>
                        <Lock size={16} className="text-green-500"/> {t.changePass}
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input type="password" placeholder={t.passPlaceholder} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={`flex-1 border rounded-xl px-4 py-3 outline-none text-sm w-full ${isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
                        <button onClick={handleUpdatePassword} disabled={isUpdatingPassword} className="bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-xl font-bold text-sm transition shrink-0 flex justify-center items-center gap-2">
                          {isUpdatingPassword ? <Loader2 size={16} className="animate-spin" /> : null}
                          {isUpdatingPassword ? t.updating : t.update}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* 
        ====================================================
        الشريط العلوي (Navbar) مع إضافة شارة الرصيد
        ====================================================
      */}
      <div className={`absolute top-4 ${t.dir === 'rtl' ? 'left-0 right-0 px-6 justify-end' : 'right-0 left-0 px-6 justify-end'} flex items-center z-50 w-full max-w-7xl mx-auto`}>
        <div className="flex items-center gap-3">
          
          {/* شارة عرض الرصيد المتاح */}
          <div onClick={() => { setIsSettingsOpen(true); setActiveTab('billing'); }} className={`flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer transition-all backdrop-blur-md shadow-lg ${isDark ? 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white hover:border-yellow-500/50' : 'bg-white border-slate-200 text-slate-700 hover:border-yellow-400'}`}>
            <Wallet size={16} className="text-yellow-500" />
            <span className="font-bold text-sm">{credits} <span className="font-medium text-xs opacity-80">{t.points}</span></span>
          </div>

          <div className={`relative inline-block ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={`flex items-center justify-center w-11 h-11 border rounded-full transition-all backdrop-blur-md shadow-lg ${isDark ? 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'}`}>
              <User size={20} />
            </button>

            {isProfileOpen && (
              <div className={`absolute ${t.dir === 'rtl' ? 'left-0' : 'right-0'} mt-3 w-64 border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl z-50 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
                <div className={`px-5 py-4 border-b flex items-center gap-3 ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="bg-yellow-500/20 p-2 rounded-lg"><Crown size={20} className="text-yellow-500" /></div>
                  <div>
                    <p className={`text-sm font-bold ${textMain}`}>{t.currentPlan}</p>
                    <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.freePlan}</p>
                  </div>
                </div>
                <button onClick={() => { setIsSettingsOpen(true); setActiveTab('general'); setIsProfileOpen(false); }} className={`w-full ${t.dir === 'rtl' ? 'text-right' : 'text-left'} px-5 py-3.5 text-sm flex items-center gap-3 font-medium transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <Settings size={18} /> {t.settings}
                </button>
                <button onClick={() => supabase.auth.signOut()} className={`w-full ${t.dir === 'rtl' ? 'text-right' : 'text-left'} px-5 py-3.5 text-sm flex items-center gap-3 border-t font-medium transition-colors ${isDark ? 'text-red-400 hover:bg-red-500/10 border-slate-700/50' : 'text-red-500 hover:bg-red-50 border-slate-100'}`}>
                  <LogOut size={18} /> {t.logout}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* كابينة التحكم */}
      <div className={`relative z-10 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] border w-full max-w-xl mt-20 transition-colors duration-500 ${panelBg}`}>
        <div className="text-center mb-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold mb-4 border border-blue-500/20">{t.badge}</span>
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-3 drop-shadow-xl">{t.appTitle}</h1>
          <p className={`font-medium text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.appDesc}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className={`block text-sm font-bold px-1 ${labelColor}`}>{t.bizCategory}</label>
            <div className="relative">
              <select value={activityType} onChange={(e) => setActivityType(e.target.value)} required className={`w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-blue-500/50 outline-none font-medium appearance-none ${inputBg}`}>
                <option value="" disabled>{t.bizPlaceholder}</option>
                {t.activities.map((act, i) => <option key={i} value={act}>{act}</option>)}
              </select>
              <div className={`absolute inset-y-0 ${t.dir === 'rtl' ? 'left-5' : 'right-5'} flex items-center pointer-events-none text-slate-400`}>▼</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-bold px-1 ${labelColor}`}>{t.contentType}</label>
            <div className="relative">
              <select value={contentType} onChange={(e) => setContentType(e.target.value)} className={`w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-blue-500/50 outline-none font-medium appearance-none ${inputBg}`}>
                <optgroup label={t.visualGroup}>
                  <option value="promo_video">{t.videoPromo}</option>
                  <option value="delivery_campaign">{t.deliveryApp}</option>
                  <option value="product_shot">{t.poster}</option>
                </optgroup>
                <optgroup label={t.textGroup}>
                  <option value="social_caption">{t.contentPlan}</option>
                  <option value="ad_script">{t.adScript}</option>
                  <option value="customer_response">{t.reply}</option>
                </optgroup>
              </select>
              <div className={`absolute inset-y-0 ${t.dir === 'rtl' ? 'left-5' : 'right-5'} flex items-center pointer-events-none text-slate-400`}>▼</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-bold px-1 ${labelColor}`}>{t.idea}</label>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} required className={`w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-blue-500/50 outline-none resize-none leading-relaxed ${inputBg}`} rows={4} placeholder={t.ideaPlaceholder}></textarea>
          </div>

          {/* زر إطلاق الحملة التفاعلي مع التحميل */}
          <div className="pt-4">
            <button type="submit" disabled={isSubmitting} className="relative w-full group overflow-hidden py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-lg shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_10px_50px_-10px_rgba(59,130,246,0.7)] transform active:scale-[0.98] transition-all duration-300 disabled:opacity-50">
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={24} /> 
                    <span>{t.producing}</span>
                  </>
                ) : (
                  <>
                    <span>✨</span> 
                    <span>{t.launchBtn}</span>
                  </>
                )}
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
            <span>{t.libraryTitle}</span>
          </h2>
          <button onClick={fetchResults} disabled={isLoadingResults} className={`px-5 py-2.5 rounded-xl border transition-all text-sm font-bold flex items-center gap-2 backdrop-blur-sm ${isDark ? 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700' : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm'}`}>
            {isLoadingResults ? <Loader2 className="animate-spin" size={16} /> : <span>🔄</span>}
            {isLoadingResults ? t.syncing : t.syncBtn}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.length === 0 && !isLoadingResults ? (
            <div className={`col-span-full flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed backdrop-blur-sm ${isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-100/50 border-slate-300'}`}>
              <span className="text-6xl mb-4 opacity-50">🎬</span>
              <p className={`font-medium text-lg ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.emptyLib}</p>
            </div>
          ) : (
            results.map((item, index) => (
              <ContentCard key={index} item={item} handleDelete={handleDelete} isDark={isDark} t={t} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
