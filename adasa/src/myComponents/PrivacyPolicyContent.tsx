import { ShieldCheck, CheckCircle2, Mail } from "lucide-react"

export default function PrivacyPolicyContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-16 text-right font-sans text-gray-300">
        <div className="mx-auto flex max-w-4xl flex-col gap-12">
          {/* Top Banner Box */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#FF6100]/30 bg-[#161616] p-6 shadow-lg">
            <div className="mt-1 text-[#FF6100]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="mb-1 text-base font-bold text-white">
                خصوصيتك تهمنا
              </h3>
              <p className="text-sm text-gray-400">
                نحن ملتزمون بحماية معلوماتك الشخصية والشفافية بشأن ما
                نكمعه[cite: 10].
              </p>
            </div>
          </div>

          {/* Section 1: مقدمة */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF6100] text-sm font-bold text-white">
                1
              </span>
              <h2 className="text-xl font-bold text-white">مقدمة</h2>
            </div>
            <p className="pr-10 text-sm leading-relaxed text-gray-400 sm:text-base">
              مرحباً بك في عدسة. نحن نحترم خصوصيتك وملتزمون بحماية بياناتك
              الشخصية. ستعلمك سياسة الخصوصية هذه بكيفية العناية ببياناتك الشخصية
              عند زيارة موقعنا وتخبرك عن حقوق الخصوصية الخاصة بك[cite: 10].
            </p>
          </div>

          {/* Section 2: المعلومات التي نجمعها */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF6100] text-sm font-bold text-white">
                2
              </span>
              <h2 className="text-xl font-bold text-white">
                المعلومات التي نجمعها
              </h2>
            </div>
            <div className="flex flex-col gap-2 pr-10 text-sm sm:text-base">
              <p className="text-gray-400">
                <strong className="text-white">بيانات الهوية:</strong> تشمل
                الاسم الأول، الاسم الأخير، اسم المستخدم أو معرف مشابه[cite: 10].
              </p>
              <p className="text-gray-400">
                <strong className="text-white">بيانات الاتصال:</strong> تشمل
                عنوان البريد الإلكتروني[cite: 10].
              </p>
              <p className="text-gray-400">
                <strong className="text-white">البيانات التقنية:</strong> تشمل
                عنوان IP، نوع المتصفح، المنطقة الزمنية، ونظام التشغيل[cite: 10].
              </p>
              <p className="text-gray-400">
                <strong className="text-white">بيانات الاستخدام:</strong> تشمل
                معلومات حول كيفية استخدامك لموقعنا وخدماتنا[cite: 10].
              </p>
            </div>
          </div>

          {/* Section 3: كيف نستخدم معلوماتك */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF6100] text-sm font-bold text-white">
                3
              </span>
              <h2 className="text-xl font-bold text-white">
                كيف نستخدم معلوماتك
              </h2>
            </div>
            <div className="flex flex-col gap-2.5 pr-10 text-sm text-gray-400 sm:text-base">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#FF6100]" /> لتقديم
                خدمتنا والحفاظ عليها[cite: 10]
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#FF6100]" /> لإخطارك
                بالتغييرات في خدمتنا[cite: 10]
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#FF6100]" /> لتقديم دعم
                العملاء[cite: 10]
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#FF6100]" /> لجمع
                تحليلات أو معلومات قيمة لتحسين خدمتنا[cite: 10]
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#FF6100]" /> لمراقبة
                استخدام خدمتنا[cite: 10]
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#FF6100]" /> لاكتشاف
                ومنع ومعالجة المشاكل التقنية[cite: 10]
              </div>
            </div>
          </div>

          {/* Section 4: ملفات تعريف الارتباط */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF6100] text-sm font-bold text-white">
                4
              </span>
              <h2 className="text-xl font-bold text-white">
                ملفات تعريف الارتباط
              </h2>
            </div>
            <p className="pr-10 text-sm leading-relaxed text-gray-400 sm:text-base">
              نستخدم ملفات تعريف الارتباط وتقنيات التتبع المشابهة لتتبع النشاط
              على موقعنا. يمكنك توجيه متصفحك لرفض جميع ملفات تعريف الارتباط أو
              للإشارة عند إرسال ملف تعريف ارتباط. ومع ذلك، إذا لم تقبل ملفات
              تعريف الارتباط، فقد لا تتمكن من استخدام بعض أجزاء موقعنا[cite:
              10].
            </p>
          </div>

          {/* Section 5: أمان البيانات */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF6100] text-sm font-bold text-white">
                5
              </span>
              <h2 className="text-xl font-bold text-white">أمان البيانات</h2>
            </div>
            <p className="pr-10 text-sm leading-relaxed text-gray-400 sm:text-base">
              لقد وضعنا تدابير أمنية مناسبة لمنع فقدان بياناتك الشخصية أو
              استخدامها أو الوصول إليها بشكل غير مصرح به عن طريق الخطأ. نحن تحد
              الوصول إلى بياناتك الشخصية لأولئك الذين لديهم حاجة عملية
              للمعرفة[cite: 10].
            </p>
          </div>

          {/* Section 6: حقوقك */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF6100] text-sm font-bold text-white">
                6
              </span>
              <h2 className="text-xl font-bold text-white">حقوقك</h2>
            </div>
            <div className="flex flex-col gap-2.5 pr-10 text-sm text-gray-400 sm:text-base">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#FF6100]" /> طلب الوصول
                إلى بياناتك الشخصية[cite: 10]
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#FF6100]" /> طلب تصحيح
                بياناتك الشخصية[cite: 10]
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#FF6100]" /> طلب مسح
                بياناتك الشخصية[cite: 10]
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#FF6100]" /> الاعتراض
                على معالجة بياناتك الشخصية[cite: 10]
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#FF6100]" /> طلب تقييد
                معالجة بياناتك الشخصية[cite: 10]
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#FF6100]" /> الحق في
                سحب الموافقة[cite: 10]
              </div>
            </div>
          </div>

          {/* Section 7: تواصل معنا */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF6100] text-sm font-bold text-white">
                7
              </span>
              <h2 className="text-xl font-bold text-white">تواصل معنا</h2>
            </div>
            <p className="pr-10 text-sm text-gray-400 sm:text-base">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل
              معنا[cite: 10]:
            </p>
            <div className="flex items-center gap-2 pr-10 text-sm font-medium text-[#FF6100] sm:text-base">
              <Mail size={18} />
              <span>hello@adasah.com</span>[cite: 10]
            </div>
          </div>

          {/* Footer Bottom Note */}
          <div className="mt-6 border-t border-neutral-800 pt-8 text-center text-xs text-gray-500">
            باستخدام موقعنا، فإنك توافق على سياسة الخصوصية هذه. انظر أيضاً{" "}
            <a href="/terms" className="text-[#FF6100] hover:underline">
              شروط الخدمة
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
