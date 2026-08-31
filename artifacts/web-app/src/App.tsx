// @ts-nocheck
/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";
import Auth from "./Auth"; 
import { 
  User, Settings, LogOut, Crown, Trash2, X, Lock, Globe, Palette, 
  Copy, CheckCircle2, Instagram, Info, Loader2, Wallet, CreditCard, 
  Shield, Sliders, ImagePlus, Mic, Activity, Target, AlignLeft, 
  AlignJustify, Star, MessageCircle, Clapperboard, CalendarRange, 
  Bot, Bell, LineChart, Phone, Wand2, Hourglass, Clock, ShieldCheck, Users,
  Megaphone, Edit, Zap, CircleDollarSign, ChevronRight, FileText,
  Smartphone, LayoutDashboard, Share2, Inbox, BarChart3, UploadCloud, PlayCircle, Store, Send
} from 'lucide-react';

// ==========================================
// 1. قاموس الترجمة المحدث الشامل
// ==========================================
const translations: any = {
  ar: {
    dir: "rtl",
    appTitle: "SmartFlow",
    appDesc: "وكالتك التسويقية في مكان واحد. ألف، صمم، وانشر بضغطة زر.",
    badge: "الاستوديو الذكي المتكامل",
    calendarTab: "التقويم التسويقي",
    studioTab: "الاستوديو الذكي",
    reviewsTab: "تقييمات قوقل ماب",
    adminTab: "لوحة الإدارة",
    socialHubTab: "إدارة السوشال ميديا", // جديد
    hubDesc: "أدر حساباتك ومحتواك وتفاعلات عملائك وتحليلاتك من مكان واحد.", // جديد
    tabOverview: "نظرة عامة", // جديد
    tabAccounts: "الحسابات والقنوات", // جديد
    tabPublishing: "النشر والمحتوى", // جديد
    tabInbox: "صندوق الوارد", // جديد
    tabComments: "التعليقات والتقييمات", // جديد
    tabAnalytics: "التحليلات", // جديد
    currentPlan: "الباقة الحالية",
    freePlan: "الباقة الأساسية (Basic)",
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
    passNote: "ملاحظة: خيارات اللغة والثيم تُحفظ تلقائياً.",
    socialAuth: "إدارة ربط الحسابات (OAuth)",
    connectIg: "ربط إنستقرام",
    connectTk: "ربط تيك توك",
    disconnectIg: "فصل الحساب",
    disconnectConfirm: "هل أنت متأكد أن تريد فصل الحساب عن المنصة؟ سيتم إيقاف النشر التلقائي.",
    disconnected: "تم فصل الحساب بنجاح.",
    igTrustMsg: "يتم الربط رسمياً ومباشرة عبر خوادم المنصات (OAuth 2.0). نحن لا نطلب أو نحفظ كلمات المرور الخاصة بك، ونطلب فقط صلاحية النشر الآلي لتسهيل عملك.",
    bizCategory: "نوع النشاط التجاري:",
    bizPlaceholder: "اختر النشاط التجاري...",
    customBizLabel: "اكتب مجال نشاطك بدقة:",
    customBizPlaceholder: "مثال: ورشة سيارات، مكتب محاماة، مغسلة...",
    contentType: "نوع الإنتاج المطلوب:",
    videoPromo: "🎥 فيديو إعلاني قصير (تيك توك / ريلز)",
    socialStory: "📱 إنشاء ستوري لمنصات التواصل",
    poster: "📸 تصميم بوستر عرض خاص",
    contentPlan: "📝 خطة محتوى أسبوعية متكاملة",
    adScript: "🎙️ كتابة سكريبت إعلاني جذاب",
    reply: "💬 رد ذكي واحترافي على التقييمات",
    visualOptionsTitle: "✨ خيارات الإخراج الفني والصوتي:",
    voiceLabel: "المعلق الصوتي",
    voiceMaleSA: "رجل (لهجة سعودية)",
    voiceFemaleSA: "امرأة (لهجة سعودية)",
    voiceAI: "معلق ذكاء اصطناعي آلي",
    voiceNone: "بدون تعليق (موسيقى تريند فقط)",
    toneLabel: "نبرة الإعلان",
    toneViral: "تريند وخطاف (Viral Hook) 🔥",
    toneStory: "قصة وعاطفة (Storytelling) ❤️",
    toneSales: "بيع مباشر وعاجل (Direct Sales) ⏳",
    toneFormal: "رسمي ومؤسسي (Corporate) 💼",
    styleLabel: "أسلوب الإخراج المرئي",
    styleUGC: "تصوير جوال واقعي (UGC) 📱",
    styleMotion: "موشن جرافيك ترويجي 🎬",
    styleAvatar: "أفاتار ومتحدث ذكاء اصطناعي 🤖",
    styleCinematic: "تصوير سينمائي احترافي 🎥",
    textOptionsTitle: "✨ خيارات المحتوى النصي:",
    goalLabel: "الهدف التسويقي",
    goalConversion: "تحويل ومبيعات (Conversion) 💰",
    goalEngagement: "تفاعل وحفظ (Engagement) 👥",
    goalAwareness: "وعي وانتشار (Awareness) 📢",
    lengthLabel: "طول النص",
    lengthShort: "قصير ومباشر (Twitter/Snap)",
    lengthMedium: "متوسط (Instagram/TikTok)",
    lengthLong: "طويل وتفصيلي (LinkedIn/Blog)",
    idea: "الفكرة التسويقية:",
    ideaPlaceholder: "اكتب فكرتك هنا (مثال: إعلان لقهوة مختصة للصيف)...",
    uploadImageTitle: "صورة المنتج (اختياري، لتحويلها إلى فيديو أو تصميم):",
    uploadImageBtn: "ارفع صورة منتجك من هنا",
    changeImage: "تغيير الصورة",
    launchBtn: "ابدأ التنفيذ",
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
    publishDate: "تاريخ النشر",
    publishTime: "وقت النشر",
    fullScreen: "عرض بحجم كامل",
    deleteConfirm: "هل أنت متأكد من حذف هذه الحملة بشكل نهائي؟",
    platformValidation: "الرجاء اختيار منصة واحدة ونوع نشر على الأقل",
    dateValidation: "الرجاء تحديد تاريخ ووقت النشر",
    scheduleSuccess: "تمت جدولة النشر بنجاح! 📅\nسيتم النشر يوم {date} الساعة {time}",
    visualGroup: "الإنتاج المرئي والترويج",
    textGroup: "المحتوى النصي والإدارة",
    activities: [
      "المطاعم والمقاهي (F&B)", "العقارات وإدارة الأملاك", "المتاجر الإلكترونية (قطاع التجزئة)",
      "مراكز التجميل والصالونات", "العيادات والمراكز الطبية", "تنظيم الفعاليات والمؤتمرات",
      "تجهيز المناسبات والضيافة", "السياحة والسفر", "النوادي الرياضية واللياقة البدنية",
      "مجال آخر (كتابة يدوية) ✍️"
    ],
    credits: "الرصيد المتاح",
    points: "نقطة",
    buyCredits: "شراء رصيد إضافي",
    tabGeneral: "إعدادات عامة",
    tabBilling: "الباقة والأرصدة",
    tabSecurity: "الأمان والمرور",
    tabConnections: "ربط الحسابات",
    insufficientCredits: "عفواً، رصيد النقاط الخاص بك لا يكفي لإنتاج هذا المحتوى. يرجى شحن محفظتك وإعادة المحاولة!",
    serverError: "الاستوديو الذكي يشهد إقبالاً عالياً في هذه اللحظة! 🎬 يرجى المحاولة مرة أخرى بعد قليل.",
    reviewsTitle: "إدارة تقييمات قوقل ماب",
    reviewsSubtitle: "الرد الآلي المدعوم بالذكاء الاصطناعي لجميع فروعك.",
    connectGoogleBtn: "ربط حساب قوقل بزنس",
    googleConnecting: "جاري الاتصال بـ Google...",
    googleConnected: "تم ربط حساب قوقل بنجاح",
    totalComments: "إجمالي التعليقات",
    avgRating: "متوسط التقييم",
    successReplies: "الردود الآلية الناجحة",
    noDataTitle: "لا توجد بيانات لعرضها",
    noDataDesc: "قم بربط حساب قوقل بزنس الخاص بنشاطك التجاري لسحب التقييمات والبدء في الرد عليها آلياً.",
    startConnect: "ابدأ الربط الآن",
    showLabel: "عرض:",
    filterTimeAll: "كل الأوقات",
    filterTimeToday: "اليوم",
    filterTimeWeek: "الأسبوع",
    filterTimeMonth: "الشهر",
    filterCustom: "مخصص",
    filterLatest: "الأحدث",
    filterOldest: "الأقدم",
    filterComment: "تعليق 💬",
    filterRating: "تقييم فقط ⭐",
    advSettings: "إعدادات الذكاء الاصطناعي المتقدمة",
    customPrompt: "تعليمات خاصة للـ AI",
    customPromptDesc: "إعطاء أوامر مخصصة للذكاء الاصطناعي عند الرد (مثال: تقديم خصم للاعتذار).",
    customPromptPlaceholder: "مثال: اذا الرد سلبي اعطي خصم 10%...",
    savePrompt: "حفظ التعليمات",
    saving: "جاري الحفظ...",
    trackCompetitor: "تتبع المنافسين",
    trackCompetitorDesc: "مقارنة تقييمات متجرك بمتجر منافس على خرائط قوقل لاستخراج نقاط الضعف والقوة.",
    trackPlaceholder: "ضع رابط متجر المنافس على خرائط قوقل هنا...",
    startTracking: "بدء التتبع",
    tracking: "جاري التحليل...",
    negAlerts: "تنبيهات التقييمات السلبية (طوارئ)",
    negAlertsDesc: "إرسال رسالة واتساب فورية لمدير الفرع عند وصول تقييم بـ 1 نجمة للتدخل السريع.",
    phonePlaceholder: "رقم الجوال (مثال: 966500000000+)",
    activateAlert: "تفعيل التنبيه",
    activating: "جاري التفعيل...",
    autoReplyMode: "وضع الرد التلقائي:",
    noFilterMatch: "لا توجد تقييمات تطابق هذا الفلتر حالياً.",
    positive: "إيجابي (Positive)",
    negative: "شكوى (Negative)",
    category: "التصنيف:",
    aiReplyTitle: "رد الـ AI المقترح:",
    autoPublished: "تم النشر آلياً",
    draftReview: "مسودة للمراجعة",
    csTeam: "فريق خدمة عملاء",
    aiEmp: "موظف AI",
    approvePublish: "اعتماد ونشر",
    editReply: "تعديل الرد",
    aiAssistBtn: "مساعد الصياغة الذكي",
    aiAssistDesc: "اكتب فكرتك باختصار، وسيقوم الذكاء الاصطناعي بتحويلها إلى أمر دقيق.",
    aiAssistPlaceholder: "مثال: أبي إعلان قوي لقهوة باردة للصيف...",
    aiAssistGenerate: "توليد الصياغة",
    aiAssistApply: "اعتماد واستخدام",
    pendingTitle: "حسابك قيد المراجعة ⏳",
    pendingDesc: "شكراً لاهتمامك بـ SmartFlow! لقد تم إدراج حسابك بنجاح وسنقوم بإشعارك فور تفعيله لتنطلق معنا.",
    pendingRefresh: "تحديث الحالة",
    calTitle: "التقويم التسويقي الذكي 🗓️",
    calDesc: "خطط لحملاتك مسبقاً. اضغط على علامة الصح (✅) لتحديد المناسبات المنجزة.",
    calDaysLeft: "باقي {days} يوم",
    calEnded: "انتهت",
    calToday: "اليوم!",
    calLaunch: "تجهيز حملة للمناسبة",
    calPrepared: "تم تجهيز المحتوى",
    calUndo: "التراجع عن الإنجاز",
    calMarkDone: "تحديد كمنجز",
    calTypes: {
      commercial: "تجاري", national: "وطني", entertainment: "ترفيهي", global: "عالمي"
    },
    calEvents: {
      backToSchool: "حملة العودة للمدارس",
      salaryAug: "يوم الراتب (أغسطس)",
      pizzaDay: "يوم البيتزا العالمي",
      nationalDay: "اليوم الوطني السعودي 94",
      salarySep: "يوم الراتب (سبتمبر)",
      coffeeDay: "اليوم العالمي للقهوة",
      teachersDay: "يوم المعلم العالمي",
      foodDay: "يوم الغذاء العالمي",
      salaryOct: "يوم الراتب (أكتوبر)",
      singlesDay: "يوم العزاب 11:11",
      whiteFriday: "الجمعة البيضاء",
      salaryNov: "يوم الراتب (نوفمبر)",
      cyberMonday: "السايبر ماندي",
      volunteerDay: "يوم التطوع العالمي",
      arabicDay: "يوم اللغة العربية",
      endYear: "تصفية نهاية العام",
      salaryDec: "يوم الراتب (ديسمبر)"
    },
    adminTitle: "إدارة العملاء",
    adminSubtitle: "تحكم في الحسابات، الأرصدة، الصلاحيات، وتفعيل المشتركين الجدد.",
    colEmail: "البريد الإلكتروني",
    colStatus: "الحالة",
    colRole: "الباقة والرصيد",
    colActions: "الإجراءات",
    btnActivate: "تفعيل",
    btnSuspend: "إيقاف",
    statusActive: "نشط",
    statusPending: "في الانتظار",
    roleAdmin: "مدير",
    roleUser: "عميل",
    statsUsers: "إجمالي العملاء",
    statsActive: "العملاء النشطين",
    statsPending: "في الانتظار",
    statsContent: "المحتوى المُولد",
    statsCost: "تكلفة الـ API",
    statsCostDesc: "تقديرية",
    announceTitle: "إرسال إشعار للجميع 📢",
    announcePlaceholder: "اكتب رسالة أو إعلان يظهر لجميع المستخدمين في التطبيق...",
    announceSend: "إرسال للجميع",
    editUserTitle: "تخصيص الباقة والصلاحيات",
    editPlan: "اسم الباقة (Plan):",
    editCredits: "تعديل رصيد النقاط:",
    editFeatures: "الخدمات المتاحة للعميل:",
    featCal: "التقويم التسويقي",
    featRev: "الرد الآلي لتقييمات ماب",
    saveChanges: "حفظ التعديلات",
    userDetailsTitle: "سجل نشاط العميل",
    backToAdmin: "العودة للقائمة",
    totalVideos: "فيديوهات وستوري",
    totalImages: "صور وتصاميم",
    totalTexts: "نصوص وردود",
    contentHistory: "سجل التوليد والإنتاج"
  },
  en: {
    dir: "ltr",
    appTitle: "SmartFlow",
    appDesc: "Your marketing agency in one place. Prompt, design, and publish.",
    badge: "Integrated Smart Studio",
    calendarTab: "Marketing Calendar",
    studioTab: "Smart Studio",
    reviewsTab: "Google Reviews",
    adminTab: "Admin Panel",
    socialHubTab: "Social Media Hub", // New
    hubDesc: "Manage your accounts, content, interactions, and analytics in one place.", // New
    tabOverview: "Overview", // New
    tabAccounts: "Accounts & Channels", // New
    tabPublishing: "Publishing & Content", // New
    tabInbox: "Unified Inbox", // New
    tabComments: "Comments & Reviews", // New
    tabAnalytics: "Analytics", // New
    currentPlan: "Current Plan",
    freePlan: "Basic Plan",
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
    socialAuth: "Social Accounts Connection (OAuth)",
    connectIg: "Connect Instagram",
    connectTk: "Connect TikTok",
    disconnectIg: "Disconnect",
    disconnectConfirm: "Are you sure you want to disconnect? Auto-publishing will stop.",
    disconnected: "Account disconnected successfully.",
    igTrustMsg: "Connection is made securely via official OAuth 2.0. We never store your passwords.",
    bizCategory: "Business Category:",
    bizPlaceholder: "Select business category...",
    customBizLabel: "Type your exact industry:",
    customBizPlaceholder: "e.g., Car repair, Law firm, Laundry...",
    contentType: "Content Type:",
    videoPromo: "🎥 Short Promo Video (TikTok/Reels)",
    socialStory: "📱 Create Social Media Story",
    poster: "📸 Special Offer Poster",
    contentPlan: "📝 Full Weekly Content Plan",
    adScript: "🎙️ Engaging Ad Script",
    reply: "💬 Smart Review Responses",
    visualOptionsTitle: "✨ Visual & Audio Options:",
    voiceLabel: "Voiceover",
    voiceMaleSA: "Male (Saudi Accent)",
    voiceFemaleSA: "Female (Saudi Accent)",
    voiceAI: "Automated AI Voice",
    voiceNone: "No Voiceover (Trending Music Only)",
    toneLabel: "Ad Tone",
    toneViral: "Viral & Hooky 🔥",
    toneStory: "Emotional Storytelling ❤️",
    toneSales: "Direct Sales & Urgent ⏳",
    toneFormal: "Corporate & Professional 💼",
    styleLabel: "Visual Style",
    styleUGC: "Realistic UGC (Mobile) 📱",
    styleMotion: "Motion Graphics Promo 🎬",
    styleAvatar: "AI Avatar Spokesperson 🤖",
    styleCinematic: "Professional Cinematic 🎥",
    textOptionsTitle: "✨ Text Content Options:",
    goalLabel: "Marketing Goal",
    goalConversion: "Drive Conversions & Sales 💰",
    goalEngagement: "Engagement & Saves 👥",
    goalAwareness: "Brand Awareness 📢",
    lengthLabel: "Text Length",
    lengthShort: "Short & Direct (Twitter/Snap)",
    lengthMedium: "Medium (Instagram/TikTok)",
    lengthLong: "Long & Detailed (LinkedIn/Blog)",
    idea: "Marketing Idea:",
    ideaPlaceholder: "Type your idea here (e.g., Summer iced coffee promo)...",
    uploadImageTitle: "Product Image (Optional, for image-to-video/poster):",
    uploadImageBtn: "Upload your product image here",
    changeImage: "Change Image",
    launchBtn: "Start Execution",
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
    publishDate: "Publish Date",
    publishTime: "Publish Time",
    fullScreen: "View Full Screen",
    deleteConfirm: "Are you sure you want to delete this permanently?",
    platformValidation: "Please select at least one platform and post type",
    dateValidation: "Please select both date and time",
    scheduleSuccess: "Scheduled successfully! 📅\nWill be published on {date} at {time}",
    visualGroup: "Visual Production",
    textGroup: "Text & Management",
    activities: [
      "Restaurants & Cafes (F&B)", "Real Estate & Property Mgt", "E-commerce (Retail)",
      "Beauty Salons & Centers", "Clinics & Medical Centers", "Events & Conferences",
      "Event Planning & Hospitality", "Travel & Tourism", "Sports & Fitness Clubs",
      "Other (Custom Input) ✍️"
    ],
    credits: "Available Credits",
    points: "pts",
    buyCredits: "Buy More Credits",
    tabGeneral: "General",
    tabBilling: "Billing & Credits",
    tabSecurity: "Security",
    tabConnections: "Connections",
    insufficientCredits: "Sorry, your credit balance is insufficient to produce this content. Please top up your plan!",
    serverError: "Our Smart Studio is experiencing high demand right now! 🎬 Please try again later.",
    reviewsTitle: "Google Maps Reviews",
    reviewsSubtitle: "AI-powered automated replies for all your branches.",
    connectGoogleBtn: "Connect Google Business",
    googleConnecting: "Connecting to Google...",
    googleConnected: "Google Account Connected",
    totalComments: "Total Comments",
    avgRating: "Average Rating",
    successReplies: "Successful AI Replies",
    noDataTitle: "No Data to Display",
    noDataDesc: "Connect your Google Business account to fetch reviews and start replying automatically.",
    startConnect: "Start Connection",
    showLabel: "Show:",
    filterTimeAll: "All Time",
    filterTimeToday: "Today",
    filterTimeWeek: "This Week",
    filterTimeMonth: "This Month",
    filterCustom: "Custom",
    filterLatest: "Latest",
    filterOldest: "Oldest",
    filterComment: "Comment 💬",
    filterRating: "Rating Only ⭐",
    advSettings: "Advanced AI Settings",
    customPrompt: "Custom AI Instructions",
    customPromptDesc: "Give specific instructions to AI for replying (e.g., offer a discount for apologies).",
    customPromptPlaceholder: "e.g., If review is negative, offer 10% discount...",
    savePrompt: "Save Instructions",
    saving: "Saving...",
    trackCompetitor: "Competitor Tracking",
    trackCompetitorDesc: "Compare your store's reviews with a competitor on Google Maps.",
    trackPlaceholder: "Paste competitor's Google Maps link here...",
    startTracking: "Start Tracking",
    tracking: "Analyzing...",
    negAlerts: "Negative Review Alerts",
    negAlertsDesc: "Send an instant WhatsApp message to the manager when a 1-star review is received.",
    phonePlaceholder: "Phone number (e.g., +966500000000)",
    activateAlert: "Activate Alert",
    activating: "Activating...",
    autoReplyMode: "Auto-Reply Mode:",
    noFilterMatch: "No reviews match this filter.",
    positive: "Positive",
    negative: "Complaint",
    category: "Category:",
    aiReplyTitle: "Suggested AI Reply:",
    autoPublished: "Auto-Published",
    draftReview: "Draft Review",
    csTeam: "Customer Service Team",
    aiEmp: "AI Agent",
    approvePublish: "Approve & Publish",
    editReply: "Edit Reply",
    aiAssistBtn: "AI Prompt Assistant",
    aiAssistDesc: "Type a short idea, and AI will expand it into a detailed, professional prompt.",
    aiAssistPlaceholder: "e.g., I need a strong ad for iced coffee...",
    aiAssistGenerate: "Generate Prompt",
    aiAssistApply: "Apply & Use",
    pendingTitle: "Account Under Review ⏳",
    pendingDesc: "Thank you for joining SmartFlow! Your account has been successfully registered and we will notify you as soon as it is activated.",
    pendingRefresh: "Refresh Status",
    calTitle: "Smart Marketing Calendar 🗓️",
    calDesc: "Plan your campaigns ahead. Click the checkmark (✅) to mark events as completed.",
    calDaysLeft: "{days} Days Left",
    calEnded: "Ended",
    calToday: "Today!",
    calLaunch: "Prepare Campaign",
    calPrepared: "Content Prepared",
    calUndo: "Undo Completion",
    calMarkDone: "Mark as Done",
    calTypes: {
      commercial: "Commercial", national: "National", entertainment: "Entertainment", global: "Global"
    },
    calEvents: {
      backToSchool: "Back to School Campaign",
      salaryAug: "Salary Day (August)",
      pizzaDay: "World Pizza Day",
      nationalDay: "Saudi National Day 94",
      salarySep: "Salary Day (September)",
      coffeeDay: "International Coffee Day",
      teachersDay: "World Teachers' Day",
      foodDay: "World Food Day",
      salaryOct: "Salary Day (October)",
      singlesDay: "Singles' Day 11:11",
      whiteFriday: "White Friday",
      salaryNov: "Salary Day (November)",
      cyberMonday: "Cyber Monday",
      volunteerDay: "International Volunteer Day",
      arabicDay: "World Arabic Language Day",
      endYear: "End of Year Sale",
      salaryDec: "Salary Day (December)"
    },
    adminTitle: "Customer Management",
    adminSubtitle: "Control accounts, credits, features, and activate new subscribers.",
    colEmail: "Email Address",
    colStatus: "Status",
    colRole: "Plan & Credits",
    colActions: "Actions",
    btnActivate: "Activate",
    btnSuspend: "Suspend",
    statusActive: "Active",
    statusPending: "Pending",
    roleAdmin: "Admin",
    roleUser: "User",
    statsUsers: "Total Users",
    statsActive: "Active Users",
    statsPending: "Pending Approvals",
    statsContent: "AI Generations",
    statsCost: "API Cost",
    statsCostDesc: "Estimated",
    announceTitle: "Broadcast Announcement 📢",
    announcePlaceholder: "Type a message to display to all users in the app...",
    announceSend: "Send to All",
    editUserTitle: "Customize Plan & Features",
    editPlan: "Plan Name:",
    editCredits: "Edit Credits Balance:",
    editFeatures: "Enabled Features:",
    featCal: "Marketing Calendar",
    featRev: "Google Maps Auto-Reply",
    saveChanges: "Save Changes",
    userDetailsTitle: "Customer Activity Log",
    backToAdmin: "Back to List",
    totalVideos: "Videos & Stories",
    totalImages: "Designs & Images",
    totalTexts: "Texts & Replies",
    contentHistory: "Generation History"
  }
};

