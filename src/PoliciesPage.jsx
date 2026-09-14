import React, { useState, useEffect } from 'react';
import { ChevronLeft, Shield, FileText, Heart, AlertTriangle, Gift, CreditCard, HelpCircle } from 'lucide-react';

const policies = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    icon: Shield,
    content: (
      <div className="space-y-6 text-rich-black/80 font-sans leading-relaxed">
        <div>
          <p className="font-bold">Effective Date: 1 October 2026</p>
          <p className="font-bold">Last Updated: 1 October 2026</p>
        </div>
        <p>FairyMeet (“FairyMeet”, “we”, “us”, or “our”) respects your privacy and is committed to protecting the personal information you provide while using our website, platform, applications, features and services. By using FairyMeet, you acknowledge that you have read and understood this Privacy Policy.</p>
        
        <h3 className="font-serif text-xl text-rich-black mt-8">1. Information We Collect</h3>
        <p>Depending on how you use FairyMeet, we may collect:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Name and username</li>
          <li>Date of birth / age information</li>
          <li>Gender and dating preferences</li>
          <li>Email address & Mobile number</li>
          <li>Profile photograph and other profile content</li>
          <li>Location information, where enabled by you</li>
          <li>Login and account information</li>
          <li>Likes, matches and interactions</li>
          <li>Chat and communication information</li>
          <li>Information relating to voice/video calls necessary to provide the calling feature</li>
          <li>Payment and transaction information</li>
          <li>Referral information</li>
          <li>Device, browser, IP address and technical information</li>
          <li>Reports, complaints and support requests</li>
        </ul>
        <p>We aim to collect only information reasonably necessary for providing and improving FairyMeet.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">2. How We Use Your Information</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Create and manage your account</li>
          <li>Provide matching and communication features</li>
          <li>Enable chat, voice and video calls</li>
          <li>Improve recommendations and platform functionality</li>
          <li>Process payments and eligible referral benefits</li>
          <li>Prevent fake accounts, fraud, abuse and misuse</li>
          <li>Respond to reports and complaints</li>
          <li>Provide customer support</li>
          <li>Communicate important service updates</li>
          <li>Analyse platform performance</li>
          <li>Comply with applicable legal requirements</li>
        </ul>

        <h3 className="font-serif text-xl text-rich-black mt-8">3. Profile Information</h3>
        <p>Information you choose to display on your profile may be visible to other FairyMeet users. Do not upload sensitive personal information that you do not want other users to see.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">4. Location</h3>
        <p>If a location feature is provided, you may be asked to provide permission for location access. You should only enable location features that you are comfortable using.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">5. Chats and Calls</h3>
        <p>FairyMeet may process technical information required to provide chat, voice and video communication. Users should not share passwords, OTPs, financial information, exact home addresses or other sensitive information with strangers. Unless expressly stated otherwise, FairyMeet does not promise that private communications are completely immune from technical failure, unauthorised access or misuse.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">6. Payments</h3>
        <p>Payments may be processed through third-party payment providers. FairyMeet may receive transaction-related information required to confirm payments, refunds or eligible benefits. Full payment-card details may be handled by the applicable payment provider rather than FairyMeet.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">7. Sharing of Information</h3>
        <p>We may share information with service providers that help us operate FairyMeet, including hosting, authentication, analytics, communication, payment, calling and security providers. We may also disclose information where required by applicable law, legal process or competent authorities. We do not intend to sell users' personal information merely for advertising purposes.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">8. Data Security</h3>
        <p>We use reasonable technical and organisational measures designed to protect personal information. However, no internet-based service can guarantee absolute security.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">9. Account Deletion</h3>
        <p>You may request deletion of your FairyMeet account through the available account settings or by contacting us. Certain information may need to be retained for legal, fraud-prevention, transaction, dispute-resolution or security purposes where permitted or required by law.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">10. Children's Privacy</h3>
        <p>FairyMeet is strictly intended for users aged 18 years or older. We do not knowingly permit users below 18 to use the platform. If you believe a person below 18 has created an account, please report the account immediately.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">11. Third-Party Services</h3>
        <p>FairyMeet may use third-party services for hosting, payments, analytics, authentication, communications and voice/video calling. Their processing may also be governed by their respective privacy policies.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">12. Changes to this Policy</h3>
        <p>We may update this Privacy Policy from time to time. Material changes may be communicated through the platform or other appropriate means.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">13. Contact</h3>
        <p>For privacy-related questions or requests:</p>
        <p>Email: privacy@fairymeet.com<br/>
        Company / Entity Name: FairyMeet Technologies Pvt. Ltd.<br/>
        Registered Address: New Delhi, India</p>
        <p className="italic mt-4">This Privacy Policy should be read together with the FairyMeet Terms & Conditions and other applicable policies.</p>
      </div>
    )
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    icon: FileText,
    content: (
      <div className="space-y-6 text-rich-black/80 font-sans leading-relaxed">
        <div>
          <p className="font-bold">Effective Date: 1 October 2026</p>
          <p>Welcome to FairyMeet. By creating an account or using FairyMeet, you agree to these Terms & Conditions.</p>
        </div>

        <h3 className="font-serif text-xl text-rich-black mt-8">1. Eligibility</h3>
        <p>You must be at least 18 years old to use FairyMeet. By registering, you confirm that:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>You are 18 or older.</li>
          <li>The information you provide is reasonably accurate.</li>
          <li>You will not impersonate another person.</li>
          <li>You will comply with applicable laws and these Terms.</li>
        </ul>

        <h3 className="font-serif text-xl text-rich-black mt-8">2. Account</h3>
        <p>You are responsible for maintaining the security of your account. You must not:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Share your login credentials</li>
          <li>Create fraudulent accounts</li>
          <li>Impersonate another person</li>
          <li>Create multiple accounts to abuse promotions</li>
          <li>Use another person's photographs without permission</li>
        </ul>
        <p>FairyMeet may suspend or terminate accounts involved in fraud, abuse, harassment, impersonation or other prohibited activity.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">3. Dating and Connections</h3>
        <p>FairyMeet provides a platform for users to discover and communicate with other users. FairyMeet does not guarantee:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>A match or relationship</li>
          <li>A successful date</li>
          <li>Marriage or long-term compatibility</li>
          <li>The identity or intentions of another user</li>
        </ul>
        <p>Users are responsible for their own decisions regarding communication and meetings.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">4. User Content</h3>
        <p>You are responsible for content you upload or share. You must not upload or share:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Illegal, threatening, or harassing content</li>
          <li>Hate-based abuse</li>
          <li>Non-consensual intimate content or Child sexual content</li>
          <li>Fraudulent information or Impersonation</li>
          <li>Malware or malicious links</li>
          <li>Content that violates another person's rights</li>
        </ul>

        <h3 className="font-serif text-xl text-rich-black mt-8">5. Offline Dates</h3>
        <p>FairyMeet is not a dating-event organiser unless expressly stated otherwise. Users decide independently whether, when and where to meet. For safety, we recommend:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Meeting in public places</li>
          <li>Informing a trusted person</li>
          <li>Arranging your own transportation</li>
          <li>Avoiding sharing your home address</li>
          <li>Avoiding sending money to strangers</li>
          <li>Leaving immediately if you feel unsafe</li>
        </ul>

        <h3 className="font-serif text-xl text-rich-black mt-8">6. Prohibited Financial Requests</h3>
        <p>Users must not use FairyMeet to scam, extort, solicit money fraudulently or pressure another person into financial transactions. Report suspicious behaviour immediately.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">7. Payments</h3>
        <p>Where paid services are offered, applicable pricing, taxes, renewal conditions and refund terms will be displayed before purchase.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">8. Referral Programme</h3>
        <p>The FairyMeet referral programme is governed by separate Referral Terms. Eligibility, verification, payout conditions and exclusions apply.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">9. Suspension</h3>
        <p>FairyMeet may restrict, suspend or terminate accounts where reasonably necessary to protect users, investigate abuse, prevent fraud, enforce platform rules, comply with law, or protect the platform.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">10. Platform Availability & Third-Party Services</h3>
        <p>We aim to keep FairyMeet available but cannot guarantee uninterrupted or error-free operation. Features may be changed, suspended or discontinued. Some features may depend on third-party services whose availability may affect platform functionality.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">11. Limitation & Changes</h3>
        <p>FairyMeet provides a platform for connection and communication. Users remain responsible for their own interactions. We may update these Terms from time to time. Continued use after applicable changes may constitute acceptance.</p>

        <h3 className="font-serif text-xl text-rich-black mt-8">12. Contact</h3>
        <p>Email: legal@fairymeet.com<br/>
        Legal Entity: FairyMeet Technologies Pvt. Ltd.</p>
      </div>
    )
  },
  {
    id: 'community',
    title: 'Community Guidelines',
    icon: Heart,
    content: (
      <div className="space-y-6 text-rich-black/80 font-sans leading-relaxed">
        <p>FairyMeet is for genuine connections, respectful conversations and safe dating.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">❤️ Be Respectful</h3>
        <p>Treat other people with respect. No Bullying, Harassment, Threats, Abuse, Hate speech, or Sexual harassment.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">🚫 No Fake Profiles</h3>
        <p>Do not pretend to be another person, use someone else's photos, create fake identities, or misrepresent your age.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">🔒 Respect Privacy</h3>
        <p>Never share another person's phone number, address, private photographs, private conversations, or personal information without appropriate permission.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">💰 No Scams</h3>
        <p>Do not ask users for money through fraudulent stories or manipulation. Report suspicious financial requests.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">🔞 18+ Only</h3>
        <p>FairyMeet is strictly for adults aged 18 years or above.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">📸 Content</h3>
        <p>Do not upload illegal, exploitative, violent or non-consensual sexual content.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">🚨 Report</h3>
        <p>If something feels wrong: <strong>Report → Block → Contact FairyMeet Support</strong>. We encourage users to report suspicious or unsafe behaviour rather than engaging with it.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">⚠️ Enforcement</h3>
        <p>Depending on the situation, FairyMeet may remove content, restrict features, suspend accounts, permanently terminate accounts, take other appropriate action, or cooperate with lawful authorities where required.</p>
      </div>
    )
  },
  {
    id: 'safety',
    title: '18+ & User Safety Policy',
    icon: AlertTriangle,
    content: (
      <div className="space-y-6 text-rich-black/80 font-sans leading-relaxed">
        <p className="font-bold text-vibrant-pink">FairyMeet is strictly an 18+ platform. Users must not attempt to access FairyMeet if they are under 18.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">Before Meeting Someone</h3>
        <p>We strongly recommend:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Chat and get to know the person.</li>
          <li>Consider a voice/video call before meeting.</li>
          <li>Meet in a public location.</li>
          <li>Tell a trusted person about your plans.</li>
          <li>Arrange your own transportation.</li>
          <li>Do not share your home address.</li>
          <li>Do not send money to someone you have never met.</li>
        </ul>

        <h3 className="font-serif text-xl text-rich-black mt-6">During a Date</h3>
        <p>Trust your instincts. If you feel uncomfortable or unsafe, leave the situation and seek appropriate help.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">Report Immediately</h3>
        <p>Report accounts involving Threats, Harassment, Blackmail, Fraud, Impersonation, Non-consensual intimate content, Underage users, or Suspicious behaviour. Use the Report feature or contact FairyMeet Support.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">Important</h3>
        <p>FairyMeet facilitates online connections. Users are responsible for exercising reasonable care when interacting with others, including during offline meetings. No platform can guarantee the behaviour or identity of another user.</p>
      </div>
    )
  },
  {
    id: 'referral',
    title: 'Referral Programme Terms',
    icon: Gift,
    content: (
      <div className="space-y-6 text-rich-black/80 font-sans leading-relaxed">
        <p><strong>Programme: FairyMeet Date Referral Programme</strong></p>
        <p>FairyMeet may provide eligible users with a minimum ₹1,500 referral benefit for each qualifying successful date, subject to these Terms.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">1. Who Can Participate?</h3>
        <p>Participation is available only to eligible registered FairyMeet users who satisfy the programme requirements. Users must be 18 or older.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">2. What Is a Qualifying Date?</h3>
        <p>A qualifying date means a genuine offline meeting between two eligible FairyMeet users who:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Connected through FairyMeet;</li>
          <li>Meet the programme's eligibility requirements;</li>
          <li>Actually meet in person;</li>
          <li>Complete the required verification process;</li>
          <li>Do not violate FairyMeet's Terms or Community Guidelines.</li>
        </ul>
        <p>A chat, phone call or video call alone does not constitute a qualifying date.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">3. Referral Benefit</h3>
        <p>An eligible participant may receive a minimum ₹1,500 benefit for each verified qualifying date, subject to the programme rules. The benefit is not automatically payable merely because two users match or communicate.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">4. Verification</h3>
        <p>FairyMeet may require reasonable verification before approving a referral benefit. Verification may include In-platform confirmation, Date confirmation by participating users, Referral/link/code verification, Anti-fraud checks, or Other reasonable verification methods.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">5. Fraud & Abuse</h3>
        <p>The following may result in disqualification: Fake dates, Self-referrals, Multiple fraudulent accounts, Collusion, False date confirmations, Manipulation of referral systems, Using bots or automated accounts, Misrepresentation, or Any attempt to obtain benefits dishonestly. FairyMeet may investigate suspicious activity and withhold benefits where fraud or abuse is reasonably suspected.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">6. Safety</h3>
        <p>Users should never attend a date merely to obtain the referral benefit. Dates should be genuine, voluntary and mutually agreed. Personal safety remains the priority.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">7. Payment Timeline & Limits</h3>
        <p>Approved referral benefits will be processed within 2 to 3 business days after successful verification. FairyMeet may introduce reasonable limits, campaign periods or eligibility requirements and will communicate them through the platform.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">8. Contact</h3>
        <p>Email: referrals@fairymeet.com</p>
      </div>
    )
  },
  {
    id: 'refund',
    title: 'Refund & Cancellation Policy',
    icon: CreditCard,
    content: (
      <div className="space-y-6 text-rich-black/80 font-sans leading-relaxed">
        <p>This policy applies to paid FairyMeet services.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">1. Free Features</h3>
        <p>Where a feature is provided free of charge, there is no payment and therefore no monetary refund.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">2. Paid Services</h3>
        <p>Before completing a paid transaction, users will be shown the applicable price and material terms.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">3. Refund Requests & Review</h3>
        <p>Refund requests may be submitted to: <strong>billing@fairymeet.com</strong>. Please include your registered email/mobile number, transaction/reference ID, date of payment, and reason for the request.</p>
        <p>Refunds will be considered according to the applicable service terms, payment provider rules and applicable law. Where a refund is approved, the amount will generally be returned through the original payment method or another appropriate method.</p>

        <h3 className="font-serif text-xl text-rich-black mt-6">4. Fraudulent Transactions & Subscriptions</h3>
        <p>FairyMeet may investigate suspicious or unauthorised transactions. If FairyMeet introduces subscriptions, cancellation terms, renewal information and applicable refund rules will be displayed before purchase.</p>
      </div>
    )
  },
  {
    id: 'grievance',
    title: 'Grievance & Support',
    icon: HelpCircle,
    content: (
      <div className="space-y-6 text-rich-black/80 font-sans leading-relaxed">
        <p>We want FairyMeet to remain a respectful and safe platform.</p>
        
        <div className="bg-off-white p-6 rounded-2xl border border-rich-black/10 mt-6">
          <p className="font-bold text-rich-black mb-2">For account, safety, privacy, content or other complaints, contact:</p>
          <p>Email: <strong>support@fairymeet.com</strong></p>
          <p>Company / Entity: FairyMeet Technologies Pvt. Ltd.</p>
          <p>Address: New Delhi, India</p>
        </div>

        <h3 className="font-serif text-xl text-rich-black mt-6">For Faster Resolution</h3>
        <p>Please provide:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Your registered email/mobile number</li>
          <li>Relevant username/profile</li>
          <li>Description of the issue</li>
          <li>Screenshots or supporting information where appropriate</li>
        </ul>

        <div className="bg-red-50 p-6 rounded-2xl border border-red-200 mt-6">
          <p className="font-bold text-red-700">For urgent safety concerns, contact the appropriate emergency/law-enforcement authority in your location.</p>
        </div>
        
        <p className="mt-4">FairyMeet will handle complaints according to applicable law and its internal procedures.</p>
      </div>
    )
  }
];

