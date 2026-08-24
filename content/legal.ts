// Drafted from PIPEDA principles and current CRA guidance on charitable
// receipting and record retention (see docs/receipt-issuance-procedure.md
// for sources). These are working drafts, not final legal documents — see
// the `draftNotice` shown at the top of each page. They still need review
// by a lawyer qualified in Canadian privacy/charity law before publication,
// and two fields (the organization's confirmed legal name/address and its
// incorporating province) are marked inline and must be filled in first.

export interface LegalParagraph {
  en: string;
  fr: string;
}

export interface LegalSection {
  heading: LegalParagraph;
  body: LegalParagraph[];
}

export interface LegalDocument {
  title: LegalParagraph;
  effectiveDateNote: LegalParagraph;
  sections: LegalSection[];
}

const draftBanner: LegalParagraph = {
  en: "Draft — not yet reviewed by counsel or approved by the organization. Do not treat as final or publish without legal review.",
  fr: "Ébauche — non encore révisée par un conseiller juridique ni approuvée par l'organisation. À ne pas considérer comme définitive ni publier sans révision juridique.",
};

export { draftBanner };

export const privacyPolicy: LegalDocument = {
  title: { en: "Privacy Policy", fr: "Politique de confidentialité" },
  effectiveDateNote: {
    en: "Draft prepared August 2026, informed by the Personal Information Protection and Electronic Documents Act (PIPEDA).",
    fr: "Ébauche rédigée en août 2026, fondée sur la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE).",
  },
  sections: [
    {
      heading: { en: "1. Who this policy covers", fr: "1. Portée de la présente politique" },
      body: [
        {
          en: "This policy explains how No African Child Left Behind (\"NACLB,\" \"we,\" \"us\") collects, uses, discloses and protects personal information through this website, donation forms, and volunteer and contact submissions. It applies to visitors, donors, volunteers and partners.",
          fr: "Cette politique explique comment No African Child Left Behind (« NACLB », « nous ») recueille, utilise, communique et protège les renseignements personnels par l'entremise de ce site, des formulaires de don, et des soumissions de bénévolat et de contact. Elle s'applique aux visiteurs, donateurs, bénévoles et partenaires.",
        },
      ],
    },
    {
      heading: { en: "2. Information we collect", fr: "2. Renseignements recueillis" },
      body: [
        {
          en: "Contact and volunteer forms: name, email, phone, country/city, and any other details you choose to provide (profession, skills, motivation, an optional CV).",
          fr: "Formulaires de contact et de bénévolat : nom, courriel, téléphone, pays/ville, et tout autre renseignement que vous choisissez de fournir (profession, compétences, motivation, CV facultatif).",
        },
        {
          en: "Donations (once payment processing is live): name, email, billing address, and donation amount/frequency. Full card numbers are never received or stored by NACLB — they go directly to our payment processor (Stripe), which is PCI-DSS compliant.",
          fr: "Dons (une fois le traitement des paiements en service) : nom, courriel, adresse de facturation, montant et fréquence du don. Les numéros complets de carte ne sont jamais reçus ni conservés par NACLB — ils transitent directement vers notre processeur de paiement (Stripe), conforme à la norme PCI-DSS.",
        },
        {
          en: "Website usage: standard technical data (pages viewed, browser type, approximate location from IP address) collected automatically, and — only once you consent under our Cookie Policy — analytics data.",
          fr: "Utilisation du site : données techniques standard (pages consultées, type de navigateur, localisation approximative selon l'adresse IP) recueillies automatiquement, et — seulement après votre consentement selon notre Politique relative aux témoins — des données analytiques.",
        },
      ],
    },
    {
      heading: { en: "3. Why we collect it", fr: "3. Pourquoi nous les recueillons" },
      body: [
        {
          en: "To process and receipt donations; to review volunteer applications; to respond to inquiries; to send donation confirmations, tax receipts and — if you opt in — programme updates; to maintain accurate financial and donor records as required by the Canada Revenue Agency (CRA); and to understand and improve how the site is used.",
          fr: "Pour traiter et émettre un reçu pour les dons; pour examiner les candidatures de bénévolat; pour répondre aux demandes; pour envoyer les confirmations de don, les reçus fiscaux et, si vous y consentez, des mises à jour sur nos programmes; pour tenir des registres financiers et de donateurs exacts, comme l'exige l'Agence du revenu du Canada (ARC); et pour comprendre et améliorer l'utilisation du site.",
        },
      ],
    },
    {
      heading: { en: "4. Consent", fr: "4. Consentement" },
      body: [
        {
          en: "We collect personal information only with your knowledge and consent, except where permitted or required by law (for example, information the CRA requires us to keep about donors who receive an official tax receipt). Submitting a form on this site that includes a consent checkbox constitutes your consent to the uses described next to it. You may withdraw consent for non-essential uses (such as email updates) at any time by contacting us.",
          fr: "Nous ne recueillons des renseignements personnels qu'avec votre connaissance et votre consentement, sauf lorsque la loi le permet ou l'exige (par exemple, les renseignements que l'ARC exige que nous conservions au sujet des donateurs recevant un reçu fiscal officiel). En soumettant un formulaire sur ce site comportant une case de consentement, vous consentez aux utilisations qui y sont décrites. Vous pouvez retirer votre consentement pour les utilisations non essentielles (comme les mises à jour par courriel) en tout temps en nous contactant.",
        },
      ],
    },
    {
      heading: { en: "5. Who we share it with", fr: "5. Avec qui nous les partageons" },
      body: [
        {
          en: "We do not sell personal information. We share it only with service providers who need it to operate the site and process donations on our behalf — for example, a payment processor (Stripe), a hosting provider, and (once selected) a transactional email provider and a content management system — each bound by contract to protect it and use it only for the purpose we specify. Some of these providers may process or store data outside Canada; where that's the case, it remains protected to a standard comparable to Canadian law, as required by PIPEDA.",
          fr: "Nous ne vendons pas de renseignements personnels. Nous les partageons uniquement avec des fournisseurs de services qui en ont besoin pour exploiter le site et traiter les dons en notre nom — par exemple un processeur de paiement (Stripe), un fournisseur d'hébergement et, une fois sélectionnés, un fournisseur de courriels transactionnels et un système de gestion de contenu — chacun étant contractuellement tenu de les protéger et de ne les utiliser qu'aux fins que nous précisons. Certains de ces fournisseurs peuvent traiter ou conserver des données à l'extérieur du Canada; le cas échéant, elles demeurent protégées selon une norme comparable à la loi canadienne, comme l'exige la LPRPDE.",
        },
        {
          en: "We disclose information without consent only where required by law — for example, to the CRA in the course of a charity audit, or to comply with a valid legal order.",
          fr: "Nous communiquons des renseignements sans consentement uniquement lorsque la loi l'exige — par exemple, à l'ARC dans le cadre d'une vérification d'organisme de bienfaisance, ou pour nous conformer à une ordonnance légale valide.",
        },
      ],
    },
    {
      heading: { en: "6. How long we keep it", fr: "6. Durée de conservation" },
      body: [
        {
          en: "We keep personal information only as long as necessary for the purpose it was collected, or as required by law. Donation and receipt records follow CRA retention rules — see the retention schedule in our Donation Terms. Volunteer and contact-form submissions we don't act on are deleted after 24 months.",
          fr: "Nous conservons les renseignements personnels seulement le temps nécessaire à la fin pour laquelle ils ont été recueillis, ou selon les exigences légales. Les registres de dons et de reçus suivent les règles de conservation de l'ARC — voir le calendrier de conservation dans nos Conditions relatives aux dons. Les soumissions de bénévolat et de contact auxquelles nous ne donnons pas suite sont supprimées après 24 mois.",
        },
      ],
    },
    {
      heading: { en: "7. Security", fr: "7. Sécurité" },
      body: [
        {
          en: "We use reasonable technical and organizational safeguards appropriate to the sensitivity of the information, including encrypted transmission (HTTPS), access controls limiting who at NACLB can see donor and volunteer data, and — for payments — a PCI-DSS-compliant processor that never gives us direct access to card data.",
          fr: "Nous utilisons des mesures de protection techniques et organisationnelles raisonnables, adaptées à la sensibilité des renseignements, y compris une transmission chiffrée (HTTPS), des contrôles d'accès limitant qui, chez NACLB, peut consulter les données des donateurs et bénévoles, et, pour les paiements, un processeur conforme à la norme PCI-DSS qui ne nous donne jamais un accès direct aux données de carte.",
        },
      ],
    },
    {
      heading: { en: "8. Your rights", fr: "8. Vos droits" },
      body: [
        {
          en: "Under PIPEDA, you may ask to see the personal information we hold about you, ask us to correct it if it's inaccurate, and ask us to stop using it for purposes you haven't consented to. To make a request, use the contact details below. We'll respond within 30 days.",
          fr: "En vertu de la LPRPDE, vous pouvez demander à consulter les renseignements personnels que nous détenons à votre sujet, nous demander de les corriger s'ils sont inexacts, et nous demander de cesser de les utiliser à des fins auxquelles vous n'avez pas consenti. Pour faire une demande, utilisez les coordonnées ci-dessous. Nous répondrons dans un délai de 30 jours.",
        },
      ],
    },
    {
      heading: { en: "9. Children's information", fr: "9. Renseignements concernant les enfants" },
      body: [
        {
          en: "This site does not knowingly collect personal information directly from children. Our volunteer application requires applicants to confirm they are 18 or older. Program-related information about children we serve is governed separately by our child-protection and photo-consent practices (see spec section 91-92) and is never published without appropriate authorization.",
          fr: "Ce site ne recueille pas sciemment de renseignements personnels directement auprès d'enfants. Notre formulaire de candidature bénévole exige que le candidat confirme être âgé de 18 ans ou plus. Les renseignements liés aux programmes concernant les enfants que nous servons sont régis séparément par nos pratiques de protection de l'enfance et de consentement photographique, et ne sont jamais publiés sans autorisation appropriée.",
        },
      ],
    },
    {
      heading: { en: "10. Changes to this policy", fr: "10. Modifications de la présente politique" },
      body: [
        {
          en: "We may update this policy as our practices or the law change. The effective date at the top will reflect the most recent version.",
          fr: "Nous pouvons mettre à jour cette politique à mesure que nos pratiques ou la loi évoluent. La date d'entrée en vigueur en haut de la page reflétera la version la plus récente.",
        },
      ],
    },
    {
      heading: { en: "11. Contact / Privacy Officer", fr: "11. Contact / Responsable de la protection des renseignements personnels" },
      body: [
        {
          en: "For any question or request about this policy, contact us at noafricanchildleftbehind@outlook.com. [A named Privacy Officer and their direct contact should be added here once designated by the organization — PIPEDA requires an identifiable accountable individual.]",
          fr: "Pour toute question ou demande concernant cette politique, contactez-nous à noafricanchildleftbehind@outlook.com. [Un responsable désigné de la protection des renseignements personnels et ses coordonnées directes devront être ajoutés ici une fois désignés par l'organisation — la LPRPDE exige une personne responsable identifiable.]",
        },
      ],
    },
  ],
};

