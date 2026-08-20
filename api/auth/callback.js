export default async function handler(req, res) {
  // هذا الملف يعمل كـ Backend صغير على سيرفرات Vercel
  
  // 1. تيك توك يرسل لنا كود التفويض في الرابط
  const { code, state, error } = req.query;

  // إذا قام العميل بإلغاء العملية ولم يوافق
  if (error) {
    return res.redirect(302, '/?tk_connected=false');
  }

  /*
   ملاحظة برمجية: 
   في الأنظمة المعقدة، نقوم هنا بأخذ الـ (code) وإرساله لتيك توك لتبديله بـ (Access Token).
   ولكن بما أننا نعتمد على n8n للقيام بالنشر الفعلي (وهو يمتلك التوكن السري بالفعل)،
   فإن دور هذا الملف هو فقط إشعار واجهة التطبيق بأن العميل أتم عملية الربط بنجاح لعرض صورته.
  */

  // 2. بيانات وهمية للعرض (في المستقبل يمكنك سحبها من قاعدة بياناتك)
  const tkUsername = "@myagency_sa"; // اليوزر الذي سيظهر في الواجهة
  const tkAvatar = "https://ui-avatars.com/api/?name=TikTok&background=000&color=fff"; // صورة الأفاتار

  // 3. إعادة توجيه العميل فوراً إلى واجهة التطبيق الرئيسية مع إشارات النجاح
  const redirectUrl = `/?tk_connected=true&tk_username=${tkUsername}&tk_avatar=${encodeURIComponent(tkAvatar)}`;
  
  // توجيه (Redirect) العميل
  res.redirect(302, redirectUrl);
}
