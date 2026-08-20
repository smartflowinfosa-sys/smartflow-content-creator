export default async function handler(req, res) {
  const { code, state, error } = req.query;

  // إذا رفض العميل إعطاء الصلاحية
  if (error) {
    return res.redirect(302, '/?tk_connected=false');
  }

  try {
    // 1. تبديل الـ code بـ access_token حقيقي من TikTok
    const tokenResponse = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
      body: new URLSearchParams({
        client_key: process.env.TIKTOK_CLIENT_KEY,
        client_secret: process.env.TIKTOK_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: 'https://smartflow-content-creator-web-app.vercel.app/api/auth/callback',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.redirect(302, '/?tk_connected=false');
    }

    // 2. جلب بيانات المستخدم الحقيقية باستخدام access_token
    const userResponse = await fetch(
      'https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name',
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const userData = await userResponse.json();
    const tkUsername = userData.data.user.display_name;
    const tkAvatar = userData.data.user.avatar_url;

    // 3. حفظ access_token و refresh_token في قاعدة البيانات هنا (مهم جدًا لأي استخدام لاحق)
    // TODO: خزّن tokenData.access_token و tokenData.refresh_token مرتبطين بحساب المستخدم

    // 4. إعادة توجيه العميل فورًا إلى واجهة التطبيق مع بيانات النجاح
    const redirectUrl = `/?tk_connected=true&tk_username=${encodeURIComponent(tkUsername)}&tk_avatar=${encodeURIComponent(tkAvatar)}`;
    res.redirect(302, redirectUrl);

  } catch (err) {
    console.error('TikTok OAuth error:', err);
    return res.redirect(302, '/?tk_connected=false');
  }
}
