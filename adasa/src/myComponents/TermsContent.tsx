import { AlertTriangle, X, Mail } from "lucide-react"

export default function TermsContent() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-16 text-right font-sans text-gray-300">
      <div className="mx-auto flex max-w-4xl flex-col gap-12 text-base sm:text-lg">
        {/* Top Notice Box */}
        <div className="mx-auto max-w-4xl p-4" dir="rtl">
          <div className="flex justify-between gap-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6 shadow-lg">
            <div className="mt-1 shrink-0 text-amber-400">
              <AlertTriangle size={24} />
            </div>

            <div className="text-right">
              <h3 className="mb-1 text-lg font-bold text-amber-400">
                إشعار مهم
              </h3>
              <p className="text-base leading-relaxed text-amber-200/90">
                يرجى قراءة شروط الخدمة هذه بعناية قبل استخدام موقعنا. بالوصول أو
                استخدام عدسة، فإنك توافق على الالتزام بهذه الشروط.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: الموافقة على الشروط */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6100] text-base font-bold text-white">
              1
            </span>
            <h2 className="text-2xl font-bold text-white">
              الموافقة على الشروط
            </h2>
          </div>
          <p className="pr-11 leading-relaxed text-gray-400">
            بالوصول أو استخدام عدسة، فإنك توافق على الالتزام بشروط الخدمة هذه
            وجميع القوانين واللوائح المعمول بها. إذا لم توافق على أي من هذه
            الشروط، فأنت ممنوع من استخدام هذا الموقع أو الوصول إليه.
          </p>
        </div>

        {/* Section 2: رخصة الاستخدام */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6100] text-base font-bold text-white">
              2
            </span>
            <h2 className="text-2xl font-bold text-white">رخصة الاستخدام</h2>
          </div>
          <p className="pr-11 leading-relaxed text-gray-400">
            يُمنح الإذن للوصول المؤقت إلى المواد على موقع عدسة للعرض الشخصي غير
            التجاري فقط. هذا منح ترخيص وليس نقل ملكية.
          </p>
          <p className="mt-1 pr-11 font-semibold text-gray-300">
            بموجب هذا الترخيص لا يجوز لك:
          </p>
          <div className="flex flex-col gap-2.5 pr-11 text-gray-400">
            <div className="flex items-center gap-2.5">
              <X size={18} className="text-red-500" /> تعديل أو نسخ المواد
            </div>
            <div className="flex items-center gap-2.5">
              <X size={18} className="text-red-500" /> استخدام المواد لأي غرض
              تجاري أو للعرض العام
            </div>
            <div className="flex items-center gap-2.5">
              <X size={18} className="text-red-500" /> محاولة فك أو عكس هندسة أي
              برنامج على الموقع
            </div>
            <div className="flex items-center gap-2.5">
              <X size={18} className="text-red-500" /> إزالة أي حقوق نشر أو
              علامات ملكية من المواد
            </div>
            <div className="flex items-center gap-2.5">
              <X size={18} className="text-red-500" /> نقل المواد إلى شخص آخر أو
              نسخها على أي خادم آخر
            </div>
          </div>
        </div>

        {/* Section 3: إخلاء المسؤولية */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6100] text-base font-bold text-white">
              3
            </span>
            <h2 className="text-2xl font-bold text-white">إخلاء المسؤولية</h2>
          </div>
          <p className="pr-11 leading-relaxed text-gray-400">
            المواد الموجودة على موقع عدسة مقدمة على أساس "كما هي". عدسة لا يقدم
            أي ضمانات، صريحة أو ضمنية، ويخلي مسؤوليته من جميع الضمانات الأخرى.
          </p>
        </div>

        {/* Section 4: القيود */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6100] text-base font-bold text-white">
              4
            </span>
            <h2 className="text-2xl font-bold text-white">القيود</h2>
          </div>
          <p className="pr-11 leading-relaxed text-gray-400">
            في أي حال من الأحوال، لن يكون عدسة أو مورديه مسؤولين عن أي أضرار
            ناتجة عن استخدام أو عدم القدرة على استخدام المواد على الموقع.
          </p>
        </div>

        {/* Section 5: محتوى المستخدم */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6100] text-base font-bold text-white">
              5
            </span>
            <h2 className="text-2xl font-bold text-white">محتوى المستخدم</h2>
          </div>
          <p className="pr-11 leading-relaxed text-gray-400">
            إذا نشرت محتوى على موقعنا (مثل التعليقات)، فإنك تمنحنا ترخيصاً غير
            حصري وعالمي ومجاني لاستخدام هذا المحتوى وإعادة إنتاجه وتعديله
            وتوزيعه.
          </p>
          <p className="mt-1 pr-11 font-semibold text-gray-300">
            يجب ألا يكون محتواك:
          </p>
          <div className="flex flex-col gap-2.5 pr-11 text-gray-400">
            <div className="flex items-center gap-2.5">
              <X size={18} className="text-red-500" /> أن يكون تشهيرياً أو
              فاحشاً أو مسيئاً
            </div>
            <div className="flex items-center gap-2.5">
              <X size={18} className="text-red-500" /> انتهاك حقوق الملكية
              الفكرية للآخرين
            </div>
            <div className="flex items-center gap-2.5">
              <X size={18} className="text-red-500" /> احتواء فيروسات أو أكواد
              ضارة
            </div>
            <div className="flex items-center gap-2.5">
              <X size={18} className="text-red-500" /> انتهاك أي قوانين أو لوائح
              معمول بها
            </div>
            <div className="flex items-center gap-2.5">
              <X size={18} className="text-red-500" /> الإعلان عن منتجات أو
              خدمات غير مصرح بها
            </div>
          </div>
        </div>

        {/* Section 6: التعديلات */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6100] text-base font-bold text-white">
              6
            </span>
            <h2 className="text-2xl font-bold text-white">التعديلات</h2>
          </div>
          <p className="pr-11 leading-relaxed text-gray-400">
            قد يراجع عدسة شروط الخدمة هذه في أي وقت دون إشعار. باستخدام هذا
            الموقع، فإنك توافق على الالتزام بالنسخة الحالية من شروط الخدمة.
          </p>
        </div>

        {/* Section 7: معلومات الاتصال */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6100] text-base font-bold text-white">
              7
            </span>
            <h2 className="text-2xl font-bold text-white">معلومات الاتصال</h2>
          </div>
          <p className="pr-11 text-gray-400">
            إذا كان لديك أي أسئلة حول شروط الخدمة هذه، يرجى التواصل معنا:
          </p>
          <div className="flex items-center gap-2.5 pr-11 font-medium text-[#FF6100]">
            <Mail size={20} />
            <span>hello@adasah.com</span>
          </div>
        </div>

        {/* Footer Bottom Note */}
        <div className="mt-6 border-t border-neutral-800 pt-8 text-center text-sm text-gray-500">
          باستخدام موقعنا، فإنك توافق على شروط الخدمة هذه. انظر أيضاً{" "}
          <a href="/privacy" className="text-[#FF6100] hover:underline">
            سياسة الخصوصية
          </a>
          .
        </div>
      </div>
    </section>
  )
}
