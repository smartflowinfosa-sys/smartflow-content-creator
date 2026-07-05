import React, { useState, useEffect } from "react";
// استدعاء الجسر الذي يربطنا بقاعدة البيانات
import { supabase } from "./supabase";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("promo_video");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // متغيرات لتخزين النتائج القادمة من سوبابيز
  const [results, setResults] = useState([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  // دالة جلب النتائج من قاعدة البيانات
  const fetchResults = async () => {
    setIsLoadingResults(true);
    try {
      // تنبيه: نفترض هنا أن اسم الجدول في سوبابيز هو 'generated_content'
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .order('created_at', { ascending: false }) // الترتيب من الأحدث للأقدم
        .limit(6); // جلب آخر 6 نتائج فقط

      if (error) throw error;
      if (data) setResults(data);
    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
    } finally {
      setIsLoadingResults(false);
    }
  };

  // تشغيل دالة الجلب تلقائياً عند فتح الصفحة
  useEffect(() => {
    fetchResults();
  }, []);

  // دالة إرسال الطلب إلى n8n
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const webhookUrl = "https://n8n-p10bgpahkliy9hghak21zv3e.178.105.219.96.sslip.io/webhook/generate-content";

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          store_id: "public_user",
          content_type: contentType,
          prompt: prompt,
        }),
      });
      alert("تم إرسال طلبك بنجاح! يتم الآن المعالجة في المصنع ✨");
      setPrompt("");
      // تحديث النتائج بعد الإرسال بقليل
      setTimeout(fetchResults, 3000); 
    } catch (error) {
      alert("حدث خطأ أثناء الاتصال بالمصنع.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black p-4 font-sans flex flex-col items-center" dir="rtl">

      {/* القسم الأول: نموذج الطلب */}
      <div className="relative bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700 w-full max-w-xl transform transition-all duration-500 mt-10">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 drop-shadow-lg">
            منصة SmartFlow
          </h1>
          <p className="text-slate-400 font-medium">مساعدك الذكي لإنتاج المحتوى وإدارة علامتك التجارية</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-300">كيف يمكننا مساعدة متجرك اليوم؟</label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-700 text-white rounded-xl focus:ring-0 focus:border-blue-500 transition-all appearance-none"
            >
              <optgroup label="الإنتاج المرئي" className="bg-slate-800">
                <option value="promo_video">🎥 فيديو إعلاني قصير</option>
                <option value="product_shot">📸 تصوير منتجات</option>
              </optgroup>
              <optgroup label="المحتوى النصي" className="bg-slate-800">
                <option value="product_desc">📝 كتابة وصف تسويقي</option>
                <option value="social_caption">📱 كابشن للسوشيال ميديا</option>
              </optgroup>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-300">تفاصيل الطلب:</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-900/50 border-2 border-slate-700 text-white rounded-xl focus:ring-0 focus:border-purple-500 transition-all resize-none placeholder-slate-500"
              rows="4"
              placeholder="مثال: بوستر عرض غداء عمل..."
            ></textarea>
          </div>

          <div className="relative group mt-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full bg-slate-900 text-white font-bold text-lg py-4 px-4 rounded-xl border border-slate-700 hover:border-slate-500 transition-all transform active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "⏳ جاري الإرسال للمصنع..." : "✨ ابدأ التنفيذ الآن"}
            </button>
          </div>
        </form>
      </div>

      {/* القسم الثاني: شاشة عرض النتائج */}
      <div className="w-full max-w-4xl mt-16 mb-20">
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>مكتبة النتائج الجاهزة</span>
            <span className="text-xl">📁</span>
          </h2>
          <button 
            onClick={fetchResults}
            disabled={isLoadingResults}
            className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg border border-slate-700 hover:bg-slate-700 transition-all text-sm flex items-center gap-2"
          >
            {isLoadingResults ? "⏳ يتم التحديث..." : "🔄 تحديث القائمة"}
          </button>
        </div>

        {/* شبكة الكروت لعرض البيانات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.length === 0 && !isLoadingResults ? (
            <div className="col-span-full text-center py-10 bg-slate-800/50 rounded-2xl border border-slate-700 border-dashed">
              <p className="text-slate-400">لا توجد نتائج حتى الآن. ابدأ بتوليد محتواك الأول!</p>
            </div>
          ) : (
            results.map((item, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden hover:border-blue-500 transition-all group">
                {/* إذا كان هناك صورة أو فيديو نعرضه هنا */}
                <div className="h-48 bg-slate-900 flex items-center justify-center p-4">
                  {item.result_url ? (
                    <img src={item.result_url} alt="Result" className="max-h-full max-w-full object-contain rounded-lg" />
                  ) : (
                    <span className="text-4xl">📝</span>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold text-blue-400 bg-blue-900/30 px-2 py-1 rounded-md mb-2 inline-block">
                    {item.content_type || 'محتوى'}
                  </span>
                  <p className="text-slate-300 text-sm line-clamp-3">
                    {item.result_text || item.prompt || 'لا يوجد وصف متاح.'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}