// ==========================================
// شاشة الحسابات قيد الانتظار (Pending Screen)
// ==========================================
const PendingScreen = ({ isDark, t, checkStatus, isChecking }: any) => {
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${isDark ? 'bg-[#0b1121] text-white' : 'bg-slate-50 text-slate-900'}`} dir={t.dir}>
      <div className={`max-w-md w-full p-8 rounded-3xl border text-center shadow-2xl animate-in zoom-in duration-500 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="w-24 h-24 mx-auto mb-6 bg-yellow-500/10 rounded-full flex items-center justify-center">
          <Hourglass className="text-yellow-500 animate-pulse" size={40} />
        </div>
        <h2 className="text-2xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          {t.pendingTitle}
        </h2>
        <p className={`font-medium mb-8 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {t.pendingDesc}
        </p>
        <div className="flex flex-col gap-3">
          <button onClick={checkStatus} disabled={isChecking} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2">
            {isChecking ? <Loader2 size={18} className="animate-spin" /> : <Activity size={18} />}
            {isChecking ? t.updating : t.pendingRefresh}
          </button>
          <button onClick={() => supabase.auth.signOut()} className={`w-full py-3.5 rounded-xl font-bold transition-all ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {t.logout}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// لوحة الإدارة السرية (Admin Dashboard) 🛡️
// ==========================================
const AdminDashboard = ({ isDark, t }: any) => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  // حالات صفحة سجل العميل المستقلة
  const [viewUser, setViewUser] = useState<any>(null);
  const [userLogs, setUserLogs] = useState<any[]>([]);

  // حالات الإحصائيات الحقيقية
  const [totalContent, setTotalContent] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(0);

  // حالة نافذة التعديل
  const [editPlan, setEditPlan] = useState("");
  const [editCredits, setEditCredits] = useState(0);
  const [editFeatCal, setEditFeatCal] = useState(true);
  const [editFeatRev, setEditFeatRev] = useState(false);
  const [isSavingUser, setIsSavingUser] = useState(false);

  const fetchAdminData = async () => {
    setIsLoading(true);
    
    // 1. جلب بيانات المستخدمين
    const { data: usersData, error: usersError } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (usersData) setUsers(usersData);
    if (usersError) console.error("Error fetching users:", usersError);

    // 2. جلب إجمالي المحتوى المولد لحساب التكلفة التقديرية
    const { data: contentData, error: contentError } = await supabase.from('content_pipeline').select('id');
    if (contentData) {
      const count = contentData.length;
      setTotalContent(count);
      setEstimatedCost(count * 0.015);
    }
    if (contentError) console.error("Error fetching content stats:", contentError);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'pending' : 'active';
    const { error } = await supabase.from('profiles').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    } else {
      alert("حدث خطأ! تأكد من إعدادات RLS في قاعدة البيانات.");
    }
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setEditPlan(user.plan_name || 'Basic');
    setEditCredits(user.credits !== undefined ? user.credits : 150);
    setEditFeatCal(user.feat_calendar !== undefined ? user.feat_calendar : true);
    setEditFeatRev(user.feat_reviews !== undefined ? user.feat_reviews : false);
  };

  const saveUserConfig = async () => {
    setIsSavingUser(true);
    try {
      const { error } = await supabase.from('profiles').update({
        plan_name: editPlan,
        credits: editCredits,
        feat_calendar: editFeatCal,
        feat_reviews: editFeatRev
      }).eq('id', editingUser.id);
      
      if (error) throw error;
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, plan_name: editPlan, credits: editCredits, feat_calendar: editFeatCal, feat_reviews: editFeatRev } : u));
      setEditingUser(null);
    } catch (e: any) {
      alert("Error: " + e.message + "\nتأكد من إضافة الأعمدة في Supabase أولاً!");
    } finally {
      setIsSavingUser(false);
    }
  };

  const handleViewUser = async (user: any) => {
    setViewUser(user);
    setIsLoading(true);
    const { data, error } = await supabase.from('content_pipeline').select('*').eq('store_id', user.id).order('created_at', { ascending: false });
    if (data) setUserLogs(data);
    if (error) console.error(error);
    setIsLoading(false);
  };

  const formatDate = (dateStr: string) => {
    if(!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  };

  const activeCount = users.filter(u => u.status === 'active').length;
  const pendingCount = users.filter(u => u.status === 'pending').length;

  const cardClass = isDark ? 'bg-slate-900/50 border-slate-700/50 text-white' : 'bg-white border-slate-200 text-slate-900';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500';
  const inputBg = isDark ? 'bg-slate-950/50 border-slate-700/80 text-white focus:border-blue-500/50' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500/50';

  const ToggleSwitch = ({ isOn, onToggle }: any) => (
    <div onClick={onToggle} className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${isOn ? 'bg-green-500' : (isDark ? 'bg-slate-700' : 'bg-slate-300')}`}>
      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isOn ? (t.dir === 'rtl' ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'}`}></div>
    </div>
  );

  // عرض صفحة السجل التفصيلي للعميل إذا تم الضغط على اسمه
  if (viewUser) {
    const videoCount = userLogs.filter(l => l.content_type === 'promo_video' || l.content_type === 'social_story').length;
    const imageCount = userLogs.filter(l => l.content_type === 'product_shot').length;
    const textCount = userLogs.filter(l => l.content_type === 'social_caption' || l.content_type === 'ad_script' || l.content_type === 'customer_response').length;

    return (
      <div className={`w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-in slide-in-from-bottom-4 duration-500 ${t.dir === 'ltr' ? 'text-left' : 'text-right'} ${isDark ? 'text-white' : 'text-slate-900'}`}>
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setViewUser(null)} className={`p-2 rounded-xl border transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'}`}>
            <X size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">{t.userDetailsTitle}</h2>
            <p className={`font-medium ${textMuted}`}>{viewUser.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className={`p-5 rounded-2xl border ${cardClass} flex flex-col justify-center items-center shadow-sm`}>
             <Wallet className="text-yellow-500 mb-2" size={24} />
             <p className={`text-xs font-bold ${textMuted}`}>{t.credits}</p>
             <p className="text-2xl font-black mt-1 text-yellow-500">{viewUser.credits !== undefined ? viewUser.credits : 150}</p>
          </div>
          <div className={`p-5 rounded-2xl border ${cardClass} flex flex-col justify-center items-center shadow-sm`}>
             <Clapperboard className="text-blue-500 mb-2" size={24} />
             <p className={`text-xs font-bold ${textMuted}`}>{t.totalVideos}</p>
             <p className="text-2xl font-black mt-1">{videoCount}</p>
          </div>
          <div className={`p-5 rounded-2xl border ${cardClass} flex flex-col justify-center items-center shadow-sm`}>
             <ImagePlus className="text-pink-500 mb-2" size={24} />
             <p className={`text-xs font-bold ${textMuted}`}>{t.totalImages}</p>
             <p className="text-2xl font-black mt-1">{imageCount}</p>
          </div>
          <div className={`p-5 rounded-2xl border ${cardClass} flex flex-col justify-center items-center shadow-sm`}>
             <AlignLeft className="text-purple-500 mb-2" size={24} />
             <p className={`text-xs font-bold ${textMuted}`}>{t.totalTexts}</p>
             <p className="text-2xl font-black mt-1">{textCount}</p>
          </div>
        </div>

        <h3 className="text-lg font-bold mb-4">{t.contentHistory}</h3>
        <div className={`rounded-3xl border overflow-hidden shadow-xl ${isDark ? 'bg-slate-900/50 border-slate-700/50' : 'bg-white border-slate-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left" dir={t.dir}>
              <thead className={`text-xs uppercase font-black ${isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
                <tr>
                  <th className={`px-6 py-4 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>التاريخ والوقت</th>
                  <th className={`px-6 py-4 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>نوع الإنتاج</th>
                  <th className={`px-6 py-4 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>الفكرة / النص</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
                {userLogs.length === 0 ? (
                  <tr><td colSpan={3} className={`p-10 text-center ${textMuted}`}>لا يوجد سجل متاح</td></tr>
                ) : (
                  userLogs.map((log) => (
                    <tr key={log.id} className={`transition-colors ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}`}>
                      <td className={`px-6 py-4 font-bold text-xs ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`} dir="ltr">{formatDate(log.created_at)}</td>
                      <td className={`px-6 py-4 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'}`}>{log.content_type}</span>
                      </td>
                      <td className={`px-6 py-4 max-w-xs truncate ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>{log.user_prompt || '...'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // عرض صفحة الإدارة الرئيسية
  return (
    <div className={`w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in zoom-in duration-500 ${t.dir === 'ltr' ? 'text-left' : 'text-right'} ${isDark ? 'text-white' : 'text-slate-900'}`}>
      
      {/* رأس صفحة الإدارة */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-2">{t.adminTitle}</h2>
          <p className={`font-medium ${textMuted}`}>{t.adminSubtitle}</p>
        </div>
        <button onClick={fetchAdminData} disabled={isLoading} className={`p-3 rounded-xl border transition-all ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white' : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 shadow-sm'}`}>
          <Loader2 className={isLoading ? "animate-spin" : ""} size={20} />
        </button>
      </div>

      {/* شريط الإحصائيات KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className={`p-5 rounded-2xl border ${cardClass} flex flex-col justify-center items-center shadow-sm`}>
           <Users className="text-blue-500 mb-2" size={24} />
           <p className={`text-xs font-bold ${textMuted}`}>{t.statsUsers}</p>
           <p className="text-2xl font-black mt-1">{users.length}</p>
        </div>
        <div className={`p-5 rounded-2xl border ${cardClass} flex flex-col justify-center items-center shadow-sm`}>
           <CheckCircle2 className="text-green-500 mb-2" size={24} />
           <p className={`text-xs font-bold ${textMuted}`}>{t.statsActive}</p>
           <p className="text-2xl font-black mt-1">{activeCount}</p>
        </div>
        <div className={`p-5 rounded-2xl border ${cardClass} flex flex-col justify-center items-center shadow-sm`}>
           <Hourglass className="text-orange-500 mb-2" size={24} />
           <p className={`text-xs font-bold ${textMuted}`}>{t.statsPending}</p>
           <p className="text-2xl font-black mt-1">{pendingCount}</p>
        </div>
        <div className={`p-5 rounded-2xl border ${cardClass} flex flex-col justify-center items-center shadow-sm`}>
           <Wand2 className="text-purple-500 mb-2" size={24} />
           <p className={`text-xs font-bold ${textMuted}`}>{t.statsContent}</p>
           <p className="text-2xl font-black mt-1">{totalContent}</p>
        </div>
        <div className={`p-5 rounded-2xl border ${cardClass} flex flex-col justify-center items-center shadow-sm`}>
           <CircleDollarSign className="text-emerald-500 mb-2" size={24} />
           <p className={`text-xs font-bold ${textMuted}`}>{t.statsCost}</p>
           <p className="text-2xl font-black mt-1 text-emerald-500">${estimatedCost.toFixed(2)}</p>
           <p className={`text-[10px] font-bold mt-1 ${textMuted}`}>{t.statsCostDesc}</p>
        </div>
      </div>

      {/* نظام الإشعارات الجديد (لون أزرق ونص أبيض) */}
      <div className="p-5 rounded-2xl border mb-8 flex flex-col md:flex-row gap-4 items-center shadow-lg bg-gradient-to-r from-blue-700 to-blue-500 border-blue-600">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white"><Megaphone size={20}/></div>
          <p className="font-bold text-sm text-white">{t.announceTitle}</p>
        </div>
        <input type="text" placeholder={t.announcePlaceholder} className="flex-1 w-full px-4 py-3 text-sm rounded-xl outline-none border-none bg-black/20 text-white placeholder-white/50 focus:bg-black/30 transition-all" />
        <button onClick={()=>alert('سيتم ربط الإشعارات قريباً!')} className="w-full md:w-auto px-6 py-3 rounded-xl bg-white text-blue-600 hover:bg-slate-100 font-black text-sm transition-all whitespace-nowrap shadow-md">
          {t.announceSend}
        </button>
      </div>

      {/* جدول العملاء */}
      <div className={`rounded-3xl border overflow-hidden shadow-xl ${isDark ? 'bg-slate-900/50 border-slate-700/50' : 'bg-white border-slate-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left" dir={t.dir}>
            <thead className={`text-xs uppercase font-black ${isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
              <tr>
                <th className={`px-6 py-4 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t.colEmail}</th>
                <th className={`px-6 py-4 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t.colRole}</th>
                <th className={`px-6 py-4 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t.colStatus}</th>
                <th className="px-6 py-4 text-center">{t.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
              {isLoading ? (
                <tr><td colSpan={4} className={`p-10 text-center ${textMuted}`}>جاري التحميل...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={4} className={`p-10 text-center ${textMuted}`}>لا يوجد مستخدمين</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className={`transition-colors ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}`}>
                    <td className={`px-6 py-4 font-bold ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      <button onClick={() => handleViewUser(user)} className={`hover:text-blue-500 transition-colors flex items-center gap-2 ${t.dir === 'rtl' ? 'text-right' : 'text-left'} ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {user.email} <ChevronRight size={14} className="opacity-50" />
                      </button>
                    </td>
                    <td className={`px-6 py-4 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded border text-xs font-bold ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'}`}>
                          {user.plan_name || 'Basic'}
                        </span>
                        <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20">
                          {user.credits !== undefined ? user.credits : 150} pts
                        </span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 w-max ${user.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'}`}>
                        {user.status === 'active' ? <CheckCircle2 size={12}/> : <Hourglass size={12}/>}
                        {user.status === 'active' ? t.statusActive : t.statusPending}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      {user.role !== 'admin' && (
                        <button onClick={() => toggleStatus(user.id, user.status)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors border ${user.status === 'pending' ? 'bg-green-600 hover:bg-green-500 text-white border-green-500' : 'bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/30'}`}>
                          {user.status === 'pending' ? t.btnActivate : t.btnSuspend}
                        </button>
                      )}
                      <button onClick={() => openEditModal(user)} className={`p-1.5 rounded-lg border transition-colors ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-blue-400 hover:border-blue-500/50' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-blue-500 hover:border-blue-300'}`}>
                         <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* نافذة تعديل المستخدم (Modal) */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className={`${isDark ? 'bg-[#0f172a] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl w-full max-w-md p-6 shadow-2xl relative animate-in zoom-in duration-200`}>
             <button onClick={() => setEditingUser(null)} className={`absolute top-4 ${t.dir === 'rtl' ? 'left-4' : 'right-4'} p-2 rounded-full transition ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}><X size={20}/></button>
             
             <h3 className="text-lg font-black mb-1 flex items-center gap-2"><Zap className="text-yellow-500" size={20}/> {t.editUserTitle}</h3>
             <p className={`text-xs mb-6 font-bold truncate ${textMuted}`}>{editingUser.email}</p>

             <div className="space-y-4">
               <div>
                 <label className={`block text-xs font-bold mb-1.5 ${textMuted}`}>{t.editPlan}</label>
                 <input type="text" value={editPlan} onChange={(e: any)=>setEditPlan(e.target.value)} className={`w-full px-4 py-2 text-sm rounded-xl outline-none border transition-all ${inputBg}`} />
               </div>

               <div>
                 <label className={`block text-xs font-bold mb-1.5 ${textMuted}`}>{t.editCredits}</label>
                 <input type="number" value={editCredits} onChange={(e: any)=>setEditCredits(parseInt(e.target.value))} className={`w-full px-4 py-2 text-sm rounded-xl outline-none border transition-all ${inputBg}`} dir="ltr" />
               </div>

               <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/50 border-slate-700/80' : 'bg-slate-50 border-slate-200'}`}>
                  <label className={`block text-xs font-bold mb-3 ${textMuted}`}>{t.editFeatures}</label>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold flex items-center gap-2"><CalendarRange size={16} className="text-purple-500"/> {t.featCal}</span>
                      <ToggleSwitch isOn={editFeatCal} onToggle={() => setEditFeatCal(!editFeatCal)} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold flex items-center gap-2"><MessageCircle size={16} className="text-pink-500"/> {t.featRev}</span>
                      <ToggleSwitch isOn={editFeatRev} onToggle={() => setEditFeatRev(!editFeatRev)} />
                    </div>
                  </div>
               </div>
             </div>

             <button onClick={saveUserConfig} disabled={isSavingUser} className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
               {isSavingUser ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />} {t.saveChanges}
             </button>
          </div>
        </div>
      )}

    </div>
  );
};

// ==========================================
// 🚀 مركز إدارة السوشال ميديا الجديد (Social Media Hub) 🚀
// ==========================================
const SOCIAL_PROVIDER_META: any = {
  tiktok: { label: 'TikTok', icon: PlayCircle, iconClass: 'bg-black text-white' },
  instagram: { label: 'Instagram', icon: Instagram, iconClass: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white' },
  whatsapp: { label: 'WhatsApp', icon: Phone, iconClass: 'bg-green-500 text-white' },
  google: { label: 'Google Business', icon: Store, iconClass: 'bg-blue-600 text-white' },
};

// قراءة/كتابة آمنة من التخزين المحلي حتى تبقى حالة الربط ثابتة بعد التحديث 🚀
const sfReadLS = (key: string, fallback: any) => {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
};
const sfWriteLS = (key: string, value: any) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
};

// بيانات محادثات تجريبية لكل منصة + رد الذكاء الاصطناعي المقترح على آخر رسالة واردة 🚀
const SF_DEMO_CONVERSATIONS: any = {
  tiktok: [
    { id: 't1', name: 'سارة العتيبي', online: true, unread: 2, messages: [
      { id: 1, from: 'user', text: 'هل المنتج متوفر بلون أزرق؟', time: '10:24 ص' },
      { id: 2, from: 'user', text: 'وكم سعر الشحن؟', time: '10:25 ص' },
    ], pendingSuggestion: { text: 'أهلاً سارة، نعم المنتج متوفر باللون الأزرق حالياً، والشحن مجاني للطلبات فوق 200 ريال 😊' } },
    { id: 't2', name: 'محمد الحربي', online: false, unread: 0, messages: [
      { id: 1, from: 'user', text: 'شكراً على الرد السريع 🙏', time: 'أمس' },
      { id: 2, from: 'ai', text: 'العفو، بخدمتك دائماً', time: 'أمس' },
    ], pendingSuggestion: null },
  ],
  instagram: [
    { id: 'i1', name: 'نورة القحطاني', online: true, unread: 1, messages: [
      { id: 1, from: 'user', text: 'أبغى أطلب طلبين من العرض', time: '9:10 ص' },
    ], pendingSuggestion: { text: 'حياك الله نورة، تقدرين تطلبين الطلبين مباشرة من خلال الرابط في البايو، وبانتظار طلبك 🌹' } },
  ],
  whatsapp: [
    { id: 'w1', name: '+966 55 123 4567', online: false, unread: 3, messages: [
      { id: 1, from: 'user', text: 'وين وصل طلبي؟', time: '8:40 ص' },
    ], pendingSuggestion: { text: 'حياكم الله، طلبكم في الطريق وسيصلكم خلال الساعتين القادمتين إن شاء الله 🚚' } },
  ],
  google: [
    { id: 'g1', name: 'خالد المطيري', online: false, unread: 1, messages: [
      { id: 1, from: 'user', text: 'تقييم 5 نجوم، خدمة ممتازة!', time: 'أمس' },
    ], pendingSuggestion: { text: 'شكراً لك خالد على ثقتك وتقييمك الرائع، سعداء بخدمتك دائماً 🙏' } },
  ],
};

const SF_DEFAULT_SETTINGS: any = {
  tiktok: { replyMode: 'suggest', notify: true, autoReplyComments: false },
  instagram: { replyMode: 'suggest', notify: true, autoReplyComments: false },
  whatsapp: { replyMode: 'suggest', notify: true, welcomeMessage: '' },
  google: { replyMode: 'suggest', notify: true, autoReplyReviews: false },
};

// إحصائيات تجريبية خاصة بكل منصة (تصنيف الرسائل بما يناسب طبيعة كل تطبيق) 🚀
const SF_PROVIDER_STATS: any = {
  tiktok: { commentsToday: 18, responseRate: 92 },
  instagram: { commentsToday: 11, responseRate: 88 },
  whatsapp: { avgReplyTime: '15 دقيقة' },
  google: { totalReviews: 47, avgRating: 4.6, positive: 41, negative: 6 },
};

const SocialMediaHub = ({
  isDark, t, setActiveView,
  isTkConnected, tkUsername, tkAvatar, setIsTkConnected, setTkUsername, setTkAvatar, handleConnectTikTok,
  isIgConnected, igUsername, igAvatar, setIsIgConnected, setIgUsername, setIgAvatar, handleConnectInstagram,
}: any) => {
  const [activeTab, setActiveTab] = useState('overview');

  const ToggleSwitch = ({ isOn, onToggle }: any) => (
    <div onClick={onToggle} className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors shrink-0 ${isOn ? 'bg-green-500' : (isDark ? 'bg-slate-700' : 'bg-slate-300')}`}>
      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isOn ? (t.dir === 'rtl' ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'}`}></div>
    </div>
  );

  // شخصية موظف خدمة العملاء الافتراضية (نفس منطق موظف تقييمات قوقل) 🚀
  const currentHour = new Date().getHours();
  const isDayShift = currentHour >= 6 && currentHour < 18;
  const sfStoreSettings = {
    storeName: "أسماك المحيط / Asmak Al Mohit",
    storePhone: "+966 50 000 0000",
    dayEmployeeName: "نورة / Noura",
    nightEmployeeName: "خالد / Khaled",
  };
  const sfAiEmployeeName = isDayShift ? sfStoreSettings.dayEmployeeName : sfStoreSettings.nightEmployeeName;
  const sfAiEmployeeAvatar = isDayShift ? "👩‍💻" : "👨‍💻";

  // بطاقة توقيع موظف الذكاء الاصطناعي (تظهر أسفل كل رد آلي) 🚀
  const AiSignature = () => (
    <div className="flex items-center gap-2.5 mt-2">
      <div className="text-[26px] leading-none shrink-0">{sfAiEmployeeAvatar}</div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black text-blue-500 dark:text-blue-400">{sfAiEmployeeName}</span>
          <span className="text-[10px] font-bold text-pink-500 dark:text-pink-400">({t.aiEmp})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"></span>
          <span className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.csTeam} ({sfStoreSettings.storeName})</span>
        </div>
        <span className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`} dir="ltr">{sfStoreSettings.storePhone}</span>
      </div>
    </div>
  );

  // حالات واتساب وقوقل بزنس (مخصصة لهذا المركز) - محفوظة في التخزين المحلي 🚀
  const [isGoogleConnected, setIsGoogleConnected] = useState(() => sfReadLS('sf_google_connected', false));
  const [isConnectingGoogle, setIsConnectingGoogle] = useState(false);
  const [isWaConnected, setIsWaConnected] = useState(() => sfReadLS('sf_wa_connected', false));
  const [waPhone, setWaPhone] = useState(() => sfReadLS('sf_wa_phone', ""));
  const [showWaModal, setShowWaModal] = useState(false);
  const [waInput, setWaInput] = useState("");
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  useEffect(() => { sfWriteLS('sf_google_connected', isGoogleConnected); }, [isGoogleConnected]);
  useEffect(() => { sfWriteLS('sf_wa_connected', isWaConnected); sfWriteLS('sf_wa_phone', waPhone); }, [isWaConnected, waPhone]);

  // حالة رفع الميديا للجدولة 🚀
  const [scheduleMediaFile, setScheduleMediaFile] = useState<File | null>(null);
  const [scheduleMediaPreview, setScheduleMediaPreview] = useState<string | null>(null);
  const [scheduleMediaType, setScheduleMediaType] = useState<'image' | 'video' | null>(null);
  const [scheduleCaption, setScheduleCaption] = useState("");
  const [schedulePlatform, setSchedulePlatform] = useState('tiktok');
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const [scheduledPosts, setScheduledPosts] = useState([
    { id: 1, name: 'إعلان الصيف', platform: 'TikTok', time: 'اليوم — 8:00 PM', status: 'مجدول', statusColor: 'blue' },
    { id: 2, name: 'بوست الخصومات', platform: 'Instagram', time: 'غداً — 7:00 PM', status: 'بانتظار الموافقة', statusColor: 'yellow' },
  ]);

  const formatScheduleDate = (dateStr: string) => {
    if (!dateStr) return t.publishDate;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getFullYear()} ${months[d.getMonth()]} ${d.getDate()}`;
  };

  // حالات صندوق الوارد الموحد 🚀
  const [conversations, setConversations] = useState<any>(SF_DEMO_CONVERSATIONS);
  const [inboxFilter, setInboxFilter] = useState('all');
  const [activeConversation, setActiveConversation] = useState<{ provider: string; id: string } | null>(null);
  const [editingSuggestion, setEditingSuggestion] = useState<{ provider: string; id: string } | null>(null);
  const [editSuggestionText, setEditSuggestionText] = useState("");

  // إعدادات كل منصة (وضع الرد + خيارات خاصة) - محفوظة في التخزين المحلي 🚀
  const [appSettings, setAppSettings] = useState<any>(() => sfReadLS('sf_autoreply_settings_v2', SF_DEFAULT_SETTINGS));
  const [activeChannelDetail, setActiveChannelDetail] = useState<string | null>(null);

  useEffect(() => { sfWriteLS('sf_autoreply_settings_v2', appSettings); }, [appSettings]);

  const tabs = [
    { id: 'overview', name: t.tabOverview },
    { id: 'accounts', name: t.tabAccounts },
    { id: 'publishing', name: t.tabPublishing },
    { id: 'inbox', name: t.tabInbox },
    { id: 'analytics', name: t.tabAnalytics },
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'connected') return <span className="flex items-center text-xs text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full border border-green-500/20"><span className="w-1.5 h-1.5 rounded-full bg-green-400 ml-1.5"></span>متصل</span>;
    if (status === 'pending') return <span className="flex items-center text-xs text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500 ml-1.5"></span>بانتظار الموافقة</span>;
    return <span className="flex items-center text-xs text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded-full border border-slate-700"><span className="w-1.5 h-1.5 rounded-full bg-slate-500 ml-1.5"></span>غير متصل</span>;
  };

  const ProviderIcon = ({ provider, size = 40 }: any) => {
    const meta = SOCIAL_PROVIDER_META[provider];
    const Icon = meta.icon;
    return (
      <div className={`rounded-xl flex items-center justify-center shrink-0 ${meta.iconClass}`} style={{ width: size, height: size }}>
        <Icon size={size * 0.55} />
      </div>
    );
  };

  const connections = [
    { provider: 'tiktok', name: 'TikTok', status: isTkConnected ? 'connected' : 'disconnected' },
    { provider: 'instagram', name: 'Instagram', status: isIgConnected ? 'connected' : 'disconnected' },
    { provider: 'whatsapp', name: 'WhatsApp', status: isWaConnected ? 'connected' : 'disconnected' },
    { provider: 'google', name: 'Google Business', status: isGoogleConnected ? 'connected' : 'disconnected' },
  ];

  const getProviderStats = (provider: string) => {
    const convs = conversations[provider] || [];
    const totalMessages = convs.reduce((sum: number, c: any) => sum + c.messages.length, 0);
    const unread = convs.reduce((sum: number, c: any) => sum + c.unread, 0);
    return { totalMessages, unread };
  };

  const handleConnectProvider = (provider: string) => {
    if (provider === 'tiktok') return handleConnectTikTok();
    if (provider === 'instagram') return handleConnectInstagram();
    if (provider === 'whatsapp') { setWaInput(""); setShowWaModal(true); return; }
    if (provider === 'google') {
      setIsConnectingGoogle(true);
      setTimeout(() => { setIsConnectingGoogle(false); setIsGoogleConnected(true); }, 1500);
    }
  };

  const handleDisconnectProvider = (provider: string) => {
    if (!window.confirm(t.disconnectConfirm)) return;
    if (provider === 'tiktok') { setIsTkConnected(false); setTkUsername(""); setTkAvatar(""); }
    if (provider === 'instagram') { setIsIgConnected(false); setIgUsername(""); setIgAvatar(""); }
    if (provider === 'whatsapp') { setIsWaConnected(false); setWaPhone(""); }
    if (provider === 'google') { setIsGoogleConnected(false); }
  };

  const handleWaSubmit = (e: any) => {
    e.preventDefault();
    if (!waInput.trim()) return;
    setWaPhone(waInput.trim());
    setIsWaConnected(true);
    setShowWaModal(false);
  };

  const handleScheduleMediaChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScheduleMediaFile(file);
    setScheduleMediaType(file.type.startsWith('video') ? 'video' : 'image');
    const reader = new FileReader();
    reader.onloadend = () => setScheduleMediaPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAddToSchedule = () => {
    if (!scheduleMediaFile || !scheduleDate || !scheduleTime) return;
    const platformMeta = SOCIAL_PROVIDER_META[schedulePlatform];
    setScheduledPosts((prev) => [
      { id: Date.now(), name: scheduleCaption || scheduleMediaFile.name, platform: platformMeta.label, time: `${formatScheduleDate(scheduleDate)} — ${scheduleTime}`, status: 'مجدول', statusColor: 'blue' },
      ...prev,
    ]);
    setScheduleMediaFile(null);
    setScheduleMediaPreview(null);
    setScheduleMediaType(null);
    setScheduleCaption("");
    setScheduleDate("");
    setScheduleTime("");
  };

  // فتح محادثة: إن كانت المنصة بوضع "تلقائي" يُنشر الرد المقترح فوراً، وإلا يبقى بانتظار المراجعة 🚀
  const openConversation = (provider: string, id: string) => {
    setActiveConversation({ provider, id });
    setConversations((prev: any) => ({
      ...prev,
      [provider]: prev[provider].map((c: any) => {
        if (c.id !== id) return c;
        let updated = { ...c, unread: 0 };
        if (c.pendingSuggestion && appSettings[provider]?.replyMode === 'auto') {
          updated = {
            ...updated,
            messages: [...c.messages, { id: Date.now(), from: 'ai', text: c.pendingSuggestion.text, time: 'الآن' }],
            pendingSuggestion: null,
          };
        }
        return updated;
      }),
    }));
  };

  const handleApproveSuggestion = (provider: string, id: string, textOverride?: string) => {
    setConversations((prev: any) => ({
      ...prev,
      [provider]: prev[provider].map((c: any) => c.id === id
        ? { ...c, messages: [...c.messages, { id: Date.now(), from: 'ai', text: textOverride ?? c.pendingSuggestion?.text, time: 'الآن' }], pendingSuggestion: null }
        : c),
    }));
    setEditingSuggestion(null);
  };

  const startEditSuggestion = (provider: string, id: string, currentText: string) => {
    setEditingSuggestion({ provider, id });
    setEditSuggestionText(currentText);
  };

  const submitEditedSuggestion = () => {
    if (!editingSuggestion || !editSuggestionText.trim()) return;
    handleApproveSuggestion(editingSuggestion.provider, editingSuggestion.id, editSuggestionText.trim());
  };

  const updateProviderSetting = (provider: string, key: string, value: any) => {
    setAppSettings((prev: any) => ({ ...prev, [provider]: { ...prev[provider], [key]: value } }));
  };

  const inboxProviders = inboxFilter === 'all' ? connections : connections.filter((c) => c.provider === inboxFilter);
  const flattenedConversations = inboxProviders.flatMap((c) =>
    (conversations[c.provider] || []).map((conv: any) => ({ ...conv, provider: c.provider }))
  );
  const activeConvData = activeConversation
    ? (conversations[activeConversation.provider] || []).find((c: any) => c.id === activeConversation.id)
    : null;

  // ====== زر تبويب بحافة "ليزر" متوهجة عند التفعيل (نفس أسلوب شعار SmartFlow) 🚀 ======
  const LaserTab = ({ tab }: any) => {
    const isActive = activeTab === tab.id;
    if (isActive) {
      return (
        <button onClick={() => setActiveTab(tab.id)} className="relative rounded-xl p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse shadow-[0_0_14px_rgba(168,85,247,0.5)] shrink-0">
          <span className={`block px-4 py-2 rounded-[10px] text-sm font-black whitespace-nowrap ${isDark ? 'bg-[#0f172a] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600'}`}>
            {tab.name}
          </span>
        </button>
      );
    }
    return (
      <button onClick={() => setActiveTab(tab.id)} className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap border transition-colors shrink-0 ${isDark ? 'border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700' : 'border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}>
        {tab.name}
      </button>
    );
  };

  return (
    <div className={`w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in zoom-in duration-500 ${t.dir === 'ltr' ? 'text-left' : 'text-right'} ${isDark ? 'text-white' : 'text-slate-900'}`}>
      
      {/* Header */}
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-l from-blue-400 to-purple-500">
          {t.socialHubTab}
        </h1>
        <p className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {t.hubDesc}
        </p>
      </div>

      {/* Tabs Navigation - بتصميم الحواف المتوهجة 🚀 */}
      <div className="flex flex-wrap items-center gap-2.5 mb-6 pb-2">
        {tabs.map((tab) => <LaserTab key={tab.id} tab={tab} />)}
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Tab: Overview - يعرض نشاط كل حساب، بلا زر فصل 🚀 */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {connections.map((conn) => {
              const stats = getProviderStats(conn.provider);
              return (
                <div key={conn.provider} className={`p-5 rounded-2xl border flex flex-col justify-between ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <ProviderIcon provider={conn.provider} size={36} />
                      <h3 className="font-bold">{conn.name}</h3>
                    </div>
                    <StatusBadge status={conn.status} />
                  </div>

                  {conn.status === 'connected' ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div className={`rounded-xl p-3 text-center ${isDark ? 'bg-slate-800/60' : 'bg-slate-50'}`}>
                        <p className="text-lg font-black">{stats.totalMessages}</p>
                        <p className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>رسالة واردة</p>
                      </div>
                      <div className={`rounded-xl p-3 text-center ${stats.unread > 0 ? (isDark ? 'bg-red-500/10' : 'bg-red-50') : (isDark ? 'bg-slate-800/60' : 'bg-slate-50')}`}>
                        <p className={`text-lg font-black ${stats.unread > 0 ? 'text-red-500' : ''}`}>{stats.unread}</p>
                        <p className={`text-[11px] font-bold ${stats.unread > 0 ? 'text-red-500/80' : (isDark ? 'text-slate-400' : 'text-slate-500')}`}>غير مقروء</p>
                      </div>
                    </div>
                  ) : (
                    <p className={`text-xs mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>اربط الحساب لعرض النشاط والرسائل الواردة</p>
                  )}

                  {conn.status !== 'connected' && (
                    <button onClick={() => handleConnectProvider(conn.provider)} className="text-xs font-bold text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg transition-colors self-start mt-4">ربط الحساب</button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab: Accounts */}
        {activeTab === 'accounts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">القنوات المتاحة</h2>
              <button onClick={() => setShowAddAccountModal(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:opacity-90 transition-opacity">
                + إضافة حساب
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections.map((conn) => (
                <div key={conn.provider} className={`p-5 flex flex-col justify-between rounded-2xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <ProviderIcon provider={conn.provider} size={40} />
                      <div>
                        <h3 className="font-bold">{conn.name}</h3>
                        <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {conn.status === 'connected' && conn.provider === 'whatsapp' && waPhone ? waPhone : (conn.status === 'connected' ? 'الحساب مربوط ونشط' : 'غير مربوط بعد')}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={conn.status} />
                  </div>
                  
                  <div className={`flex justify-end mt-4 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                     {conn.status === 'connected' && (
                       <button onClick={() => handleDisconnectProvider(conn.provider)} className="text-sm font-bold px-4 py-1.5 rounded-lg bg-slate-800 text-white hover:bg-red-500/80 transition-colors">فصل الحساب</button>
                     )}
                     {conn.status === 'disconnected' && (
                       <button onClick={() => handleConnectProvider(conn.provider)} disabled={isConnectingGoogle && conn.provider === 'google'} className="text-sm font-bold text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 px-4 py-1.5 rounded-lg transition-colors flex items-center gap-2">
                         {isConnectingGoogle && conn.provider === 'google' ? <Loader2 size={14} className="animate-spin" /> : null}
                         ربط الحساب
                       </button>
                     )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Publishing */}
        {activeTab === 'publishing' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-purple-500/20 rounded-2xl p-6">
              <div>
                <h2 className="text-lg font-bold text-white">هل لديك فكرة جديدة؟</h2>
                <p className="text-sm text-slate-300 mt-1">استخدم الاستوديو الذكي لإنشاء، صياغة، وجدولة محتواك.</p>
              </div>
              <button onClick={() => setActiveView('studio')} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap">
                + إنشاء منشور ذكي
              </button>
            </div>

            <div className={`rounded-2xl border p-6 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className="text-lg font-bold mb-1 flex items-center gap-2"><UploadCloud size={20} className="text-blue-500" /> رفع صورة أو فيديو للجدولة</h3>
              <p className={`text-xs mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ارفع ملف ميديا جاهز من جهازك (صورة أو فيديو) وحدد موعد نشره على أي منصة متصلة.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input type="file" accept="image/*,video/*" onChange={handleScheduleMediaChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className={`h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden ${isDark ? 'border-slate-700 bg-slate-800/40' : 'border-slate-300 bg-slate-50'}`}>
                    {scheduleMediaPreview ? (
                      scheduleMediaType === 'video' ? (
                        <video src={scheduleMediaPreview} className="w-full h-full object-cover" controls />
                      ) : (
                        <img src={scheduleMediaPreview} alt="معاينة الميديا" className="w-full h-full object-cover" />
                      )
                    ) : (
                      <>
                        <UploadCloud size={28} className="text-slate-400 mb-2" />
                        <p className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>اسحب أو اضغط لرفع صورة/فيديو</p>
                        <p className="text-xs text-slate-500 mt-1">PNG, JPG, MP4, MOV</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <textarea value={scheduleCaption} onChange={(e: any) => setScheduleCaption(e.target.value)} placeholder="اكتب وصف/كابشن المنشور..." rows={3} className={`w-full p-3 rounded-xl text-sm outline-none border resize-none ${isDark ? 'bg-slate-800/60 border-slate-700 text-white' : 'bg-white border-slate-200'}`} />
                  
                  <select value={schedulePlatform} onChange={(e: any) => setSchedulePlatform(e.target.value)} className={`w-full p-3 rounded-xl text-sm outline-none border ${isDark ? 'bg-slate-800/60 border-slate-700 text-white' : 'bg-white border-slate-200'}`}>
                    {connections.map((c) => <option key={c.provider} value={c.provider}>{c.name}</option>)}
                  </select>

                  <div className="flex gap-3">
                    <div className="relative flex-1 group cursor-pointer" onClick={() => { try { dateRef.current?.showPicker(); } catch (e) {} }}>
                      <div className={`w-full border rounded-xl px-4 py-3 text-sm transition-all flex items-center justify-between group-hover:border-purple-500 shadow-sm overflow-hidden ${isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-900'}`}>
                        <span className={`${scheduleDate ? 'font-black text-purple-500' : 'opacity-60 font-bold'} font-sans tracking-wide whitespace-nowrap`} dir="ltr">
                          {formatScheduleDate(scheduleDate)}
                        </span>
                        <CalendarRange size={18} className={`shrink-0 ${scheduleDate ? 'text-purple-500' : 'text-slate-400'}`} />
                      </div>
                      <input
                        ref={dateRef}
                        type="date"
                        lang="en-US"
                        required
                        value={scheduleDate}
                        onChange={(e: any) => setScheduleDate(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
                        style={{ colorScheme: isDark ? 'dark' : 'light' }}
                      />
                    </div>

                    <div className="relative flex-1 group cursor-pointer" onClick={() => { try { timeRef.current?.showPicker(); } catch (e) {} }}>
                      <div className={`w-full border rounded-xl px-4 py-3 text-sm transition-all flex items-center justify-between group-hover:border-purple-500 shadow-sm overflow-hidden ${isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-900'}`}>
                        <span className={`${scheduleTime ? 'font-black text-purple-500' : 'opacity-60 font-bold'} font-sans tracking-wide whitespace-nowrap`} dir="ltr">
                          {scheduleTime || t.publishTime}
                        </span>
                        <Clock size={18} className={`shrink-0 ${scheduleTime ? 'text-purple-500' : 'text-slate-400'}`} />
                      </div>
                      <input
                        ref={timeRef}
                        type="time"
                        lang="en-US"
                        required
                        value={scheduleTime}
                        onChange={(e: any) => setScheduleTime(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
                        style={{ colorScheme: isDark ? 'dark' : 'light' }}
                      />
                    </div>
                  </div>

                  <button onClick={handleAddToSchedule} disabled={!scheduleMediaFile || !scheduleDate || !scheduleTime} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                    <CalendarRange size={16} /> جدولة المنشور
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">المحتوى المجدول القادم</h3>
              <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                <table className="w-full text-sm">
                  <thead className={`border-b ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <tr>
                      <th className="px-6 py-4 font-bold text-right">اسم المحتوى</th>
                      <th className="px-6 py-4 font-bold text-right">المنصة</th>
                      <th className="px-6 py-4 font-bold text-right">الموعد</th>
                      <th className="px-6 py-4 font-bold text-right">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {scheduledPosts.map((post) => (
                      <tr key={post.id} className={isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}>
                        <td className="px-6 py-4 font-bold">{post.name}</td>
                        <td className="px-6 py-4">{post.platform}</td>
                        <td className="px-6 py-4 text-slate-400">{post.time}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${post.statusColor === 'blue' ? 'text-blue-400 bg-blue-400/10 border-blue-500/20' : 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'}`}>{post.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Inbox - رد آلي بالكامل أو اقتراح + مراجعة، بلا كتابة يدوية حرة 🚀 */}
        {activeTab === 'inbox' && (
          activeChannelDetail ? (
            // ============ صفحة تفاصيل القناة المستقلة ============
            (() => {
              const provider = activeChannelDetail;
              const conn = connections.find((c) => c.provider === provider)!;
              const settings = appSettings[provider] || {};
              const pStats = SF_PROVIDER_STATS[provider] || {};
              const gStats = getProviderStats(provider);
              return (
                <div className="space-y-6">
                  <button onClick={() => setActiveChannelDetail(null)} className={`flex items-center gap-1.5 text-sm font-bold ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                    <ChevronRight size={16} className={t.dir === 'rtl' ? '' : 'rotate-180'} /> رجوع لصندوق الوارد
                  </button>

                  <div className={`p-5 rounded-2xl border flex items-center justify-between flex-wrap gap-3 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="flex items-center gap-3">
                      <ProviderIcon provider={provider} size={44} />
                      <div>
                        <h2 className="text-lg font-bold">{conn.name}</h2>
                        <StatusBadge status={conn.status} />
                      </div>
                    </div>
                    {conn.status === 'connected' && (
                      <button onClick={() => handleDisconnectProvider(provider)} className="text-sm font-bold px-4 py-1.5 rounded-lg bg-slate-800 text-white hover:bg-red-500/80 transition-colors">فصل الحساب</button>
                    )}
                  </div>

                  {/* إحصائيات مخصصة لكل تطبيق 🚀 */}
                  <div>
                    <h3 className="text-sm font-black mb-3">إحصائيات {conn.name}</h3>
                    {provider === 'google' ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className={`rounded-xl p-4 text-center ${isDark ? 'bg-slate-800/60' : 'bg-slate-50'}`}>
                          <p className="text-xl font-black">{pStats.totalReviews}</p>
                          <p className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>إجمالي التقييمات</p>
                        </div>
                        <div className={`rounded-xl p-4 text-center flex flex-col items-center ${isDark ? 'bg-slate-800/60' : 'bg-slate-50'}`}>
                          <p className="text-xl font-black flex items-center gap-1">{pStats.avgRating} <Star size={14} className="fill-yellow-400 text-yellow-400" /></p>
                          <p className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>متوسط التقييم</p>
                        </div>
                        <div className={`rounded-xl p-4 text-center ${isDark ? 'bg-green-500/10' : 'bg-green-50'}`}>
                          <p className="text-xl font-black text-green-500">{pStats.positive}</p>
                          <p className="text-[11px] font-bold text-green-500/80">{t.positive}</p>
                        </div>
                        <div className={`rounded-xl p-4 text-center ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}>
                          <p className="text-xl font-black text-red-500">{pStats.negative}</p>
                          <p className="text-[11px] font-bold text-red-500/80">{t.negative}</p>
                        </div>
                      </div>
                    ) : provider === 'whatsapp' ? (
                      <div className="grid grid-cols-3 gap-3">
                        <div className={`rounded-xl p-4 text-center ${isDark ? 'bg-slate-800/60' : 'bg-slate-50'}`}><p className="text-xl font-black">{gStats.totalMessages}</p><p className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>رسالة واردة</p></div>
                        <div className={`rounded-xl p-4 text-center ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}><p className="text-xl font-black text-red-500">{gStats.unread}</p><p className="text-[11px] font-bold text-red-500/80">غير مقروء</p></div>
                        <div className={`rounded-xl p-4 text-center ${isDark ? 'bg-slate-800/60' : 'bg-slate-50'}`}><p className="text-xl font-black">{pStats.avgReplyTime}</p><p className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>متوسط وقت الرد</p></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className={`rounded-xl p-4 text-center ${isDark ? 'bg-slate-800/60' : 'bg-slate-50'}`}><p className="text-xl font-black">{gStats.totalMessages}</p><p className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>رسالة واردة</p></div>
                        <div className={`rounded-xl p-4 text-center ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}><p className="text-xl font-black text-red-500">{gStats.unread}</p><p className="text-[11px] font-bold text-red-500/80">غير مقروء</p></div>
                        <div className={`rounded-xl p-4 text-center ${isDark ? 'bg-slate-800/60' : 'bg-slate-50'}`}><p className="text-xl font-black">{pStats.commentsToday}</p><p className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>تعليق اليوم</p></div>
                        <div className={`rounded-xl p-4 text-center ${isDark ? 'bg-green-500/10' : 'bg-green-50'}`}><p className="text-xl font-black text-green-500">%{pStats.responseRate}</p><p className="text-[11px] font-bold text-green-500/80">معدل الاستجابة</p></div>
                      </div>
                    )}
                  </div>

                  {/* إعدادات وضع الرد 🚀 */}
                  <div>
                    <h3 className="text-sm font-black mb-3">إعدادات الرد</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <button onClick={() => updateProviderSetting(provider, 'replyMode', 'auto')} className={`p-4 rounded-2xl border text-right transition-colors ${settings.replyMode === 'auto' ? 'border-purple-500 bg-purple-500/10' : (isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white')}`}>
                        <div className="flex items-center gap-2 mb-1"><Zap size={18} className={settings.replyMode === 'auto' ? 'text-purple-500' : 'text-slate-400'} /><span className="font-bold text-sm">رد تلقائي بالكامل</span></div>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>يرسل الذكاء الاصطناعي الرد فور وصول الرسالة دون أي تدخل.</p>
                      </button>
                      <button onClick={() => updateProviderSetting(provider, 'replyMode', 'suggest')} className={`p-4 rounded-2xl border text-right transition-colors ${settings.replyMode === 'suggest' ? 'border-purple-500 bg-purple-500/10' : (isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white')}`}>
                        <div className="flex items-center gap-2 mb-1"><Edit size={18} className={settings.replyMode === 'suggest' ? 'text-purple-500' : 'text-slate-400'} /><span className="font-bold text-sm">اقتراح رد بانتظار المراجعة</span></div>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>يجهز الذكاء الاصطناعي رداً مقترحاً، وتقوم أنت باعتماده أو تعديله قبل الإرسال.</p>
                      </button>
                    </div>

                    <div className={`flex items-center justify-between p-3 rounded-xl border mt-3 ${isDark ? 'border-slate-800 bg-slate-800/40' : 'border-slate-200 bg-slate-50'}`}>
                      <div>
                        <p className="text-sm font-bold flex items-center gap-2"><Bell size={16} className="text-orange-500" /> تنبيه عند وصول رسالة جديدة</p>
                      </div>
                      <ToggleSwitch isOn={!!settings.notify} onToggle={() => updateProviderSetting(provider, 'notify', !settings.notify)} />
                    </div>

                    {(provider === 'tiktok' || provider === 'instagram') && (
                      <div className={`flex items-center justify-between p-3 rounded-xl border mt-3 ${isDark ? 'border-slate-800 bg-slate-800/40' : 'border-slate-200 bg-slate-50'}`}>
                        <div>
                          <p className="text-sm font-bold flex items-center gap-2"><MessageCircle size={16} className="text-blue-500" /> الرد التلقائي على التعليقات العامة</p>
                        </div>
                        <ToggleSwitch isOn={!!settings.autoReplyComments} onToggle={() => updateProviderSetting(provider, 'autoReplyComments', !settings.autoReplyComments)} />
                      </div>
                    )}
                    {provider === 'google' && (
                      <div className={`flex items-center justify-between p-3 rounded-xl border mt-3 ${isDark ? 'border-slate-800 bg-slate-800/40' : 'border-slate-200 bg-slate-50'}`}>
                        <div>
                          <p className="text-sm font-bold flex items-center gap-2"><Star size={16} className="text-yellow-500" /> الرد التلقائي على التقييمات</p>
                        </div>
                        <ToggleSwitch isOn={!!settings.autoReplyReviews} onToggle={() => updateProviderSetting(provider, 'autoReplyReviews', !settings.autoReplyReviews)} />
                      </div>
                    )}
                    {provider === 'google' && (
                      <button onClick={() => setActiveView('reviews')} className="w-full mt-3 text-sm font-bold text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2.5 rounded-xl transition-colors">فتح لوحة تقييمات قوقل ماب الكاملة</button>
                    )}
                    {provider === 'whatsapp' && (
                      <div className={`p-3 rounded-xl border mt-3 ${isDark ? 'border-slate-800 bg-slate-800/40' : 'border-slate-200 bg-slate-50'}`}>
                        <p className="text-sm font-bold flex items-center gap-2 mb-2"><MessageCircle size={16} className="text-green-500" /> رسالة الترحيب التلقائية</p>
                        <textarea value={settings.welcomeMessage || ''} onChange={(e: any) => updateProviderSetting('whatsapp', 'welcomeMessage', e.target.value)} placeholder="مرحباً بك، كيف يمكننا خدمتك اليوم؟" rows={2} className={`w-full p-2.5 rounded-lg text-sm outline-none border resize-none ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })()
          ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-4">قنوات صندوق الوارد</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {connections.map((conn) => (
                  <div key={conn.provider} onClick={() => setActiveChannelDetail(conn.provider)} className={`p-4 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-purple-500/50' : 'bg-white border-slate-200 shadow-sm hover:border-purple-300'}`}>
                    <div className="flex items-center gap-3">
                      <ProviderIcon provider={conn.provider} size={32} />
                      <div>
                        <h4 className="font-bold text-sm">{conn.name}</h4>
                        <StatusBadge status={conn.status} />
                      </div>
                    </div>
                    {conn.status !== 'connected' ? (
                      <button onClick={(e: any) => { e.stopPropagation(); handleConnectProvider(conn.provider); }} className="text-xs font-bold text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">ربط</button>
                    ) : (
                      <Sliders size={16} className="text-slate-400 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
              <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>اضغط على أي بطاقة لفتح صفحة إعدادات وإحصائيات التطبيق الخاصة بها.</p>
            </div>

            {flattenedConversations.length === 0 ? (
              <div className={`flex flex-col items-center justify-center py-16 rounded-3xl border border-dashed ${isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-300'}`}>
                <Inbox size={48} className="text-slate-400 mb-4 opacity-50" />
                <h3 className="text-lg font-bold mb-2">صندوق الوارد الموحد</h3>
                <p className="text-slate-500 text-sm max-w-md text-center">اربط حساباتك (WhatsApp، Instagram، TikTok، Google Business) لاستقبال رسائل العملاء وتعليقاتهم وتقييماتهم والرد عليها جميعاً من مكان واحد.</p>
              </div>
            ) : (
              <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className={`flex items-center gap-2 p-3 border-b overflow-x-auto no-scrollbar ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                  <button onClick={() => setInboxFilter('all')} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${inboxFilter === 'all' ? 'bg-purple-500/20 text-purple-500' : (isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100')}`}>الكل</button>
                  {connections.filter((c) => c.status === 'connected').map((c) => (
                    <button key={c.provider} onClick={() => setInboxFilter(c.provider)} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${inboxFilter === c.provider ? 'bg-purple-500/20 text-purple-500' : (isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100')}`}>
                      <ProviderIcon provider={c.provider} size={16} /> {c.name}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5">
                  <div className={`md:col-span-2 border-b md:border-b-0 md:border-l divide-y max-h-[520px] overflow-y-auto ${isDark ? 'border-slate-800 divide-slate-800' : 'border-slate-200 divide-slate-100'}`}>
                    {flattenedConversations.map((conv: any) => {
                      const lastMsg = conv.messages[conv.messages.length - 1];
                      const isActive = activeConversation?.provider === conv.provider && activeConversation?.id === conv.id;
                      return (
                        <div key={`${conv.provider}-${conv.id}`} onClick={() => openConversation(conv.provider, conv.id)} className={`p-3 flex items-center gap-3 cursor-pointer transition-colors ${isActive ? (isDark ? 'bg-slate-800/70' : 'bg-slate-100') : (isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50')}`}>
                          <div className="relative shrink-0">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'}`}>{conv.name[0]}</div>
                            <div className={`absolute -bottom-0.5 -left-0.5 w-3.5 h-3.5 rounded-full border-2 ${isDark ? 'border-slate-900' : 'border-white'} ${conv.online ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                            <div className="absolute -top-1 -right-1"><ProviderIcon provider={conv.provider} size={16} /></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-bold truncate">{conv.name}</p>
                              {conv.unread > 0 && <span className="text-[10px] font-black bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center shrink-0">{conv.unread}</span>}
                            </div>
                            <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{lastMsg?.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="md:col-span-3 flex flex-col max-h-[520px]">
                    {activeConvData ? (
                      <>
                        <div className={`p-3 border-b flex items-center gap-3 shrink-0 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                          <div className="relative shrink-0">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'}`}>{activeConvData.name[0]}</div>
                            <div className={`absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full border-2 ${isDark ? 'border-slate-900' : 'border-white'} ${activeConvData.online ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                          </div>
                          <div>
                            <p className="text-sm font-bold">{activeConvData.name}</p>
                            <p className={`text-[11px] ${activeConvData.online ? 'text-green-500' : (isDark ? 'text-slate-500' : 'text-slate-400')}`}>{activeConvData.online ? 'متصل الآن' : 'غير متصل'}</p>
                          </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                          {activeConvData.messages.map((msg: any) => (
                            <div key={msg.id} className={`flex flex-col ${msg.from !== 'user' ? 'items-end' : 'items-start'}`}>
                              <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${msg.from !== 'user' ? 'bg-purple-600 text-white rounded-br-sm' : (isDark ? 'bg-slate-800 text-white rounded-bl-sm' : 'bg-slate-100 text-slate-900 rounded-bl-sm')}`}>
                                <p>{msg.text}</p>
                                <p className={`text-[10px] mt-1 ${msg.from !== 'user' ? 'text-purple-200' : 'text-slate-400'}`}>{msg.time}</p>
                              </div>
                              {msg.from === 'ai' && <div className="max-w-[85%]"><AiSignature /></div>}
                            </div>
                          ))}

                          {/* بطاقة الرد المقترح بانتظار المراجعة - نفس أسلوب تقييمات قوقل 🚀 */}
                          {activeConvData.pendingSuggestion && appSettings[activeConvData.provider]?.replyMode === 'suggest' && (
                            <div className={`rounded-2xl border p-4 ${isDark ? 'bg-blue-950/20 border-blue-900/30' : 'bg-blue-50/50 border-blue-100'}`}>
                              <div className="flex justify-between items-start mb-3 gap-2 border-b border-blue-500/10 pb-2">
                                <h4 className={`text-xs font-black flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                                  <Bot size={16} /> {t.aiReplyTitle}
                                </h4>
                                <span className="text-xs font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20 flex items-center gap-1.5 whitespace-nowrap">
                                  <Info size={14}/> {t.draftReview}
                                </span>
                              </div>

                              {editingSuggestion?.provider === activeConvData.provider && editingSuggestion?.id === activeConvData.id ? (
                                <div className="space-y-2">
                                  <textarea value={editSuggestionText} onChange={(e: any) => setEditSuggestionText(e.target.value)} rows={3} className={`w-full p-2.5 rounded-lg text-sm outline-none border resize-none ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`} />
                                  <div className="flex gap-2">
                                    <button onClick={submitEditedSuggestion} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-sm font-bold transition-all">إرسال الرد المعدّل</button>
                                    <button onClick={() => setEditingSuggestion(null)} className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>إلغاء</button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <p className="text-sm font-medium leading-relaxed mb-3">{activeConvData.pendingSuggestion.text}</p>
                                  <AiSignature />
                                  <div className="flex gap-2 mt-4">
                                    <button onClick={() => handleApproveSuggestion(activeConvData.provider, activeConvData.id)} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-sm font-bold transition-all">{t.approvePublish}</button>
                                    <button onClick={() => startEditSuggestion(activeConvData.provider, activeConvData.id, activeConvData.pendingSuggestion.text)} className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{t.editReply}</button>
                                  </div>
                                </>
                              )}
                            </div>
                          )}

                          {!activeConvData.pendingSuggestion && (
                            <p className={`text-center text-xs font-bold ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>لا توجد رسائل جديدة بانتظار الرد</p>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                        <MessageCircle size={36} className="text-slate-400 mb-3 opacity-50" />
                        <p className={`text-sm font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>اختر محادثة من القائمة لعرض الرد عليها</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          )
        )}

        {activeTab === 'analytics' && (
          <div className={`flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed ${isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-300'}`}>
            <BarChart3 size={48} className="text-slate-400 mb-4 opacity-50" />
            <h3 className="text-lg font-bold mb-2">تحليلات الأداء</h3>
            <p className="text-slate-500 text-sm max-w-sm text-center">سيتم تفعيل تقارير الأداء التفصيلية بمجرد نشاط حملاتك على المنصات المربوطة.</p>
          </div>
        )}

      </div>

      {/* Modal: إضافة حساب 🚀 */}
      {showAddAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowAddAccountModal(false)}>
          <div onClick={(e: any) => e.stopPropagation()} className={`w-full max-w-md rounded-2xl border p-6 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">إضافة حساب جديد</h3>
              <button onClick={() => setShowAddAccountModal(false)}><X size={20} /></button>
            </div>
            <div className="space-y-3">
              {connections.map((conn) => (
                <div key={conn.provider} className={`flex items-center justify-between p-3 rounded-xl border ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                  <div className="flex items-center gap-3">
                    <ProviderIcon provider={conn.provider} size={32} />
                    <span className="font-bold text-sm">{conn.name}</span>
                  </div>
                  {conn.status === 'connected' ? (
                    <span className="text-xs font-bold text-green-500">متصل بالفعل</span>
                  ) : (
                    <button onClick={() => { handleConnectProvider(conn.provider); setShowAddAccountModal(false); }} className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-colors">ربط</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: ربط واتساب 🚀 */}
      {showWaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowWaModal(false)}>
          <form onSubmit={handleWaSubmit} onClick={(e: any) => e.stopPropagation()} className={`w-full max-w-sm rounded-2xl border p-6 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2"><Phone size={18} className="text-green-500" /> ربط واتساب بزنس</h3>
              <button type="button" onClick={() => setShowWaModal(false)}><X size={20} /></button>
            </div>
            <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>أدخل رقم واتساب بزنس الخاص بمنشأتك لربطه وإدارة محادثات العملاء من صندوق الوارد الموحد.</p>
            <input type="tel" required value={waInput} onChange={(e: any) => setWaInput(e.target.value)} placeholder="+966 5X XXX XXXX" className={`w-full p-3 rounded-xl text-sm outline-none border mb-4 ${isDark ? 'bg-slate-800/60 border-slate-700 text-white' : 'bg-white border-slate-200'}`} />
            <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors">تأكيد الربط</button>
          </form>
        </div>
      )}

    </div>
  );
};
// ==========================================


// ==========================================
// مكون كارت المحتوى المستقل (الاستوديو) - محدث لعرض الصور والفيديو 📸
// ==========================================
const ContentCard = ({ item, handleDelete, isDark, t }: any) => {
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
  
  // 👉 استخراج رابط الصورة أو الفيديو من قاعدة البيانات
  const mediaUrl =
    aiData?.media_url || item.media_url ||
    aiData?.image_url || item.image_url ||
    aiData?.video_url || item.video_url ||
    aiData?.output_url || item.output_url ||
    aiData?.result_url || item.result_url || '';

  // 👉 تحديد ما إذا كان المخرج فيديو
  const isVideoMedia =
    item.content_type === 'promo_video' || item.content_type === 'social_story' ||
    /\.(mp4|webm|mov|m4v)(\?|$)/i.test(mediaUrl);

  const [tkPost, setTkPost] = useState(false);
  const [tkStory, setTkStory] = useState(false);
  const [igPost, setIgPost] = useState(false);
  const [igStory, setIgStory] = useState(false);
  
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [copied, setCopied] = useState(false);

  // إعداد مراجع الحقول لتمكين النقر في أي مكان
  const dateRef = React.useRef<HTMLInputElement>(null);
  const timeRef = React.useRef<HTMLInputElement>(null);

  // دالة تحويل التاريخ إلى الشكل الاحترافي 2026 Aug 8
  const formatScheduleDate = (dateStr: string) => {
    if (!dateStr) return t.publishDate;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getFullYear()} ${months[d.getMonth()]} ${d.getDate()}`;
  };

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

  // 👉 تحديد نوع الشارة (Badge)
  let badgeText = t.textBadge;
  if (item.content_type === 'promo_video' || item.content_type === 'social_story') badgeText = t.videoBadge;
  else if (item.content_type === 'product_shot' || item.content_type === 'poster') badgeText = "📸";

  return (
    <div className={`${cardBg} backdrop-blur-xl rounded-[2rem] border overflow-hidden transition-all duration-300 flex flex-col h-full group hover:border-purple-500/50`}>
      <div className={`p-5 flex justify-between items-center border-b ${headerBg}`}>
        <span className="text-xs font-black text-white bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-1.5 rounded-lg shadow-md">
          {badgeText}
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
        
        {/* 👉 كود عرض الصورة أو الفيديو */}
        {mediaUrl && (
          <div className="mb-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 relative group/media h-48 sm:h-56">
            {isVideoMedia ? (
              <video src={mediaUrl} controls className="w-full h-full object-cover"></video>
            ) : (
              <img src={mediaUrl} alt="Generated Content" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
               <a href={mediaUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-slate-900 px-4 py-2 rounded-lg text-xs font-bold shadow-xl hover:scale-105 transition-transform">
                 {t.fullScreen}
               </a>
            </div>
          </div>
        )}

        <p className={`text-sm leading-relaxed flex-1 whitespace-pre-wrap font-medium ${textSecondary}`}>{caption}</p>
      </div>

      <div className={`p-5 border-t ${headerBg}`}>
        <p className={`text-sm font-bold mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.scheduleTitle}</p>
        
        <div className="flex gap-3 mb-4">
          <div className={`flex-1 p-3 rounded-xl border transition-all ${isDark ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
            <div className="flex justify-center items-center gap-1.5 mb-3 text-sm font-bold">{t.tiktok}</div>
            <div className="flex gap-2">
               <button onClick={()=>setTkPost(!tkPost)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${tkPost ? 'bg-[#25F4EE]/10 text-[#25F4EE] border-[#25F4EE]/50' : isDark ? 'text-slate-500 border-slate-700 hover:text-slate-300' : 'text-slate-500 border-slate-200 hover:bg-slate-50'}`}>{t.post}</button>
               <button onClick={()=>setTkStory(!tkStory)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${tkStory ? 'bg-[#25F4EE]/10 text-[#25F4EE] border-[#25F4EE]/50' : isDark ? 'text-slate-500 border-slate-700 hover:text-slate-300' : 'text-slate-500 border-slate-200 hover:bg-slate-50'}`}>{t.story}</button>
            </div>
          </div>

          <div className={`flex-1 p-3 rounded-xl border transition-all ${isDark ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
            <div className="flex justify-center items-center gap-1.5 mb-3 text-sm font-bold">{t.instagram}</div>
            <div className="flex gap-2">
               <button onClick={()=>setIgPost(!igPost)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${igPost ? 'bg-pink-500/10 text-pink-500 border-pink-500/50' : isDark ? 'text-slate-500 border-slate-700 hover:text-slate-300' : 'text-slate-500 border-slate-200 hover:bg-slate-50'}`}>{t.reelsPost}</button>
               <button onClick={()=>setIgStory(!igStory)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${igStory ? 'bg-pink-500/10 text-pink-500 border-pink-500/50' : isDark ? 'text-slate-500 border-slate-700 hover:text-slate-300' : 'text-slate-500 border-slate-200 hover:bg-slate-50'}`}>{t.story}</button>
            </div>
          </div>
        </div>

        {/* ================= بداية شكل التاريخ والوقت الاحترافي ================= */}
        <div className="flex gap-3 mb-4">
          
          {/* حقل التاريخ */}
          <div className="relative flex-1 group cursor-pointer" onClick={() => { try { dateRef.current?.showPicker(); } catch(e){} }}>
            <div className={`w-full border rounded-xl px-4 py-3 text-sm transition-all flex items-center justify-between group-hover:border-purple-500 shadow-sm overflow-hidden ${inputBg}`}>
              <span className={`${scheduleDate ? 'font-black text-purple-500' : 'opacity-60 font-bold'} font-sans tracking-wide whitespace-nowrap`} dir="ltr">
                {formatScheduleDate(scheduleDate)}
              </span>
              <CalendarRange size={18} className={`shrink-0 ${scheduleDate ? 'text-purple-500' : 'text-slate-400'}`} />
            </div>
            <input 
              ref={dateRef}
              type="date" 
              lang="en-US" 
              required 
              value={scheduleDate} 
              onChange={(e: any) => setScheduleDate(e.target.value)} 
              className="absolute inset-0 w-full h-full opacity-0 pointer-events-none" 
              style={{ colorScheme: isDark ? 'dark' : 'light' }}
            />
          </div>

          {/* حقل الوقت */}
          <div className="relative flex-1 group cursor-pointer" onClick={() => { try { timeRef.current?.showPicker(); } catch(e){} }}>
            <div className={`w-full border rounded-xl px-4 py-3 text-sm transition-all flex items-center justify-between group-hover:border-purple-500 shadow-sm overflow-hidden ${inputBg}`}>
              <span className={`${scheduleTime ? 'font-black text-purple-500' : 'opacity-60 font-bold'} font-sans tracking-wide whitespace-nowrap`} dir="ltr">
                {scheduleTime || t.publishTime}
              </span>
              <Clock size={18} className={`shrink-0 ${scheduleTime ? 'text-purple-500' : 'text-slate-400'}`} />
            </div>
            <input 
              ref={timeRef}
              type="time" 
              lang="en-US" 
              required 
              value={scheduleTime} 
              onChange={(e: any) => setScheduleTime(e.target.value)} 
              className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
              style={{ colorScheme: isDark ? 'dark' : 'light' }}
            />
          </div>

        </div>
        {/* ================= نهاية شكل التاريخ والوقت الاحترافي ================= */}

        <button onClick={handleSchedule} disabled={isPublishing} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors text-sm flex justify-center items-center gap-2 disabled:opacity-50">
          {isPublishing ? <Loader2 className="animate-spin" size={16} /> : null}
          {isPublishing ? t.scheduling : t.scheduleBtn}
        </button>
      </div>
    </div>
  );
};

// ==========================================
// مكوّن التقويم التسويقي 📅
// ==========================================
const MarketingCalendar = ({ isDark, setActiveView, setRawIdea, setIsAiAssistOpen, t }: any) => {
  const [completedEvents, setCompletedEvents] = useState<string[]>([]);

  const toggleComplete = (id: string) => {
    setCompletedEvents(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  // علم السعودية كصورة مضمنة لضمان الظهور الدائم
  const SaudiFlag = () => (
    <img src="https://flagcdn.com/w40/sa.png" alt="Saudi Arabia" className="w-6 h-6 object-cover rounded-sm drop-shadow-sm" />
  );

  const events = [
    { id: 'back-to-school', title: t.calEvents.backToSchool, date: '2026-08-20', type: t.calTypes.commercial, icon: '🎒', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 'salary-aug', title: t.calEvents.salaryAug, date: '2026-08-27', type: t.calTypes.commercial, icon: '💰', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { id: 'pizza-day', title: t.calEvents.pizzaDay, date: '2026-09-09', type: t.calTypes.entertainment, icon: '🍕', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { id: 'national-day', title: t.calEvents.nationalDay, date: '2026-09-23', type: t.calTypes.national, icon: <SaudiFlag />, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { id: 'salary-sep', title: t.calEvents.salarySep, date: '2026-09-27', type: t.calTypes.commercial, icon: '💰', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { id: 'coffee-day', title: t.calEvents.coffeeDay, date: '2026-10-01', type: t.calTypes.entertainment, icon: '☕', color: 'text-amber-600', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { id: 'teachers-day', title: t.calEvents.teachersDay, date: '2026-10-05', type: t.calTypes.global, icon: '👨‍🏫', color: 'text-cyan-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { id: 'food-day', title: t.calEvents.foodDay, date: '2026-10-16', type: t.calTypes.global, icon: '🍔', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { id: 'salary-oct', title: t.calEvents.salaryOct, date: '2026-10-27', type: t.calTypes.commercial, icon: '💰', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { id: 'singles-day', title: t.calEvents.singlesDay, date: '2026-11-11', type: t.calTypes.commercial, icon: '🛍️', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { id: 'white-friday', title: t.calEvents.whiteFriday, date: '2026-11-27', type: t.calTypes.commercial, icon: '🛒', color: 'text-slate-900 dark:text-white', bg: 'bg-slate-200 dark:bg-slate-800', border: 'border-slate-300 dark:border-slate-700' },
    { id: 'salary-nov', title: t.calEvents.salaryNov, date: '2026-11-27', type: t.calTypes.commercial, icon: '💰', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { id: 'cyber-monday', title: t.calEvents.cyberMonday, date: '2026-11-30', type: t.calTypes.commercial, icon: '💻', color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
    { id: 'volunteer-day', title: t.calEvents.volunteerDay, date: '2026-12-05', type: t.calTypes.global, icon: '🤝', color: 'text-teal-500', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
    { id: 'arabic-day', title: t.calEvents.arabicDay, date: '2026-12-18', type: t.calTypes.global, icon: '📖', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { id: 'end-year', title: t.calEvents.endYear, date: '2026-12-25', type: t.calTypes.commercial, icon: '❄️', color: 'text-sky-500', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
    { id: 'salary-dec', title: t.calEvents.salaryDec, date: '2026-12-27', type: t.calTypes.commercial, icon: '💰', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  ];

  const getDaysLeft = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateStr);
    eventDate.setHours(0, 0, 0, 0);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return t.calEnded;
    if (diffDays === 0) return t.calToday;
    return t.calDaysLeft.replace('{days}', diffDays.toString());
  };

  const handleLaunch = (title: string) => {
    setRawIdea(`${title} promo campaign`);
    setIsAiAssistOpen(true);
    setActiveView('studio');
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in zoom-in duration-500">
      <div className={`mb-8 ${t.dir === 'ltr' ? 'text-left' : 'text-right'}`}>
        <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">{t.calTitle}</h2>
        <p className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.calDesc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => {
          const isDone = completedEvents.includes(ev.id);
          const daysLeft = getDaysLeft(ev.date);
          
          return (
            <div key={ev.id} className={`p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden ${isDone ? (isDark ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-slate-100 border-slate-200 opacity-60 grayscale-[50%]') : (isDark ? 'bg-slate-900/80 border-slate-700/80 shadow-lg hover:border-purple-500/50' : 'bg-white border-slate-200 shadow-xl hover:border-purple-400')}`}>
              
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border ${ev.bg} ${ev.color} ${ev.border}`}>
                  {ev.icon}
                </div>
                
                <button onClick={() => toggleComplete(ev.id)} title={isDone ? t.calUndo : t.calMarkDone} className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${isDone ? 'bg-green-500 border-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' : (isDark ? 'bg-slate-800 border-slate-600 text-slate-500 hover:text-green-400 hover:border-green-400' : 'bg-slate-50 border-slate-300 text-slate-400 hover:text-green-500 hover:border-green-500')}`}>
                  <CheckCircle2 size={18} />
                </button>
              </div>

              <h3 className={`text-lg font-black mb-1 ${isDone ? 'line-through decoration-2' : ''} ${isDark ? 'text-white' : 'text-slate-900'}`}>{ev.title}</h3>
              
              <div className="flex gap-2 mb-6 mt-3 flex-wrap">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${ev.bg} ${ev.color} ${ev.border}`}>{ev.type}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 ${daysLeft === t.calEnded ? 'bg-red-500/10 text-red-500 border-red-500/20' : (isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200')}`}>
                   <Clock size={12} /> {daysLeft}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-500 border-slate-200'}`} dir="ltr">{ev.date}</span>
              </div>

              <button 
                onClick={() => handleLaunch(ev.title)} 
                disabled={isDone || daysLeft === t.calEnded}
                className={`w-full py-3 rounded-xl text-sm font-bold flex justify-center items-center gap-2 transition-all ${isDone || daysLeft === t.calEnded ? (isDark ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed') : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-[1.02]'}`}
              >
                <Wand2 size={16} /> {isDone ? t.calPrepared : t.calLaunch}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// مكون لوحة تحكم التقييمات 
// ==========================================
const ReviewsDashboard = ({ isDark, t }: any) => {
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const [activeFilter, setActiveFilter] = useState('latest');
  const [timeFilter, setTimeFilter] = useState('all');
  const [customDateFrom, setCustomDateFrom] = useState("");
  const [customDateTo, setCustomDateTo] = useState("");

  const [featCustomPrompt, setFeatCustomPrompt] = useState(false);
  const [customPromptText, setCustomPromptText] = useState("");
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);

  const [featCompetitor, setFeatCompetitor] = useState(false);
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  const [featAlerts, setFeatAlerts] = useState(false);
  const [alertPhone, setAlertPhone] = useState("");
  const [isSavingAlert, setIsSavingAlert] = useState(false);

  const currentHour = new Date().getHours();
  const isDayShift = currentHour >= 6 && currentHour < 18;
  
  const storeSettings = {
    storeName: "أسماك المحيط / Asmak Al Mohit",
    storePhone: "+966 50 000 0000",
    dayEmployeeName: "نورة / Noura",
    nightEmployeeName: "خالد / Khaled"
  };

  const aiEmployeeName = isDayShift ? storeSettings.dayEmployeeName : storeSettings.nightEmployeeName;
  const aiEmployeeAvatar = isDayShift ? "👩‍💻" : "👨‍💻"; 

  const handleConnectGoogle = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsGoogleConnected(true);
    }, 2000);
  };

  const handleSavePrompt = () => {
    setIsSavingPrompt(true);
    setTimeout(() => { setIsSavingPrompt(false); alert(t.savePrompt + " ✅"); }, 1000);
  };

  const handleStartTracking = () => {
    if(!competitorUrl) return;
    setIsTracking(true);
    setTimeout(() => { setIsTracking(false); alert(t.startTracking + " ✅"); }, 1500);
  };

  const handleSaveAlert = () => {
    if(!alertPhone) return;
    setIsSavingAlert(true);
    setTimeout(() => { setIsSavingAlert(false); alert(t.activateAlert + " ✅"); }, 1000);
  };

  const allReviews = [
    {
      id: 3, 
      author: t.dir === 'ltr' ? "Ahmed A." : "أحمد عبدالله",
      rating: 5,
      text: t.dir === 'ltr' ? "Great experience! Clean place and fast service." : "تجربة ممتازة جداً! المكان نظيف والخدمة سريعة.",
      sentiment: "positive",
      tag: t.dir === 'ltr' ? "Service" : "الخدمة والجودة",
      date: t.dir === 'ltr' ? "2 hours ago" : "قبل ساعتين",
      aiReply: t.dir === 'ltr' ? "Glad you liked it Ahmed! We hope to see you again soon." : "نسعد بتجربتك أستاذ أحمد! شهادتك بجودة خدمتنا وسام نعتز به.",
      status: "published"
    },
    {
      id: 2,
      author: t.dir === 'ltr' ? "Sara K." : "سارة خالد",
      rating: 1,
      text: t.dir === 'ltr' ? "Order delayed for 45 mins, food was cold." : "للأسف الطلب تأخر أكثر من 45 دقيقة، ولما وصل كان الأكل بارد.",
      sentiment: "negative",
      tag: t.dir === 'ltr' ? "Customer Service" : "خدمة العملاء",
      date: t.dir === 'ltr' ? "Yesterday" : "أمس",
      aiReply: t.dir === 'ltr' ? "We apologize for the delay Sara. This is not our standard. Please contact us." : "نعتذر جداً عن هذا التأخير غير المقبول، وهذا ليس مستوى الخدمة الذي نعد به.",
      status: "draft"
    }
  ];

  let displayedReviews = [...allReviews];
  if (activeFilter === 'latest') {
    displayedReviews = displayedReviews.sort((a,b) => b.id - a.id);
  } else if (activeFilter === 'oldest') {
    displayedReviews = displayedReviews.sort((a,b) => a.id - b.id);
  } else if (activeFilter === 'comment') {
    displayedReviews = displayedReviews.filter(r => r.text && r.text.length > 0);
  } else if (activeFilter === 'rating') {
    displayedReviews = displayedReviews.filter(r => !r.text || r.text.trim() === "");
  }

  const cardClass = isDark ? 'bg-slate-900/50 border-slate-700/50 text-white' : 'bg-white border-slate-200 text-slate-900';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500';
  const inputBg = isDark ? 'bg-slate-950/50 border-slate-700/80 text-white focus:border-blue-500/50' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500/50';

  const ToggleSwitch = ({ isOn, onToggle }: any) => (
    <div onClick={onToggle} className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${isOn ? 'bg-green-500' : (isDark ? 'bg-slate-700' : 'bg-slate-300')}`}>
      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isOn ? (t.dir === 'rtl' ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'}`}></div>
    </div>
  );

  return (
    <div className={`w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in zoom-in duration-500 ${t.dir === 'ltr' ? 'text-left' : 'text-right'}`}>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500 mb-2">{t.reviewsTitle}</h2>
          <p className={`font-medium ${textMuted}`}>{t.reviewsSubtitle}</p>
        </div>
        
        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
          {!isGoogleConnected ? (
            <button onClick={handleConnectGoogle} disabled={isConnecting} className="bg-white text-blue-600 hover:bg-slate-50 px-6 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 transition-all disabled:opacity-70 w-full justify-center md:w-auto">
              {isConnecting ? <Loader2 size={18} className="animate-spin" /> : <Globe size={18} />}
              {isConnecting ? t.googleConnecting : t.connectGoogleBtn}
            </button>
          ) : (
            <div className="bg-green-500/10 text-green-500 border border-green-500/20 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 w-full justify-center md:w-auto">
              <CheckCircle2 size={18} /> {t.googleConnected}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 rounded-2xl border ${cardClass} flex items-center gap-4 shadow-sm hover:border-blue-500/30 transition-colors`}>
          <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
            <MessageCircle size={24} className="text-blue-500" />
          </div>
          <div>
            <p className={`text-sm font-bold mb-1 ${textMuted}`}>{t.totalComments}</p>
            <p className="text-2xl font-black">{isGoogleConnected ? "1,284" : "0"}</p>
          </div>
        </div>
        <div className={`p-6 rounded-2xl border ${cardClass} flex items-center gap-4 shadow-sm hover:border-yellow-500/30 transition-colors`}>
          <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
            <Star size={24} className="text-yellow-500" />
          </div>
          <div>
            <p className={`text-sm font-bold mb-1 ${textMuted}`}>{t.avgRating}</p>
            <p className="text-2xl font-black flex items-center gap-2">
              {isGoogleConnected ? "4.6" : "0.0"} 
              {isGoogleConnected && <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">+0.2</span>}
            </p>
          </div>
        </div>
        <div className={`p-6 rounded-2xl border ${cardClass} flex items-center gap-4 shadow-sm hover:border-pink-500/30 transition-colors`}>
          <div className="w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center shrink-0">
            <Activity size={24} className="text-pink-500" />
          </div>
          <div>
            <p className={`text-sm font-bold mb-1 ${textMuted}`}>{t.successReplies}</p>
            <p className="text-2xl font-black">{isGoogleConnected ? "98.5%" : "0%"}</p>
          </div>
        </div>
      </div>

      {!isGoogleConnected ? (
        <div className={`rounded-3xl border flex flex-col items-center justify-center py-20 text-center ${cardClass}`}>
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Globe size={40} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">{t.noDataTitle}</h3>
          <p className={`${textMuted} mb-6 max-w-sm`}>{t.noDataDesc}</p>
          <button onClick={handleConnectGoogle} disabled={isConnecting} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2">
            {isConnecting ? <Loader2 size={18} className="animate-spin" /> : t.startConnect}
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className={`rounded-3xl border p-6 ${cardClass}`}>
             <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Settings size={20} className="text-purple-500"/> {t.advSettings}</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                   <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2 font-bold text-sm"><Bot size={18} className="text-blue-500"/> {t.customPrompt}</div>
                      <ToggleSwitch isOn={featCustomPrompt} onToggle={() => setFeatCustomPrompt(!featCustomPrompt)} />
                   </div>
                   <p className={`text-xs mb-3 ${textMuted}`}>{t.customPromptDesc}</p>
                   {featCustomPrompt && (
                     <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                       <textarea value={customPromptText} onChange={(e: any)=>setCustomPromptText(e.target.value)} placeholder={t.customPromptPlaceholder} className={`w-full p-3 rounded-xl text-sm outline-none border transition-all resize-none ${inputBg}`} rows={2}></textarea>
                       <div className="flex justify-end mt-2">
                         <button onClick={handleSavePrompt} disabled={isSavingPrompt} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${isDark ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-700'}`}>
                           {isSavingPrompt ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                           {isSavingPrompt ? t.saving : t.savePrompt}
                         </button>
                       </div>
                     </div>
                   )}
                </div>

                <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                   <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2 font-bold text-sm"><LineChart size={18} className="text-orange-500"/> {t.trackCompetitor}</div>
                      <ToggleSwitch isOn={featCompetitor} onToggle={() => setFeatCompetitor(!featCompetitor)} />
                   </div>
                   <p className={`text-xs mb-3 ${textMuted}`}>{t.trackCompetitorDesc}</p>
                   {featCompetitor && (
                     <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                       <div className="flex flex-col sm:flex-row gap-2">
                         <input type="url" value={competitorUrl} onChange={(e: any)=>setCompetitorUrl(e.target.value)} placeholder={t.trackPlaceholder} className={`flex-1 p-3 rounded-xl text-sm outline-none border transition-all ${inputBg}`} />
                         <button onClick={handleStartTracking} disabled={isTracking} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center justify-center gap-2 ${isDark ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30' : 'bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100'}`}>
                           {isTracking ? <Loader2 size={16} className="animate-spin" /> : <Activity size={16} />}
                           {isTracking ? t.tracking : t.startTracking}
                         </button>
                       </div>
                     </div>
                   )}
                </div>

                <div className={`p-5 rounded-2xl border md:col-span-2 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                   <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2 font-bold text-sm"><Bell size={18} className="text-red-500"/> {t.negAlerts}</div>
                      <ToggleSwitch isOn={featAlerts} onToggle={() => setFeatAlerts(!featAlerts)} />
                   </div>
                   <p className={`text-xs mb-3 ${textMuted}`}>{t.negAlertsDesc}</p>
                   {featAlerts && (
                     <div className="flex flex-col sm:flex-row gap-2 mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                       <input type="tel" value={alertPhone} onChange={(e: any)=>setAlertPhone(e.target.value)} placeholder={t.phonePlaceholder} className={`flex-1 p-3 rounded-xl text-sm outline-none border transition-all ${inputBg}`} dir="ltr" />
                       <button onClick={handleSaveAlert} disabled={isSavingAlert} className={`px-6 py-2 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 whitespace-nowrap ${isDark ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20' : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'}`}>
                         {isSavingAlert ? <Loader2 size={16} className="animate-spin" /> : null}
                         {isSavingAlert ? t.activating : t.activateAlert}
                       </button>
                     </div>
                   )}
                </div>
             </div>
          </div>

          <div className={`rounded-3xl border overflow-hidden shadow-xl ${cardClass}`}>
            
            <div className={`px-6 py-5 border-b flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-50 border-slate-200'}`}>
              
              <div className={`flex items-center gap-3 bg-slate-900/10 dark:bg-slate-900/50 px-4 py-2 rounded-xl shrink-0 ${t.dir === 'rtl' ? 'ml-auto' : 'mr-auto'}`}>
                <span className={`text-sm font-bold ${textMuted}`}>{t.autoReplyMode}</span>
                <div className="w-12 h-6 bg-green-500 rounded-full flex items-center p-1 cursor-pointer">
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${t.dir === 'rtl' ? '-translate-x-6' : 'translate-x-6'}`}></div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto justify-end">
                <span className={`text-sm font-bold whitespace-nowrap px-1 ${textMuted}`}>{t.showLabel}</span>
                
                <select value={timeFilter} onChange={(e: any) => setTimeFilter(e.target.value)} className={`px-4 py-2 rounded-xl text-xs font-bold outline-none border transition-all cursor-pointer ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
                   <option value="all">{t.filterTimeAll}</option>
                   <option value="today">{t.filterTimeToday}</option>
                   <option value="week">{t.filterTimeWeek}</option>
                   <option value="month">{t.filterTimeMonth}</option>
                   <option value="custom">{t.filterCustom}</option>
                </select>

                {timeFilter === 'custom' && (
                   <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                      <input type="date" lang="en-US" dir="ltr" value={customDateFrom} onChange={(e: any)=>setCustomDateFrom(e.target.value)} className={`h-8 px-2 rounded-lg text-xs outline-none border transition-all ${inputBg}`} style={{ colorScheme: isDark ? 'dark' : 'light', fontFamily: 'Arial, sans-serif' }} />
                      <span className={`text-xs font-bold ${textMuted}`}>-</span>
                      <input type="date" lang="en-US" dir="ltr" value={customDateTo} onChange={(e: any)=>setCustomDateTo(e.target.value)} className={`h-8 px-2 rounded-lg text-xs outline-none border transition-all ${inputBg}`} style={{ colorScheme: isDark ? 'dark' : 'light', fontFamily: 'Arial, sans-serif' }} />
                   </div>
                )}

                <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1 hidden sm:block"></div>

                <button onClick={()=>setActiveFilter('latest')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeFilter === 'latest' ? 'bg-white dark:bg-slate-700 shadow-md text-slate-900 dark:text-white' : `hover:bg-slate-200 dark:hover:bg-slate-800 ${textMuted}`}`}>{t.filterLatest}</button>
                <button onClick={()=>setActiveFilter('oldest')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeFilter === 'oldest' ? 'bg-white dark:bg-slate-700 shadow-md text-slate-900 dark:text-white' : `hover:bg-slate-200 dark:hover:bg-slate-800 ${textMuted}`}`}>{t.filterOldest}</button>
                <button onClick={()=>setActiveFilter('comment')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeFilter === 'comment' ? 'bg-white dark:bg-slate-700 shadow-md text-slate-900 dark:text-white' : `hover:bg-slate-200 dark:hover:bg-slate-800 ${textMuted}`}`}>{t.filterComment}</button>
                <button onClick={()=>setActiveFilter('rating')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeFilter === 'rating' ? 'bg-white dark:bg-slate-700 shadow-md text-slate-900 dark:text-white' : `hover:bg-slate-200 dark:hover:bg-slate-800 ${textMuted}`}`}>{t.filterRating}</button>
              </div>
            </div>

            <div className="divide-y divide-slate-700/50">
              {displayedReviews.length === 0 ? (
                <div className="p-10 text-center text-sm font-bold text-slate-500">{t.noFilterMatch}</div>
              ) : (
                displayedReviews.map((review: any) => (
                <div key={review.id} className={`p-6 transition-colors ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}`}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm">{review.author}</h4>
                            <p className={`text-xs ${textMuted}`}>{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_: any, i: number) => (
                            <Star key={i} size={16} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-slate-700 text-slate-700"} />
                          ))}
                        </div>
                      </div>
                      
                      {review.text && <p className="text-sm font-medium leading-relaxed">{review.text}</p>}
                      
                      {review.reviewImage && (
                        <div className="mt-2 mb-2">
                           <img src={review.reviewImage} alt="Review" className="w-24 h-24 object-cover rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-105 transition-transform cursor-pointer" />
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 pt-2">
                        {review.sentiment === 'positive' && <span className="bg-green-500/10 text-green-500 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-500/20">{t.positive}</span>}
                        {review.sentiment === 'negative' && <span className="bg-red-500/10 text-red-500 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-500/20">{t.negative}</span>}
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                          {t.category} {review.tag}
                        </span>
                      </div>
                    </div>

                    <div className={`flex-1 p-5 rounded-2xl border ${isDark ? 'bg-blue-950/20 border-blue-900/30' : 'bg-blue-50/50 border-blue-100'} flex flex-col justify-between relative`}>
                      <div>
                        <div className="flex justify-between items-start mb-4 gap-2 border-b border-blue-500/10 pb-3">
                          <h4 className={`text-xs font-black flex items-center gap-2 mt-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                            <Bot size={16} /> {t.aiReplyTitle}
                          </h4>
                          <div>
                            {review.status === 'published' ? (
                              <span className="text-xs font-bold text-blue-600 bg-blue-500/20 px-2.5 py-1.5 rounded-lg border border-blue-500/30 flex items-center gap-1.5 whitespace-nowrap">
                                <CheckCircle2 size={14}/> {t.autoPublished}
                              </span>
                            ) : (
                              <span className="text-xs font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1.5 rounded-lg border border-orange-500/20 flex items-center gap-1.5 whitespace-nowrap">
                                <Info size={14}/> {t.draftReview}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm font-medium leading-relaxed mb-4">{review.aiReply}</p>
                      </div>

                      <div className={`mt-4 pt-4 border-t ${isDark ? 'border-slate-800/80' : 'border-blue-500/10'} flex flex-col md:flex-row gap-3 items-start md:items-center justify-between`}>
                        <div className="flex items-center gap-3">
                          <div className={`text-[42px] drop-shadow-md ${t.dir === 'rtl' ? 'ml-1' : 'mr-1'}`}>
                            {aiEmployeeAvatar}
                          </div>
                          <div className="flex flex-col justify-center gap-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-black text-blue-500 dark:text-blue-400">{aiEmployeeName}</span>
                              <span className={`text-xs font-bold text-pink-500 dark:text-pink-400`}>({t.aiEmp})</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                               <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.8)] animate-pulse shrink-0"></span>
                               <span className={`text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{t.csTeam} ({storeSettings.storeName})</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1.5 opacity-80 shrink-0">
                           <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`} dir="ltr">{storeSettings.storePhone}</span>
                           <Phone size={12} className={isDark ? 'text-slate-400' : 'text-slate-500'} />
                        </div>
                      </div>
                      
                      {review.status === 'draft' && (
                        <div className="flex gap-2 mt-4">
                          <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-sm font-bold transition-all">{t.approvePublish}</button>
                          <button className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{t.editReply}</button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. التطبيق الرئيسي (App)
// ==========================================
export default function App() {
  const [session, setSession] = useState<any>(null);
  
  // دالة فحص حالة المستخدم وصلاحيته
  const [userStatus, setUserStatus] = useState<'loading' | 'pending' | 'active'>('loading');
  const [userRole, setUserRole] = useState<'user' | 'admin'>('user');
  
  // حالات الصلاحيات والباقات
  const [userPlan, setUserPlan] = useState("Basic");
  const [hasCalendar, setHasCalendar] = useState(true);
  const [hasReviews, setHasReviews] = useState(false);
  const [credits, setCredits] = useState(150);

  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  const [activeView, setActiveView] = useState('calendar');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const [isAiAssistOpen, setIsAiAssistOpen] = useState(false);
  const [rawIdea, setRawIdea] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("promo_video");
  const [activityType, setActivityType] = useState("");
  const [customActivityType, setCustomActivityType] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const [isIgConnected, setIsIgConnected] = useState(() => sfReadLS('sf_ig_connected', false));
  const [igUsername, setIgUsername] = useState(() => sfReadLS('sf_ig_username', ""));
  const [igAvatar, setIgAvatar] = useState(() => sfReadLS('sf_ig_avatar', ""));
  
  // حالات تيك توك المحدثة 🚀
  const [isTkConnected, setIsTkConnected] = useState(() => sfReadLS('sf_tk_connected', false)); 
  const [tkUsername, setTkUsername] = useState(() => sfReadLS('sf_tk_username', ""));
  const [tkAvatar, setTkAvatar] = useState(() => sfReadLS('sf_tk_avatar', ""));

  // حفظ حالة ربط تيك توك وانستقرام في التخزين المحلي حتى لا تُفصل عند تحديث الصفحة أو ربط منصة أخرى 🚀
  useEffect(() => {
    sfWriteLS('sf_ig_connected', isIgConnected);
    sfWriteLS('sf_ig_username', igUsername);
    sfWriteLS('sf_ig_avatar', igAvatar);
  }, [isIgConnected, igUsername, igAvatar]);
  useEffect(() => {
    sfWriteLS('sf_tk_connected', isTkConnected);
    sfWriteLS('sf_tk_username', tkUsername);
    sfWriteLS('sf_tk_avatar', tkAvatar);
  }, [isTkConnected, tkUsername, tkAvatar]);
  
  const [isConnecting, setIsConnecting] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [voiceGender, setVoiceGender] = useState("male_sa");
  const [adTone, setAdTone] = useState("toneViral");
  const [visualStyle, setVisualStyle] = useState("styleUGC");
  const [contentGoal, setContentGoal] = useState("goalConversion");
  const [textLength, setTextLength] = useState("lengthMedium");

  const [theme, setTheme] = useState('dark');
  const [langCode, setLangCode] = useState('ar');
  const [newPassword, setNewPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const isDark = theme === 'dark';
  const t = translations[langCode] || translations['ar']; 

  const isVisualContent = contentType === "promo_video" || contentType === "social_story" || contentType === "product_shot";
  const isTextContent = contentType === "social_caption" || contentType === "ad_script" || contentType === "customer_response";
  const isCustomBiz = activityType === "مجال آخر (كتابة يدوية) ✍️" || activityType === "Other (Custom Input) ✍️";

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarVisible(false);
    }
    
    // التقاط بيانات تيك توك من الرابط بعد عودة العميل من المصادقة
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('tk_connected') === 'true') {
      setIsTkConnected(true);
      setTkUsername(urlParams.get('tk_username') || "@user");
      setTkAvatar(urlParams.get('tk_avatar') || "");
      setIsSettingsOpen(true);
      setActiveTab('connections');
      // تنظيف الرابط بعد السحب حتى لا يبقى الكود ظاهراً
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // التقاط بيانات انستقرام الحقيقية من الرابط بعد عودة العميل من المصادقة
    if (urlParams.get('ig_connected') === 'true') {
      setIsIgConnected(true);
      setIgUsername(urlParams.get('ig_username') || "@user");
      setIgAvatar(urlParams.get('ig_avatar') || "");
      setIsSettingsOpen(true);
      setActiveTab('connections');
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (urlParams.get('ig_connected') === 'false') {
      setIsIgConnected(false);
      setIsSettingsOpen(true);
      setActiveTab('connections');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const checkUserStatus = async (user: any) => {
    if (!user) return;
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
      if (error) {
        setUserStatus('pending');
        return;
      }
      if (data) {
        setUserStatus(data.status);
        setUserRole(data.role || 'user');
        
        // جلب الإعدادات المخصصة للعميل
        setUserPlan(data.plan_name || 'Basic');
        if (data.credits !== undefined && data.credits !== null) setCredits(data.credits);
        if (data.feat_calendar !== undefined && data.feat_calendar !== null) setHasCalendar(data.feat_calendar);
        if (data.feat_reviews !== undefined && data.feat_reviews !== null) setHasReviews(data.feat_reviews);

      } else {
        setUserStatus('pending'); 
      }
    } catch (e) {
      setUserStatus('pending');
    }
  };

  const handleRefreshStatus = async () => {
    setIsCheckingStatus(true);
    await checkUserStatus(session?.user);
    setIsCheckingStatus(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if(session) checkUserStatus(session.user);
      else setUserStatus('loading');
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if(session) checkUserStatus(session.user);
      else setUserStatus('loading');
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
    } catch (error) { console.error(error); } finally { setIsLoadingResults(false); }
  };

  useEffect(() => { if (session && userStatus === 'active') fetchResults(); }, [session, userStatus]);

  const handleDelete = async (id: string) => {
    if (window.confirm(t.deleteConfirm)) {
      try {
        await supabase.from('content_pipeline').delete().eq('id', id);
        setResults(results.filter(item => item.id !== id));
      } catch (error) {
        console.error(error);
      }
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

  // دالة توجيه انستقرام الديناميكية 🚀
  const handleConnectInstagram = () => {
    setIsConnecting(true);
    const clientKey = "1038788628657969";
    const redirectUri = "https://smartflow-content-creator-web-app.vercel.app/api/auth/instagram/callback";
    const scope = "instagram_business_basic,instagram_business_content_publish";
    const state = "ig_" + Math.random().toString(36).substring(7);

    const authUrl = `https://www.instagram.com/oauth/authorize?client_id=${clientKey}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;

    window.location.href = authUrl;
  };

  // دالة توجيه تيك توك الديناميكية 🚀
  const handleConnectTikTok = () => {
    const clientKey = "awo6ohs5hl7tubqp"; 
    const redirectUri = "https://smartflow-content-creator-web-app.vercel.app/api/auth/callback";
    const scope = "user.info.basic,video.publish";
    // توليد رمز حالة عشوائي لحماية الطلب (CSRF Protection)
    const state = "tk_" + Math.random().toString(36).substring(7); 
    
    const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
    
    // نقل العميل فوراً لشاشة الموافقة
    window.location.href = authUrl;
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePrompt = async (e: any) => {
    e.preventDefault();
    if(!rawIdea) return;
    setIsGeneratingPrompt(true);

    // تحديد التعليمات بناءً على نوع المحتوى المطلوب (بصري أو نصي)
    let promptInstructions = "";
    if (isVisualContent) {
        promptInstructions = `You are an expert AI Art Director and Prompt Engineer. Your task is to analyze Arabic marketing requests from users and convert them into highly detailed, purely VISUAL English prompts optimized for AI image and video generators.
CRITICAL RULES:
1. NO COPYWRITING: Ignore any instructions to write ad copy, slogans, or text. Focus strictly on describing a scene.
2. VISUAL STRUCTURE: Your prompt must include: Main Subject, Environment, Lighting, Camera Angle, Style.
3. AESTHETIC: Maintain a clean, modern, and minimalist visual style without cluttered graphics or unnecessary elements.
4. OUTPUT: Return ONLY the final English prompt. Do not include any conversational filler, intro, or explanations.`;
    } else {
        promptInstructions = `أنت خبير تسويق وصناعة محتوى. قم بتحويل الفكرة التالية إلى إعلان احترافي وجذاب باللغة العربية. ركز على إبراز الجودة العالية، واستخدم نبرة تسويقية مقنعة تحفز العميل على الطلب. لا تضف أي مقدمات، أعطني النص النهائي مباشرة.`;
    }

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
         // Fallback in case API key is missing
         if (isVisualContent) {
             setGeneratedPrompt(`A highly detailed cinematic shot of: ${rawIdea}, photorealistic, 8k.`);
         } else {
             setGeneratedPrompt(`قم بصياغة إعلان احترافي وجذاب لـ: ${rawIdea}. ركز على إبراز الجودة العالية، واستخدم نبرة تسويقية مقنعة تحفز العميل على الطلب.`);
         }
         setIsGeneratingPrompt(false);
         return;
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `System Instructions: ${promptInstructions}\n\nUser Request: ${rawIdea}` }] }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setGeneratedPrompt(data.candidates[0].content.parts[0].text.trim());
      } else {
        throw new Error("Invalid response from Gemini");
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      alert("حدث خطأ أثناء توليد الصياغة. تأكد من صحة مفتاح NEXT_PUBLIC_GEMINI_API_KEY");
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  const handleApplyPrompt = (e: any) => {
    e.preventDefault();
    setPrompt(generatedPrompt);
    setIsAiAssistOpen(false);
    setRawIdea("");
    setGeneratedPrompt("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!session?.user?.id) return;
    if (!activityType) return alert(t.platformValidation);
    
    const finalActivityType = isCustomBiz ? customActivityType : activityType;
    if (isCustomBiz && !customActivityType.trim()) return alert(t.platformValidation);
    
    if (credits < 10) {
      alert(t.insufficientCredits);
      return; 
    }

    setIsSubmitting(true);
    
    // --- إضافة خطوة المعالجة الوسيطة (Failsafe) ---
    // إذا كان المحتوى بصرياً والنص يحتوي على حروف عربية، يتم ترجمته قبل الإرسال لـ n8n
    let finalPrompt = prompt;
    if (isVisualContent && /[\u0600-\u06FF]/.test(finalPrompt)) {
      const systemPrompt = `You are an expert AI Art Director and Prompt Engineer. Your task is to analyze Arabic marketing requests from users and convert them into highly detailed, purely VISUAL English prompts optimized for AI image and video generators.
CRITICAL RULES:
1. NO COPYWRITING: Ignore any instructions to write ad copy, slogans, or text. Focus strictly on describing a scene.
2. VISUAL STRUCTURE: Your prompt must include: Main Subject, Environment, Lighting, Camera Angle, Style.
3. AESTHETIC: Maintain a clean, modern, and minimalist visual style without cluttered graphics or unnecessary elements.
4. OUTPUT: Return ONLY the final English prompt. Do not include any conversational filler, intro, or explanations.`;

      try {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (apiKey) {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: `System Instructions: ${systemPrompt}\n\nUser Request: ${finalPrompt}` }] }]
            })
          });
          const data = await response.json();
          if (data.candidates && data.candidates[0].content.parts[0].text) {
            finalPrompt = data.candidates[0].content.parts[0].text.trim();
          }
        }
      } catch (error) {
        console.error("Auto-translation failed:", error);
      }
    }
    // ----------------------------------------------

    let uploadedImageUrl = null;

    if (imageFile) {
      try {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${session.user.id}/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('campaign-assets').upload(filePath, imageFile);
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage.from('campaign-assets').getPublicUrl(filePath);
        uploadedImageUrl = publicUrlData.publicUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const webhookUrl = "https://n8n-p10bgpahkliy9hghak21zv3e.178.105.219.96.sslip.io/webhook/generate-content-v2";

    const payload = {
      store_id: session.user.id, 
      activity_type: finalActivityType, 
      content_type: contentType, 
      prompt: finalPrompt,
      image_url: uploadedImageUrl,
      voice_gender: isVisualContent ? voiceGender : null,
      ad_tone: isVisualContent ? adTone : null,
      visual_style: isVisualContent ? visualStyle : null,
      content_goal: isTextContent ? contentGoal : null,
      text_length: isTextContent ? textLength : null
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Server Error");
      }

      // خصم الرصيد محلياً
      const newCredits = credits - 10;
      setCredits(newCredits);
      
      // تحديث الرصيد في Supabase
      supabase.from('profiles').update({ credits: newCredits }).eq('id', session.user.id).then();

      setPrompt("");
      setImageFile(null);
      setImagePreview(null);
      setCustomActivityType("");
      setTimeout(fetchResults, 4000); 

    } catch (error) {
      alert(t.serverError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) return <Auth />;
  
  if (userStatus === 'loading') {
    return <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#0b1121]' : 'bg-slate-50'}`}><Loader2 className="animate-spin text-blue-500" size={40} /></div>;
  }

  if (userStatus === 'pending') {
    return <PendingScreen isDark={isDark} t={t} checkStatus={handleRefreshStatus} isChecking={isCheckingStatus} />;
  }

  const mainBg = isDark ? 'bg-[#0b1121]' : 'bg-slate-50';
  const textMain = isDark ? 'text-white' : 'text-slate-900';
  const panelBg = isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/80 border-slate-200 shadow-2xl';
  const inputBg = isDark ? 'bg-slate-950/50 border-slate-700/80 text-white focus:bg-slate-900 focus:border-purple-500/50' : 'bg-white border-slate-300 text-slate-900 focus:border-purple-500/50';
  const optionClass = isDark ? 'bg-[#0f172a] text-slate-200 font-medium' : 'bg-white text-slate-900 font-medium';
  const labelColor = isDark ? 'text-slate-300' : 'text-slate-700';

  return (
    <div className={`flex min-h-screen transition-colors duration-500 font-sans ${mainBg}`} dir={t.dir}>
      
      {isSidebarVisible && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarVisible(false)} />
      )}

      <aside className={`fixed top-0 bottom-0 ${t.dir === 'rtl' ? 'right-0 border-l' : 'left-0 border-r'} w-64 z-50 transition-transform duration-300 transform ${isSidebarVisible ? 'translate-x-0' : (t.dir === 'rtl' ? 'translate-x-full' : '-translate-x-full')} ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
        
        <div className="p-6 border-b border-inherit flex justify-center items-center relative">
          <button onClick={() => setIsSidebarVisible(false)} className={`absolute top-4 ${t.dir === 'rtl' ? 'left-4' : 'right-4'} md:hidden p-1.5 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}>
            <X size={18} />
          </button>
          
          <div className="flex justify-center items-center w-full mt-2 mb-2">
            <div className="relative rounded-2xl p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse shadow-[0_0_20px_rgba(168,85,247,0.5)] w-full text-center">
               <div className={`px-4 py-3 rounded-xl ${isDark ? 'bg-[#0f172a]' : 'bg-white'}`}>
                 <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
                    {t.appTitle}
                 </h2>
               </div>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-3">
          
          {userRole === 'admin' && (
            <button onClick={() => { setActiveView('admin'); if(window.innerWidth < 768) setIsSidebarVisible(false); }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all border ${activeView === 'admin' ? (isDark ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-50 text-red-600 border-red-200') : (isDark ? 'text-slate-400 hover:bg-slate-800 border-transparent' : 'text-slate-600 hover:bg-slate-100 border-transparent')}`}>
              <ShieldCheck size={20} className={activeView === 'admin' ? 'text-red-500' : ''} /> 
              {t.adminTab}
            </button>
          )}

          {/* ظهور القوائم بناءً على صلاحيات الباقة */}
          {(hasCalendar || userRole === 'admin') && (
            <button onClick={() => { setActiveView('calendar'); if(window.innerWidth < 768) setIsSidebarVisible(false); }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeView === 'calendar' ? (isDark ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-purple-50 text-purple-600 border border-purple-200') : (isDark ? 'text-slate-400 hover:bg-slate-800 border border-transparent' : 'text-slate-600 hover:bg-slate-100 border border-transparent')}`}>
              <CalendarRange size={20} className={activeView === 'calendar' ? 'text-purple-500' : ''} /> 
              {t.calendarTab}
            </button>
          )}

          <button onClick={() => { setActiveView('studio'); if(window.innerWidth < 768) setIsSidebarVisible(false); }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeView === 'studio' ? (isDark ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200') : (isDark ? 'text-slate-400 hover:bg-slate-800 border border-transparent' : 'text-slate-600 hover:bg-slate-100 border border-transparent')}`}>
            <Star size={20} className={activeView === 'studio' ? 'text-blue-500' : ''} /> 
            {t.studioTab}
          </button>

          {/* ===================== القسم الجديد ===================== */}
          <button onClick={() => { setActiveView('socialHub'); if(window.innerWidth < 768) setIsSidebarVisible(false); }} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold transition-all relative group overflow-hidden border ${activeView === 'socialHub' ? (isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-200') : (isDark ? 'text-slate-400 hover:bg-slate-800 hover:border-slate-700 border-transparent' : 'text-slate-600 hover:bg-slate-100 hover:border-slate-200 border-transparent')}`}>
              <div className="flex items-center gap-3 w-full">
                <Smartphone size={20} className={activeView === 'socialHub' ? 'text-indigo-500 shrink-0' : 'group-hover:text-indigo-500 transition-colors shrink-0'} /> 
                <span className="truncate flex-1 text-right">{t.socialHubTab}</span>
              </div>
          </button>
          {/* ======================================================== */}

          {(hasReviews || userRole === 'admin') && (
            <button onClick={() => { setActiveView('reviews'); if(window.innerWidth < 768) setIsSidebarVisible(false); }} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold transition-all relative group overflow-hidden border ${activeView === 'reviews' ? (isDark ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' : 'bg-pink-50 text-pink-600 border-pink-200') : (isDark ? 'text-slate-400 hover:bg-slate-800 hover:border-slate-700 border-transparent' : 'text-slate-600 hover:bg-slate-100 hover:border-slate-200 border-transparent')}`}>
              <div className="flex items-center gap-3 w-full">
                <MessageCircle size={20} className={activeView === 'reviews' ? 'text-pink-500 shrink-0' : 'group-hover:text-pink-500 transition-colors shrink-0'} /> 
                <span className="truncate flex-1 text-right">{t.reviewsTab}</span>
              </div>
            </button>
          )}
        </nav>
      </aside>

      <main className={`flex-1 flex flex-col items-center overflow-x-hidden relative min-h-screen transition-all duration-300 ${isSidebarVisible ? (t.dir === 'rtl' ? 'md:pr-64' : 'md:pl-64') : ''}`}>
        
        {isSettingsOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className={`${isDark ? 'bg-[#0f172a] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200`}>
              
              <div className={`px-6 py-4 border-b flex justify-between items-center shrink-0 ${isDark ? 'border-slate-800 bg-[#0f172a]' : 'border-slate-100 bg-slate-50'}`}>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <Settings className="text-blue-500" size={20} /> {t.settings}
                </h3>
                <button onClick={() => setIsSettingsOpen(false)} className={`p-2 rounded-full transition ${isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'}`}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                <div className={`w-full md:w-1/3 p-4 flex flex-col gap-2 overflow-y-auto border-b md:border-b-0 ${t.dir === 'rtl' ? 'md:border-l' : 'md:border-r'} ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-100 bg-slate-50/50'}`}>
                  <button onClick={() => setActiveTab('general')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'general' ? (isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600') : (isDark ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' : 'text-slate-600 hover:bg-slate-100')}`}><Sliders size={18} /> {t.tabGeneral}</button>
                  <button onClick={() => setActiveTab('billing')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'billing' ? (isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-50 text-yellow-600') : (isDark ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' : 'text-slate-600 hover:bg-slate-100')}`}><CreditCard size={18} /> {t.tabBilling}</button>
                  <button onClick={() => setActiveTab('connections')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'connections' ? (isDark ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-50 text-pink-600') : (isDark ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' : 'text-slate-600 hover:bg-slate-100')}`}><Globe size={18} /> {t.tabConnections}</button>
                  <button onClick={() => setActiveTab('security')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'security' ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600') : (isDark ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' : 'text-slate-600 hover:bg-slate-100')}`}><Shield size={18} /> {t.tabSecurity}</button>
                </div>

                <div className="w-full md:w-2/3 p-6 overflow-y-auto flex-1 space-y-6">
                  {activeTab === 'general' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="space-y-3">
                        <label className={`text-sm font-bold flex items-center gap-2 ${labelColor}`}><Globe size={16} className="text-blue-400"/> {t.langUi}</label>
                        <select value={langCode} onChange={(e: any) => setLangCode(e.target.value)} className={`w-full border rounded-xl px-4 py-3 outline-none ${isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}>
                          <option className={optionClass} value="ar">العربية (Arabic)</option>
                          <option className={optionClass} value="en">English (الإنجليزية)</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className={`text-sm font-bold flex items-center gap-2 ${labelColor}`}><Palette size={16} className="text-pink-400"/> {t.theme}</label>
                        <div className="flex gap-3">
                          <button onClick={() => setTheme('dark')} className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all ${theme === 'dark' ? 'bg-purple-600/20 border-purple-500 text-purple-400' : isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-300 text-slate-500'}`}>{t.dark}</button>
                          <button onClick={() => setTheme('light')} className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all ${theme === 'light' ? 'bg-purple-600/10 border-purple-500 text-purple-600' : isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-300 text-slate-500'}`}>{t.light}</button>
                        </div>
                        <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{t.passNote}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'billing' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center text-center ${isDark ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200'}`}>
                        <Wallet size={40} className={`mb-3 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} />
                        <h4 className={`text-sm font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.credits}</h4>
                        <p className={`text-4xl font-black mb-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          {credits} <span className="text-lg font-bold opacity-70">{t.points}</span>
                        </p>
                        <button onClick={() => alert("سيتم فتح بوابة الدفع قريباً!")} className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                          {t.buyCredits}
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'connections' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="space-y-4">
                        <label className={`text-sm font-bold flex items-center gap-2 ${labelColor}`}>
                          <Globe size={16} className="text-blue-500"/> {t.socialAuth}
                        </label>
                        <div className={`p-4 rounded-xl border flex gap-3 items-start ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
                          <Info size={20} className={`mt-0.5 shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                          <p className={`text-sm leading-relaxed font-medium ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
                            {t.igTrustMsg}
                          </p>
                        </div>

                        <div className={`p-5 rounded-2xl border flex items-center justify-between ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
                          <div className="flex items-center gap-3">
                            {isIgConnected && igAvatar ? (
                              <img src={igAvatar} alt="Instagram Avatar" className="w-12 h-12 rounded-xl object-cover shadow-md border border-slate-200 dark:border-slate-700" />
                            ) : (
                              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-md">
                                <Instagram size={24} />
                              </div>
                            )}
                            <div>
                              <h4 className="font-bold">إنستقرام (Instagram)</h4>
                              {isIgConnected ? (
                                <p className="text-xs font-bold text-green-500 flex items-center gap-1"><CheckCircle2 size={12}/> متصل بـ {igUsername}</p>
                              ) : (
                                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>غير متصل</p>
                              )}
                            </div>
                          </div>
                          {isIgConnected ? (
                            <button onClick={() => { setIsIgConnected(false); setIgUsername(""); setIgAvatar(""); }} className={`px-4 py-2 rounded-lg text-xs font-bold border transition ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-red-400' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-red-500'}`}>{t.disconnectIg}</button>
                          ) : (
                            <button onClick={handleConnectInstagram} disabled={isConnecting} className="px-4 py-2 rounded-lg text-xs font-bold border bg-slate-900 text-white border-slate-800 hover:bg-slate-800 transition flex items-center gap-2">
                              {isConnecting ? <Loader2 size={14} className="animate-spin" /> : t.connectIg}
                            </button>
                          )}
                        </div>

                        {/* الكارت المحدث لتيك توك 🚀 */}
                        <div className={`p-5 rounded-2xl border flex items-center justify-between ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
                          <div className="flex items-center gap-3">
                            {isTkConnected && tkAvatar ? (
                              <img src={tkAvatar} alt="TikTok Avatar" className="w-12 h-12 rounded-xl object-cover shadow-md border border-slate-200 dark:border-slate-700" />
                            ) : (
                              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-black text-white shadow-md">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                              </div>
                            )}
                            <div>
                              <h4 className="font-bold">تيك توك (TikTok)</h4>
                              {isTkConnected ? (
                                <p className="text-xs font-bold text-green-500 flex items-center gap-1"><CheckCircle2 size={12}/> متصل بـ {tkUsername || '@user'}</p>
                              ) : (
                                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>غير متصل</p>
                              )}
                            </div>
                          </div>
                          {isTkConnected ? (
                            <button onClick={() => { setIsTkConnected(false); setTkUsername(""); setTkAvatar(""); }} className={`px-4 py-2 rounded-lg text-xs font-bold border transition ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-red-400' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-red-500'}`}>{t.disconnectIg}</button>
                          ) : (
                            <button onClick={handleConnectTikTok} className="px-4 py-2 rounded-lg text-xs font-bold border bg-black text-white border-slate-800 hover:bg-slate-900 transition flex items-center gap-2">
                              {t.connectTk}
                            </button>
                          )}
                        </div>

                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="space-y-3 bg-slate-500/5 p-4 rounded-2xl border border-slate-500/10">
                        <label className={`text-sm font-bold flex items-center gap-2 ${labelColor}`}>
                          <Lock size={16} className="text-green-500"/> {t.changePass}
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input type="password" placeholder={t.passPlaceholder} value={newPassword} onChange={(e: any) => setNewPassword(e.target.value)} className={`flex-1 border rounded-xl px-4 py-3 outline-none text-sm w-full ${isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
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

        <div className="w-full p-4 sm:p-6 flex justify-between items-center z-30">
          <button onClick={() => setIsSidebarVisible(!isSidebarVisible)} className={`p-2 rounded-lg border shadow-sm transition-colors ${isDark ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'}`}>
            <AlignJustify size={24} />
          </button>
          
          <div className="hidden md:block"></div> 

          <div className="flex items-center gap-3">
            <div onClick={() => { setIsSettingsOpen(true); setActiveTab('billing'); }} className={`flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer transition-all backdrop-blur-md shadow-lg ${isDark ? 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white hover:border-yellow-500/50' : 'bg-white border-slate-200 text-slate-700 hover:border-yellow-400'}`}>
              <Wallet size={16} className="text-yellow-500" />
              <span className="font-bold text-sm">{credits} <span className="font-medium text-xs opacity-80">{t.points}</span></span>
            </div>

            <div className={`relative inline-block ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={`flex items-center justify-center w-11 h-11 border rounded-full transition-all backdrop-blur-md shadow-lg ${isDark ? 'bg-slate-900/80 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
                <User size={20} />
              </button>
              {isProfileOpen && (
                <div className={`absolute top-full mt-3 ${t.dir === 'rtl' ? 'left-0' : 'right-0'} w-64 border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl z-50 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <div className={`px-5 py-4 border-b flex items-center gap-3 ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="bg-yellow-500/20 p-2 rounded-lg"><Crown size={20} className="text-yellow-500" /></div>
                    <div>
                      <p className={`text-sm font-bold ${textMain}`}>{userPlan}</p>
                      <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{userRole === 'admin' ? 'Admin Profile' : 'Subscribed'}</p>
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

        {/* عرض شاشات التطبيق بناءً على القائمة الجانبية */}
        {activeView === 'admin' && userRole === 'admin' && (
          <AdminDashboard isDark={isDark} t={t} />
        )}

        {activeView === 'calendar' && (hasCalendar || userRole === 'admin') && (
          <MarketingCalendar 
            isDark={isDark} 
            setActiveView={setActiveView} 
            setRawIdea={setRawIdea} 
            setIsAiAssistOpen={setIsAiAssistOpen} 
            t={t} 
          />
        )}

        {/* ===================== القسم الجديد ===================== */}
        {activeView === 'socialHub' && (
          <SocialMediaHub 
            isDark={isDark} 
            t={t} 
            setActiveView={setActiveView} 
            isTkConnected={isTkConnected} 
            tkUsername={tkUsername} 
            tkAvatar={tkAvatar} 
            setIsTkConnected={setIsTkConnected}
            setTkUsername={setTkUsername}
            setTkAvatar={setTkAvatar}
            handleConnectTikTok={handleConnectTikTok}
            isIgConnected={isIgConnected}
            igUsername={igUsername}
            igAvatar={igAvatar}
            setIsIgConnected={setIsIgConnected}
            setIgUsername={setIgUsername}
            setIgAvatar={setIgAvatar}
            handleConnectInstagram={handleConnectInstagram}
          />
        )}
        {/* ======================================================== */}

        {activeView === 'studio' && (
          <>
            <div className={`relative z-10 backdrop-blur-2xl p-6 sm:p-10 rounded-[2.5rem] border w-full max-w-xl mx-auto mt-4 transition-colors duration-500 ${panelBg}`}>
              <div className="text-center mb-10">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold mb-4 border border-blue-500/20">{t.badge}</span>
                <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-3 drop-shadow-xl">{t.appTitle}</h1>
                <p className={`font-medium text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.appDesc}</p>
              </div>

              <form onSubmit={handleSubmit} className={`space-y-6 ${t.dir === 'ltr' ? 'text-left' : 'text-right'}`}>
                <div className="space-y-2">
                  <label className={`block text-sm font-bold px-1 ${labelColor}`}>{t.bizCategory}</label>
                  <div className="relative">
                    <select value={activityType} onChange={(e: any) => setActivityType(e.target.value)} required className={`w-full px-5 py-4 border rounded-2xl outline-none font-medium appearance-none transition-all ${inputBg}`}>
                      <option className={optionClass} value="" disabled>{t.bizPlaceholder}</option>
                      {t.activities.map((act: any, i: any) => <option className={optionClass} key={i} value={act}>{act}</option>)}
                    </select>
                    <div className={`absolute inset-y-0 ${t.dir === 'rtl' ? 'left-5' : 'right-5'} flex items-center pointer-events-none text-slate-400`}>▼</div>
                  </div>
                </div>

                {isCustomBiz && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className={`block text-sm font-bold px-1 ${labelColor}`}>{t.customBizLabel}</label>
                    <input type="text" value={customActivityType} onChange={(e: any) => setCustomActivityType(e.target.value)} required placeholder={t.customBizPlaceholder} className={`w-full px-5 py-4 border rounded-2xl outline-none font-medium transition-all ${inputBg}`} />
                  </div>
                )}

                <div className="space-y-2">
                  <label className={`block text-sm font-bold px-1 ${labelColor}`}>{t.contentType}</label>
                  <div className="relative">
                    <select value={contentType} onChange={(e: any) => setContentType(e.target.value)} className={`w-full px-5 py-4 border rounded-2xl outline-none font-medium appearance-none transition-all ${inputBg}`}>
                      <optgroup label={t.visualGroup} className={optionClass}>
                        <option className={optionClass} value="promo_video">{t.videoPromo}</option>
                        <option className={optionClass} value="social_story">{t.socialStory}</option>
                        <option className={optionClass} value="product_shot">{t.poster}</option>
                      </optgroup>
                      <optgroup label={t.textGroup} className={optionClass}>
                        <option className={optionClass} value="social_caption">{t.contentPlan}</option>
                        <option className={optionClass} value="ad_script">{t.adScript}</option>
                        <option className={optionClass} value="customer_response">{t.reply}</option>
                      </optgroup>
                    </select>
                    <div className={`absolute inset-y-0 ${t.dir === 'rtl' ? 'left-5' : 'right-5'} flex items-center pointer-events-none text-slate-400`}>▼</div>
                  </div>
                </div>

                {isVisualContent && (
                  <div className={`p-5 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-300 space-y-4 ${isDark ? 'bg-purple-900/10 border-purple-500/20' : 'bg-purple-50 border-purple-100'}`}>
                    <h3 className={`text-sm font-black mb-3 flex items-center gap-2 ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>{t.visualOptionsTitle}</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}><Mic size={14} /> {t.voiceLabel}</label>
                        <select value={voiceGender} onChange={(e: any) => setVoiceGender(e.target.value)} className={`w-full px-3 py-2.5 border rounded-xl outline-none text-sm appearance-none transition-all ${inputBg}`}>
                          <option className={optionClass} value="male_sa">{t.voiceMaleSA}</option>
                          <option className={optionClass} value="female_sa">{t.voiceFemaleSA}</option>
                          <option className={optionClass} value="ai_voice">{t.voiceAI}</option>
                          <option className={optionClass} value="none">{t.voiceNone}</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}><Activity size={14} /> {t.toneLabel}</label>
                        <select value={adTone} onChange={(e: any) => setAdTone(e.target.value)} className={`w-full px-3 py-2.5 border rounded-xl outline-none text-sm appearance-none transition-all ${inputBg}`}>
                          <option className={optionClass} value="toneViral">{t.toneViral}</option>
                          <option className={optionClass} value="toneStory">{t.toneStory}</option>
                          <option className={optionClass} value="toneSales">{t.toneSales}</option>
                          <option className={optionClass} value="toneFormal">{t.toneFormal}</option>
                        </select>
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}><Clapperboard size={14} /> {t.styleLabel}</label>
                        <select value={visualStyle} onChange={(e: any) => setVisualStyle(e.target.value)} className={`w-full px-3 py-2.5 border rounded-xl outline-none text-sm appearance-none transition-all ${inputBg}`}>
                          <option className={optionClass} value="styleUGC">{t.styleUGC}</option>
                          <option className={optionClass} value="styleMotion">{t.styleMotion}</option>
                          <option className={optionClass} value="styleAvatar">{t.styleAvatar}</option>
                          <option className={optionClass} value="styleCinematic">{t.styleCinematic}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {isTextContent && (
                  <div className={`p-5 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-300 space-y-4 ${isDark ? 'bg-blue-900/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
                    <h3 className={`text-sm font-black mb-3 flex items-center gap-2 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>{t.textOptionsTitle}</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}><Target size={14} /> {t.goalLabel}</label>
                        <select value={contentGoal} onChange={(e: any) => setContentGoal(e.target.value)} className={`w-full px-3 py-2.5 border rounded-xl outline-none text-sm appearance-none transition-all ${inputBg}`}>
                          <option className={optionClass} value="goalConversion">{t.goalConversion}</option>
                          <option className={optionClass} value="goalEngagement">{t.goalEngagement}</option>
                          <option className={optionClass} value="goalAwareness">{t.goalAwareness}</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}><AlignLeft size={14} /> {t.lengthLabel}</label>
                        <select value={textLength} onChange={(e: any) => setTextLength(e.target.value)} className={`w-full px-3 py-2.5 border rounded-xl outline-none text-sm appearance-none transition-all ${inputBg}`}>
                          <option className={optionClass} value="lengthShort">{t.lengthShort}</option>
                          <option className={optionClass} value="lengthMedium">{t.lengthMedium}</option>
                          <option className={optionClass} value="lengthLong">{t.lengthLong}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {isVisualContent && (
                  <div className="space-y-2 animate-in fade-in zoom-in duration-300">
                    <label className={`block text-sm font-bold px-1 ${labelColor}`}>{t.uploadImageTitle}</label>
                    <div className={`relative border-2 border-dashed rounded-2xl p-4 transition-all ${imagePreview ? 'border-purple-500/50 bg-purple-500/5' : isDark ? 'border-slate-700 hover:border-slate-500 bg-slate-900/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'}`}>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      {imagePreview ? (
                        <div className="flex items-center gap-4">
                          <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-xl shadow-md border border-slate-200/20" />
                          <div className="flex-1">
                            <p className={`text-sm font-bold ${textMain}`}>{imageFile?.name}</p>
                            <p className={`text-xs mt-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{t.changeImage}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4 text-center">
                          <div className={`p-3 rounded-full mb-3 ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'}`}><ImagePlus size={24} /></div>
                          <p className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.uploadImageBtn}</p>
                          <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>PNG, JPG (Max 5MB)</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1 mb-2">
                    <label className={`block text-sm font-bold ${labelColor}`}>{t.idea}</label>
                    <button type="button" onClick={() => setIsAiAssistOpen(!isAiAssistOpen)} className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${isAiAssistOpen ? 'bg-purple-500 text-white' : 'text-purple-500 bg-purple-500/10 hover:bg-purple-500/20'}`}>
                        <Wand2 size={14}/> {t.aiAssistBtn}
                    </button>
                  </div>
                  
                  {isAiAssistOpen && (
                    <div className={`p-4 mb-4 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-purple-500/30' : 'bg-purple-50/50 border-purple-200'} animate-in fade-in slide-in-from-top-2`}>
                        <p className={`text-xs font-bold mb-3 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>{t.aiAssistDesc}</p>
                        <div className="flex flex-col sm:flex-row gap-2 mb-3">
                            <input type="text" value={rawIdea} onChange={(e: any)=>setRawIdea(e.target.value)} placeholder={t.aiAssistPlaceholder} className={`flex-1 px-3 py-2 text-sm rounded-xl outline-none border ${inputBg}`} />
                            <button type="button" onClick={handleGeneratePrompt} disabled={isGeneratingPrompt} className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 whitespace-nowrap transition-colors">
                                {isGeneratingPrompt ? <Loader2 size={14} className="animate-spin" /> : <Bot size={14} />}
                                {t.aiAssistGenerate}
                            </button>
                        </div>
                        {generatedPrompt && (
                            <>
                                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} mb-3`}>
                                    <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-white' : 'text-slate-900'}`}>{generatedPrompt}</p>
                                </div>
                                <button type="button" onClick={handleApplyPrompt} className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex justify-center items-center gap-2 transition-colors">
                                    <CheckCircle2 size={16}/> {t.aiAssistApply}
                                </button>
                            </>
                        )}
                    </div>
                  )}

                  <textarea value={prompt} onChange={(e: any) => setPrompt(e.target.value)} required className={`w-full px-5 py-4 border rounded-2xl outline-none resize-none leading-relaxed transition-all ${inputBg}`} rows={4} placeholder={t.ideaPlaceholder}></textarea>
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={isSubmitting} className="relative w-full group overflow-hidden py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-lg shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_10px_50px_-10px_rgba(59,130,246,0.7)] transform active:scale-[0.98] transition-all duration-300 disabled:opacity-50">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? <><Loader2 className="animate-spin" size={24} /> <span>{t.producing}</span></> : <><span>✨</span> <span>{t.launchBtn}</span></>}
                    </span>
                  </button>
                </div>
              </form>
            </div>

            <div className="relative z-10 w-full max-w-5xl mt-16 mb-20 px-4">
              <div className={`flex justify-between items-center mb-8 border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-300'}`}>
                <h2 className={`text-2xl font-black flex items-center gap-3 ${textMain}`}>
                  <span className={`p-2 rounded-xl border text-xl ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>📁</span>
                  <span>{t.libraryTitle}</span>
                </h2>
                <button onClick={fetchResults} disabled={isLoadingResults} className={`px-5 py-2.5 rounded-xl border transition-all text-sm font-bold flex items-center gap-2 backdrop-blur-sm ${isDark ? 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700' : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm'}`}>
                  {isLoadingResults ? <Loader2 className="animate-spin" size={16} /> : <span>🔄</span>}
                  {isLoadingResults ? t.syncing : t.syncBtn}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {results.length === 0 && !isLoadingResults ? (
                  <div className={`col-span-full flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed backdrop-blur-sm ${isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-100/50 border-slate-300'}`}>
                    <span className="text-6xl mb-4 opacity-50">🎬</span>
                    <p className={`font-medium text-lg ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.emptyLib}</p>
                  </div>
                ) : (
                  results.map((item: any, index: number) => <ContentCard key={index} item={item} handleDelete={handleDelete} isDark={isDark} t={t} />)
                )}
              </div>
            </div>
          </>
        )}

        {/* عرض لوحة تحكم التقييمات */}
        {activeView === 'reviews' && (hasReviews || userRole === 'admin') && (
          <ReviewsDashboard isDark={isDark} t={t} />
        )}

      </main>
    </div>
  );
}
