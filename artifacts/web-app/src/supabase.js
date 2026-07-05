import { createClient } from '@supabase/supabase-js';

// رابط قاعدة بياناتك الصحيح
const supabaseUrl = 'https://hjwbmmwrswvaohrmkqpt.supabase.co';

// مفتاح anon public الخاص بك
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqd2JtbXdyc3d2YW9ocm1rcXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MDMzODIsImV4cCI6MjA5ODI3OTM4Mn0.ZLz_Q9HWUxN1d3M_HE4-Hy4vO4tFiD7GobXGNVRr8-I';

export const supabase = createClient(supabaseUrl, supabaseKey);