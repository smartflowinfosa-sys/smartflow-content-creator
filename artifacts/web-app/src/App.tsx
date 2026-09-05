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
    calTitle: "التقويم التسويقي",
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
    featStudio: "الاستوديو الذكي",
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
    calTitle: "Marketing Calendar",
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
    featStudio: "Smart Studio",
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
          <button onClick={checkStatus} disabled={isChecking} className="w-full bg-[#06AFCE] hover:bg-[#06C6EA] text-white font-bold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2">
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
  const [editFeatStudio, setEditFeatStudio] = useState(true);
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
    setEditFeatStudio(user.feat_studio !== undefined ? user.feat_studio : true);
  };

  const saveUserConfig = async () => {
    setIsSavingUser(true);
    try {
      const { error } = await supabase.from('profiles').update({
        plan_name: editPlan,
        credits: editCredits,
        feat_calendar: editFeatCal,
        feat_reviews: editFeatRev,
        feat_studio: editFeatStudio
      }).eq('id', editingUser.id);
      
      if (error) throw error;
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, plan_name: editPlan, credits: editCredits, feat_calendar: editFeatCal, feat_reviews: editFeatRev, feat_studio: editFeatStudio } : u));
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
                      <span className="text-sm font-bold flex items-center gap-2"><Star size={16} className="text-blue-500"/> {t.featStudio}</span>
                      <ToggleSwitch isOn={editFeatStudio} onToggle={() => setEditFeatStudio(!editFeatStudio)} />
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
  tiktok: { label: 'TikTok', icon: PlayCircle, iconImage: 'data:image/png;base64,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', iconClass: 'bg-black text-white' },
  instagram: { label: 'Instagram', icon: Instagram, iconClass: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white' },
  whatsapp: { label: 'WhatsApp', icon: Phone, iconImage: 'data:image/png;base64,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', iconClass: 'bg-green-500 text-white' },
  google: { label: 'Google Business', icon: Store, iconImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAALqklEQVR42u2ce4xc9XXHP+f3u3fuvHb26cfau7bXWWMbMBgQoDjgQDGBxgRw1BBVcatAgpqoUlopKFWlliZSVZWkLWlRoraJA1Giqg1E5OFICVGVhLoiSC0C0ghigzE2BoyNd9e787gz9/5O/7izDz92Pa6Kdpa5X+lqpH2M7v1+z/me8zu/3wykSJEiRYoUKVKkSJEiRYoUKVKkSJEiRSdAVNWmNKTo6Ay4LqVhcQXQlIbFgwe4pXXL07dr5vmdSTPgnYQqaPP1rIcRkOZrKsD/Z8xrQrg1FybStCDtbkFtHu2KmWHS8cZYxMGTjqMTMSfLEU4F30J/0bKuVxgdyFDKW6RJvXMgpn2FaNsMiN10xCuHjtd54oWQJw9G/PqYY6IK1UhRBAPETefvzSg9Bbh1tMCNGz2uHLEUAgMITsFIKkALUa8oYER49e06f/fzKr/Y32CipogIWR98IxhRhKbVNP+3FkOP77EsEyCiDPYIOy4Rbt/q4XsesYKVVIAFLUeaVvPtp8o8+GTIG5NKX97gGU0sqenvZzwGsSrLsj5D+QDX/It6BJW6snkQ7r3BZ/Mqi1NJLC0V4OzIFxHKYcwX9k7yb8/WKWQtWU+J4nORPk09xAp5axkt5XC4mZwQSWynUofAKL93neW2rUFb2VFbCKBNH5msRvzRd8b5yX5lRZchVqWVu/NEGCnmyVjm0D8LIxA7YSpUPnm94cNX+zg1bSFCG6xaNLkaIX/22Nv85BWPVV1C5M5PviDECoO5gKxnzkn+dBtrjNKdg2/si/neM3WMxDjnUgFwifXUHv4qt33/fjZlJhknwNP4PORDrMpQPkN34BGpW7DVnK4fhcDwyH84nj8cYYxhsfN/cQVwDoyh+t9PM/WjH3CDvMBXXvxzLq2+yphXws4jgmBoOOgLMizLBsSqLfX5SXelWCN87ReOyVo8a4GdJ0DS8riwRu1f9mCsMJHpYU3tMP+0/0+5dewpxv0eDIrMKcECOBzdgWWo6KPi8Ezi89JawhH48PJxePSXMSLzF/h3twAuESDc9zPc/heQXB4bN6jYHDlX5YGDD/DJN79PxeZxmGTGg6AiWCwDXsBEBcYqMF6BqTDphloprHEslDIZ9h57jDeqr2Ek6cI6aBTRjP5Gnere7yKeN+MDVh11CTAS87lXH2KwdpS/Hb4HiLAK5RB2rMuwfYNldb+Q8YSxiuM3Rx3PHVEmqpDLJCvfeZRHtEDUv5c384/x40M57t48hEOxizCw8BYt+o0hOngAffUgkssl9WAmLR2K4VSmxO8fe5TBaJzPr/s0xxoBn3u/4RPvy5LNmNN6np2XKYdPRPzjz2v86jVLV5B0SGeR7wqExaep9n6XICrx1FvPsnvjh/CN12EWBNT+62m0Hp1zfiwoRh3jQR83n/x3vvTs/XzxZsMf3thNNiM4l0T57CWsGfD4/J05rh6JmQrPtCOHcVmi7EtUln0LUUPWBBwuv86hU0ebceE6RIAm4e6VA4g1C7YhVmC8anjvbw3y0W0FXOxQNZhm4Z17OSdkPI8//kCWVT1KGE3niENdgPPHqKzcg7NlUA8jUI1qHJg41EFFuDnw0XqIO/4WYu38bYgBLTv8y6vYu3fj1MOY+TdcjEkKcSnnc+sWIWwkCzCwIDXGl32dyHsNq0FiR0CsjpdPHem8LiiamMBNToKd51SMUQh9zMqj5H93EBuMYkST4f55FmgKXDZsKQSOyAlGfcLl/4or/hovLmJcPGddIIzVJztPAG000EaInCucRdGGRfMhudtexBYHQZMVwHndrXkNdBm6Aodr5Jjq2UvY9SRelEclTt5qzjij2qjO+e8OKsJG9TQyZuulAePI3/4SmeV1tD69ymq1V1eMcXgUqJf+k7D/cXC5poCnv4fK3PG0do4A4nmo9ZAzC7CANiB/y0sEG46joUUar0+X5BbpV96eyHBCfkNt5bcQ9U9bTZ/ZbUUzUdBBGWALOWwuj86dSBrFVT0y2w6TueI1tGLB5tDy07jKy0mEnqdVdDgEw6+OHeNEz9ewUsOq4dzbOEnr2Rd0dVAGNNNdckXo7UHjOKHCKlr28bccI//+I2gtAHFgfKTxFu71h5q3G89LlKrDiNBwMT848U1scALjAnSB2hGrMlgYWCT6FysDnEOMwawegigGT9GKhxk6SeGD+5MR9bQ1qQNbguPfwJ14HMRv/jwCjWcu1QgnBlHhwef28MLU8+Tt9A7Z/FaVMR6jpTWLZECLZkEJuZkNFydRHhrorpG/42WMF0M89xxJsl0m6nAHPk589B9QF4F4IHbmcuJh60f49nNf4ntH9lGyBeIF7EqASB0lv5uRruGZjqgzZkFNG/Iuvhz1uzDWUbhzP17/FFrzkjXAWcM7HyFCX/ks0fFHMf23I4VNIB4uruNNPMHP3nyRR06upsfLLWg7yS0IYVRnY2kDK/J9zYNcHSOAAXV4w2uxW7die/8Zb6QOU+cif7a8gkW8IlL+JTq5D5VkDpQx8D+Nfh4ofwhjs0B0Xj8XDHXXYPvgFRgxxOqwYjrFgpKoFqB4zw5yV5ShYhcgf04mqANTRPw+1Osn45d4Q4b46/AOGuTwabRAvtCIG6zKL+emoWtnVsSdNQ2VpDX0Vt+AlLaDmzrvmGFuNqjGGOpU1fKXk9s4EmXJSR3Xgo9bMZyKq9w6tJ3eoBunblH8f5EzQEAVwWJWfRa9AAK02cFYrfNQ+VqejZZTlJC4hfcwIlTikPcUh/nI+g/Mnj3ttFnQbBbEmP5boO8uaIwn3U0L5uUT8nDlGvbW19Njqi1FPggOIdKYT19yF91BMTkQRqcKkAxjAMWOfBHNbQZXWdCKYgRf6vy0volHapdSJMRpawQaMUzWy+wc3s77Vl5FrA4ji0vB4gsgyYaMZFcjIw8mezOq51wWOYSM1HmuMcyXy9eQJbqABzWEccjawhB/sPmjqGpbnBFtj8/ziAGNsP23wKr7IJpIFlhnkO/T4Fjcw19NbaOKxRPXUu0QIE56Hf7kik/QHXSRHG5PBZjDkgVi7Nq/wPXtgmi2HiiCEcekBnxh6nredDlyNFr0fRCxlBtV7r7ow1zWvwHXBtbTfgJMn/wxHt7oV9DsRUlrikVwWI35cvk6no+W0dViu5m0nJaJepnfHrqej120sy18v00FaN6OxkgwiNmwBycFlAhrHHuqV/NEuJZuqbXUbiZF1zIZV7mkd5TPbNm96C3nEhCgaUUaY7q3Iev+Bs9N8sPapTxcvZQuU2vddhDqLqLPL3H/lZ+imMkvesvZPrOgFkRw6vAG7+HFsVf4+5cO0OW7CxrYiwgujvjMxbtZXVzRVr7f3hkwJ4IVZWD0ftaVNhLG5eZH8lrz/bFwgjvW3sSNw9cSa9yW5Le3ACKoKgMZn/su/zi+yeL0/O5vxFCOqlw1sIV7N3+kbSO/7QWYJjNWx6beEe7d+DucalQRsQv3+xpT8Ircd9nd5PxsM5ckFeD/LoLg1HHn+pt478qtTEXVeSPaiuVUo8Lu0Z2sLa1qtpzt/Vn5thdgOno9MXxq011kTXDOQ7RGhKm4xta+zexavwOn2tbWs2QEmLYip47RnrXctmY7U1HlrN0r1WQ/556NuwhsBi5owJ0K0HIm7Bq5maJfIJpTkI0YpuIqVy/bwlXLL0k+XSBL49GWjgDNWjBUXMENK6+hHIWnkazArvU7EqGW0DfwLK1vN2oS/cE128mZTFJkEWouZKS4mq39m5pimVSAd6oWCLCpd4T1pWFC18CIoR43uG75lQQ2aO7vkgrwTsGpwzc+lw9cTMM5jFgCk+XaFVtYijAsUVy/4krA8Xr1bVbnlrG59z0zWbKUsCS/NVFJvrPm8UM/Zd+xZ/jYyE6uWrGlbXa53vUCvJvgLeWbn10RS9uPHNIMSItwivksyKU0LK4AaRYssgDPpDSk6FiIqqYWlCJFihQpUqRIkSJFihQpUqRIkSJFihQpUry78b/2htqoU8joLQAAAABJRU5ErkJggg==', iconClass: 'bg-white' },
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
          <span className="text-xs font-black text-[#06C6EA] dark:text-[#67e2f5]">{sfAiEmployeeName}</span>
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
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editPostName, setEditPostName] = useState("");
  const [editPostTime, setEditPostTime] = useState("");

  const startEditPost = (post: any) => {
    setEditingPostId(post.id);
    setEditPostName(post.name);
    setEditPostTime(post.time);
  };
  const saveEditPost = () => {
    setScheduledPosts((prev) => prev.map((p) => p.id === editingPostId ? { ...p, name: editPostName, time: editPostTime } : p));
    setEditingPostId(null);
  };
  const deleteScheduledPost = (id: number) => {
    if (!window.confirm(t.dir === 'rtl' ? 'هل تريد حذف هذا المحتوى المجدول؟' : 'Delete this scheduled content?')) return;
    setScheduledPosts((prev) => prev.filter((p) => p.id !== id));
  };

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
    const [imgFailed, setImgFailed] = useState(false);
    if (meta.iconImage && !imgFailed) {
      return (
        <div className={`rounded-xl flex items-center justify-center shrink-0 overflow-hidden ${meta.iconClass}`} style={{ width: size, height: size }}>
          <img src={meta.iconImage} alt={meta.label} onError={() => setImgFailed(true)} style={{ width: size * 0.68, height: size * 0.68 }} className="object-contain" />
        </div>
      );
    }
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
        <button onClick={() => setActiveTab(tab.id)} className="relative rounded-xl p-[2px] bg-gradient-to-r from-[#06C6EA] to-[#426CEA] animate-pulse shadow-[0_0_14px_rgba(66,108,234,0.5)] shrink-0">
          <span className={`block px-4 py-2 rounded-[10px] text-sm font-black whitespace-nowrap ${isDark ? 'bg-[#0f172a] text-transparent bg-clip-text bg-gradient-to-r from-[#06C6EA] to-[#426CEA]' : 'bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#06C6EA] to-[#426CEA]'}`}>
            {tab.name}
          </span>
        </button>
      );
    }
    return (
      <button
        onClick={() => setActiveTab(tab.id)}
        style={{ WebkitTapHighlightColor: 'transparent' }}
        className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap border transition-colors shrink-0 bg-transparent outline-none focus:outline-none focus:ring-0 focus-visible:outline-none active:bg-transparent ${isDark ? 'border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-transparent' : 'border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-transparent'}`}
      >
        {tab.name}
      </button>
    );
  };

  return (
    <div className={`w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in zoom-in duration-500 ${t.dir === 'ltr' ? 'text-left' : 'text-right'} ${isDark ? 'text-white' : 'text-slate-900'}`}>
      
      {/* Header */}
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-l from-[#67e2f5] to-[#426CEA]">
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
                    <button onClick={() => handleConnectProvider(conn.provider)} className="text-xs font-bold text-[#06C6EA] bg-[#06C6EA]/10 hover:bg-[#06C6EA]/20 px-3 py-1.5 rounded-lg transition-colors self-start mt-4">ربط الحساب</button>
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
              <button onClick={() => setShowAddAccountModal(true)} className="bg-gradient-to-r from-[#06AFCE] to-[#3557d1] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:opacity-90 transition-opacity">
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
                       <button onClick={() => handleConnectProvider(conn.provider)} disabled={isConnectingGoogle && conn.provider === 'google'} className="text-sm font-bold text-[#06C6EA] bg-[#06C6EA]/10 hover:bg-[#06C6EA]/20 px-4 py-1.5 rounded-lg transition-colors flex items-center gap-2">
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
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-gradient-to-r from-[#04303d]/40 to-[#16234f]/40 border border-[#426CEA]/20 rounded-2xl p-6">
              <div>
                <h2 className="text-lg font-bold text-white">هل لديك فكرة جديدة؟</h2>
                <p className="text-sm text-slate-300 mt-1">استخدم الاستوديو الذكي لإنشاء، صياغة، وجدولة محتواك.</p>
              </div>
              <button onClick={() => setActiveView('studio')} className="bg-[#3557d1] hover:bg-[#426CEA] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap">
                + إنشاء منشور ذكي
              </button>
            </div>

            <div className={`rounded-2xl border p-6 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className="text-lg font-bold mb-1 flex items-center gap-2"><UploadCloud size={20} className="text-[#06C6EA]" /> رفع صورة أو فيديو للجدولة</h3>
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
                      <div className={`w-full border rounded-xl px-4 py-3 text-sm transition-all flex items-center justify-between group-hover:border-[#426CEA] shadow-sm overflow-hidden ${isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-900'}`}>
                        <span className={`${scheduleDate ? 'font-black text-[#426CEA]' : 'opacity-60 font-bold'} font-sans tracking-wide whitespace-nowrap`} dir="ltr">
                          {formatScheduleDate(scheduleDate)}
                        </span>
                        <CalendarRange size={18} className={`shrink-0 ${scheduleDate ? 'text-[#426CEA]' : 'text-slate-400'}`} />
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
                      <div className={`w-full border rounded-xl px-4 py-3 text-sm transition-all flex items-center justify-between group-hover:border-[#426CEA] shadow-sm overflow-hidden ${isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-900'}`}>
                        <span className={`${scheduleTime ? 'font-black text-[#426CEA]' : 'opacity-60 font-bold'} font-sans tracking-wide whitespace-nowrap`} dir="ltr">
                          {scheduleTime || t.publishTime}
                        </span>
                        <Clock size={18} className={`shrink-0 ${scheduleTime ? 'text-[#426CEA]' : 'text-slate-400'}`} />
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

                  <button onClick={handleAddToSchedule} disabled={!scheduleMediaFile || !scheduleDate || !scheduleTime} className="w-full bg-[#06AFCE] hover:bg-[#06C6EA] disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
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
                      <th className="px-6 py-4 font-bold text-right">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {scheduledPosts.map((post) => (
                      <tr key={post.id} className={isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}>
                        {editingPostId === post.id ? (
                          <>
                            <td className="px-6 py-3">
                              <input value={editPostName} onChange={(e: any) => setEditPostName(e.target.value)} className={`w-full p-2 rounded-lg text-sm outline-none border ${isDark ? 'bg-slate-800/60 border-slate-700 text-white' : 'bg-white border-slate-200'}`} />
                            </td>
                            <td className="px-6 py-3">{post.platform}</td>
                            <td className="px-6 py-3">
                              <input value={editPostTime} onChange={(e: any) => setEditPostTime(e.target.value)} className={`w-full p-2 rounded-lg text-sm outline-none border ${isDark ? 'bg-slate-800/60 border-slate-700 text-white' : 'bg-white border-slate-200'}`} />
                            </td>
                            <td className="px-6 py-3">
                              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${post.statusColor === 'blue' ? 'text-[#67e2f5] bg-[#67e2f5]/10 border-[#06C6EA]/20' : 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'}`}>{post.status}</span>
                            </td>
                            <td className="px-6 py-3">
                              <div className="flex items-center gap-2">
                                <button onClick={saveEditPost} className="text-xs font-bold text-white bg-[#426CEA] hover:opacity-90 px-3 py-1.5 rounded-lg transition-opacity">حفظ</button>
                                <button onClick={() => setEditingPostId(null)} className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>إلغاء</button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4 font-bold">{post.name}</td>
                            <td className="px-6 py-4">{post.platform}</td>
                            <td className="px-6 py-4 text-slate-400">{post.time}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${post.statusColor === 'blue' ? 'text-[#67e2f5] bg-[#67e2f5]/10 border-[#06C6EA]/20' : 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'}`}>{post.status}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5">
                                <button onClick={() => startEditPost(post)} title="تعديل" className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-[#67e2f5] hover:bg-[#06C6EA]/10' : 'text-slate-500 hover:text-[#426CEA] hover:bg-[#426CEA]/10'}`}>
                                  <Edit size={16} />
                                </button>
                                <button onClick={() => deleteScheduledPost(post.id)} title="حذف" className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-red-400 hover:bg-red-500/10' : 'text-slate-500 hover:text-red-600 hover:bg-red-50'}`}>
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
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
                      <button onClick={() => updateProviderSetting(provider, 'replyMode', 'auto')} className={`p-4 rounded-2xl border text-right transition-colors ${settings.replyMode === 'auto' ? 'border-[#426CEA] bg-[#426CEA]/10' : (isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white')}`}>
                        <div className="flex items-center gap-2 mb-1"><Zap size={18} className={settings.replyMode === 'auto' ? 'text-[#426CEA]' : 'text-slate-400'} /><span className="font-bold text-sm">رد تلقائي بالكامل</span></div>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>يرسل الذكاء الاصطناعي الرد فور وصول الرسالة دون أي تدخل.</p>
                      </button>
                      <button onClick={() => updateProviderSetting(provider, 'replyMode', 'suggest')} className={`p-4 rounded-2xl border text-right transition-colors ${settings.replyMode === 'suggest' ? 'border-[#426CEA] bg-[#426CEA]/10' : (isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white')}`}>
                        <div className="flex items-center gap-2 mb-1"><Edit size={18} className={settings.replyMode === 'suggest' ? 'text-[#426CEA]' : 'text-slate-400'} /><span className="font-bold text-sm">اقتراح رد بانتظار المراجعة</span></div>
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
                          <p className="text-sm font-bold flex items-center gap-2"><MessageCircle size={16} className="text-[#06C6EA]" /> الرد التلقائي على التعليقات العامة</p>
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
                      <button onClick={() => setActiveView('reviews')} className="w-full mt-3 text-sm font-bold text-[#06C6EA] bg-[#06C6EA]/10 hover:bg-[#06C6EA]/20 px-4 py-2.5 rounded-xl transition-colors">فتح لوحة تقييمات قوقل ماب الكاملة</button>
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
                  <div key={conn.provider} onClick={() => setActiveChannelDetail(conn.provider)} style={{ WebkitTapHighlightColor: 'transparent' }} className={`p-4 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-colors outline-none select-none ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-[#426CEA]/50' : 'bg-white border-slate-200 shadow-sm hover:border-[#a6b9f7]'}`}>
                    <div className="flex items-center gap-3">
                      <ProviderIcon provider={conn.provider} size={32} />
                      <div>
                        <h4 className="font-bold text-sm">{conn.name}</h4>
                        <StatusBadge status={conn.status} />
                      </div>
                    </div>
                    {conn.status !== 'connected' ? (
                      <button onClick={(e: any) => { e.stopPropagation(); handleConnectProvider(conn.provider); }} className="text-xs font-bold text-[#06C6EA] bg-[#06C6EA]/10 hover:bg-[#06C6EA]/20 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">ربط</button>
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
                  <button onClick={() => setInboxFilter('all')} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${inboxFilter === 'all' ? 'bg-[#426CEA]/20 text-[#426CEA]' : (isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100')}`}>الكل</button>
                  {connections.filter((c) => c.status === 'connected').map((c) => (
                    <button key={c.provider} onClick={() => setInboxFilter(c.provider)} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${inboxFilter === c.provider ? 'bg-[#426CEA]/20 text-[#426CEA]' : (isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100')}`}>
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
                              <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${msg.from !== 'user' ? 'bg-[#3557d1] text-white rounded-br-sm' : (isDark ? 'bg-slate-800 text-white rounded-bl-sm' : 'bg-slate-100 text-slate-900 rounded-bl-sm')}`}>
                                <p>{msg.text}</p>
                                <p className={`text-[10px] mt-1 ${msg.from !== 'user' ? 'text-[#c3d0fa]' : 'text-slate-400'}`}>{msg.time}</p>
                              </div>
                              {msg.from === 'ai' && <div className="max-w-[85%]"><AiSignature /></div>}
                            </div>
                          ))}

                          {/* بطاقة الرد المقترح بانتظار المراجعة - نفس أسلوب تقييمات قوقل 🚀 */}
                          {activeConvData.pendingSuggestion && appSettings[activeConvData.provider]?.replyMode === 'suggest' && (
                            <div className={`rounded-2xl border p-4 ${isDark ? 'bg-[#021a20]/20 border-[#04303d]/30' : 'bg-[#e8fafd]/50 border-[#cff3fa]'}`}>
                              <div className="flex justify-between items-start mb-3 gap-2 border-b border-[#06C6EA]/10 pb-2">
                                <h4 className={`text-xs font-black flex items-center gap-2 ${isDark ? 'text-[#67e2f5]' : 'text-[#06AFCE]'}`}>
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
                                    <button onClick={submitEditedSuggestion} className="flex-1 bg-[#06AFCE] hover:bg-[#06C6EA] text-white py-2 rounded-xl text-sm font-bold transition-all">إرسال الرد المعدّل</button>
                                    <button onClick={() => setEditingSuggestion(null)} className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>إلغاء</button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <p className="text-sm font-medium leading-relaxed mb-3">{activeConvData.pendingSuggestion.text}</p>
                                  <AiSignature />
                                  <div className="flex gap-2 mt-4">
                                    <button onClick={() => handleApproveSuggestion(activeConvData.provider, activeConvData.id)} className="flex-1 bg-[#06AFCE] hover:bg-[#06C6EA] text-white py-2 rounded-xl text-sm font-bold transition-all">{t.approvePublish}</button>
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
                    <button onClick={() => { handleConnectProvider(conn.provider); setShowAddAccountModal(false); }} className="text-xs font-bold text-white bg-[#06AFCE] hover:bg-[#06C6EA] px-3 py-1.5 rounded-lg transition-colors">ربط</button>
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
  const inputBg = isDark ? 'bg-slate-900 border-slate-700 text-slate-300 focus:border-[#426CEA]' : 'bg-white border-slate-300 text-slate-900 focus:border-[#426CEA]';

  // 👉 تحديد نوع الشارة (Badge)
  let badgeText = t.textBadge;
  if (item.content_type === 'promo_video' || item.content_type === 'social_story') badgeText = t.videoBadge;
  else if (item.content_type === 'product_shot' || item.content_type === 'poster') badgeText = "📸";

  return (
    <div className={`${cardBg} backdrop-blur-xl rounded-[2rem] border overflow-hidden transition-all duration-300 flex flex-col h-full group hover:border-[#426CEA]/50`}>
      <div className={`p-5 flex justify-between items-center border-b ${headerBg}`}>
        <span className="text-xs font-black text-white bg-gradient-to-r from-[#06AFCE] to-[#06C6EA] px-3 py-1.5 rounded-lg shadow-md">
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
            <div className={`w-full border rounded-xl px-4 py-3 text-sm transition-all flex items-center justify-between group-hover:border-[#426CEA] shadow-sm overflow-hidden ${inputBg}`}>
              <span className={`${scheduleDate ? 'font-black text-[#426CEA]' : 'opacity-60 font-bold'} font-sans tracking-wide whitespace-nowrap`} dir="ltr">
                {formatScheduleDate(scheduleDate)}
              </span>
              <CalendarRange size={18} className={`shrink-0 ${scheduleDate ? 'text-[#426CEA]' : 'text-slate-400'}`} />
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
            <div className={`w-full border rounded-xl px-4 py-3 text-sm transition-all flex items-center justify-between group-hover:border-[#426CEA] shadow-sm overflow-hidden ${inputBg}`}>
              <span className={`${scheduleTime ? 'font-black text-[#426CEA]' : 'opacity-60 font-bold'} font-sans tracking-wide whitespace-nowrap`} dir="ltr">
                {scheduleTime || t.publishTime}
              </span>
              <Clock size={18} className={`shrink-0 ${scheduleTime ? 'text-[#426CEA]' : 'text-slate-400'}`} />
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

        <button onClick={handleSchedule} disabled={isPublishing} className="w-full bg-[#06AFCE] hover:bg-[#06C6EA] text-white font-bold py-3 rounded-xl transition-colors text-sm flex justify-center items-center gap-2 disabled:opacity-50">
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
    { id: 'back-to-school', title: t.calEvents.backToSchool, date: '2026-08-20', type: t.calTypes.commercial, icon: '🎒', color: 'text-[#06C6EA]', bg: 'bg-[#06C6EA]/10', border: 'border-[#06C6EA]/20' },
    { id: 'salary-aug', title: t.calEvents.salaryAug, date: '2026-08-27', type: t.calTypes.commercial, icon: '💰', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { id: 'pizza-day', title: t.calEvents.pizzaDay, date: '2026-09-09', type: t.calTypes.entertainment, icon: '🍕', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { id: 'national-day', title: t.calEvents.nationalDay, date: '2026-09-23', type: t.calTypes.national, icon: <SaudiFlag />, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { id: 'salary-sep', title: t.calEvents.salarySep, date: '2026-09-27', type: t.calTypes.commercial, icon: '💰', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { id: 'coffee-day', title: t.calEvents.coffeeDay, date: '2026-10-01', type: t.calTypes.entertainment, icon: '☕', color: 'text-amber-600', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { id: 'teachers-day', title: t.calEvents.teachersDay, date: '2026-10-05', type: t.calTypes.global, icon: '👨‍🏫', color: 'text-cyan-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { id: 'food-day', title: t.calEvents.foodDay, date: '2026-10-16', type: t.calTypes.global, icon: '🍔', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { id: 'salary-oct', title: t.calEvents.salaryOct, date: '2026-10-27', type: t.calTypes.commercial, icon: '💰', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { id: 'singles-day', title: t.calEvents.singlesDay, date: '2026-11-11', type: t.calTypes.commercial, icon: '🛍️', color: 'text-[#426CEA]', bg: 'bg-[#426CEA]/10', border: 'border-[#426CEA]/20' },
    { id: 'white-friday', title: t.calEvents.whiteFriday, date: '2026-11-27', type: t.calTypes.commercial, icon: '🛒', color: 'text-slate-900 dark:text-white', bg: 'bg-slate-200 dark:bg-slate-800', border: 'border-slate-300 dark:border-slate-700' },
    { id: 'salary-nov', title: t.calEvents.salaryNov, date: '2026-11-27', type: t.calTypes.commercial, icon: '💰', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { id: 'cyber-monday', title: t.calEvents.cyberMonday, date: '2026-11-30', type: t.calTypes.commercial, icon: '💻', color: 'text-[#426CEA]', bg: 'bg-[#426CEA]/10', border: 'border-[#426CEA]/20' },
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
        <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#67e2f5] to-[#426CEA] mb-2 flex items-center gap-3">
          <CalendarRange size={30} className="text-[#426CEA] shrink-0" strokeWidth={2.5} />
          {t.calTitle}
        </h2>
        <p className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.calDesc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => {
          const isDone = completedEvents.includes(ev.id);
          const daysLeft = getDaysLeft(ev.date);
          const isExpired = daysLeft === t.calEnded;
          const isClosed = isDone || isExpired;
          
          return (
            <div key={ev.id} className={`p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden ${isClosed ? (isDark ? 'bg-slate-900/40 border-slate-800 opacity-60 grayscale-[60%]' : 'bg-slate-100 border-slate-200 opacity-60 grayscale-[50%]') : (isDark ? 'bg-slate-900/80 border-slate-700/80 shadow-lg hover:border-[#426CEA]/50' : 'bg-white border-slate-200 shadow-xl hover:border-[#8fa6f3]')}`}>
              
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border ${ev.bg} ${ev.color} ${ev.border}`}>
                  {ev.icon}
                </div>
                
                <button onClick={() => toggleComplete(ev.id)} title={isDone ? t.calUndo : t.calMarkDone} className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${isDone ? 'bg-green-500 border-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' : (isDark ? 'bg-slate-800 border-slate-600 text-slate-500 hover:text-green-400 hover:border-green-400' : 'bg-slate-50 border-slate-300 text-slate-400 hover:text-green-500 hover:border-green-500')}`}>
                  <CheckCircle2 size={18} />
                </button>
              </div>

              <h3 className={`text-lg font-black mb-1 ${isClosed ? 'line-through decoration-2' : ''} ${isDark ? 'text-white' : 'text-slate-900'}`}>{ev.title}</h3>
              
              <div className="flex gap-2 mb-6 mt-3 flex-wrap">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${ev.bg} ${ev.color} ${ev.border}`}>{ev.type}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 ${isExpired ? 'bg-red-500/10 text-red-500 border-red-500/20' : (isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200')}`}>
                   <Clock size={12} /> {daysLeft}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-500 border-slate-200'}`} dir="ltr">{ev.date}</span>
              </div>

              <button 
                onClick={() => handleLaunch(ev.title)} 
                disabled={isClosed}
                className={`w-full py-3 rounded-xl text-sm font-bold flex justify-center items-center gap-2 transition-all ${isClosed ? (isDark ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed') : 'bg-gradient-to-r from-[#06AFCE] to-[#3557d1] text-white hover:shadow-lg hover:scale-[1.02]'}`}
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
  const inputBg = isDark ? 'bg-slate-950/50 border-slate-700/80 text-white focus:border-[#06C6EA]/50' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#06C6EA]/50';

  const ToggleSwitch = ({ isOn, onToggle }: any) => (
    <div onClick={onToggle} className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${isOn ? 'bg-green-500' : (isDark ? 'bg-slate-700' : 'bg-slate-300')}`}>
      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isOn ? (t.dir === 'rtl' ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'}`}></div>
    </div>
  );

  return (
    <div className={`w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in zoom-in duration-500 ${t.dir === 'ltr' ? 'text-left' : 'text-right'}`}>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#67e2f5] to-pink-500 mb-2">{t.reviewsTitle}</h2>
          <p className={`font-medium ${textMuted}`}>{t.reviewsSubtitle}</p>
        </div>
        
        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
          {!isGoogleConnected ? (
            <button onClick={handleConnectGoogle} disabled={isConnecting} className="bg-white text-[#06AFCE] hover:bg-slate-50 px-6 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 transition-all disabled:opacity-70 w-full justify-center md:w-auto">
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
        <div className={`p-6 rounded-2xl border ${cardClass} flex items-center gap-4 shadow-sm hover:border-[#06C6EA]/30 transition-colors`}>
          <div className="w-14 h-14 rounded-full bg-[#06C6EA]/20 flex items-center justify-center shrink-0">
            <MessageCircle size={24} className="text-[#06C6EA]" />
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
          <button onClick={handleConnectGoogle} disabled={isConnecting} className="bg-[#06AFCE] hover:bg-[#06C6EA] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2">
            {isConnecting ? <Loader2 size={18} className="animate-spin" /> : t.startConnect}
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className={`rounded-3xl border p-6 ${cardClass}`}>
             <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Settings size={20} className="text-[#426CEA]"/> {t.advSettings}</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                   <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2 font-bold text-sm"><Bot size={18} className="text-[#06C6EA]"/> {t.customPrompt}</div>
                      <ToggleSwitch isOn={featCustomPrompt} onToggle={() => setFeatCustomPrompt(!featCustomPrompt)} />
                   </div>
                   <p className={`text-xs mb-3 ${textMuted}`}>{t.customPromptDesc}</p>
                   {featCustomPrompt && (
                     <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                       <textarea value={customPromptText} onChange={(e: any)=>setCustomPromptText(e.target.value)} placeholder={t.customPromptPlaceholder} className={`w-full p-3 rounded-xl text-sm outline-none border transition-all resize-none ${inputBg}`} rows={2}></textarea>
                       <div className="flex justify-end mt-2">
                         <button onClick={handleSavePrompt} disabled={isSavingPrompt} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${isDark ? 'bg-[#06AFCE] hover:bg-[#06C6EA] text-white' : 'bg-[#cff3fa] hover:bg-[#a0e9f6] text-[#058fac]'}`}>
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

                    <div className={`flex-1 p-5 rounded-2xl border ${isDark ? 'bg-[#021a20]/20 border-[#04303d]/30' : 'bg-[#e8fafd]/50 border-[#cff3fa]'} flex flex-col justify-between relative`}>
                      <div>
                        <div className="flex justify-between items-start mb-4 gap-2 border-b border-[#06C6EA]/10 pb-3">
                          <h4 className={`text-xs font-black flex items-center gap-2 mt-1 ${isDark ? 'text-[#67e2f5]' : 'text-[#06AFCE]'}`}>
                            <Bot size={16} /> {t.aiReplyTitle}
                          </h4>
                          <div>
                            {review.status === 'published' ? (
                              <span className="text-xs font-bold text-[#06AFCE] bg-[#06C6EA]/20 px-2.5 py-1.5 rounded-lg border border-[#06C6EA]/30 flex items-center gap-1.5 whitespace-nowrap">
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

                      <div className={`mt-4 pt-4 border-t ${isDark ? 'border-slate-800/80' : 'border-[#06C6EA]/10'} flex flex-col md:flex-row gap-3 items-start md:items-center justify-between`}>
                        <div className="flex items-center gap-3">
                          <div className={`text-[42px] drop-shadow-md ${t.dir === 'rtl' ? 'ml-1' : 'mr-1'}`}>
                            {aiEmployeeAvatar}
                          </div>
                          <div className="flex flex-col justify-center gap-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-black text-[#06C6EA] dark:text-[#67e2f5]">{aiEmployeeName}</span>
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
                          <button className="flex-1 bg-[#06AFCE] hover:bg-[#06C6EA] text-white py-2 rounded-xl text-sm font-bold transition-all">{t.approvePublish}</button>
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
  const [hasStudio, setHasStudio] = useState(true);
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
    } else if (urlParams.get('tk_connected') === 'false') {
      setIsTkConnected(false);
      setIsSettingsOpen(true);
      setActiveTab('connections');
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
        if (data.feat_studio !== undefined && data.feat_studio !== null) setHasStudio(data.feat_studio);

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
    return <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#0b1121]' : 'bg-slate-50'}`}><Loader2 className="animate-spin text-[#06C6EA]" size={40} /></div>;
  }

  if (userStatus === 'pending') {
    return <PendingScreen isDark={isDark} t={t} checkStatus={handleRefreshStatus} isChecking={isCheckingStatus} />;
  }

  const mainBg = isDark ? 'bg-[#0b1121]' : 'bg-slate-50';
  const textMain = isDark ? 'text-white' : 'text-slate-900';
  const panelBg = isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/80 border-slate-200 shadow-2xl';
  const inputBg = isDark ? 'bg-slate-950/50 border-slate-700/80 text-white focus:bg-slate-900 focus:border-[#426CEA]/50' : 'bg-white border-slate-300 text-slate-900 focus:border-[#426CEA]/50';
  const optionClass = isDark ? 'bg-[#0f172a] text-slate-200 font-medium' : 'bg-white text-slate-900 font-medium';
  const labelColor = isDark ? 'text-slate-300' : 'text-slate-700';

  return (
    <div className={`flex min-h-screen transition-colors duration-500 font-sans relative ${mainBg}`} dir={t.dir}>

      {/* خلفية الهوية البصرية (SmartFlow Brand) - تظهر فقط بالوضع الداكن وبشفافية خافتة 🚀 */}
      {isDark && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/smartflow-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.2,
          }}
        />
      )}
      
      {isSidebarVisible && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarVisible(false)} />
      )}

      <aside className={`fixed top-0 bottom-0 ${t.dir === 'rtl' ? 'right-0 border-l' : 'left-0 border-r'} w-64 z-50 transition-transform duration-300 transform ${isSidebarVisible ? 'translate-x-0' : (t.dir === 'rtl' ? 'translate-x-full' : '-translate-x-full')} ${isDark ? 'bg-transparent border-white/10 backdrop-blur-sm' : 'bg-white border-slate-200'}`}>
        
        <div className="p-6 border-b border-inherit flex justify-center items-center relative">
          <button onClick={() => setIsSidebarVisible(false)} className={`absolute top-4 ${t.dir === 'rtl' ? 'left-4' : 'right-4'} md:hidden p-1.5 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}>
            <X size={18} />
          </button>
          
          <div className="flex justify-center items-center w-full mt-2 mb-2">
            <div className="relative rounded-2xl p-1 bg-gradient-to-r from-[#06C6EA] to-[#426CEA] animate-pulse shadow-[0_0_20px_rgba(66,108,234,0.5)] w-full text-center">
               <div className={`px-4 py-3 rounded-xl ${isDark ? 'bg-[#0f172a]' : 'bg-white'}`}>
                 <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#06C6EA] to-[#426CEA] tracking-tight">
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
            <button onClick={() => { setActiveView('calendar'); if(window.innerWidth < 768) setIsSidebarVisible(false); }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeView === 'calendar' ? (isDark ? 'bg-[#426CEA]/10 text-[#8fa6f3] border border-[#426CEA]/20' : 'bg-[#eef1fd] text-[#3557d1] border border-[#c3d0fa]') : (isDark ? 'text-slate-400 hover:bg-slate-800 border border-transparent' : 'text-slate-600 hover:bg-slate-100 border border-transparent')}`}>
              <CalendarRange size={20} className={activeView === 'calendar' ? 'text-[#426CEA]' : ''} /> 
              {t.calendarTab}
            </button>
          )}

          {(hasStudio || userRole === 'admin') && (
            <button onClick={() => { setActiveView('studio'); if(window.innerWidth < 768) setIsSidebarVisible(false); }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeView === 'studio' ? (isDark ? 'bg-[#06C6EA]/10 text-[#67e2f5] border border-[#06C6EA]/20' : 'bg-cyan-50 text-cyan-700 border border-cyan-200') : (isDark ? 'text-slate-400 hover:bg-slate-800 border border-transparent' : 'text-slate-600 hover:bg-slate-100 border border-transparent')}`}>
              <Star size={20} className={activeView === 'studio' ? 'text-[#06C6EA]' : ''} /> 
              {t.studioTab}
            </button>
          )}

          {/* ===================== القسم الجديد ===================== */}
          <button onClick={() => { setActiveView('socialHub'); if(window.innerWidth < 768) setIsSidebarVisible(false); }} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold transition-all relative group overflow-hidden border ${activeView === 'socialHub' ? (isDark ? 'bg-[#426CEA]/10 text-[#8fa6f3] border-[#426CEA]/20' : 'bg-[#eef1fd] text-[#3557d1] border-[#c3d0fa]') : (isDark ? 'text-slate-400 hover:bg-slate-800 hover:border-slate-700 border-transparent' : 'text-slate-600 hover:bg-slate-100 hover:border-slate-200 border-transparent')}`}>
              <div className="flex items-center gap-3 w-full">
                <Smartphone size={20} className={activeView === 'socialHub' ? 'text-[#426CEA] shrink-0' : 'group-hover:text-[#426CEA] transition-colors shrink-0'} /> 
                <span className="truncate flex-1 text-right">{t.socialHubTab}</span>
              </div>
          </button>
          {/* ======================================================== */}

          {(hasReviews || userRole === 'admin') && (
            <button onClick={() => { setActiveView('reviews'); if(window.innerWidth < 768) setIsSidebarVisible(false); }} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold transition-all relative group overflow-hidden border ${activeView === 'reviews' ? (isDark ? 'bg-[#06C6EA]/10 text-[#67e2f5] border-[#06C6EA]/20' : 'bg-cyan-50 text-cyan-700 border-cyan-200') : (isDark ? 'text-slate-400 hover:bg-slate-800 hover:border-slate-700 border-transparent' : 'text-slate-600 hover:bg-slate-100 hover:border-slate-200 border-transparent')}`}>
              <div className="flex items-center gap-3 w-full">
                <MessageCircle size={20} className={activeView === 'reviews' ? 'text-[#06C6EA] shrink-0' : 'group-hover:text-[#06C6EA] transition-colors shrink-0'} /> 
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
                  <Settings className="text-[#06C6EA]" size={20} /> {t.settings}
                </h3>
                <button onClick={() => setIsSettingsOpen(false)} className={`p-2 rounded-full transition ${isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'}`}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                <div className={`w-full md:w-1/3 p-4 flex flex-col gap-2 overflow-y-auto border-b md:border-b-0 ${t.dir === 'rtl' ? 'md:border-l' : 'md:border-r'} ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-100 bg-slate-50/50'}`}>
                  <button onClick={() => setActiveTab('general')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'general' ? (isDark ? 'bg-[#06C6EA]/20 text-[#67e2f5]' : 'bg-[#e8fafd] text-[#06AFCE]') : (isDark ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' : 'text-slate-600 hover:bg-slate-100')}`}><Sliders size={18} /> {t.tabGeneral}</button>
                  <button onClick={() => setActiveTab('billing')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'billing' ? (isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-50 text-yellow-600') : (isDark ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' : 'text-slate-600 hover:bg-slate-100')}`}><CreditCard size={18} /> {t.tabBilling}</button>
                  <button onClick={() => setActiveTab('connections')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'connections' ? (isDark ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-50 text-pink-600') : (isDark ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' : 'text-slate-600 hover:bg-slate-100')}`}><Globe size={18} /> {t.tabConnections}</button>
                  <button onClick={() => setActiveTab('security')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'security' ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-600') : (isDark ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' : 'text-slate-600 hover:bg-slate-100')}`}><Shield size={18} /> {t.tabSecurity}</button>
                </div>

                <div className="w-full md:w-2/3 p-6 overflow-y-auto flex-1 space-y-6">
                  {activeTab === 'general' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="space-y-3">
                        <label className={`text-sm font-bold flex items-center gap-2 ${labelColor}`}><Globe size={16} className="text-[#67e2f5]"/> {t.langUi}</label>
                        <select value={langCode} onChange={(e: any) => setLangCode(e.target.value)} className={`w-full border rounded-xl px-4 py-3 outline-none ${isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}>
                          <option className={optionClass} value="ar">العربية (Arabic)</option>
                          <option className={optionClass} value="en">English (الإنجليزية)</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className={`text-sm font-bold flex items-center gap-2 ${labelColor}`}><Palette size={16} className="text-pink-400"/> {t.theme}</label>
                        <div className="flex gap-3">
                          <button onClick={() => setTheme('dark')} className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all ${theme === 'dark' ? 'bg-[#3557d1]/20 border-[#426CEA] text-[#8fa6f3]' : isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-300 text-slate-500'}`}>{t.dark}</button>
                          <button onClick={() => setTheme('light')} className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all ${theme === 'light' ? 'bg-[#3557d1]/10 border-[#426CEA] text-[#3557d1]' : isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-300 text-slate-500'}`}>{t.light}</button>
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
                          <Globe size={16} className="text-[#06C6EA]"/> {t.socialAuth}
                        </label>
                        <div className={`p-4 rounded-xl border flex gap-3 items-start ${isDark ? 'bg-[#06C6EA]/10 border-[#06C6EA]/20' : 'bg-[#e8fafd] border-[#cff3fa]'}`}>
                          <Info size={20} className={`mt-0.5 shrink-0 ${isDark ? 'text-[#67e2f5]' : 'text-[#06AFCE]'}`} />
                          <p className={`text-sm leading-relaxed font-medium ${isDark ? 'text-[#7fe3f2]' : 'text-[#056f85]'}`}>
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
                              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-black text-white shadow-md overflow-hidden">
                                <img src={SOCIAL_PROVIDER_META.tiktok.iconImage} alt="TikTok" className="w-8 h-8 object-contain" />
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

        {activeView === 'studio' && (hasStudio || userRole === 'admin') && (
          <>
            <div className={`relative z-10 backdrop-blur-2xl p-6 sm:p-10 rounded-[2.5rem] border w-full max-w-xl mx-auto mt-4 transition-colors duration-500 ${panelBg}`}>
              <div className="text-center mb-10">
                <span className="inline-block py-1 px-3 rounded-full bg-[#06C6EA]/10 text-[#06C6EA] text-xs font-bold mb-4 border border-[#06C6EA]/20">{t.badge}</span>
                <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#06C6EA] to-[#426CEA] mb-3 drop-shadow-xl">{t.appTitle}</h1>
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
                  <div className={`p-5 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-300 space-y-4 ${isDark ? 'bg-[#16234f]/10 border-[#426CEA]/20' : 'bg-[#eef1fd] border-[#dbe3fb]'}`}>
                    <h3 className={`text-sm font-black mb-3 flex items-center gap-2 ${isDark ? 'text-[#a6b9f7]' : 'text-[#2c47ab]'}`}>{t.visualOptionsTitle}</h3>
                    
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
                  <div className={`p-5 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-300 space-y-4 ${isDark ? 'bg-[#04303d]/10 border-[#06C6EA]/20' : 'bg-[#e8fafd] border-[#cff3fa]'}`}>
                    <h3 className={`text-sm font-black mb-3 flex items-center gap-2 ${isDark ? 'text-[#7fe3f2]' : 'text-[#058fac]'}`}>{t.textOptionsTitle}</h3>
                    
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
                    <div className={`relative border-2 border-dashed rounded-2xl p-4 transition-all ${imagePreview ? 'border-[#426CEA]/50 bg-[#426CEA]/5' : isDark ? 'border-slate-700 hover:border-slate-500 bg-slate-900/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'}`}>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      {imagePreview ? (
                        <div className="flex items-center gap-4">
                          <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-xl shadow-md border border-slate-200/20" />
                          <div className="flex-1">
                            <p className={`text-sm font-bold ${textMain}`}>{imageFile?.name}</p>
                            <p className={`text-xs mt-1 ${isDark ? 'text-[#67e2f5]' : 'text-[#06AFCE]'}`}>{t.changeImage}</p>
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
                    <button type="button" onClick={() => setIsAiAssistOpen(!isAiAssistOpen)} className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${isAiAssistOpen ? 'bg-[#426CEA] text-white' : 'text-[#426CEA] bg-[#426CEA]/10 hover:bg-[#426CEA]/20'}`}>
                        <Wand2 size={14}/> {t.aiAssistBtn}
                    </button>
                  </div>
                  
                  {isAiAssistOpen && (
                    <div className={`p-4 mb-4 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-[#426CEA]/30' : 'bg-[#eef1fd]/50 border-[#c3d0fa]'} animate-in fade-in slide-in-from-top-2`}>
                        <p className={`text-xs font-bold mb-3 ${isDark ? 'text-[#8fa6f3]' : 'text-[#2c47ab]'}`}>{t.aiAssistDesc}</p>
                        <div className="flex flex-col sm:flex-row gap-2 mb-3">
                            <input type="text" value={rawIdea} onChange={(e: any)=>setRawIdea(e.target.value)} placeholder={t.aiAssistPlaceholder} className={`flex-1 px-3 py-2 text-sm rounded-xl outline-none border ${inputBg}`} />
                            <button type="button" onClick={handleGeneratePrompt} disabled={isGeneratingPrompt} className="bg-[#3557d1] hover:bg-[#426CEA] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 whitespace-nowrap transition-colors">
                                {isGeneratingPrompt ? <Loader2 size={14} className="animate-spin" /> : <Bot size={14} />}
                                {t.aiAssistGenerate}
                            </button>
                        </div>
                        {generatedPrompt && (
                            <>
                                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} mb-3`}>
                                    <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-white' : 'text-slate-900'}`}>{generatedPrompt}</p>
                                </div>
                                <button type="button" onClick={handleApplyPrompt} className="w-full bg-[#06AFCE] hover:bg-[#06C6EA] text-white px-4 py-2 rounded-xl text-sm font-bold flex justify-center items-center gap-2 transition-colors">
                                    <CheckCircle2 size={16}/> {t.aiAssistApply}
                                </button>
                            </>
                        )}
                    </div>
                  )}

                  <textarea value={prompt} onChange={(e: any) => setPrompt(e.target.value)} required className={`w-full px-5 py-4 border rounded-2xl outline-none resize-none leading-relaxed transition-all ${inputBg}`} rows={4} placeholder={t.ideaPlaceholder}></textarea>
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={isSubmitting} className="relative w-full group overflow-hidden py-4 px-6 rounded-2xl bg-gradient-to-r from-[#06AFCE] to-[#3557d1] hover:from-[#06C6EA] hover:to-[#426CEA] text-white font-black text-lg shadow-[0_10px_40px_-10px_rgba(6,198,234,0.5)] hover:shadow-[0_10px_50px_-10px_rgba(6,198,234,0.7)] transform active:scale-[0.98] transition-all duration-300 disabled:opacity-50">
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
