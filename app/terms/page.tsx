import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Check Local First',
  description: 'Read the Terms of Service for Check Local First, the local business directory for Reno, Nevada.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | Check Local First',
    description: 'Read the Terms of Service for Check Local First, the local business directory for Reno, Nevada.',
    type: 'website',
    url: '/terms',
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] pt-24 pb-16 px-5">
      <div className="mx-auto max-w-3xl">

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3a6e3f]">Legal</p>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-[#1a1a1a]">Terms of Service</h1>
        <p className="mb-8 text-sm text-[#888]">Last updated: June 13, 2025</p>

        <p className="mb-4 leading-relaxed text-[#444]">
          Welcome to CheckLocalFirst. By accessing or using our website at checklocalfirst.com, you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). Please read them carefully.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 1 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-[#1a1a1a]">1. About CheckLocalFirst</h2>
        <p className="mb-4 leading-relaxed text-[#444]">
          CheckLocalFirst is a local business directory platform connecting people in the Reno, Nevada area with locally owned small businesses. We provide a platform for businesses to list their services and for locals to discover them.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 2 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-[#1a1a1a]">2. Acceptance of Terms</h2>
        <p className="mb-4 leading-relaxed text-[#444]">
          By creating an account or using the platform in any way, you confirm that you are at least 18 years old and agree to these Terms. If you do not agree, do not use the platform.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 3 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-[#1a1a1a]">3. User Accounts</h2>

        <h3 className="mb-2 mt-6 text-base font-semibold text-[#1a1a1a]">Creating an account</h3>
        <p className="mb-4 leading-relaxed text-[#444]">
          You may sign up as a general user or as a business owner. You agree to provide accurate, current, and complete information during registration and to keep your account information up to date.
        </p>

        <h3 className="mb-2 mt-6 text-base font-semibold text-[#1a1a1a]">Account security</h3>
        <p className="mb-4 leading-relaxed text-[#444]">
          You are responsible for maintaining the confidentiality of your password and for all activity that occurs under your account. Notify us immediately at{' '}
          <a href="mailto:thenestreno@gmail.com" className="text-[#3a6e3f] hover:underline">thenestreno@gmail.com</a>{' '}
          if you suspect unauthorized access to your account.
        </p>

        <h3 className="mb-2 mt-6 text-base font-semibold text-[#1a1a1a]">One business per account</h3>
        <p className="mb-4 leading-relaxed text-[#444]">
          Business accounts are limited to one business listing per account. If you own multiple businesses, please contact us.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 4 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-[#1a1a1a]">4. Business Listings</h2>

        <h3 className="mb-2 mt-6 text-base font-semibold text-[#1a1a1a]">Eligibility</h3>
        <p className="mb-3 leading-relaxed text-[#444]">To list a business on CheckLocalFirst, your business must:</p>
        <ul className="mb-4 list-disc list-inside space-y-1 leading-relaxed text-[#444]">
          <li>Be locally owned and operated in the Reno, Nevada area</li>
          <li>Be a legitimate, legally operating business</li>
          <li>Be owned or operated by the person creating the listing</li>
        </ul>

        <h3 className="mb-2 mt-6 text-base font-semibold text-[#1a1a1a]">Accuracy</h3>
        <p className="mb-4 leading-relaxed text-[#444]">
          You are solely responsible for the accuracy of your business listing, including your business name, address, phone number, email, description, and services. We reserve the right to remove listings that contain false or misleading information.
        </p>

        <h3 className="mb-2 mt-6 text-base font-semibold text-[#1a1a1a]">Public visibility</h3>
        <p className="mb-4 leading-relaxed text-[#444]">
          All business listing information you submit is publicly visible on the platform. Do not include any information you wish to keep private.
        </p>

        <h3 className="mb-2 mt-6 text-base font-semibold text-[#1a1a1a]">Prohibited listings</h3>
        <p className="mb-3 leading-relaxed text-[#444]">You may not list businesses that are:</p>
        <ul className="mb-4 list-disc list-inside space-y-1 leading-relaxed text-[#444]">
          <li>Illegal or operating in violation of applicable laws</li>
          <li>Fraudulent or misrepresenting their services</li>
          <li>Not genuinely locally owned and operated</li>
        </ul>

        <hr className="my-8 border-t border-black/10" />

        {/* 5 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-[#1a1a1a]">5. User Conduct</h2>
        <p className="mb-3 leading-relaxed text-[#444]">You agree not to:</p>
        <ul className="mb-4 list-disc list-inside space-y-1 leading-relaxed text-[#444]">
          <li>Use the platform for any unlawful purpose</li>
          <li>Post false, misleading, or defamatory content</li>
          <li>Attempt to gain unauthorized access to any part of the platform</li>
          <li>Scrape, crawl, or otherwise extract data from the platform without permission</li>
          <li>Impersonate another person or business</li>
          <li>Interfere with or disrupt the platform or its servers</li>
        </ul>

        <hr className="my-8 border-t border-black/10" />

        {/* 6 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-[#1a1a1a]">6. Intellectual Property</h2>
        <p className="mb-4 leading-relaxed text-[#444]">
          All content on CheckLocalFirst that is not user-submitted — including the site design, logo, copy, and code — is owned by CheckLocalFirst and may not be copied, reproduced, or used without our written permission.
        </p>
        <p className="mb-4 leading-relaxed text-[#444]">
          By submitting a business listing or other content to the platform, you grant CheckLocalFirst a non-exclusive, royalty-free license to display and promote that content on the platform.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 7 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-[#1a1a1a]">7. Account &amp; Listing Termination</h2>
        <p className="mb-4 leading-relaxed text-[#444]">
          You may delete your account and business listing at any time through your dashboard. Upon deletion, your listing and associated data will be permanently removed.
        </p>
        <p className="mb-4 leading-relaxed text-[#444]">
          We reserve the right to suspend or terminate any account that violates these Terms, without prior notice.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 8 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-[#1a1a1a]">8. Premium Tiers</h2>
        <p className="mb-4 leading-relaxed text-[#444]">
          We currently offer the platform for free. We plan to introduce optional premium tiers for both businesses and users in the future. If and when premium plans are introduced, we will provide clear information about pricing, features, and billing terms. Free accounts will not be automatically converted to paid accounts.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 9 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-[#1a1a1a]">9. Disclaimers</h2>
        <p className="mb-3 leading-relaxed text-[#444]">
          CheckLocalFirst is provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee that:
        </p>
        <ul className="mb-4 list-disc list-inside space-y-1 leading-relaxed text-[#444]">
          <li>The platform will be available at all times or error-free</li>
          <li>Business listings are accurate or up to date</li>
          <li>Any business listed on the platform will meet your expectations</li>
        </ul>
        <p className="mb-4 leading-relaxed text-[#444]">
          We are a directory platform and are not responsible for the products, services, or conduct of any business listed on the site.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 10 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-[#1a1a1a]">10. Limitation of Liability</h2>
        <p className="mb-4 leading-relaxed text-[#444]">
          To the fullest extent permitted by law, CheckLocalFirst shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, even if we have been advised of the possibility of such damages.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 11 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-[#1a1a1a]">11. Changes to These Terms</h2>
        <p className="mb-4 leading-relaxed text-[#444]">
          We may update these Terms from time to time. When we do, we will update the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the platform after changes are posted constitutes your acceptance of the updated Terms.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 12 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-[#1a1a1a]">12. Governing Law</h2>
        <p className="mb-4 leading-relaxed text-[#444]">
          These Terms are governed by the laws of the State of Nevada, without regard to its conflict of law provisions.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 13 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-[#1a1a1a]">13. Contact Us</h2>
        <p className="mb-4 leading-relaxed text-[#444]">
          If you have any questions about these Terms, please contact us at:
        </p>
        <div className="rounded-xl border border-black/10 bg-white px-6 py-5 text-sm text-[#444]">
          <p className="mb-1 font-semibold text-[#1a1a1a]">CheckLocalFirst</p>
          <p>
            Email:{' '}
            <a href="mailto:thenestreno@gmail.com" className="text-[#3a6e3f] hover:underline">
              thenestreno@gmail.com
            </a>
          </p>
          <p>
            Website:{' '}
            <Link href="/" className="text-[#3a6e3f] hover:underline">
              checklocalfirst.com
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}
