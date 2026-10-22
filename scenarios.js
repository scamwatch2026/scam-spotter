javascript 

const scenarios = [
  {
    id: 1,
    title: "The unexpected parcel message",
    description:
      "You receive a text message saying your parcel is delayed. It asks you to click a link and pay a small delivery fee.",

    answers: [
      "Click the link and pay the fee.",
      "Check with the delivery company using its official website or app.",
      "Ask how long it will be so you can prepare for the arrival."
    ],

    correctAnswer: 1,

    explanation:
      "This could be a parcel delivery scam. Unexpected messages asking you to pay through a link are a warning sign. Check directly with the delivery company using contact details you find independently."
  },

  {
    id: 2,
    title: "The urgent bank phone call",
    description:
      "Someone calls claiming to work for your bank. They say your account is at risk and ask you to tell them a one-time security code sent to your phone.",

    answers: [
      "Tell the caller the code so they can protect your account.",
      "Ask whats wrong with your account.",
      "End the call and contact your bank using the number on your bank card or official website."
    ],

    correctAnswer: 2,

    explanation:
      "This could be an impersonation scam. Scammers create urgency to pressure people into revealing security codes. End the call and contact your bank using a trusted number. Never share a one-time security code with an unexpected caller."
  },

  {
    id: 3,
    title: "The too-good-to-be-true investment",
    description:
      "A stranger on social media promises you a guaranteed, very high investment return. They pressure you to transfer money today to avoid missing out.",

    answers: [
      "Transfer the money immediately before the offer ends.",
      "Pause, independently check the investment and the provider, and seek trusted advice before sending any money.",
      "contact the provider about this offer to see if it's true."
    ],

    correctAnswer: 1,

    explanation:
      "Guaranteed high returns, pressure to act quickly and unsolicited investment offers are warning signs. Do not rush or send money based on a stranger's claims. Independently check the provider and seek advice from a trusted, qualified professional."
  }
];