export const cookiePolicy: LegalDocument = {
  title: { en: "Cookie Policy", fr: "Politique relative aux témoins" },
  effectiveDateNote: {
    en: "Draft prepared August 2026.",
    fr: "Ébauche rédigée en août 2026.",
  },
  sections: [
    {
      heading: { en: "1. What cookies are", fr: "1. Qu'est-ce qu'un témoin" },
      body: [
        {
          en: "Cookies are small text files a website stores on your device to remember information between visits. This site uses only a small number of them, described below by category, per spec section 73's \"no complex cookie wall\" principle.",
          fr: "Les témoins (« cookies ») sont de petits fichiers texte qu'un site web enregistre sur votre appareil pour se souvenir d'informations entre les visites. Ce site n'en utilise qu'un petit nombre, décrits ci-dessous par catégorie.",
        },
      ],
    },
    {
      heading: { en: "2. Essential", fr: "2. Essentiels" },
      body: [
        {
          en: "Always on — required for the site to function (for example, remembering your language preference). These don't require consent under PIPEDA/Quebec Law 25, since the site cannot work without them.",
          fr: "Toujours actifs — nécessaires au fonctionnement du site (par exemple, pour mémoriser votre préférence de langue). Ils ne requièrent pas de consentement en vertu de la LPRPDE ou de la Loi 25 du Québec, le site ne pouvant fonctionner sans eux.",
        },
      ],
    },
    {
      heading: { en: "3. Analytics", fr: "3. Analytiques" },
      body: [
        {
          en: "Not yet active. Once Google Analytics 4 is connected (see ARCHITECTURE.md), this section will name the specific cookies it sets, their retention period, and how to opt out — and the site will ask for your consent before setting them, not after.",
          fr: "Pas encore actifs. Une fois Google Analytics 4 connecté, cette section nommera les témoins précis qu'il installe, leur durée de conservation et la façon de vous en désinscrire — et le site demandera votre consentement avant de les installer, et non après.",
        },
      ],
    },
    {
      heading: { en: "4. Marketing", fr: "4. Marketing" },
      body: [
        {
          en: "Disabled. No marketing or advertising cookies are used in this version of the site (spec section 73).",
          fr: "Désactivés. Aucun témoin de marketing ou de publicité n'est utilisé dans cette version du site.",
        },
      ],
    },
    {
      heading: { en: "5. Managing cookies", fr: "5. Gérer les témoins" },
      body: [
        {
          en: "You can block or delete cookies through your browser settings at any time. Blocking essential cookies may affect how the site works.",
          fr: "Vous pouvez bloquer ou supprimer les témoins en tout temps par les paramètres de votre navigateur. Le blocage des témoins essentiels peut nuire au fonctionnement du site.",
        },
      ],
    },
    {
      heading: { en: "6. Contact", fr: "6. Contact" },
      body: [
        {
          en: "Questions about this policy: noafricanchildleftbehind@outlook.com.",
          fr: "Questions concernant cette politique : noafricanchildleftbehind@outlook.com.",
        },
      ],
    },
  ],
};

