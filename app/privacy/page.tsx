import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Check Local First',
  description: 'Learn how Check Local First collects, uses, and protects your information on our Reno, Nevada local business directory.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | Check Local First',
    description: 'Learn how Check Local First collects, uses, and protects your information on our Reno, Nevada local business directory.',
    type: 'website',
    url: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-surface pt-24 pb-16 px-5">
      <div className="mx-auto max-w-3xl">

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Legal</p>
        <h1 className="mb-2 text-2xl sm:text-3xl font-bold tracking-tight text-dark">Privacy Policy</h1>
        <p className="mb-8 text-sm text-muted">Last updated: June 13, 2025</p>

        <p className="mb-4 leading-relaxed text-content">
          Welcome to CheckLocalFirst (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit or use our website at checklocalfirst.com.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 1 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-dark">1. Information We Collect</h2>

        <h3 className="mb-2 mt-6 text-base font-semibold text-dark">Information you provide directly</h3>
        <ul className="mb-4 list-disc list-inside space-y-1 leading-relaxed text-content">
          <li><strong>Account registration:</strong> When you sign up as a user or business owner, we collect your first name, last name, email address, phone number, and password.</li>
          <li><strong>Business listing:</strong> When you create a business listing, we collect your business name, description, address, city, state, ZIP code, phone number, and email address.</li>
          <li><strong>Communications:</strong> If you contact us directly, we may collect your name, email address, and the content of your message.</li>
        </ul>

        <h3 className="mb-2 mt-6 text-base font-semibold text-dark">Information collected automatically</h3>
        <ul className="mb-4 list-disc list-inside space-y-1 leading-relaxed text-content">
          <li><strong>Usage data:</strong> We may collect information about how you interact with our site, including pages visited, search queries, and links clicked.</li>
          <li><strong>Device information:</strong> We may collect basic device and browser information to improve site performance.</li>
        </ul>

        <hr className="my-8 border-t border-black/10" />

        {/* 2 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-dark">2. How We Use Your Information</h2>
        <p className="mb-3 leading-relaxed text-content">We use the information we collect to:</p>
        <ul className="mb-4 list-disc list-inside space-y-1 leading-relaxed text-content">
          <li>Create and manage your account</li>
          <li>Display your business listing to users on the platform</li>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Improve and maintain the platform</li>
          <li>Send important account-related communications</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p className="mb-4 leading-relaxed text-content">We do not sell your personal information to third parties.</p>

        <hr className="my-8 border-t border-black/10" />

        {/* 3 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-dark">3. How We Share Your Information</h2>
        <p className="mb-4 leading-relaxed text-content">
          <strong>Business listing information</strong> — Information you submit as part of a business listing (business name, address, phone, email, description, and services) is publicly visible on the platform by design. Do not include information in your listing that you do not want to be public.
        </p>
        <p className="mb-4 leading-relaxed text-content">
          <strong>Service providers</strong> — We use third-party services to operate the platform, including Supabase for database and authentication services. These providers only access your information as necessary to perform services on our behalf.
        </p>
        <p className="mb-4 leading-relaxed text-content">
          <strong>Legal requirements</strong> — We may disclose your information if required to do so by law or in response to valid legal requests.
        </p>
        <p className="mb-4 leading-relaxed text-content">We do not share your personal information with advertisers or marketing companies.</p>

        <hr className="my-8 border-t border-black/10" />

        {/* 4 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-dark">4. Data Retention</h2>
        <p className="mb-4 leading-relaxed text-content">
          We retain your account information for as long as your account is active. If you delete your account, your personal information and business listing will be permanently removed from our platform.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 5 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-dark">5. Security</h2>
        <p className="mb-4 leading-relaxed text-content">
          We take reasonable technical and organizational measures to protect your information. Your account is protected by password authentication managed through Supabase. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 6 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-dark">6. Children&apos;s Privacy</h2>
        <p className="mb-4 leading-relaxed text-content">
          CheckLocalFirst is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us and we will delete it promptly.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 7 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-dark">7. Third-Party Links</h2>
        <p className="mb-4 leading-relaxed text-content">
          Our platform may contain links to other websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 8 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-dark">8. Future Payment Processing</h2>
        <p className="mb-4 leading-relaxed text-content">
          We currently do not collect any payment information. If and when we introduce premium tiers, we will update this Privacy Policy and use a secure, trusted third-party payment processor. We will never store your payment card information directly.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 9 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-dark">9. Your Rights</h2>
        <p className="mb-3 leading-relaxed text-content">You have the right to:</p>
        <ul className="mb-4 list-disc list-inside space-y-1 leading-relaxed text-content">
          <li>Access the personal information we hold about you</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your account and associated data</li>
          <li>Opt out of non-essential communications</li>
        </ul>
        <p className="mb-4 leading-relaxed text-content">
          To exercise any of these rights, contact us at{' '}
          <a href="mailto:thenestreno@gmail.com" className="text-primary hover:underline">
            thenestreno@gmail.com
          </a>.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 10 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-dark">10. Changes to This Policy</h2>
        <p className="mb-4 leading-relaxed text-content">
          We may update this Privacy Policy from time to time. When we do, we will update the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the platform after changes are posted constitutes your acceptance of the updated policy.
        </p>

        <hr className="my-8 border-t border-black/10" />

        {/* 11 */}
        <h2 className="mb-3 mt-10 text-lg font-bold text-dark">11. Contact Us</h2>
        <p className="mb-4 leading-relaxed text-content">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <div className="rounded-xl border border-black/10 bg-white px-6 py-5 text-sm text-content">
          <p className="mb-1 font-semibold text-dark">CheckLocalFirst</p>
          <p>
            Email:{' '}
            <a href="mailto:thenestreno@gmail.com" className="text-primary hover:underline">
              thenestreno@gmail.com
            </a>
          </p>
          <p>
            Website:{' '}
            <Link href="/" className="text-primary hover:underline">
              checklocalfirst.com
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}
