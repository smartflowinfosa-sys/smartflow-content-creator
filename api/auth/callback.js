export default async function handler(req, res) {
  const { code, state, error } = req.query;

  // إذا رفض العميل إعطاء الصلاحية
  if (error) {
    return res.redirect(302, '/?tk_connected=false');
  }

  // بيانات وهمية للواجهة (لاحقاً سنربطها بقاعدة البيانات)
  const tkUsername = "@myagency_sa";
  const tkAvatar = "https://ui-avatars.com/api/?name=TikTok&background=000&color=fff";

  // إعادة توجيه العميل فوراً إلى واجهة التطبيق مع بيانات النجاح
  const redirectUrl = `/?tk_connected=true&tk_username=${tkUsername}&tk_avatar=${encodeURIComponent(tkAvatar)}`;
  
  res.redirect(302, redirectUrl);
}