export const termsOfUse: LegalDocument = {
  title: { en: "Terms of Use", fr: "Conditions d'utilisation" },
  effectiveDateNote: {
    en: "Draft prepared August 2026.",
    fr: "Ébauche rédigée en août 2026.",
  },
  sections: [
    {
      heading: { en: "1. Acceptance", fr: "1. Acceptation" },
      body: [
        {
          en: "By using this website, you agree to these Terms of Use. If you don't agree, please don't use the site.",
          fr: "En utilisant ce site, vous acceptez les présentes conditions d'utilisation. Si vous n'y consentez pas, veuillez ne pas utiliser le site.",
        },
      ],
    },
    {
      heading: { en: "2. Use of the site", fr: "2. Utilisation du site" },
      body: [
        {
          en: "You may browse, share and cite content from this site for personal or journalistic purposes with attribution. You may not reproduce, resell, or use site content to imply endorsement without our written permission. All text, images, and design on this site are the property of No African Child Left Behind or used with permission, unless otherwise noted.",
          fr: "Vous pouvez consulter, partager et citer le contenu de ce site à des fins personnelles ou journalistiques, avec attribution. Vous ne pouvez pas reproduire, revendre, ni utiliser le contenu du site pour laisser entendre un appui sans notre permission écrite. Tout texte, image et élément de conception de ce site est la propriété de No African Child Left Behind ou utilisé avec permission, sauf indication contraire.",
        },
      ],
    },
    {
      heading: { en: "3. No professional advice", fr: "3. Absence de conseils professionnels" },
      body: [
        {
          en: "Content on this site is provided for general informational purposes and does not constitute financial, tax, medical, or legal advice. Consult a qualified professional regarding your own situation, including the tax deductibility of any donation.",
          fr: "Le contenu de ce site est fourni à titre informatif général et ne constitue pas un conseil financier, fiscal, médical ou juridique. Consultez un professionnel qualifié concernant votre situation, y compris la déductibilité fiscale de tout don.",
        },
      ],
    },
    {
      heading: { en: "4. Conduct", fr: "4. Conduite" },
      body: [
        {
          en: "Don't use this site to upload harmful code, attempt unauthorized access, or submit false or abusive information through our forms.",
          fr: "N'utilisez pas ce site pour téléverser du code malveillant, tenter un accès non autorisé, ou soumettre de fausses informations ou des propos abusifs par nos formulaires.",
        },
      ],
    },
    {
      heading: { en: "5. Third-party links", fr: "5. Liens vers des tiers" },
      body: [
        {
          en: "This site may link to third-party sites (payment processors, partner organizations, social media). We aren't responsible for their content or privacy practices.",
          fr: "Ce site peut contenir des liens vers des sites tiers (processeurs de paiement, organisations partenaires, médias sociaux). Nous ne sommes pas responsables de leur contenu ni de leurs pratiques en matière de confidentialité.",
        },
      ],
    },
    {
      heading: { en: "6. Disclaimer and limitation of liability", fr: "6. Avis de non-responsabilité et limitation de responsabilité" },
      body: [
        {
          en: "This site is provided \"as is\" without warranties of any kind. To the fullest extent permitted by law, No African Child Left Behind is not liable for any indirect, incidental, or consequential damages arising from your use of the site.",
          fr: "Ce site est fourni « tel quel », sans garantie d'aucune sorte. Dans toute la mesure permise par la loi, No African Child Left Behind n'est pas responsable des dommages indirects, accessoires ou consécutifs découlant de l'utilisation du site.",
        },
      ],
    },
    {
      heading: { en: "7. Governing law", fr: "7. Droit applicable" },
      body: [
        {
          en: "These terms are governed by the laws of Canada and [the organization's incorporating province — to be confirmed]. Disputes will be resolved in the courts of that jurisdiction.",
          fr: "Les présentes conditions sont régies par les lois du Canada et [la province d'incorporation de l'organisation — à confirmer]. Les différends seront tranchés par les tribunaux de cette juridiction.",
        },
      ],
    },
    {
      heading: { en: "8. Changes", fr: "8. Modifications" },
      body: [
        {
          en: "We may update these terms from time to time; continued use of the site after a change means you accept the update.",
          fr: "Nous pouvons modifier ces conditions de temps à autre; la poursuite de l'utilisation du site après une modification signifie que vous l'acceptez.",
        },
      ],
    },
    {
      heading: { en: "9. Contact", fr: "9. Contact" },
      body: [
        { en: "noafricanchildleftbehind@outlook.com", fr: "noafricanchildleftbehind@outlook.com" },
      ],
    },
  ],
};