export default function PoliciesPage({ onBack, initialPolicyId = 'privacy' }) {
  const [activePolicy, setActivePolicy] = useState(initialPolicyId);

  // Sync state if prop changes
  useEffect(() => {
    setActivePolicy(initialPolicyId);
  }, [initialPolicyId]);

  const currentPolicy = policies.find(p => p.id === activePolicy);

  return (
    <div className="min-h-screen bg-off-white font-sans text-rich-black flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-rich-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 font-medium text-rich-black hover:text-vibrant-pink transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <div className="h-6 w-px bg-rich-black/20 hidden sm:block"></div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-rich-black hidden sm:block">
            Legal & Policies
          </h1>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-3xl p-4 shadow-sm border border-rich-black/5 flex flex-col gap-1">
            {policies.map(policy => (
              <button
                key={policy.id}
                onClick={() => setActivePolicy(policy.id)}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-2xl transition-all ${
                  activePolicy === policy.id 
                    ? 'bg-vibrant-pink text-white shadow-sm' 
                    : 'text-rich-black/70 hover:bg-off-white hover:text-rich-black'
                }`}
              >
                <policy.icon className={`w-5 h-5 ${activePolicy === policy.id ? 'text-white' : 'text-rich-black/50'}`} />
                <span className="font-medium text-sm">{policy.title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <section className="flex-grow bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-rich-black/5">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-rich-black/10">
              <div className="w-16 h-16 bg-vibrant-pink/10 rounded-2xl flex items-center justify-center">
                {currentPolicy && <currentPolicy.icon className="w-8 h-8 text-vibrant-pink" />}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-rich-black">{currentPolicy?.title}</h2>
            </div>
            
            <div className="policy-content">
              {currentPolicy?.content}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
