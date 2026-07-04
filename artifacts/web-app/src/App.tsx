import React, { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // تم دمج رابط الـ Webhook الخاص بك بنجاح
    const webhookUrl = "https://n8n-p10bgpahkliy9hghak21zv3e.178.105.219.96.sslip.io/webhook/generate-content";

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          store_id: "test_store_1", // معرف مؤقت للتجربة
          prompt: prompt,
        }),
      });
      alert("تم إرسال فكرتك بنجاح إلى مصنع المحتوى! 🎬");
      setPrompt(""); // تفريغ المربع بعد الإرسال
    } catch (error) {
      alert("حدث خطأ أثناء الاتصال بالمصنع.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">منصة SmartFlow 🚀</h1>
          <p className="text-gray-500">مصنع المحتوى المرئي المدعوم بالذكاء الاصطناعي</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              ما هي فكرة الفيديو الإعلاني الذي تود إنتاجه؟
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              rows="5"
              placeholder="مثال: فيديو حماسي يبرز جمال تغليف منتجات مدور الجباتي..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isSubmitting ? "⏳ جاري إرسال الطلب للمصنع..." : "✨ توليد الفيديو الآن"}
          </button>
        </form>
      </div>
    </div>
  );
}