export const donationTerms: LegalDocument = {
  title: { en: "Donation Terms", fr: "Conditions relatives aux dons" },
  effectiveDateNote: {
    en: "Draft prepared August 2026, informed by current CRA guidance on official donation receipts and record retention.",
    fr: "Ébauche rédigée en août 2026, fondée sur les lignes directrices actuelles de l'ARC concernant les reçus officiels de don et la conservation des documents.",
  },
  sections: [
    {
      heading: { en: "1. Donations are gifts", fr: "1. Les dons sont des libéralités" },
      body: [
        {
          en: "A donation to No African Child Left Behind is a voluntary gift with no expectation of goods, services, or personal benefit in return. If a donation does provide you an advantage (for example, an event ticket), we will disclose its value and issue a receipt only for the eligible amount, as CRA rules require.",
          fr: "Un don à No African Child Left Behind est une libéralité volontaire, sans attente de biens, de services ou d'avantage personnel en retour. Si un don vous procure un avantage (par exemple, un billet d'événement), nous en indiquerons la valeur et n'émettrons un reçu que pour le montant admissible, conformément aux règles de l'ARC.",
        },
      ],
    },
    {
      heading: { en: "2. Refunds", fr: "2. Remboursements" },
      body: [
        {
          en: "Because donations are gifts, we don't offer refunds except in these cases: (a) a processing error (e.g., a duplicate or mis-keyed amount), reported within 30 days; (b) a donation made fraudulently on your payment method, per your bank/card issuer's dispute process; or (c) a clear administrative error on our part. Approved refunds are returned to the original payment method.",
          fr: "Les dons étant des libéralités, nous n'offrons pas de remboursement, sauf dans les cas suivants : (a) une erreur de traitement (par exemple, un montant en double ou mal saisi), signalée dans les 30 jours; (b) un don effectué frauduleusement avec votre moyen de paiement, selon le processus de contestation de votre institution financière; ou (c) une erreur administrative manifeste de notre part. Les remboursements approuvés sont retournés au moyen de paiement original.",
        },
        {
          en: "If an official tax receipt was already issued for a refunded donation, CRA rules require us to void that receipt. We'll notify you and, if you already claimed it, you may need to adjust a filed tax return — we recommend speaking with a tax professional.",
          fr: "Si un reçu fiscal officiel a déjà été émis pour un don remboursé, les règles de l'ARC nous obligent à annuler ce reçu. Nous vous en aviserons et, si vous l'avez déjà déclaré, vous pourriez devoir modifier une déclaration de revenus produite — nous vous recommandons de consulter un professionnel de la fiscalité.",
        },
      ],
    },
    {
      heading: { en: "3. Recurring (monthly) donations", fr: "3. Dons récurrents (mensuels)" },
      body: [
        {
          en: "You can change the amount, pause, or cancel a monthly donation at any time before its next processing date, from your donor account once available, or by contacting us. Cancelling stops future charges; it doesn't refund past ones (see section 2).",
          fr: "Vous pouvez modifier le montant, suspendre ou annuler un don mensuel en tout temps avant sa prochaine date de traitement, depuis votre espace donateur une fois disponible, ou en nous contactant. L'annulation arrête les prélèvements futurs; elle ne rembourse pas les dons déjà effectués (voir la section 2).",
        },
      ],
    },
    {
      heading: { en: "4. How your gift is allocated", fr: "4. Affectation de votre don" },
      body: [
        {
          en: "You may direct your gift to \"where the need is greatest,\" to a program area (education, nutrition, healthcare), or to a specific active project. We honor your designation whenever possible. If a project you supported becomes fully funded, is cancelled, or can no longer proceed as planned, we will redirect your gift to the most closely related active work, consistent with CRA's requirements for how a registered charity may use directed gifts.",
          fr: "Vous pouvez orienter votre don « là où le besoin est le plus grand », vers un domaine de programme (éducation, nutrition, santé) ou vers un projet actif précis. Nous respectons votre choix dans la mesure du possible. Si un projet que vous avez soutenu est entièrement financé, annulé ou ne peut plus se poursuivre comme prévu, nous réorienterons votre don vers l'action active la plus étroitement liée, conformément aux exigences de l'ARC quant à l'utilisation des dons dirigés par un organisme de bienfaisance enregistré.",
        },
      ],
    },
    {
      heading: { en: "5. Tax receipts", fr: "5. Reçus fiscaux" },
      body: [
        {
          en: "We issue an official donation receipt for eligible gifts of $20 or more (a common practice, not a CRA minimum — you're welcome to request one for a smaller gift). Receipts are issued per the numbering and issuance procedure in docs/receipt-issuance-procedure.md, and only once our CRA registration is active — receipting before registration would make the receipt invalid.",
          fr: "Nous émettons un reçu officiel de don pour les dons admissibles de 20 $ ou plus (une pratique courante, non un minimum imposé par l'ARC — vous pouvez en demander un pour un don moindre). Les reçus sont émis selon la procédure de numérotation et d'émission décrite dans docs/receipt-issuance-procedure.md, et seulement une fois notre enregistrement auprès de l'ARC actif — émettre un reçu avant l'enregistrement le rendrait invalide.",
        },
      ],
    },
    {
      heading: { en: "6. Currency and processing", fr: "6. Devise et traitement" },
      body: [
        {
          en: "Donations are accepted in CAD or USD and processed by Stripe. Card issuer or bank fees related to currency conversion are outside our control.",
          fr: "Les dons sont acceptés en CAD ou en USD et traités par Stripe. Les frais de conversion de devises imposés par votre institution financière ou l'émetteur de votre carte échappent à notre contrôle.",
        },
      ],
    },
    {
      heading: { en: "7. Record retention", fr: "7. Conservation des documents" },
      body: [
        {
          en: "Copies of official donation receipts are kept for a minimum of 2 years from the end of the calendar year the donation was received. Underlying financial ledgers and vouchers are kept for 6 years from the end of the relevant tax year. Governance records are kept for as long as we're a registered charity, plus 2 years — all per current CRA record-keeping requirements, not a blanket policy applied to every document type.",
          fr: "Les copies des reçus officiels de don sont conservées pendant au moins 2 ans à compter de la fin de l'année civile où le don a été reçu. Les registres financiers et pièces justificatives sous-jacents sont conservés pendant 6 ans à compter de la fin de l'année d'imposition concernée. Les documents de gouvernance sont conservés aussi longtemps que nous sommes un organisme de bienfaisance enregistré, plus 2 ans — le tout selon les exigences actuelles de l'ARC en matière de tenue de documents, et non une règle uniforme appliquée à tout type de document.",
        },
      ],
    },
    {
      heading: { en: "8. Contact", fr: "8. Contact" },
      body: [
        { en: "Questions about a donation: noafricanchildleftbehind@outlook.com.", fr: "Questions concernant un don : noafricanchildleftbehind@outlook.com." },
      ],
    },
  ],
};
