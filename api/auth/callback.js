import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // 1. التقاط الرمز المؤقت من الرابط
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'لم يتم العثور على رمز المصادقة من تيك توك.' });
  }

  try {
    // 2. طلب التوكن النهائي من سيرفرات تيك توك
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

    if (!tokenResponse.ok) {
       return res.status(400).json({ error: 'فشل في استخراج التوكن', details: tokenData });
    }

    // 3. الاتصال بقاعدة بيانات Supabase
    // ملاحظة: تأكد من إضافة SUPABASE_URL و SUPABASE_SERVICE_ROLE_KEY في متغيرات بيئة Vercel
    const supabase = createClient(
      process.env.SUPABASE_URL, 
      process.env.SUPABASE_SERVICE_ROLE_KEY 
    );

    // 4. حفظ التوكن في الجدول الذي أنشأناه
    const { error: dbError } = await supabase
      .from('tiktok_tokens')
      .insert([
        {
          user_id: state || 'default_user', // سنحتاج لضبط هذا لمعرفة صاحب الحساب
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
        }
      ]);

    if (dbError) throw dbError;

    // 5. توجيه العميل عائداً إلى واجهة المنصة بعد نجاح الربط
    res.redirect('/?tiktok_link=success');

  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ داخلي', message: error.message });
  }
}
