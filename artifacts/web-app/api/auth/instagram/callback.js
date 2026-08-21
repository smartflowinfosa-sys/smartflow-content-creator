export default async function handler(req, res) {
  const { code, error } = req.query;

  // إذا رفض العميل إعطاء الصلاحية
  if (error) {
    return res.redirect(302, '/?ig_connected=false');
  }

  try {
    // 1. تبديل الـ code بـ short-lived access_token
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.INSTAGRAM_CLIENT_KEY,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: 'https://smartflow-content-creator-web-app.vercel.app/api/auth/instagram/callback',
        code: code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.redirect(302, '/?ig_connected=false');
    }

    // 2. تحويل الـ short-lived token إلى long-lived token (يدوم 60 يوم بدل ساعة)
    const longLivedResponse = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${tokenData.access_token}`
    );
    const longLivedData = await longLivedResponse.json();
    const finalAccessToken = longLivedData.access_token || tokenData.access_token;

    // 3. جلب بيانات المستخدم الحقيقية (اسم المستخدم + صورة البروفايل)
    const userResponse = await fetch(
      `https://graph.instagram.com/v21.0/me?fields=user_id,username,name,profile_picture_url&access_token=${finalAccessToken}`
    );
    const userData = await userResponse.json();

    const igUsername = userData.username || 'instagram_user';
    const igAvatar = userData.profile_picture_url || '';

    // 4. حفظ الـ access_token و user_id في قاعدة البيانات هنا
    // TODO: خزّن finalAccessToken و userData.user_id مرتبطين بحساب المستخدم بـ Supabase
    // ملاحظة: الـ long-lived token يحتاج تجديد كل أقل من 60 يوم عبر نفس endpoint فوق

    // 5. إعادة توجيه العميل لواجهة التطبيق ببيانات النجاح
    const redirectUrl = `/?ig_connected=true&ig_username=${encodeURIComponent(igUsername)}&ig_avatar=${encodeURIComponent(igAvatar)}`;
    res.redirect(302, redirectUrl);

  } catch (err) {
    console.error('Instagram OAuth error:', err);
    return res.redirect(302, '/?ig_connected=false');
  }
}
