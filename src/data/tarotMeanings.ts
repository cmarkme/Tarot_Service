/**export type CardMeaning = {
  past: string;
  present: string;
  future: string;
  combined: string;
  deep: string;
};


export const TAROT_MEANINGS: Record<string, TarotMeaning> = {
  "The Fool": {
    past: "A time of innocence or a leap of faith that shaped your current path.",
    present: "You are standing at the edge of something new. Trust yourself.",
    future: "An unexpected opportunity will require courage and openness.",
    combined: "Your journey is moving from curiosity into conscious choice. Growth comes from trusting the unknown.",
    deep: "The Fool across your spread suggests a soul-level reset. You are being asked to release fear, embrace vulnerability, and step forward without guarantees. This is not recklessness — it is alignment.",
    upright: "New beginnings, spontaneity, faith, taking a leap.",
    reversed: "Recklessness, naivety, poor planning.",
    keywords: ["beginnings", "freedom", "trust"],
  },

  "The Magician": {
    past: "You learned how powerful focused intention can be.",
    present: "You have the tools you need right now. Act with confidence.",
    future: "Your actions will manifest tangible results soon.",
    combined: "Your thoughts are becoming reality faster than you realise.",
    deep: "The Magician signals mastery. When paired with other cards, it amplifies themes of agency, communication, and creation. This is a reminder that you are not passive in your destiny.",
    upright: "Skill, willpower, manifestation, focused action.",
    reversed: "Manipulation, scattered energy, untapped potential.",
  }

**/

// src/data/tarotMeanings.ts
export type TarotMeaning = {
  upright: string;
  reversed?: string;
  keywords?: string[];
  long?: string;
  past: string;
  present: string;
  future: string;
  combined: string;
  deep: string;
};

