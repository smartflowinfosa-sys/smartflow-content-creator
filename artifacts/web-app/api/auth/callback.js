// api/auth/callback.js
// يستبدل الكود المؤقت (code) القادم من تيك توك بتوكن دخول حقيقي،
// ثم يجلب بيانات حساب المستخدم الحقيقية (الاسم والصورة) ويعيد توجيهه للتطبيق.

export default async function handler(req, res) {
  const { code, state, error } = req.query;

  // الحالة 1: المستخدم رفض إعطاء الصلاحية من شاشة تيك توك
  if (error) {
    return res.redirect(302, `/?tk_connected=false&tk_error=${encodeURIComponent(error)}`);
  }

  // الحالة 2: ما وصل كود أصلاً (رابط استدعاء غير صحيح)
  if (!code) {
    return res.redirect(302, `/?tk_connected=false&tk_error=missing_code`);
  }

  const clientKey = process.env.TIKTOK_CLIENT_KEY || "awo6ohs5hl7tubqp";
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET; // لازم تكون مضافة في متغيرات البيئة على Vercel
  const redirectUri = "https://smartflow-content-creator-web-app.vercel.app/api/auth/callback";

  if (!clientSecret) {
    console.error("TIKTOK_CLIENT_SECRET غير مضاف في متغيرات البيئة على Vercel");
    return res.redirect(302, `/?tk_connected=false&tk_error=server_misconfigured`);
  }

  try {
    // ============ الخطوة 1: استبدال الكود بتوكن دخول حقيقي ============
    const tokenResponse = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      body: new URLSearchParams({
        client_key: clientKey,
        client_secret: clientSecret,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("فشل استبدال الكود بتوكن:", tokenData);
      return res.redirect(302, `/?tk_connected=false&tk_error=token_exchange_failed`);
    }

    const { access_token, open_id, refresh_token, expires_in, refresh_expires_in, scope } = tokenData;

    // ============ الخطوة 2: جلب بيانات حساب تيك توك الحقيقية ============
    const userInfoResponse = await fetch(
      "https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userInfoData = await userInfoResponse.json();

    if (!userInfoResponse.ok || userInfoData?.error?.code !== "ok") {
      console.error("فشل جلب بيانات المستخدم:", userInfoData);
      return res.redirect(302, `/?tk_connected=false&tk_error=user_info_failed`);
    }

    const user = userInfoData.data.user;
    const tkUsername = user.display_name || "@tiktok_user";
    const tkAvatar = user.avatar_url || "";

    // ============ الخطوة 3: حفظ التوكن على السيرفر (مهم جداً) ============
    // access_token و refresh_token يجب حفظهم بقاعدة بياناتك (Supabase مثلاً) مربوطين
    // بحساب المستخدم صاحب الجلسة، حتى تقدر لاحقاً تستخدمهم لجلب الرسائل أو نشر المحتوى
    // بدون الحاجة لإعادة تسجيل الدخول. هذا الجزء غير مطبق هنا لأنه يحتاج ربط بجدول
    // المستخدمين عندك (user id من الجلسة الحالية + open_id + access_token + refresh_token
    // + تاريخ انتهاء الصلاحية)، وهو خارج نطاق هذا الملف وحده.
    //
    // مثال (يحتاج تفعيل عندك):
    // await supabaseAdmin.from('social_connections').upsert({
    //   user_id: <معرف المستخدم الحالي من الجلسة>,
    //   provider: 'tiktok',
    //   open_id,
    //   access_token,
    //   refresh_token,
    //   scope,
    //   expires_at: Date.now() + expires_in * 1000,
    // });

    // ============ الخطوة 4: إعادة توجيه العميل مع بيانات النجاح الحقيقية ============
    const redirectUrl = `/?tk_connected=true&tk_username=${encodeURIComponent(tkUsername)}&tk_avatar=${encodeURIComponent(tkAvatar)}`;
    return res.redirect(302, redirectUrl);

  } catch (err) {
    console.error("خطأ غير متوقع أثناء ربط تيك توك:", err);
    return res.redirect(302, `/?tk_connected=false&tk_error=unexpected_error`);
  }
}