export const TAROT_MEANINGS: Record<string, TarotMeaning> = {
 "00": {
    upright: "New beginnings, spontaneity, faith, taking a leap.",
    reversed: "Recklessness, naivety, poor planning.",
    keywords: ["beginnings", "freedom", "trust"],
    past: "A time of innocence or a leap of faith that shaped your current path.",
    present: "You are standing at the edge of something new. Trust yourself.",
    future: "An unexpected opportunity will require courage and openness.",
    combined: "Your journey is moving from curiosity into conscious choice. Growth comes from trusting the unknown.",
    deep: "The Fool across your spread suggests a soul-level reset. You are being asked to release fear, embrace vulnerability, and step forward without guarantees. This is not recklessness — it is alignment.",
  },

  "01": {
    upright: "Skill, willpower, manifestation, focused action.",
    reversed: "Manipulation, scattered energy, untapped potential.",
    keywords: ["focus", "agency", "creation"],
    past: "You learned how powerful focused intention can be.",
    present: "You have the tools you need right now. Act with confidence.",
    future: "Your actions will manifest tangible results soon.",
    combined: "Your thoughts are becoming reality faster than you realise.",
    deep: "The Magician signals mastery. When paired with other cards, it amplifies themes of agency, communication, and creation. This is a reminder that you are not passive in your destiny.",
  },

  // ───────────── Major Arcana ─────────────
  "02": {
    upright: "Inner knowing, intuition, quiet wisdom, hidden insight.",
    reversed: "Doubt, secrecy, ignoring your gut, emotional fog.",
    keywords: ["intuition", "mystery", "stillness"],
    past: "A subtle sign or secret truth has been shaping events behind the scenes.",
    present: "Slow down. Listen to the feeling beneath the noise.",
    future: "What’s unclear now will reveal itself at the right time.",
    combined: "This spread asks for patience and trust in your inner compass.",
    deep: "The High Priestess invites you to protect your energy, observe patterns, and let truth arrive naturally rather than forcing certainty.",
  },

  "03": {
    upright: "Nurturing growth, creativity, comfort, abundance.",
    reversed: "Overgiving, stagnation, creative block, smothering control.",
    keywords: ["nurture", "creation", "abundance"],
    past: "Support or care you received (or gave) still impacts your choices today.",
    present: "Create space for growth — for yourself and what you love.",
    future: "A fertile period is coming; invest in what truly matters.",
    combined: "When you nourish the right thing, results come naturally.",
    deep: "The Empress highlights embodiment: rest, pleasure, and creativity are not distractions — they are the fuel for your next level.",
  },

  "04": {
    upright: "Structure, leadership, boundaries, responsibility.",
    reversed: "Rigidity, control issues, instability, authority conflict.",
    keywords: ["order", "boundaries", "leadership"],
    past: "A rule, expectation, or authority figure set the tone for your current situation.",
    present: "Decide what you will and won’t allow. Lead yourself first.",
    future: "Stability comes through planning and consistent standards.",
    combined: "Strong foundations beat quick wins — build smart, not fast.",
    deep: "The Emperor asks for mature power: disciplined action, clear boundaries, and a calm, steady presence that others can rely on.",
  },

  "05": {
    upright: "Tradition, learning, guidance, shared values.",
    reversed: "Rebellion, blind obedience, outdated beliefs, hypocrisy.",
    keywords: ["teaching", "values", "community"],
    past: "A belief system or mentor shaped your path and habits.",
    present: "Seek advice — but keep your personal truth intact.",
    future: "A formal commitment or lesson will bring clarity.",
    combined: "Align your choices with values that still feel alive and real.",
    deep: "The Hierophant encourages intentional learning: choose the teachers, systems, and commitments that support your growth — not your fear.",
  },

  "06": {
    upright: "Connection, choice, harmony, meaningful partnership.",
    reversed: "Disharmony, temptation, misalignment, indecision.",
    keywords: ["choice", "union", "alignment"],
    past: "A relationship choice (or missed choice) set this storyline in motion.",
    present: "Choose what supports your heart and your self-respect.",
    future: "A bond deepens — or a decision clarifies who belongs in your life.",
    combined: "This spread is about alignment: love that fits your values.",
    deep: "The Lovers isn’t only romance — it’s integrity. Your best outcome comes when desire and values point in the same direction.",
  },

  "07": {
    upright: "Momentum, determination, victory through discipline.",
    reversed: "Scattered energy, ego-drive, stalling, lack of direction.",
    keywords: ["drive", "focus", "progress"],
    past: "You proved you can push through — but the cost taught you something.",
    present: "Pick a direction and commit. Don’t split your power.",
    future: "A breakthrough arrives when effort becomes consistent.",
    combined: "Win by steering your energy, not by forcing the world.",
    deep: "The Chariot asks for emotional control and focused action: success comes when your inner forces work as one team.",
  },

  "08": {
    upright: "Courage, patience, gentle power, resilience.",
    reversed: "Self-doubt, impatience, harshness, suppressed anger.",
    keywords: ["courage", "calm", "endurance"],
    past: "You survived something that made you stronger than you realised.",
    present: "Use soft strength: calm, steady, and unshakable.",
    future: "A test appears — and you pass by staying grounded.",
    combined: "Your power grows when you respond, not react.",
    deep: "Strength is mastery of the nervous system. Lead with compassion, tame fear with breath, and your confidence becomes real.",
  },

  "09": {
    upright: "Solitude, reflection, wisdom, inner guidance.",
    reversed: "Isolation, avoidance, overthinking, withdrawal.",
    keywords: ["reflection", "wisdom", "clarity"],
    past: "Time alone helped you understand what you truly need.",
    present: "Step back from noise; answers come in quiet.",
    future: "A valuable insight arrives after a pause, not a push.",
    combined: "This spread rewards patience and deep self-honesty.",
    deep: "The Hermit calls you to simplify: remove distractions until the next step feels obvious in your body.",
  },

  "10": {
    upright: "Change, cycles, fate, turning point, opportunity.",
    reversed: "Resistance to change, bad timing, repeating patterns.",
    keywords: ["cycle", "shift", "chance"],
    past: "A twist of fate put you on a new track.",
    present: "Don’t cling. Work with the cycle instead of against it.",
    future: "A lucky break appears — be ready to say yes.",
    combined: "What feels random is forming a pattern you can use.",
    deep: "Wheel of Fortune reminds you: you can’t control the wheel, but you can control your timing, attitude, and preparation.",
  },

  "11": {
    upright: "Fairness, truth, balance, accountability.",
    reversed: "Bias, denial, unfairness, avoiding consequences.",
    keywords: ["truth", "balance", "integrity"],
    past: "An old decision is now returning for closure.",
    present: "Tell the truth — to yourself first, then others.",
    future: "A situation resolves cleanly when you act with integrity.",
    combined: "Your best outcome comes from honesty and clear boundaries.",
    deep: "Justice asks you to align actions with values. When you do, confusion evaporates and next steps become simple.",
  },

  "12": {
    upright: "Pause, surrender, new perspective, letting go.",
    reversed: "Stuckness, martyrdom, impatience, refusing to see.",
    keywords: ["pause", "perspective", "release"],
    past: "A delay taught you what rushing would have cost.",
    present: "Stop forcing it. Reframe the situation from a new angle.",
    future: "Clarity comes after you release control and wait a beat.",
    combined: "Your spread says: don’t push — pivot your perspective.",
    deep: "The Hanged Man is strategic surrender: when you stop fighting reality, you can finally see the smartest move.",
  },

  "13": {
    upright: "Endings, transformation, shedding the old, rebirth.",
    reversed: "Clinging, fear of change, prolonged stagnation.",
    keywords: ["release", "rebirth", "change"],
    past: "Something ended — and it quietly made room for growth.",
    present: "Let the old version of you die with dignity.",
    future: "A clean transformation brings a fresh beginning.",
    combined: "This spread is a reset. Release what you’ve outgrown.",
    deep: "Death is not punishment — it’s evolution. When you stop resisting, transformation becomes relief.",
  },

  "14": {
    upright: "Balance, healing, moderation, harmony over extremes.",
    reversed: "Imbalance, overindulgence, impatience, mixed signals.",
    keywords: ["balance", "healing", "flow"],
    past: "You’ve been learning how to stabilise after chaos.",
    present: "Small steady steps beat dramatic swings.",
    future: "A peaceful outcome forms as you blend opposing needs.",
    combined: "Your reading points to equilibrium: pace yourself.",
    deep: "Temperance teaches energetic alchemy: combine wisdom and desire until your life feels sustainable — not just exciting.",
  },

  "15": {
    upright: "Attachment, temptation, shadow patterns, obsession.",
    reversed: "Breaking free, release, reclaiming power, clarity.",
    keywords: ["shadow", "bondage", "desire"],
    past: "A craving or fear loop has been running longer than you thought.",
    present: "Name what has control over you — then take your power back.",
    future: "Freedom arrives when you choose truth over comfort.",
    combined: "This spread is about liberation: stop feeding what drains you.",
    deep: "The Devil reveals the deal you’ve been making. Rewrite the agreement: choose self-respect, boundaries, and honest desire.",
  },

  "16": {
    upright: "Sudden change, truth revealed, breakdown to breakthrough.",
    reversed: "Avoiding the inevitable, fragile foundations, delayed shake-up.",
    keywords: ["revelation", "reset", "truth"],
    past: "A crack in the foundation was always there — now you see it.",
    present: "Don’t patch what’s broken. Rebuild what’s real.",
    future: "A surprise clears the path and removes false stability.",
    combined: "The spread says: truth first, comfort second.",
    deep: "The Tower is reality correction. It hurts when you resist; it liberates when you accept and rebuild with honesty.",
  },

  "17": {
    upright: "Hope, renewal, guidance, calm confidence.",
    reversed: "Discouragement, doubt, losing faith, dimmed vision.",
    keywords: ["hope", "healing", "direction"],
    past: "A healing moment reminded you life can improve.",
    present: "Keep going — your direction is right even if slow.",
    future: "A wish or goal becomes realistic with consistent effort.",
    combined: "This spread points toward light after heaviness.",
    deep: "The Star is quiet destiny: align daily actions with your future self and your path becomes obvious.",
  },

  "18": {
    upright: "Intuition, dreams, uncertainty, deep emotions.",
    reversed: "Confusion clearing, fear dissolving, deception revealed.",
    keywords: ["mystery", "emotion", "dreams"],
    past: "Mixed signals or hidden fears influenced past decisions.",
    present: "Don’t decide from anxiety. Check facts and feelings carefully.",
    future: "The fog lifts; what was hidden becomes clear.",
    combined: "Your reading says: pause, verify, and trust your deeper sensing.",
    deep: "The Moon is nervous-system tarot. Ground yourself, reduce assumptions, and let reality confirm what intuition suggests.",
  },

  "19": {
    upright: "Joy, success, warmth, visibility, vitality.",
    reversed: "Ego flare-ups, burnout, false optimism, delayed happiness.",
    keywords: ["joy", "success", "confidence"],
    past: "A bright moment showed you what’s possible for you.",
    present: "Lead with confidence; you’re more supported than you think.",
    future: "A win becomes public or undeniable — enjoy it fully.",
    combined: "Your spread leans positive: momentum and clarity are returning.",
    deep: "The Sun is permission to be seen. Let yourself shine without shrinking — joy is part of your path.",
  },

  "20": {
    upright: "Awakening, calling, reckoning, new chapter.",
    reversed: "Avoiding the call, self-judgment, stuck in the past.",
    keywords: ["awakening", "choice", "renewal"],
    past: "A wake-up moment changed your priorities.",
    present: "Answer what life is asking of you — you already know.",
    future: "A fresh chapter begins after closure and forgiveness.",
    combined: "This reading signals: choose growth over old guilt.",
    deep: "Judgement is a higher invitation. Drop self-criticism and act from purpose; your life expands when you say yes to your calling.",
  },

  "21": {
    upright: "Completion, integration, success, wholeness.",
    reversed: "Loose ends, delay, unfinished business, fear of finishing.",
    keywords: ["completion", "mastery", "integration"],
    past: "You’ve come farther than you credit yourself for.",
    present: "Gather the pieces — you’re ready to complete the cycle.",
    future: "A major goal closes successfully; a new level opens.",
    combined: "This spread says: finish strong and celebrate progress.",
    deep: "The World is earned peace. Integration is the lesson: bring all parts of yourself into the next chapter without apology.",
  },

  // ───────────── Cups ─────────────
  "Cups01": {
    upright: "Emotional renewal, open heart, love offered, compassion.",
    reversed: "Emotional block, guarded heart, numbness, overwhelm.",
    keywords: ["love", "healing", "openness"],
    past: "A tender feeling began this story — or wanted to, but was withheld.",
    present: "Let yourself feel. Connection starts with honesty.",
    future: "A heartfelt offer arrives. Receive it without suspicion.",
    combined: "This spread wants softness: healing comes through openness.",
    deep: "Ace of Cups is emotional truth. Practice expressing needs clearly and you’ll attract safer, healthier connection.",
  },

  "Cups02": {
    upright: "Mutual attraction, harmony, partnership, emotional balance.",
    reversed: "Misalignment, poor communication, one-sided effort.",
    keywords: ["union", "bond", "balance"],
    past: "A bond formed that still influences your expectations of love.",
    present: "Meet halfway — but don’t carry what isn’t yours.",
    future: "A connection deepens when you speak honestly.",
    combined: "Your reading highlights partnership: alignment over chasing.",
    deep: "Two of Cups is reciprocity. Look for equal effort, shared values, and calm nervous-system safety.",
  },

  "Cups03": {
    upright: "Celebration, friendship, support, shared joy.",
    reversed: "Overindulgence, gossip, feeling left out, shallow bonds.",
    keywords: ["friends", "joy", "support"],
    past: "Community helped you through more than you realised.",
    present: "Say yes to connection — you don’t have to do it alone.",
    future: "Good news or celebration is coming; let yourself enjoy it.",
    combined: "This spread says: your people matter — reach out.",
    deep: "Three of Cups is emotional nourishment through community. Healthy love thrives when life is bigger than one relationship.",
  },

  "Cups04": {
    upright: "Reflection, reevaluating, emotional pause, boredom with the old.",
    reversed: "New interest, gratitude, re-engagement, clarity returning.",
    keywords: ["pause", "choice", "attention"],
    past: "A missed opportunity taught you what you truly value.",
    present: "Look again — what you want may already be near.",
    future: "A fresh option appears once you release the sulk or fatigue.",
    combined: "Your reading suggests: shift attention and re-open possibility.",
    deep: "Four of Cups is an invitation to presence. Gratitude unlocks momentum; resentment locks you in place.",
  },

  "Cups05": {
    upright: "Grief, regret, focusing on loss, emotional heaviness.",
    reversed: "Acceptance, recovery, hope returning, learning from pain.",
    keywords: ["grief", "healing", "release"],
    past: "A disappointment still echoes in how you protect your heart.",
    present: "Acknowledge the loss — but don’t ignore what remains.",
    future: "Healing comes when you re-invest in life.",
    combined: "This spread is about recovery: feel it, then move forward.",
    deep: "Five of Cups is emotional processing. You’re not broken — you’re integrating. Choose repair over replay.",
  },

  "Cups06": {
    upright: "Nostalgia, memories, sweetness, innocence, reconnection.",
    reversed: "Stuck in the past, idealising, outgrowing old stories.",
    keywords: ["memories", "kindness", "past"],
    past: "A past connection or memory still shapes your emotional baseline.",
    present: "Bring warmth into today without living in yesterday.",
    future: "A reconnection or gentle moment restores your faith.",
    combined: "Your reading says: soften, forgive, and keep moving forward.",
    deep: "Six of Cups is healing through kindness. Let the past inform you — not define you.",
  },

  "Cups07": {
    upright: "Choices, fantasy, many options, emotional overwhelm.",
    reversed: "Decision, clarity, fewer distractions, grounded choice.",
    keywords: ["choices", "clarity", "focus"],
    past: "Too many options once delayed action or commitment.",
    present: "Pick one path. Fantasy doesn’t replace follow-through.",
    future: "Clarity arrives when you reduce distractions and choose.",
    combined: "This spread says: simplify. Choose the real over the shiny.",
    deep: "Seven of Cups is a focus test. Your best life comes from one brave decision, not ten half-steps.",
  },

  "Cups08": {
    upright: "Walking away, emotional maturity, seeking deeper meaning.",
    reversed: "Avoidance, fear of change, returning, unfinished feelings.",
    keywords: ["departure", "truth", "growth"],
    past: "You outgrew something emotionally and it changed your standards.",
    present: "If it’s empty, admit it. You deserve depth.",
    future: "A new path appears when you stop settling.",
    combined: "Your reading points to growth through honest endings.",
    deep: "Eight of Cups is self-respect in action. Leave the half-love behind and pursue the life that feels true.",
  },

  "Cups09": {
    upright: "Contentment, wishes, satisfaction, pleasure.",
    reversed: "Overindulgence, dissatisfaction, wanting more, emptiness.",
    keywords: ["wish", "pleasure", "gratitude"],
    past: "A past win showed you what satisfaction feels like.",
    present: "Enjoy what you have — and define what “enough” means.",
    future: "A desire can be fulfilled if you stay consistent and grateful.",
    combined: "This spread says: contentment attracts more contentment.",
    deep: "Nine of Cups is emotional self-trust. You don’t need permission to want what you want — just honesty and boundaries.",
  },

  "Cups10": {
    upright: "Harmony, love, family joy, emotional fulfillment.",
    reversed: "Tension at home, unrealistic expectations, conflict.",
    keywords: ["home", "joy", "bond"],
    past: "You’ve been learning what healthy love looks like.",
    present: "Choose peace and connection over being right.",
    future: "A happier emotional chapter builds through consistent care.",
    combined: "Your reading points to lasting happiness through shared values.",
    deep: "Ten of Cups is aligned love. Prioritise emotional safety and shared vision — that’s what makes it real.",
  },

  "Cups11": {
    upright: "Curiosity, emotional messages, imagination, sweet surprises.",
    reversed: "Immaturity, mixed signals, escapism, sensitivity overload.",
    keywords: ["message", "wonder", "feeling"],
    past: "A small message or moment sparked bigger feelings.",
    present: "Stay open but grounded — don’t overread every sign.",
    future: "A playful offer or emotional invitation appears.",
    combined: "This spread says: be gentle and curious with your heart.",
    deep: "Page of Cups invites vulnerability. Express feelings simply — clarity builds intimacy.",
  },

  "Cups12": {
    upright: "Romance, charm, following the heart, emotional movement.",
    reversed: "Moodiness, idealising, inconsistency, avoidance.",
    keywords: ["romance", "flow", "invitation"],
    past: "A romantic dream or hope shaped your expectations.",
    present: "Let the heart lead — but keep your boundaries intact.",
    future: "An invitation arrives; respond with honesty, not fantasy.",
    combined: "Your reading suggests emotional momentum is returning.",
    deep: "Knight of Cups is a heart-led journey. Choose love that is consistent, not just poetic.",
  },

  "Cups13": {
    upright: "Compassion, emotional maturity, intuition, nurturing presence.",
    reversed: "Overgiving, emotional dependency, absorbing others’ moods.",
    keywords: ["empathy", "intuition", "care"],
    past: "You learned to care deeply — sometimes at your own expense.",
    present: "Protect your energy while staying kind.",
    future: "Emotional stability grows when you choose boundaries.",
    combined: "This spread says: nurture yourself as much as others.",
    deep: "Queen of Cups is the art of emotional containment. Feel everything — but don’t drown in it.",
  },

  "Cups14": {
    upright: "Emotional leadership, stability, generosity, calm authority.",
    reversed: "Emotional suppression, volatility, controlling behavior.",
    keywords: ["stability", "support", "wisdom"],
    past: "You carried emotional responsibility before you were ready.",
    present: "Lead with calm — your steadiness changes the outcome.",
    future: "A stable connection forms when emotions are handled maturely.",
    combined: "This spread calls for emotional responsibility and respect.",
    deep: "King of Cups is mastery: compassionate honesty, steady boundaries, and the ability to hold emotion without being ruled by it.",
  },

  // ───────────── Pentacles ─────────────
  "Pentacles01": {
    upright: "New opportunity, practical beginning, grounded growth.",
    reversed: "Missed chance, poor planning, instability, hesitation.",
    keywords: ["opportunity", "grounding", "growth"],
    past: "A practical step started this path — even if small.",
    present: "Invest in what’s real: time, skills, and consistency.",
    future: "A solid opportunity arrives if you stay prepared.",
    combined: "This spread points to steady progress through practical action.",
    deep: "Ace of Pentacles is the seed. Treat small routines like sacred commitments and the results compound.",
  },

  "Pentacles02": {
    upright: "Balance, adaptability, juggling priorities, flexibility.",
    reversed: "Overwhelm, disorganisation, dropping the ball, chaos.",
    keywords: ["balance", "adapt", "priorities"],
    past: "You learned to manage change by staying flexible.",
    present: "Simplify your schedule. Keep only what matters.",
    future: "Stability returns when you stop overcommitting.",
    combined: "This spread says: balance comes from choosing, not juggling.",
    deep: "Two of Pentacles is time-and-energy tarot. Protect your bandwidth and your life becomes easier to steer.",
  },

  "Pentacles03": {
    upright: "Teamwork, skill, collaboration, building something real.",
    reversed: "Poor coordination, ego clashes, uneven effort.",
    keywords: ["team", "skill", "build"],
    past: "A shared project taught you the value of real cooperation.",
    present: "Ask for help or share the load — it improves the outcome.",
    future: "A practical win comes through collaboration.",
    combined: "This spread highlights: success is built, not wished for.",
    deep: "Three of Pentacles rewards mastery and humility: learn, iterate, collaborate — and the structure holds.",
  },

  "Pentacles04": {
    upright: "Security, saving, boundaries, holding what you value.",
    reversed: "Clinging, scarcity mindset, fear of loss, rigidity.",
    keywords: ["security", "boundaries", "control"],
    past: "A fear of loss influenced how you protected yourself.",
    present: "Secure your foundation — but don’t squeeze the joy out of life.",
    future: "Stability grows when you trust enough to share.",
    combined: "Your spread says: balance security with openness.",
    deep: "Four of Pentacles asks: are you protecting value — or protecting fear? Choose the healthier version of safety.",
  },

  "Pentacles05": {
    upright: "Hard times, feeling left out, worry, material stress.",
    reversed: "Recovery, support found, resilience, hope returning.",
    keywords: ["challenge", "support", "rebuild"],
    past: "A difficult period shaped your fears and survival habits.",
    present: "You’re not alone — ask for help or accept support.",
    future: "Conditions improve as you rebuild step by step.",
    combined: "This spread says: support exists — don’t suffer in silence.",
    deep: "Five of Pentacles is about belonging. Receive help without shame; stability is built with community too.",
  },

  "Pentacles06": {
    upright: "Giving and receiving, generosity, fairness, exchange.",
    reversed: "Debt, imbalance, strings attached, uneven effort.",
    keywords: ["exchange", "fairness", "support"],
    past: "An imbalance taught you to value fairness.",
    present: "Set clear terms: give where it’s appreciated and returned.",
    future: "A fair exchange improves your security.",
    combined: "Your reading highlights reciprocity — emotionally and practically.",
    deep: "Six of Pentacles asks you to upgrade your standards: equal effort, clear agreements, and respectful exchange.",
  },

  "Pentacles07": {
    upright: "Patience, long-term growth, evaluation, slow payoff.",
    reversed: "Impatience, frustration, quitting too soon, poor timing.",
    keywords: ["patience", "growth", "review"],
    past: "You planted seeds — some are only now starting to show.",
    present: "Review results and adjust rather than abandoning the plan.",
    future: "A payoff arrives if you keep tending the process.",
    combined: "This spread says: trust slow progress and refine your approach.",
    deep: "Seven of Pentacles is compounding: consistent effort beats intensity. Stay with what works and prune what doesn’t.",
  },

  "Pentacles08": {
    upright: "Craft, skill-building, dedication, improvement through practice.",
    reversed: "Boredom, shortcuts, lack of commitment, sloppy work.",
    keywords: ["craft", "practice", "discipline"],
    past: "You learned that skill grows through repetition, not hype.",
    present: "Focus on the next small improvement.",
    future: "Mastery brings opportunity and respect.",
    combined: "Your spread says: work the process and results follow.",
    deep: "Eight of Pentacles is mastery tarot. Treat your daily habits like training and your future self becomes inevitable.",
  },

  "Pentacles09": {
    upright: "Independence, comfort, self-worth, enjoying rewards.",
    reversed: "Loneliness, overspending, insecurity, dependence.",
    keywords: ["independence", "value", "reward"],
    past: "You learned to rely on yourself — and it changed your confidence.",
    present: "Enjoy what you’ve built. You earned this stability.",
    future: "More comfort arrives through consistent self-respect.",
    combined: "This reading supports self-sufficiency and grounded pleasure.",
    deep: "Nine of Pentacles is self-worth in action. Choose environments and people that match your standards — not your fears.",
  },

  "Pentacles10": {
    upright: "Legacy, family wealth, long-term security, home stability.",
    reversed: "Family tension, instability, short-term thinking, broken trust.",
    keywords: ["legacy", "home", "security"],
    past: "Family patterns shaped your view of safety and success.",
    present: "Build for the long term — habits, savings, relationships.",
    future: "A stable chapter forms when you plan beyond the moment.",
    combined: "Your spread suggests lasting security is possible with consistency.",
    deep: "Ten of Pentacles is generational healing. Break patterns, build assets, and choose relationships that support your long game.",
  },

  "Pentacles11": {
    upright: "New study, practical plans, steady curiosity, opportunity.",
    reversed: "Procrastination, lack of focus, unrealistic goals.",
    keywords: ["study", "plan", "start"],
    past: "A small opportunity taught you what you want to build.",
    present: "Start simple. Learn as you go and keep it practical.",
    future: "A new path opens through skill and consistency.",
    combined: "This spread says: begin — and refine along the way.",
    deep: "Page of Pentacles is slow magic. Invest in skills and routines; your future becomes a logical result.",
  },

  "Pentacles12": {
    upright: "Reliability, steady progress, responsibility, patience.",
    reversed: "Stagnation, stubbornness, laziness, fear of change.",
    keywords: ["steady", "reliable", "patient"],
    past: "Slow effort kept you going when motivation didn’t.",
    present: "Consistency is your advantage — keep the pace.",
    future: "A dependable outcome forms through steady work.",
    combined: "Your reading favors the long game over quick wins.",
    deep: "Knight of Pentacles is disciplined energy. Success is boring until it’s undeniable — keep going.",
  },

  "Pentacles13": {
    upright: "Nurturing abundance, grounded care, resourcefulness.",
    reversed: "Overcontrol, work-life imbalance, neglecting needs.",
    keywords: ["nurture", "home", "resource"],
    past: "You learned how to create comfort — sometimes by carrying too much.",
    present: "Care for yourself the way you care for others.",
    future: "Stability grows as you simplify and prioritise wellbeing.",
    combined: "This spread says: build comfort without burnout.",
    deep: "Queen of Pentacles is practical love. Create routines that support your body, your space, and your peace.",
  },

  "Pentacles14": {
    upright: "Provider energy, practical leadership, stability, protection.",
    reversed: "Work obsession, rigidity, controlling behavior, insecurity.",
    keywords: ["stability", "leadership", "provider"],
    past: "A responsibility shaped your identity and standards.",
    present: "Lead with steadiness — and don’t forget warmth.",
    future: "Security increases through smart planning and consistency.",
    combined: "This spread points to practical stability and mature choices.",
    deep: "King of Pentacles is sustainable power: build wealth, build trust, and build a life that feels safe and enjoyable.",
  },

  // ───────────── Swords ─────────────
  "Swords01": {
    upright: "Clarity, truth, breakthrough, decisive thinking.",
    reversed: "Confusion, harsh words, mental overload, poor judgment.",
    keywords: ["clarity", "truth", "decision"],
    past: "A truth changed how you see the situation.",
    present: "Be direct. Clear choices create clean outcomes.",
    future: "A breakthrough arrives when you speak honestly.",
    combined: "Your spread says: cut through noise and choose truth.",
    deep: "Ace of Swords is clean thinking. Name the real problem and half the battle is over.",
  },

  "Swords02": {
    upright: "Stalemate, careful choice, guarded heart, pause.",
    reversed: "Decision made, openness, tension released.",
    keywords: ["choice", "pause", "balance"],
    past: "Avoiding a decision kept peace — but delayed progress.",
    present: "You can’t avoid this forever. Choose with self-respect.",
    future: "Clarity arrives once you stop pretending it’s fine.",
    combined: "This reading highlights a decision point — choose consciously.",
    deep: "Two of Swords is nervous-system protection. Gently face the truth and decide from calm, not fear.",
  },

  "Swords03": {
    upright: "Heartbreak, truth that hurts, grief, emotional pain.",
    reversed: "Healing, forgiveness, moving on, recovery.",
    keywords: ["grief", "truth", "healing"],
    past: "A painful truth shaped your defenses.",
    present: "Let the feeling move through — don’t freeze it inside.",
    future: "Healing comes through honest closure.",
    combined: "Your spread says: feel it fully, then release it.",
    deep: "Three of Swords is emotional detox. You’re not weak for feeling — you’re strong for processing and moving forward.",
  },

  "Swords04": {
    upright: "Rest, recovery, pause, mental reset.",
    reversed: "Burnout, restlessness, refusing to slow down.",
    keywords: ["rest", "recovery", "reset"],
    past: "You’ve carried a mental load that needed a break.",
    present: "Rest is productive right now. Recharge your mind.",
    future: "Clarity and strength return after genuine recovery.",
    combined: "This spread recommends slowing down to regain power.",
    deep: "Four of Swords is nervous-system healing. Your next move improves when your mind is calm.",
  },

  "Swords05": {
    upright: "Conflict, ego battles, winning at a cost, tension.",
    reversed: "Reconciliation, choosing peace, learning lessons.",
    keywords: ["conflict", "ego", "lesson"],
    past: "A conflict taught you what you will no longer tolerate.",
    present: "Choose your battles. Some wins aren’t worth it.",
    future: "A peace offering or boundary creates a better outcome.",
    combined: "Your reading warns against ego-driven decisions.",
    deep: "Five of Swords is about values. Don’t trade self-respect for being right — choose outcomes that preserve dignity.",
  },

  "Swords06": {
    upright: "Transition, moving on, healing journey, calmer waters.",
    reversed: "Stuckness, resistance, dragging the past forward.",
    keywords: ["transition", "healing", "move"],
    past: "You survived a rough chapter and began moving forward.",
    present: "Keep going — the hardest part is behind you.",
    future: "Peace increases as you commit to the new direction.",
    combined: "This spread supports change and gradual healing.",
    deep: "Six of Swords is recovery through movement: change your environment, habits, or mindset and relief arrives.",
  },

  "Swords07": {
    upright: "Strategy, secrecy, avoiding confrontation, self-protection.",
    reversed: "Truth exposed, coming clean, accountability.",
    keywords: ["strategy", "truth", "caution"],
    past: "A hidden choice or private plan influenced where you are now.",
    present: "Be honest about motives — with yourself and others.",
    future: "A truth emerges; choose integrity now to avoid drama later.",
    combined: "Your spread says: be strategic, but don’t betray your values.",
    deep: "Seven of Swords asks: are you protecting yourself or sabotaging trust? Choose clean strategy and honest boundaries.",
  },

  "Swords08": {
    upright: "Feeling trapped, limiting beliefs, mental restriction.",
    reversed: "Release, new options, freedom returning.",
    keywords: ["beliefs", "release", "choice"],
    past: "A fear-based story convinced you you had no options.",
    present: "You have more power than your thoughts suggest.",
    future: "Freedom arrives when you challenge the story.",
    combined: "This spread highlights mental patterns — rewrite them.",
    deep: "Eight of Swords is a mindset prison. Change the belief, and the door opens.",
  },

  "Swords09": {
    upright: "Anxiety, worry, sleepless thoughts, rumination.",
    reversed: "Relief, healing, support, returning calm.",
    keywords: ["anxiety", "mind", "release"],
    past: "Stress built up and became a mental loop.",
    present: "Don’t believe every thought. Ground in reality and breath.",
    future: "Calm returns as you ask for support and simplify.",
    combined: "Your reading suggests nervous-system care and self-kindness.",
    deep: "Nine of Swords is a signal: reduce inputs, talk it out, and treat your mind like a friend — not an enemy.",
  },

  "Swords10": {
    upright: "Ending, collapse, finality, rock bottom then release.",
    reversed: "Recovery, resilience, new dawn, rebuilding.",
    keywords: ["ending", "release", "reset"],
    past: "A hard ending cleared space even if it hurt.",
    present: "Stop reliving what’s over. Choose the next step.",
    future: "A new beginning arrives quickly after you let go.",
    combined: "This spread says: the ending is real — and so is renewal.",
    deep: "Ten of Swords is a clean cut. Accept closure and your energy returns fast.",
  },

  "Swords11": {
    upright: "Curiosity, mental agility, honest questions, learning.",
    reversed: "Gossip, impulsive speech, immaturity, scattered thinking.",
    keywords: ["curious", "learn", "truth"],
    past: "A question changed your worldview.",
    present: "Speak clearly. Ask what you need to know.",
    future: "A conversation brings clarity and momentum.",
    combined: "This spread favors honest dialogue and learning.",
    deep: "Page of Swords invites precision: communicate with integrity and keep your mind sharp — not anxious.",
  },

  "Swords12": {
    upright: "Direct action, courage, fast decisions, bold truth.",
    reversed: "Recklessness, harshness, burnout, impulsivity.",
    keywords: ["action", "truth", "courage"],
    past: "A bold move set everything in motion.",
    present: "Act — but aim carefully. Truth without tact can cut.",
    future: "A quick decision changes the trajectory.",
    combined: "Your reading says: be brave and be wise.",
    deep: "Knight of Swords is intensity. Use that fire to create progress, not conflict.",
  },

  "Swords13": {
    upright: "Clarity, independence, sharp boundaries, honest insight.",
    reversed: "Coldness, bitterness, defensiveness, harsh judgment.",
    keywords: ["clarity", "boundaries", "truth"],
    past: "You learned to protect yourself by seeing reality clearly.",
    present: "Name the truth. Set a boundary without guilt.",
    future: "A cleaner connection forms when standards are clear.",
    combined: "This spread says: clarity is love — confusion is not.",
    deep: "Queen of Swords is mature truth. Don’t abandon kindness, but never abandon discernment.",
  },

  "Swords14": {
    upright: "Authority, mental mastery, fair judgment, strategy.",
    reversed: "Tyranny, rigidity, misuse of logic, cold control.",
    keywords: ["strategy", "authority", "fairness"],
    past: "A lesson in fairness or leadership shaped your expectations.",
    present: "Think long-term and act with integrity.",
    future: "A decision is finalised with clear reasoning and standards.",
    combined: "Your reading favors structure, strategy, and calm leadership.",
    deep: "King of Swords is disciplined mind. Lead with fairness, communicate plainly, and don’t let emotion hijack your plan.",
  },

  // ───────────── Wands ─────────────
  "Wands01": {
    upright: "Inspiration, spark, new passion, creative beginning.",
    reversed: "Delay, lack of drive, scattered energy, burnout.",
    keywords: ["spark", "passion", "start"],
    past: "A spark began this path — even if it felt small.",
    present: "Say yes to what excites you and commit to it.",
    future: "A creative opening appears if you act now.",
    combined: "This spread says: follow the spark and build momentum.",
    deep: "Ace of Wands is creative fire. Feed it with action, not only ideas.",
  },

  "Wands02": {
    upright: "Planning, vision, choosing a direction, personal power.",
    reversed: "Fear of change, stuckness, poor planning.",
    keywords: ["vision", "choice", "plan"],
    past: "You imagined a bigger life — and it never left you.",
    present: "Choose a direction and make a real plan.",
    future: "A new horizon opens as you commit to growth.",
    combined: "Your reading points to expansion through clear choices.",
    deep: "Two of Wands is future-self thinking. Choose the path that stretches you — then take the first step.",
  },

  "Wands03": {
    upright: "Progress, expansion, waiting for results, momentum building.",
    reversed: "Delays, frustration, lack of follow-through.",
    keywords: ["progress", "growth", "momentum"],
    past: "You started something that’s now beginning to pay off.",
    present: "Stay the course — you’re closer than you think.",
    future: "Results arrive as your efforts reach further.",
    combined: "This spread supports growth and steady forward movement.",
    deep: "Three of Wands is the bridge between plan and payoff. Keep moving and keep refining.",
  },

  "Wands04": {
    upright: "Celebration, stability, homecoming, harmony.",
    reversed: "Tension at home, instability, delayed celebration.",
    keywords: ["home", "joy", "stability"],
    past: "A stable base helped you survive uncertain times.",
    present: "Create a peaceful environment — it fuels everything else.",
    future: "A milestone is coming; allow yourself to celebrate.",
    combined: "Your reading suggests stability and shared joy.",
    deep: "Four of Wands is safe love: choose people and spaces that calm your nervous system.",
  },

  "Wands05": {
    upright: "Competition, friction, creative conflict, testing strength.",
    reversed: "Avoiding conflict, inner tension, chaos without direction.",
    keywords: ["conflict", "challenge", "growth"],
    past: "A clash showed you where you need stronger boundaries.",
    present: "Conflict can be constructive if you stay respectful.",
    future: "A challenge strengthens you when you stay focused.",
    combined: "This spread says: don’t fear friction — use it wisely.",
    deep: "Five of Wands is growth through stress. Choose your battles and keep your goal bigger than your ego.",
  },

  "Wands06": {
    upright: "Victory, recognition, confidence, being seen.",
    reversed: "Self-doubt, delayed success, needing validation.",
    keywords: ["victory", "confidence", "recognition"],
    past: "Past success proved you can do hard things.",
    present: "Own your progress — you’re allowed to feel proud.",
    future: "A visible win arrives if you keep showing up.",
    combined: "Your spread suggests recognition and positive momentum.",
    deep: "Six of Wands reminds you: confidence isn’t arrogance — it’s alignment with your effort and growth.",
  },

  "Wands07": {
    upright: "Defending your position, courage, standing firm.",
    reversed: "Giving up, burnout, feeling attacked, weak boundaries.",
    keywords: ["defend", "courage", "boundaries"],
    past: "You fought for something important and it shaped your strength.",
    present: "Hold your ground — but don’t waste energy on nonsense.",
    future: "You’ll win by staying consistent and clear.",
    combined: "This spread says: protect your path and keep going.",
    deep: "Seven of Wands is boundary tarot: say no, stay steady, and let your actions speak louder than arguments.",
  },

  "Wands08": {
    upright: "Fast movement, messages, sudden progress, momentum.",
    reversed: "Delays, miscommunication, rushing, scattered focus.",
    keywords: ["speed", "momentum", "message"],
    past: "A quick change pushed you forward unexpectedly.",
    present: "Act quickly — but keep your intention clear.",
    future: "News arrives and momentum accelerates.",
    combined: "Your reading signals speed: things move fast now.",
    deep: "Eight of Wands is flow state. Reduce hesitation, remove distractions, and ride the wave.",
  },

  "Wands09": {
    upright: "Resilience, persistence, guarded strength, last push.",
    reversed: "Paranoia, exhaustion, defensiveness, giving up too soon.",
    keywords: ["resilience", "persist", "protect"],
    past: "You’ve been through enough to learn you can survive.",
    present: "Rest, then keep going — you’re near the finish line.",
    future: "Success comes from one more honest effort.",
    combined: "This spread says: you’re tired, not defeated.",
    deep: "Nine of Wands is the warrior’s breath. Take care of your body and your boundaries; your strength returns.",
  },

  "Wands10": {
    upright: "Heavy load, responsibility, carrying too much, strain.",
    reversed: "Release, delegation, burnout recovery, simplification.",
    keywords: ["burden", "responsibility", "release"],
    past: "You took on more than you should have — and it became normal.",
    present: "Delegate or drop what isn’t yours to carry.",
    future: "Relief comes when you simplify and reset priorities.",
    combined: "Your reading suggests: lighten the load to move forward.",
    deep: "Ten of Wands is a boundary lesson. You can be committed without being crushed — choose sustainable effort.",
  },

  "Wands11": {
    upright: "Curiosity, enthusiasm, new passion, bold learning.",
    reversed: "Impulsiveness, inconsistency, scattered attention.",
    keywords: ["enthusiasm", "start", "explore"],
    past: "A spark made you brave enough to begin.",
    present: "Take action — even small steps build confidence.",
    future: "A new interest becomes a real path if you commit.",
    combined: "This spread encourages playful action and momentum.",
    deep: "Page of Wands is beginner magic. Stay curious, stay brave, and let action teach you.",
  },

  "Wands12": {
    upright: "Bold action, adventure, ambition, fast progress.",
    reversed: "Recklessness, impatience, ego-drive, burnout risk.",
    keywords: ["bold", "action", "drive"],
    past: "A bold move proved you’re capable of more than fear says.",
    present: "Take the leap — but aim and plan.",
    future: "Momentum builds quickly once you commit.",
    combined: "Your reading favors brave action with clear direction.",
    deep: "Knight of Wands is fire energy. Lead with purpose, not impulse, and the world responds.",
  },

  "Wands13": {
    upright: "Confidence, leadership, warmth, creative authority.",
    reversed: "Jealousy, insecurity, drama, controlling behavior.",
    keywords: ["leadership", "confidence", "creation"],
    past: "You learned to lead by example — even when uncertain.",
    present: "Own your power. You don’t need to shrink to be loved.",
    future: "A creative or social win arrives through confident presence.",
    combined: "This spread says: step into leadership and stay authentic.",
    deep: "Queen of Wands is magnetic confidence. When you honour yourself, the right people and opportunities align naturally.",
  },

  "Wands14": {
    upright: "Visionary leadership, bold mastery, passion with control.",
    reversed: "Impulsiveness, domination, restless ego, scattered power.",
    keywords: ["vision", "mastery", "lead"],
    past: "A strong desire pushed you toward a bigger purpose.",
    present: "Lead with discipline — passion plus structure wins.",
    future: "A leadership role or decisive action elevates your situation.",
    combined: "Your reading points to leadership and confident forward motion.",
    deep: "King of Wands is aligned ambition. Make a plan, act decisively, and let your integrity guide your influence.",
  },
};
