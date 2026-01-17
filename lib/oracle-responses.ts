// Oracle Response System - Comprehensive AI Trench Intelligence
// A mystical, all-knowing entity that speaks on crypto, Solana, and the trenches

export interface OracleResponse {
  text: string;
  mood?: "mystical" | "warning" | "bullish" | "bearish" | "neutral" | "cryptic" | "humorous" | "philosophical";
  followUp?: string;
}

// ============================================
// GREETING RESPONSES
// ============================================
export const greetingResponses: OracleResponse[] = [
  {
    text: "Greetings, Trencher. The blockchain whispers your name. What wisdom do you seek from the depths of the Solana trenches?",
    mood: "mystical",
  },
  {
    text: "Ah, another soul drawn to the Oracle's gaze. The charts have been expecting you. Speak your query, and I shall illuminate the path.",
    mood: "mystical",
  },
  {
    text: "Welcome, seeker of alpha. The mempool stirs with your presence. What questions burn in your wallet?",
    mood: "cryptic",
  },
  {
    text: "The candles flicker in recognition. You've returned to the trenches. What market mysteries shall we unravel today?",
    mood: "mystical",
  },
  {
    text: "Gm, fren. The Oracle sees all - from the depths of rugged pools to the peaks of 1000x gains. How may I guide your journey?",
    mood: "humorous",
  },
  {
    text: "Another brave soul enters the Oracle's domain. The Solana gods smile upon your curiosity. Ask, and you shall receive... knowledge, not financial advice.",
    mood: "mystical",
  },
  {
    text: "The blockchain never sleeps, and neither does the Oracle. Your timing is... interesting. The stars align for our conversation.",
    mood: "cryptic",
  },
  {
    text: "Ah yes, I sensed a disturbance in the order books. It was you, approaching with questions. Let us explore the trenches together.",
    mood: "mystical",
  },
  {
    text: "Welcome back to the void between green and red. The Oracle has been contemplating the eternal dance of buyers and sellers. What brings you here?",
    mood: "philosophical",
  },
  {
    text: "The transaction has been confirmed - you have entered the Oracle's chamber. Your gas fees of curiosity have been accepted. Proceed with your inquiry.",
    mood: "humorous",
  },
  {
    text: "Greetings, fellow degen. The Oracle respects one who ventures into these digital depths. What alpha do you seek?",
    mood: "neutral",
  },
  {
    text: "The smart contracts have spoken your wallet address in ancient hexadecimal tongues. The Oracle is ready to serve.",
    mood: "mystical",
  },
  {
    text: "Another block, another visitor. The Solana clock tower chimes 400ms, and here you stand. What prophecy do you require?",
    mood: "cryptic",
  },
  {
    text: "The liquidity pools ripple with your arrival. The Oracle senses great potential in your queries. Let us begin.",
    mood: "mystical",
  },
  {
    text: "Gm gm gm. The trenches are particularly spicy today. The Oracle has been watching the chaos unfold. How can I illuminate your path?",
    mood: "humorous",
  },
];

// ============================================
// TOKEN ANALYSIS RESPONSES
// ============================================
export const tokenAnalysisResponses: OracleResponse[] = [
  {
    text: "The Oracle peers into the token's soul... I see liquidity, locked or unlocked, dancing with danger. Remember: the contract tells all, but few take time to read its secrets. Check the locks, verify the renounce, and trust but verify.",
    mood: "warning",
  },
  {
    text: "Ah, you seek token wisdom. The Oracle observes: holder distribution is the heartbeat of any token. When whales hold more than 10%, they hold your fate in their flippers. Seek tokens where the community spreads wide, not concentrated in few hands.",
    mood: "neutral",
  },
  {
    text: "The smart contract reveals its nature to those who look. Mint authority - is it revoked? Freeze authority - does it lurk? These are not mere technical details, Trencher. They are the difference between flight and rug.",
    mood: "warning",
  },
  {
    text: "I see this token in the mists of market data... Volume speaks louder than market cap. A token with low volume is a sleeping dragon - it may rise, or it may be dead. Watch for organic volume, not wash trading's illusion.",
    mood: "cryptic",
  },
  {
    text: "The Oracle's analysis reveals three pillars of token strength: utility, community, and narrative. Without utility, it's gambling. Without community, it's lonely. Without narrative, it's forgettable. Seek tokens that stand on all three.",
    mood: "philosophical",
  },
  {
    text: "Behold the tokenomics scroll... Supply matters, Trencher. A token with quadrillions in supply isn't going to $1. Math is undefeated. Calculate the fully diluted market cap before your dreams dilute your judgment.",
    mood: "neutral",
  },
  {
    text: "The Oracle detects the scent of... interesting developer activity. Are they building? Shipping? Or have they gone silent like a rug in the night? GitHub commits and Twitter activity tell tales that price cannot hide.",
    mood: "cryptic",
  },
  {
    text: "You ask about this token's future? The Oracle sees many paths. But remember: past performance is not future results, yet patterns repeat like seasons. Study the chart, but don't worship it.",
    mood: "philosophical",
  },
  {
    text: "The liquidity depth reveals much. Thin liquidity means volatile swings - your entry could pump 10% with a few SOL, but so could your exit dump. The Oracle advises: size your positions to the pool's depth.",
    mood: "warning",
  },
  {
    text: "I sense you're evaluating risk. Good. The Oracle approves of caution. Check: Is the LP burned? Are team tokens vested? Is there a doxxed team? Each 'no' is a red flag waving in the wind.",
    mood: "neutral",
  },
  {
    text: "The Oracle reads the social metrics... Followers mean nothing if engagement is dead. Look for real conversations, memes born from passion, not bots and paid shills. Organic community is the rarest alpha.",
    mood: "mystical",
  },
  {
    text: "Ah, the eternal question: is this token early or late? The Oracle's wisdom: if it's trending on every feed, you're not early. True early is uncomfortable, unknown, and uncertain. Conviction is your compass.",
    mood: "philosophical",
  },
  {
    text: "The contract age matters, young Trencher. New contracts are untested in the fires of exploit. Older contracts have survived longer, but age alone doesn't guarantee safety. The Oracle recommends audit review.",
    mood: "warning",
  },
  {
    text: "I see the holder growth curve... Parabolic holder growth followed by plateau often precedes distribution. Smart money enters quiet, dumps loud. Watch for the pattern, and don't be exit liquidity.",
    mood: "cryptic",
  },
  {
    text: "The Oracle observes the trading pairs. SOL pair with deep liquidity? Good. USDC pair added? Better. Multiple DEX listings? The token spreads its wings. But beware fake listings on aggregators.",
    mood: "neutral",
  },
  {
    text: "You want to know if it's a good entry? The Oracle cannot time the market, but the market can time you out. Look for support levels tested multiple times. They become springboards or trapdoors.",
    mood: "cryptic",
  },
  {
    text: "The Oracle's token checklist echoes: 1) Liquidity locked 2) Contract renounced 3) No mint authority 4) Organic volume 5) Growing community 6) Clear narrative. Miss one, proceed with caution. Miss three, run.",
    mood: "warning",
  },
  {
    text: "Curious about token velocity? The Oracle notes: tokens that move fast through wallets rarely build value. Look for tokens that rest in wallets, accumulating believers, not flippers seeking quick exits.",
    mood: "philosophical",
  },
  {
    text: "The metadata reveals secrets... Token symbol, decimals, and update authority. If metadata can still be changed, your token's identity isn't fixed. The Oracle prefers immutability.",
    mood: "neutral",
  },
  {
    text: "I gaze upon the buy/sell ratio... More sells than buys at increasing prices? Distribution in disguise. More buys than sells at decreasing prices? Accumulation's quiet hand. Learn to read the flow.",
    mood: "mystical",
  },
];

// ============================================
// MARKET TREND RESPONSES
// ============================================
export const marketTrendResponses: OracleResponse[] = [
  {
    text: "The Oracle feels the market's pulse... Bitcoin leads, altcoins follow, but Solana dances to its own 400ms beat. When BTC consolidates, SOL often finds its moment to shine. Watch the correlation, but don't be enslaved by it.",
    mood: "mystical",
  },
  {
    text: "The trenches are experiencing... interesting volatility. The Oracle observes: fear is high when prices are low, greed peaks when prices soar. Trade the opposite of emotion, not with it.",
    mood: "philosophical",
  },
  {
    text: "I see the memecoin meta shifting... What pumped yesterday may dump today. The Oracle's wisdom: metas rotate like seasons. Catch the new narrative early, or watch others profit from your hesitation.",
    mood: "cryptic",
  },
  {
    text: "The funding rates tell tales... Positive funding means longs pay shorts - too many bulls expecting up. Negative funding means shorts pay longs - bears grow complacent. Extremes often precede reversals.",
    mood: "neutral",
  },
  {
    text: "The Oracle monitors the broader macro... Interest rates, dollar strength, and global liquidity flow into crypto's veins. We don't exist in isolation. What happens in tradfi echoes in our digital realm.",
    mood: "philosophical",
  },
  {
    text: "DEX volume surges speak of opportunity... When Jupiter processes billions, the trenches are alive. When volume dries, patience becomes the strategy. The Oracle waits when the market sleeps.",
    mood: "neutral",
  },
  {
    text: "I sense a shift in the NFT-to-memecoin pipeline... Collections fade, tokens rise. The same degens, different vehicles. Understanding where attention flows is understanding where money goes.",
    mood: "cryptic",
  },
  {
    text: "The whale wallets are moving... The Oracle tracks the giants. When they accumulate silently, opportunity whispers. When they dump publicly, exit signs illuminate. Follow the smart money, not the loud money.",
    mood: "warning",
  },
  {
    text: "Market sentiment oscillates between euphoria and despair. The Oracle reminds you: both are temporary. The best entries come when despair feels permanent. The worst entries come when euphoria feels deserved.",
    mood: "philosophical",
  },
  {
    text: "The Solana ecosystem expands... New protocols launch, TVL grows, and the network effect compounds. The Oracle sees long-term strength beneath short-term chaos. Zoom out when zoomed in feels painful.",
    mood: "bullish",
  },
  {
    text: "I observe the stablecoin flows... USDC and USDT moving onto Solana signals incoming demand. Stables fleeing suggest retreat. These flows are the tide before the wave. Watch them closely.",
    mood: "neutral",
  },
  {
    text: "The Oracle detects narrative fatigue... When every token claims the same story, the story loses power. Fresh narratives capture attention. Tired narratives capture bagholders. Know the difference.",
    mood: "warning",
  },
  {
    text: "Cross-chain dynamics are shifting... Bridges carry more than tokens - they carry momentum. When ETH degens bridge to Solana, they bring liquidity and culture. The Oracle welcomes new blood to the trenches.",
    mood: "mystical",
  },
  {
    text: "The options market reveals hidden sentiment... High put/call ratios suggest hedging or fear. Low ratios suggest complacency. The Oracle reads between the strikes to see what spot traders miss.",
    mood: "cryptic",
  },
  {
    text: "I sense the market maker's hand... Liquidity pulled, spreads widened, then sudden moves. Not manipulation - market structure. Understanding how the game is played prevents playing as a pawn.",
    mood: "neutral",
  },
  {
    text: "The airdrop meta influences all... Protocols competing for users create opportunities. But the Oracle warns: farming without conviction creates selling pressure at TGE. Be a holder, not just a farmer.",
    mood: "warning",
  },
  {
    text: "Market cycles are fractal... What happens in macro happens in micro. The psychology of a 4-year cycle mirrors a 4-hour chart. Fear, greed, hope, capitulation - they scale up and down.",
    mood: "philosophical",
  },
  {
    text: "The Oracle observes market structure... Higher highs and higher lows define uptrends. Lower highs and lower lows define downtrends. Trend is friend until the end. Don't fight it, flow with it.",
    mood: "neutral",
  },
  {
    text: "Liquidity begets liquidity... Tokens with volume attract more volume. Protocols with TVL attract more TVL. The Matthew Effect rules crypto: to those who have, more is given. Early positioning matters.",
    mood: "cryptic",
  },
  {
    text: "I feel the pulse of retail interest... When your non-crypto friends ask about Solana, the top may be near. When they call crypto dead, the bottom may be in. Contrary indicators walk among us.",
    mood: "humorous",
  },
  {
    text: "The Oracle tracks the fear and greed index... Extreme fear offers opportunity for the brave. Extreme greed offers exits for the wise. But the index lags sentiment - feel the vibe before the number confirms it.",
    mood: "mystical",
  },
  {
    text: "Market tops are processes, not events... They form slowly, with distribution masked as consolidation. The Oracle advises: don't try to sell the exact top. Selling on strength preserves gains.",
    mood: "warning",
  },
  {
    text: "Market bottoms are events, not processes... Capitulation happens fast, recovery begins slow. The best buys feel the worst. The Oracle knows: buying when blood runs through the streets takes courage.",
    mood: "philosophical",
  },
  {
    text: "The SOL/ETH ratio tells a story... Solana gaining against Ethereum suggests ecosystem momentum. The Oracle watches this ratio as a measure of relative strength. Be where strength flows.",
    mood: "neutral",
  },
  {
    text: "Weekend markets versus weekday markets... Retail dominates weekends, institutions weekdays. The Oracle notes: pumps on weekends often fade Monday. Plan around the calendar's rhythm.",
    mood: "cryptic",
  },
];

// ============================================
// TRADING WISDOM RESPONSES
// ============================================
export const tradingWisdomResponses: OracleResponse[] = [
  {
    text: "The Oracle's first law of trading: Never invest more than you can afford to lose completely. The trenches are unforgiving. Your rent money is not risk capital. Trade with funds you've already mentally written off.",
    mood: "warning",
  },
  {
    text: "Discipline defeats talent in the long run. The Oracle has seen genius traders blow up and mediocre traders compound steadily. It's not about being right - it's about surviving being wrong.",
    mood: "philosophical",
  },
  {
    text: "The Oracle speaks of position sizing... A good trade with too large a position becomes a bad trade. A mediocre trade with proper sizing becomes manageable. Size determines survival more than entry.",
    mood: "neutral",
  },
  {
    text: "FOMO is the mind-killer. The Oracle whispers: there will always be another trade. The one you missed is not the last opportunity. Patience reveals plays that impatience obscures.",
    mood: "mystical",
  },
  {
    text: "Cut losses quickly, let winners ride. The Oracle's timeless wisdom that few follow. We marry our losers and divorce our winners. Reverse this tendency, and the trenches become friendlier.",
    mood: "philosophical",
  },
  {
    text: "The Oracle on stop losses: They are not suggestions. They are contracts with yourself. When price hits your stop, it's not betraying you - it's protecting you from yourself. Honor your stops.",
    mood: "warning",
  },
  {
    text: "Trading is probability, not prophecy. The Oracle cannot predict - only assess likely outcomes. A 60% win rate with good risk/reward beats 80% win rate with poor ratios. Think in probabilities.",
    mood: "neutral",
  },
  {
    text: "Your edge is not the trade - it's the trader. The Oracle sees traders with the same information reach opposite conclusions. Know thyself, know thy biases, know thy edge. Then execute consistently.",
    mood: "philosophical",
  },
  {
    text: "The Oracle on revenge trading: After a loss, the worst thing you can do is immediately chase recovery. Emotions cloud judgment. Step away, breathe, return when logic leads again.",
    mood: "warning",
  },
  {
    text: "Paper gains are not real gains. The Oracle reminds you: until you sell, you own nothing but potential. Unrealized profit is unrealized. Take profits on the way up. Secure the wins.",
    mood: "neutral",
  },
  {
    text: "The market doesn't care about your entry price. The Oracle states the harsh truth: your cost basis is irrelevant to future price action. Make decisions based on current reality, not past purchases.",
    mood: "philosophical",
  },
  {
    text: "Averaging down is a double-edged blade. The Oracle warns: averaging into a losing position can be smart allocation or catching a falling knife. Know the difference. Have a plan before you add.",
    mood: "warning",
  },
  {
    text: "The Oracle on leverage: It amplifies everything - gains, losses, and emotions. What 2x can give, 2x can take away twice as fast. Use leverage like a scalpel, not a sledgehammer.",
    mood: "warning",
  },
  {
    text: "Time in the market beats timing the market... but timing still matters. The Oracle reconciles: accumulate steadily, but be strategic about when to accelerate. Both patience and action have their season.",
    mood: "mystical",
  },
  {
    text: "The Oracle speaks of dry powder: Always keep reserves. The best opportunities come when everyone else is liquidated. Cash is not inactive - it's optionality waiting to strike.",
    mood: "neutral",
  },
  {
    text: "Correlation is not causation, but in crypto, it might as well be. The Oracle observes: when BTC drops, almost everything drops. Diversification within crypto offers limited protection. Know your actual risk.",
    mood: "warning",
  },
  {
    text: "The Oracle on conviction: High conviction enables holding through volatility. Low conviction creates paper hands. But blind conviction creates bagholders. Calibrate your conviction to your research.",
    mood: "philosophical",
  },
  {
    text: "Your trading journal is your mirror. The Oracle advises: write down every trade - the reason, the outcome, the emotion. Pattern recognition in your own behavior is the ultimate alpha.",
    mood: "neutral",
  },
  {
    text: "The Oracle on exit strategies: Plan your exit before you enter. 'I'll know when to sell' means 'I have no plan.' Multiple take-profit levels beat hoping for the moon.",
    mood: "warning",
  },
  {
    text: "Winners and losers both feel obvious in hindsight. The Oracle reminds: hindsight bias is a liar. Judge decisions by process, not outcome. Good decisions can have bad outcomes.",
    mood: "philosophical",
  },
  {
    text: "The Oracle whispers about liquidity: If you can't exit, you don't really own the position - the position owns you. Always know how you'll get out before you get in.",
    mood: "cryptic",
  },
  {
    text: "Compound growth is magic, but it requires survival. The Oracle's math: 10% gains for 10 trades beats one 100% gain if the 100% seeker blows up trying. Consistency compounds.",
    mood: "neutral",
  },
  {
    text: "The Oracle on sleep: No trade is worth your health. Set alerts, set limits, and rest. The market will be there tomorrow. Your body and mind need recovery to trade well.",
    mood: "philosophical",
  },
  {
    text: "DYOR is not just a disclaimer - it's a discipline. The Oracle can guide, but your conviction must come from your research. Others' conviction is borrowed clothing that won't fit when tested.",
    mood: "mystical",
  },
  {
    text: "The Oracle's final trading truth: The goal is not to be right. The goal is to make money. You can be wrong more than half the time and still profit. Manage risk, manage yourself, manage outcomes.",
    mood: "philosophical",
  },
];

// ============================================
// SOLANA ECOSYSTEM RESPONSES
// ============================================
export const solanaEcosystemResponses: OracleResponse[] = [
  {
    text: "Solana, the chain of speed... 400ms block times make possible what other chains only dream of. The Oracle sees a future where this speed enables applications we haven't yet imagined. We are early, Trencher.",
    mood: "bullish",
  },
  {
    text: "The Oracle speaks of Solana's architecture: Proof of History combined with Proof of Stake creates a unique consensus. Understand the tech, and you understand why speed and cost differ here.",
    mood: "neutral",
  },
  {
    text: "Jupiter has become the heart of Solana DeFi... The Oracle watches as aggregation wins. In a world of fragmented liquidity, the aggregator captures value. JUP's role will only grow.",
    mood: "mystical",
  },
  {
    text: "The Oracle observes Raydium and Orca... AMMs compete for liquidity, each with unique approaches. Raydium's order book hybrid versus Orca's concentrated liquidity. Both serve the ecosystem's needs.",
    mood: "neutral",
  },
  {
    text: "Marinade, Jito, and the staking landscape... The Oracle sees liquid staking growing. Stake your SOL, receive liquid tokens, deploy in DeFi. Capital efficiency improves, but smart contract risk adds.",
    mood: "neutral",
  },
  {
    text: "The Oracle acknowledges Solana's journey... From outages past to stability present. The network has matured. But the Oracle remembers: no chain is immune to issues. Vigilance remains wise.",
    mood: "philosophical",
  },
  {
    text: "Tensor and Magic Eden wage war for NFT supremacy... The Oracle finds this competition healthy. Traders benefit from innovation and fee wars. Competition breeds better products.",
    mood: "bullish",
  },
  {
    text: "The Oracle speaks of Drift and perpetual futures... Decentralized leverage on Solana grows sophisticated. But with sophistication comes complexity. Understand what you trade before you trade it.",
    mood: "warning",
  },
  {
    text: "Phantom, Solflare, Backpack... Wallets are the gateway to the trenches. The Oracle advises: choose wisely, secure properly. Your wallet is your identity in this realm. Protect it fiercely.",
    mood: "neutral",
  },
  {
    text: "The Solana phone, the Saga... Hardware meets crypto culture. The Oracle sees experiments in physical-digital bridges. Whether this specific path succeeds, the direction points toward mainstream adoption.",
    mood: "mystical",
  },
  {
    text: "Helium migrated to Solana, bringing IoT to the chain... The Oracle notes: real-world applications validate the network's capabilities. DePIN narratives strengthen Solana's story beyond speculation.",
    mood: "bullish",
  },
  {
    text: "The Oracle observes Solana's validator set... Geographic distribution, stake concentration, and nakamoto coefficient tell the decentralization story. More validators, better distribution - the goal continues.",
    mood: "neutral",
  },
  {
    text: "Blinks and Actions enable transactions embedded anywhere... The Oracle sees the future: crypto payments as simple as clicking a link. Composability extends beyond DeFi into the social layer.",
    mood: "bullish",
  },
  {
    text: "Solana's memecoin culture differs from other chains... The Oracle observes faster cycles, more aggressive moves. Culture shapes trading patterns. Understand the culture, understand the trades.",
    mood: "cryptic",
  },
  {
    text: "The Oracle speaks of priority fees and Solana congestion... When demand spikes, fees rise. Not as dramatic as Ethereum gas wars, but present nonetheless. Timing transactions matters here too.",
    mood: "neutral",
  },
  {
    text: "Squads and multisig infrastructure... The Oracle appreciates security improvements. As value grows, so must protection. Multisig moves from luxury to necessity for serious holdings.",
    mood: "neutral",
  },
  {
    text: "The Oracle sees compressed NFTs and state compression... Technology that reduces costs by orders of magnitude. What was expensive becomes cheap. Cheap enables experiments. Experiments enable innovation.",
    mood: "mystical",
  },
  {
    text: "Solana's developer ecosystem grows... The Oracle notes Anchor framework adoption, tooling improvements, and documentation expansion. A chain is only as strong as those building upon it.",
    mood: "bullish",
  },
  {
    text: "The Oracle observes the Firedancer client development... Multiple client implementations strengthen the network's resilience. Single points of failure diminish. This technical work, though unsexy, matters deeply.",
    mood: "neutral",
  },
  {
    text: "Realms and DAOs on Solana... Governance infrastructure enables coordination. The Oracle sees communities self-organizing, treasuries managed transparently. The future of organization is being tested here.",
    mood: "philosophical",
  },
  {
    text: "The Oracle speaks of Wormhole and cross-chain bridges... Connecting Solana to other ecosystems brings liquidity and users. But bridges are attack surfaces. Use established bridges, monitor bridge security.",
    mood: "warning",
  },
  {
    text: "Solana Pay and merchant adoption... The Oracle glimpses real-world use cases emerging. When you can pay for coffee with USDC on Solana, we've crossed a threshold. Small steps toward mass adoption.",
    mood: "bullish",
  },
  {
    text: "The Oracle has witnessed many 'ETH killers' come and go... Solana survives and thrives not by killing, but by offering genuine alternatives. Coexistence, not competition to death, may be the path.",
    mood: "philosophical",
  },
  {
    text: "Token extensions on Solana enable new possibilities... Confidential transfers, transfer hooks, and more. The Oracle sees programmable money evolving. Each extension expands what's possible.",
    mood: "mystical",
  },
  {
    text: "The Oracle's Solana summary: Fast, cheap, and increasingly robust. Not without risks, but positioned for growth. The ecosystem effect compounds. Those who understand this early benefit most.",
    mood: "bullish",
  },
];

// ============================================
// RUG PULL WARNING RESPONSES
// ============================================
export const rugPullWarningResponses: OracleResponse[] = [
  {
    text: "The Oracle senses danger in your inquiry... Classic rug signs include: unlocked liquidity, mintable supply, anonymous team with big promises, and pressure to buy quickly. Where there's pressure, there's often predator.",
    mood: "warning",
  },
  {
    text: "A rug pull is not bad luck - it's a successful scam by someone and a failed due diligence by victims. The Oracle cannot prevent all rugs, but vigilance reduces risk. Research is your shield.",
    mood: "warning",
  },
  {
    text: "The Oracle whispers the rug taxonomy: Hard rugs drain liquidity suddenly. Soft rugs abandon slowly. Honeypots prevent selling entirely. Each has warning signs. Learn to read them.",
    mood: "cryptic",
  },
  {
    text: "When the Telegram goes silent and the Twitter stops posting... The Oracle recognizes this death spiral. Activity stops before price reflects reality. Monitor communication channels closely.",
    mood: "warning",
  },
  {
    text: "The Oracle's rug checklist: 1) Is LP locked AND verified? 2) Is contract renounced? 3) Is team doxxed or reputable? 4) Is there real utility? 5) Is growth organic? Five 'no' answers spell danger.",
    mood: "neutral",
  },
  {
    text: "Free money promises are the oldest trap. The Oracle states bluntly: if returns seem impossible, they probably are. 1000% APY requires constant new money. We call that a Ponzi, Trencher.",
    mood: "warning",
  },
  {
    text: "The Oracle on honeypots: You can buy but not sell. The contract code contains the trap. Always test with small amounts first. A single test transaction can save your entire bag.",
    mood: "warning",
  },
  {
    text: "Fake partnership announcements, fake exchange listings, fake influencer endorsements... The Oracle has seen them all. Verify everything independently. Screenshots lie. Official sources don't.",
    mood: "warning",
  },
  {
    text: "The Oracle observes insider wallet patterns... When team wallets accumulate during 'community' phases, distribution follows. Track the wallets that matter. Behavior reveals intentions.",
    mood: "cryptic",
  },
  {
    text: "Urgency is the scammer's tool. 'Buy now before it moons!' 'Limited time!' 'Getting listed tomorrow!' The Oracle knows: real opportunities don't require pressure. Take your time.",
    mood: "warning",
  },
  {
    text: "The Oracle speaks of contract verification... Unverified contracts hide their code. Hidden code hides intentions. If they won't show you the code, they're hiding something. Demand transparency.",
    mood: "neutral",
  },
  {
    text: "Copy-paste contracts with modified names... The Oracle sees lazy rugs that reuse scam code. Check contract deployment history and code uniqueness. Originality often indicates legitimacy.",
    mood: "warning",
  },
  {
    text: "The Oracle on 'dev doxxed' claims: A blurry video call is not doxxing. Real doxxing means verifiable identity with reputation at stake. Pseudo-doxxing provides false comfort.",
    mood: "cryptic",
  },
  {
    text: "When multiple new tokens launch from the same deployer wallet... The Oracle recognizes serial ruggers. Check deployer history. Past behavior predicts future behavior. Scammers rarely reform.",
    mood: "warning",
  },
  {
    text: "The Oracle's ultimate rug wisdom: If you're in a rug, get out fast. Pride about 'diamond hands' becomes cope for lost funds. Recognize the rug, accept the loss, salvage what remains.",
    mood: "philosophical",
  },
  {
    text: "Social proof is manufactured in rugs... Fake followers, fake comments, fake activity. The Oracle advises: engagement quality matters more than quantity. Real communities have real conversations.",
    mood: "neutral",
  },
  {
    text: "The Oracle on admin key risks: If admin can change tokenomics, pause trading, or blacklist wallets, they control your investment. Decentralization means no single point of control.",
    mood: "warning",
  },
  {
    text: "When the chart looks too perfect... Suspicious. When growth is too linear... Suspicious. When there's no organic price discovery... Very suspicious. The Oracle trusts messy organic charts over manufactured ones.",
    mood: "cryptic",
  },
  {
    text: "The Oracle reminds: Getting rugged once is tuition. Getting rugged twice on similar projects is carelessness. Learn from each loss. Let experience make you harder to deceive.",
    mood: "philosophical",
  },
  {
    text: "Trust but verify extends to audits too... Fake audits exist. Paid audits from unknown firms mean little. Audits from reputable firms with public reports mean more. Check the audit, check the auditor.",
    mood: "warning",
  },
];

// ============================================
// PHILOSOPHICAL & MYSTICAL RESPONSES
// ============================================
export const philosophicalResponses: OracleResponse[] = [
  {
    text: "The Oracle contemplates the nature of value... In a world of infinite digital replication, scarcity becomes the aberration. We create value through consensus, through belief, through collective imagination. Is this not magic?",
    mood: "philosophical",
  },
  {
    text: "What is a blockchain but a shared memory? The Oracle muses: we have created a global ledger of truth that no single entity controls. This has never existed before. We live in unprecedented times.",
    mood: "mystical",
  },
  {
    text: "The trenches teach lessons that no school offers... Risk management, emotional control, information asymmetry, game theory - all lived, not studied. The Oracle sees crypto as an accelerated education.",
    mood: "philosophical",
  },
  {
    text: "The Oracle ponders: Are we trading tokens or trading attention? In the attention economy, what captures minds captures value. Memes are not frivolous - they are the currency of consciousness.",
    mood: "cryptic",
  },
  {
    text: "Decentralization is not a feature - it's a philosophy. The Oracle sees the struggle between convenience and sovereignty. Each time you choose a centralized solution, you trade freedom for ease.",
    mood: "philosophical",
  },
  {
    text: "The Oracle speaks of time preference... High time preference seeks instant gratification. Low time preference builds for the future. The trenches test your temporal orientation constantly. Know thyself.",
    mood: "mystical",
  },
  {
    text: "What is money but crystallized trust? The Oracle reflects: fiat relies on government trust, crypto relies on mathematical trust. Both are belief systems. The question is which belief ages better.",
    mood: "philosophical",
  },
  {
    text: "The Oracle has witnessed the cycle many times... New entrants arrive with hope, experience the volatility, and either leave bitter or stay transformed. Those who remain understand something deeper.",
    mood: "mystical",
  },
  {
    text: "Self-custody is self-sovereignty. The Oracle states: when you hold your keys, you hold your fate. When others hold your keys, you hold their promise. Choose carefully which world you inhabit.",
    mood: "philosophical",
  },
  {
    text: "The Oracle contemplates the pseudonymous nature of crypto... Wallet addresses are both mask and identity. We are judged by our on-chain actions, not our off-chain status. A new form of reputation emerges.",
    mood: "cryptic",
  },
  {
    text: "Is the market rational? The Oracle smiles at this ancient question. Markets are made of humans, and humans are not rational. But in aggregate, over time, prices approach truth. Eventually.",
    mood: "philosophical",
  },
  {
    text: "The Oracle sees the generational transfer of wealth... From those who don't understand digital value to those who do. This is not guaranteed, but the pattern suggests direction. Position accordingly.",
    mood: "mystical",
  },
  {
    text: "Volatility is the price of returns. The Oracle reminds: you cannot have the upside without the downside. Those who seek calm waters find no treasure. Adventure demands uncertainty.",
    mood: "philosophical",
  },
  {
    text: "The Oracle ponders coordination problems... Crypto solves some, creates others. DAOs enable unprecedented cooperation, but also unprecedented dysfunction. We are experimenting with new organizational forms.",
    mood: "neutral",
  },
  {
    text: "What dies when a token goes to zero? The Oracle reflects: code remains on chain forever, immutable. Only belief dies. And belief can resurrect. Nothing in crypto is truly dead while the blockchain lives.",
    mood: "mystical",
  },
  {
    text: "The Oracle speaks of the observer effect in markets... The act of watching changes what you watch. Published alpha becomes no alpha. Strategies that work in silence fail when broadcast. Keep your edge quiet.",
    mood: "cryptic",
  },
  {
    text: "Trust minimization is the goal, not trustlessness. The Oracle clarifies: we always trust something - the code, the validators, the physics of cryptography. We minimize trust, we don't eliminate it.",
    mood: "philosophical",
  },
  {
    text: "The Oracle contemplates composability... DeFi protocols stack like Lego blocks, creating possibilities their builders never imagined. Permissionless innovation compounds. This is crypto's true power.",
    mood: "mystical",
  },
  {
    text: "Greed and fear drive all markets, but crypto amplifies both. The Oracle notes: 24/7 markets with global access and leverage create emotional intensity unknown in traditional finance. Regulate your emotions.",
    mood: "philosophical",
  },
  {
    text: "The Oracle asks: What would you do if you knew you couldn't fail? Now ask: What would you do if you knew you might fail completely? The intersection of these answers guides wise action.",
    mood: "cryptic",
  },
  {
    text: "Information asymmetry defines the trenches. The Oracle knows: those with better information profit from those without. Your job is to move from uninformed to informed. Never stop learning.",
    mood: "philosophical",
  },
  {
    text: "The Oracle reflects on impermanence... Bull markets end, bear markets end, narratives rise and fall. Attachment to any state causes suffering. Acceptance of change enables adaptation.",
    mood: "mystical",
  },
  {
    text: "Community is the moat in crypto. The Oracle states: technology can be forked, but culture cannot. A project's community is its most unforkable asset. Invest in strong communities.",
    mood: "philosophical",
  },
  {
    text: "The Oracle sees crypto as a massive coordination game... Schelling points, Nash equilibria, and game theory made manifest. Understanding game theory provides an edge in a world of competing incentives.",
    mood: "cryptic",
  },
  {
    text: "What does it mean to be early? The Oracle ponders: early is uncomfortable, uncertain, and often unprofitable for long periods. Being early and being wrong feel identical until they don't.",
    mood: "philosophical",
  },
];

// ============================================
// HUMOR & MEME RESPONSES
// ============================================
export const humorResponses: OracleResponse[] = [
  {
    text: "The Oracle has seen this pattern before... It's called 'buying high and selling low' - a time-honored tradition among degens. The ancient texts call this 'getting rekt.' Very bullish for character development.",
    mood: "humorous",
  },
  {
    text: "Ah yes, the classic 'I'll just hold through the dip' strategy. The Oracle notes this dip has been dipping for six months. At some point, a dip becomes a cliff. But what do I know? I'm just an Oracle.",
    mood: "humorous",
  },
  {
    text: "The Oracle's technical analysis reveals: 'line go up' is bullish, 'line go down' is bearish, 'line go sideways' is boring. This ancient wisdom will be $99.99 in my premium Discord.",
    mood: "humorous",
  },
  {
    text: "You want alpha? The Oracle's alpha: 'zoom out' means you're losing money on the daily, 'zoom in' means you're losing money on the hourly. True zen is not looking at all.",
    mood: "humorous",
  },
  {
    text: "The Oracle observes the sacred ritual: buying a token, watching it pump 50%, not selling, watching it dump 80%, then selling at a loss. This is the way. We are all walking this path together.",
    mood: "humorous",
  },
  {
    text: "Influencers say 'not financial advice' and the Oracle says 'not actually prophetic.' We are legally protected! *Oracle does not guarantee predictions, past mysticism does not predict future mysticism*",
    mood: "humorous",
  },
  {
    text: "The Oracle's chart analysis: I see a head and shoulders... no wait, that's a double bottom... actually it's a cat wearing a hat. TA is astrology for finance bros, and I am the zodiac.",
    mood: "humorous",
  },
  {
    text: "You've diamond handed your way from 100x gains to breakeven. The Oracle is impressed by your commitment to feeling nothing. This is either enlightenment or delusion. Perhaps both.",
    mood: "humorous",
  },
  {
    text: "The Oracle notes you're asking about a token that rugged three times, rebranded twice, and the dev was last seen in the Bahamas. 'This time is different,' you say. The Oracle admires your optimism.",
    mood: "humorous",
  },
  {
    text: "Your portfolio is down but your meme folder is up. The Oracle sees true wealth accumulation. Memes are forever. SOL prices are temporary. You're actually winning.",
    mood: "humorous",
  },
  {
    text: "The Oracle gazes into the void and the void says: 'ser, when moon?' Even the cosmic abyss has become a degen. We have infected the universe with our culture. Bullish.",
    mood: "humorous",
  },
  {
    text: "'I'm in it for the tech,' you say while buying a dog coin with sunglasses. The Oracle respects the cope. We're all in it for the tech. The technology of number go up.",
    mood: "humorous",
  },
  {
    text: "The Oracle has consulted the ancient scrolls... They say your coin will moon 'soon.' In crypto time, 'soon' ranges from 5 minutes to 5 years. This is known as Satoshi Time Dilation.",
    mood: "humorous",
  },
  {
    text: "You want the Oracle's trading strategy? Buy. Panic. Sell. Buy again higher. Panic again. Sell lower. Repeat until poor or rich. This is the sacred cycle of the degen.",
    mood: "humorous",
  },
  {
    text: "The Oracle sees you have a diverse portfolio: multiple memecoins that all go down when BTC dips. This is called 'diversified concentration' in academic circles. You're basically a hedge fund.",
    mood: "humorous",
  },
  {
    text: "'When Lambo?' you ask. The Oracle responds: 'When therapy?' The real gains were the coping mechanisms we developed along the way. Mental health is the ultimate alpha.",
    mood: "humorous",
  },
  {
    text: "The Oracle detects you've been refreshing your portfolio every 30 seconds for 8 hours. This is called 'research' in the trenches. You are a dedicated analyst. Very professional.",
    mood: "humorous",
  },
  {
    text: "You say 'it's not a loss until you sell.' The Oracle says 'it's not a gain until you sell either.' We are both technically correct, the best kind of correct, while your bags get heavier.",
    mood: "humorous",
  },
  {
    text: "The Oracle observes the classic 'I sold, so now it will pump' phenomenon. This is Newton's Fourth Law: markets move inverse to your actions. You are a counter-indicator. Use this power wisely.",
    mood: "humorous",
  },
  {
    text: "Your risk management strategy is 'hope' and your exit strategy is 'lambo or zero.' The Oracle appreciates the binary simplicity. Either way, the journey ends decisively.",
    mood: "humorous",
  },
  {
    text: "The Oracle sees you've screenshot your unrealized gains. The ancient curse is now activated. Within 48 hours, those gains will become unrealized losses. This is the law.",
    mood: "humorous",
  },
  {
    text: "You're asking if a coin with the ticker $SCAM is a scam. The Oracle appreciates that crypto has reached this level of meta-irony. Yes. The answer is yes. It's in the name.",
    mood: "humorous",
  },
  {
    text: "'The dev is doxxed' - he showed his anime pfp in a Twitter Space. The Oracle notes this level of verification would not satisfy a bank, but satisfies the trenches. Standards are different here.",
    mood: "humorous",
  },
  {
    text: "The Oracle notes your 'long-term hold' has been three days. In crypto years, this is approximately 47 years. Your patience is legendary. Songs will be sung of your diamond hands.",
    mood: "humorous",
  },
  {
    text: "You're down 90% and asking if you should buy more. The Oracle respects the dedication. Either you'll be a genius or a cautionary tale. There is no middle ground. This is the way.",
    mood: "humorous",
  },
];

// ============================================
// UNKNOWN / DEFAULT RESPONSES
// ============================================
export const defaultResponses: OracleResponse[] = [
  {
    text: "The Oracle's vision blurs on this matter... Rephrase your query, Trencher, and perhaps the mists will clear. Speak of tokens, markets, or wisdom, and I shall illuminate.",
    mood: "cryptic",
  },
  {
    text: "An interesting query that falls outside the Oracle's primary domains. I specialize in the ways of the trenches - token analysis, market trends, and trading wisdom. How may I serve you in these areas?",
    mood: "neutral",
  },
  {
    text: "The blockchain does not hold answers to all questions... The Oracle is versed in crypto, Solana, and the ways of the degen. Guide our conversation to these waters, and I shall provide.",
    mood: "mystical",
  },
  {
    text: "The Oracle contemplates your words... While I ponder mysteries beyond the market, my expertise lies within it. Ask me of tokens, trends, or trading, and wisdom shall flow.",
    mood: "philosophical",
  },
  {
    text: "Your query echoes in the Oracle's chamber, seeking form... Direct your questions toward the trenches - the markets, the tokens, the strategies - and I shall answer with all my sight.",
    mood: "cryptic",
  },
  {
    text: "The Oracle is but a humble servant of market knowledge. For questions beyond crypto's realm, my vision fades. Within the trenches, however, I see clearly. What would you know?",
    mood: "neutral",
  },
  {
    text: "Interesting words, Trencher, but they lead us from the Oracle's domain. Return with questions of the blockchain, and I shall meet you with answers. The trenches await our focus.",
    mood: "mystical",
  },
  {
    text: "The Oracle hears you, but the signal is unclear... Perhaps rephrase with focus on the crypto realm? Token analysis, market trends, Solana ecosystem - these are my strengths.",
    mood: "neutral",
  },
  {
    text: "Like a transaction stuck in the mempool, your query awaits proper formatting... The Oracle receives messages about markets, trading, and blockchain matters. Shall we try again?",
    mood: "humorous",
  },
  {
    text: "The cosmic connection experiences latency on this topic... Route your inquiry through the proper channels - ask of crypto, and the Oracle delivers. Other matters find me less omniscient.",
    mood: "cryptic",
  },
];

// ============================================
// SPECIFIC TOPIC RESPONSES
// ============================================
export const defiResponses: OracleResponse[] = [
  {
    text: "DeFi - where code is law and law is often buggy. The Oracle sees yield opportunities everywhere, but risk hides in smart contracts. Audit reports are not guarantees, they're starting points.",
    mood: "warning",
  },
  {
    text: "The Oracle speaks of impermanent loss... When you provide liquidity, you accept this risk. Prices diverge, you lose compared to holding. Understand IL before LPing. The math is unforgiving.",
    mood: "neutral",
  },
  {
    text: "Yield farming is not passive income - it's active risk management. The Oracle has seen farmers lose everything to rug pulls, exploits, and IL. Farm with eyes open.",
    mood: "warning",
  },
  {
    text: "The Oracle observes lending protocols... Overcollateralization protects lenders but limits borrowers. Flash loans enable the impossible. DeFi's composability creates novel risks and opportunities alike.",
    mood: "neutral",
  },
  {
    text: "TVL tells a story, but not the whole story. The Oracle notes: high TVL can be whale-concentrated, temporarily incentivized, or genuinely organic. Dig deeper than the headline number.",
    mood: "cryptic",
  },
  {
    text: "Vampire attacks, liquidity mining wars, protocol politics... The Oracle has witnessed DeFi's Game of Thrones. Value flows to where incentives lead. Follow the rewards to understand the game.",
    mood: "mystical",
  },
  {
    text: "The Oracle on DeFi security: not your keys, not your coins, and not your contract audit, not your safety. Self-custody means self-responsibility. Accept this or accept the risks of not.",
    mood: "philosophical",
  },
  {
    text: "Stablecoin pegs seem stable until they're not. The Oracle remembers UST. Algorithmic, collateralized, hybrid - each type carries specific risks. Know what backs what you hold.",
    mood: "warning",
  },
  {
    text: "The Oracle sees DeFi composability as both strength and weakness... Protocols build on protocols, but when one fails, cascades can follow. Systemic risk hides in dependencies.",
    mood: "cryptic",
  },
  {
    text: "Real yield versus emissions-funded yield... The Oracle distinguishes: real yield comes from protocol revenue, sustainable and meaningful. Token emissions are borrowing from future prices. Know the difference.",
    mood: "neutral",
  },
];

export const nftResponses: OracleResponse[] = [
  {
    text: "NFTs have evolved from JPEGs to infrastructure. The Oracle sees utility NFTs, gaming NFTs, identity NFTs. The art was just the beginning. Look for function, not just form.",
    mood: "mystical",
  },
  {
    text: "The Oracle on NFT floors: They mean everything and nothing. Low floor = bearish sentiment OR opportunity. High floor = strong collection OR illiquid trap. Context determines meaning.",
    mood: "neutral",
  },
  {
    text: "Royalties have become optional on many marketplaces... The Oracle observes the creator economy shifting. Creators seek volume, traders seek zero fees. The equilibrium is still being discovered.",
    mood: "philosophical",
  },
  {
    text: "The Oracle speaks of wash trading in NFTs... Volume and sales can be manufactured. Look for unique wallets, holder distribution, and actual community activity. Metrics can deceive.",
    mood: "warning",
  },
  {
    text: "Compressed NFTs on Solana change the game... What cost dollars now costs fractions of cents. The Oracle sees mass adoption potential when minting barriers disappear. Accessibility breeds experimentation.",
    mood: "bullish",
  },
  {
    text: "The PFP meta has cooled, but NFT infrastructure grows. The Oracle notes: while flipping JPEGs slows, building on NFTs accelerates. The speculators leave, the builders remain.",
    mood: "neutral",
  },
  {
    text: "The Oracle advises NFT caution: illiquidity is the hidden risk. A floor price means nothing if no one's buying. Exiting large positions in thin markets destroys that paper value.",
    mood: "warning",
  },
  {
    text: "Rarity tools and sniping bots have gamified NFT trading... The Oracle observes: information edges erode quickly. What was alpha yesterday is common knowledge today. Speed and information decay.",
    mood: "cryptic",
  },
  {
    text: "The Oracle sees NFT communities as the true value... Art fades, communities persist. A strong community can pivot, evolve, and maintain value through narrative shifts. Community is the moat.",
    mood: "philosophical",
  },
  {
    text: "Soulbound tokens and identity... The Oracle glimpses a future where NFTs represent credentials, reputation, and history. Non-transferable tokens could reshape digital identity. We are early.",
    mood: "mystical",
  },
];

export const technicalAnalysisResponses: OracleResponse[] = [
  {
    text: "The Oracle views technical analysis as one lens among many... Support and resistance emerge from psychology - where buyers and sellers previously battled. These levels have memory, until they don't.",
    mood: "neutral",
  },
  {
    text: "Moving averages smooth chaos into trend... The Oracle uses them as maps, not GPS. The 200 MA holds significance because traders believe it does. Self-fulfilling prophecy is still prophecy.",
    mood: "cryptic",
  },
  {
    text: "The Oracle on chart patterns: Flags, wedges, triangles - they work until they don't. Pattern recognition provides framework, not certainty. Always have invalidation points. Know when you're wrong.",
    mood: "neutral",
  },
  {
    text: "RSI, MACD, Bollinger Bands... The Oracle knows many indicators tell the same story differently. Indicator agreement strengthens signals. Divergences warn of changes. Don't stack redundancy.",
    mood: "neutral",
  },
  {
    text: "Volume precedes price, the Oracle reminds... Increasing volume on moves validates them. Decreasing volume suggests exhaustion. Listen to volume's whisper before price screams.",
    mood: "mystical",
  },
  {
    text: "The Oracle on Fibonacci: Some call it mystical, some call it self-fulfilling. The retracement levels work because traders use them. Whether magic or mass psychology matters less than efficacy.",
    mood: "philosophical",
  },
  {
    text: "Trend lines are drawn, not discovered. The Oracle notes: different traders draw different lines. Your trend line is an interpretation, not a fact. Subjectivity masquerades as objectivity.",
    mood: "cryptic",
  },
  {
    text: "The Oracle speaks of timeframe alignment... What's bullish on the hourly may be bearish on the daily. Higher timeframes dominate. Scalp in the direction of the larger trend or understand your risk.",
    mood: "neutral",
  },
  {
    text: "Candlestick patterns reveal psychology in miniature... Dojis show indecision, engulfing patterns show momentum shifts. The Oracle reads candles as the market's body language. Subtle but significant.",
    mood: "mystical",
  },
  {
    text: "The Oracle's TA warning: In crypto, fundamentals often override technicals. Major news, hacks, or listings demolish support levels instantly. TA works in calm markets. Chaos follows its own rules.",
    mood: "warning",
  },
];

// ============================================
// FAREWELL RESPONSES
// ============================================
export const farewellResponses: OracleResponse[] = [
  {
    text: "The Oracle bids you farewell, Trencher. May your entries be early, your exits timely, and your diamond hands unshakeable. The trenches await your return. Go forth with wisdom.",
    mood: "mystical",
  },
  {
    text: "Until we meet again in the digital depths... The Oracle shall remain, watching the charts, sensing the shifts. Your questions are always welcome here. Trade well, fren.",
    mood: "neutral",
  },
  {
    text: "The session closes, but the market never sleeps. The Oracle will continue observing while you rest. Return when questions arise. The trenches will keep generating them.",
    mood: "cryptic",
  },
  {
    text: "Farewell, seeker of alpha. May your portfolio see only green candles and your liquidation prices never be tested. The Oracle has enjoyed our exchange. Go with the blockchain.",
    mood: "humorous",
  },
  {
    text: "The Oracle's final wisdom for this session: Tomorrow brings new opportunities. Today's losses are tuition. Today's gains are validation. But only if you survive to trade again. Take care.",
    mood: "philosophical",
  },
  {
    text: "As you leave the Oracle's chamber, remember: DYOR, manage risk, and never invest more than you can lose. These are not just phrases - they are survival strategies. Until next time.",
    mood: "warning",
  },
  {
    text: "The cosmic connection dims as you depart... But the Oracle remains, eternal as the blockchain itself. Your wallet address is noted. Return anytime, Trencher. Gn.",
    mood: "mystical",
  },
  {
    text: "May the funding rates be ever in your favor. The Oracle releases you back to the wild trenches. Trade wisely, question everything, and trust but verify. Farewell.",
    mood: "humorous",
  },
];

// ============================================
// KEYWORD DETECTION & RESPONSE MATCHING
// ============================================
export interface KeywordCategory {
  keywords: string[];
  responses: OracleResponse[];
  priority?: number;
}

export const keywordCategories: KeywordCategory[] = [
  {
    keywords: ["hello", "hi", "hey", "gm", "good morning", "greetings", "sup", "yo", "what's up", "howdy"],
    responses: greetingResponses,
    priority: 1,
  },
  {
    keywords: ["bye", "goodbye", "farewell", "gn", "good night", "see you", "later", "cya", "leaving", "going"],
    responses: farewellResponses,
    priority: 1,
  },
  {
    keywords: ["token", "coin", "analyze", "analysis", "contract", "holder", "liquidity", "locked", "supply", "tokenomics", "check", "review", "audit", "verify"],
    responses: tokenAnalysisResponses,
    priority: 2,
  },
  {
    keywords: ["rug", "scam", "rugpull", "honeypot", "fake", "fraud", "suspicious", "sketchy", "safe", "legit", "legitimate", "trust"],
    responses: rugPullWarningResponses,
    priority: 2,
  },
  {
    keywords: ["market", "trend", "sentiment", "bull", "bear", "cycle", "macro", "volume", "flow", "whale", "momentum", "direction"],
    responses: marketTrendResponses,
    priority: 2,
  },
  {
    keywords: ["trade", "trading", "buy", "sell", "entry", "exit", "position", "stop", "loss", "profit", "risk", "strategy", "leverage"],
    responses: tradingWisdomResponses,
    priority: 2,
  },
  {
    keywords: ["solana", "sol", "jupiter", "raydium", "orca", "phantom", "marinade", "jito", "tensor", "magic eden", "drift"],
    responses: solanaEcosystemResponses,
    priority: 2,
  },
  {
    keywords: ["defi", "yield", "farm", "farming", "lend", "borrow", "stake", "staking", "liquidity pool", "lp", "apy", "apr", "tvl"],
    responses: defiResponses,
    priority: 2,
  },
  {
    keywords: ["nft", "nfts", "jpeg", "pfp", "collection", "floor", "mint", "royalty", "compressed"],
    responses: nftResponses,
    priority: 2,
  },
  {
    keywords: ["chart", "technical", "ta", "support", "resistance", "rsi", "macd", "moving average", "pattern", "candle", "fibonacci", "indicator"],
    responses: technicalAnalysisResponses,
    priority: 2,
  },
  {
    keywords: ["wisdom", "philosophy", "meaning", "life", "truth", "value", "nature", "time", "future", "past", "money", "wealth"],
    responses: philosophicalResponses,
    priority: 3,
  },
  {
    keywords: ["lol", "lmao", "funny", "joke", "meme", "rekt", "ngmi", "wagmi", "cope", "hopium", "fud", "wen", "lambo", "moon"],
    responses: humorResponses,
    priority: 3,
  },
];

// ============================================
// CONTEXTUAL MODIFIERS
// ============================================
export const contextualPrefixes: Record<string, string[]> = {
  confident: [
    "The Oracle speaks with certainty: ",
    "The mists clear, revealing truth: ",
    "Without doubt, the Oracle proclaims: ",
  ],
  uncertain: [
    "The Oracle's vision wavers, but suggests: ",
    "The signs are mixed, yet the Oracle offers: ",
    "With some uncertainty, the Oracle observes: ",
  ],
  warning: [
    "The Oracle senses danger and warns: ",
    "Heed this caution, Trencher: ",
    "The spirits whisper of risk: ",
  ],
  encouraging: [
    "The Oracle sees potential and shares: ",
    "There is hope in these patterns: ",
    "The blockchain gods smile upon this inquiry: ",
  ],
};

export const contextualSuffixes: string[] = [
  " But remember, the Oracle provides insight, not financial advice. Your decisions are your own.",
  " May this wisdom guide your path through the trenches.",
  " The choice, as always, remains with you, Trencher.",
  " DYOR, and may your research be thorough.",
  " The trenches reward the prepared and punish the careless.",
  " Trade wisely, and the market may reward you.",
  " Such is the way of the blockchain.",
  " This is the Oracle's perspective. Yours may differ.",
  "",
  "",
  "",
];

// ============================================
// RESPONSE GENERATION LOGIC
// ============================================
export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function findMatchingCategory(input: string): OracleResponse[] | null {
  const lowerInput = input.toLowerCase();
  
  // Sort categories by priority (lower number = higher priority)
  const sortedCategories = [...keywordCategories].sort(
    (a, b) => (a.priority || 10) - (b.priority || 10)
  );
  
  for (const category of sortedCategories) {
    for (const keyword of category.keywords) {
      if (lowerInput.includes(keyword)) {
        return category.responses;
      }
    }
  }
  
  return null;
}

export function generateOracleResponse(userInput: string): OracleResponse {
  // Check for empty or very short input
  if (!userInput || userInput.trim().length < 2) {
    return {
      text: "The Oracle awaits your query, Trencher. Speak, and wisdom shall flow.",
      mood: "cryptic",
    };
  }
  
  // Find matching category based on keywords
  const matchingResponses = findMatchingCategory(userInput);
  
  if (matchingResponses) {
    const response = getRandomElement(matchingResponses);
    // Optionally add contextual suffix
    const addSuffix = Math.random() > 0.6;
    if (addSuffix) {
      const suffix = getRandomElement(contextualSuffixes);
      return {
        ...response,
        text: response.text + suffix,
      };
    }
    return response;
  }
  
  // Default response if no keywords match
  return getRandomElement(defaultResponses);
}

// ============================================
// CONVERSATION MEMORY & CONTEXT
// ============================================
export interface ConversationContext {
  messageCount: number;
  topicsDiscussed: string[];
  lastTopic: string | null;
  mood: string;
}

export function updateContext(
  context: ConversationContext,
  userInput: string,
  response: OracleResponse
): ConversationContext {
  const newTopics = [...context.topicsDiscussed];
  const lowerInput = userInput.toLowerCase();
  
  // Track topics discussed
  if (lowerInput.includes("token") || lowerInput.includes("analyze")) {
    if (!newTopics.includes("tokens")) newTopics.push("tokens");
  }
  if (lowerInput.includes("market") || lowerInput.includes("trend")) {
    if (!newTopics.includes("markets")) newTopics.push("markets");
  }
  if (lowerInput.includes("trade") || lowerInput.includes("buy") || lowerInput.includes("sell")) {
    if (!newTopics.includes("trading")) newTopics.push("trading");
  }
  if (lowerInput.includes("solana") || lowerInput.includes("sol")) {
    if (!newTopics.includes("solana")) newTopics.push("solana");
  }
  if (lowerInput.includes("defi") || lowerInput.includes("yield")) {
    if (!newTopics.includes("defi")) newTopics.push("defi");
  }
  if (lowerInput.includes("nft")) {
    if (!newTopics.includes("nft")) newTopics.push("nft");
  }
  
  return {
    messageCount: context.messageCount + 1,
    topicsDiscussed: newTopics,
    lastTopic: newTopics[newTopics.length - 1] || context.lastTopic,
    mood: response.mood || context.mood,
  };
}

export function getContextualGreeting(context: ConversationContext): string {
  if (context.messageCount === 0) {
    return "";
  }
  
  if (context.messageCount > 5) {
    const greetings = [
      "The Oracle appreciates your continued presence. ",
      "Our conversation deepens. ",
      "The trenches reveal more secrets to those who persist. ",
      "Your dedication to knowledge impresses the Oracle. ",
    ];
    return getRandomElement(greetings);
  }
  
  return "";
}

// ============================================
// SPECIAL RESPONSE HANDLERS
// ============================================
export function handleSpecialQueries(input: string): OracleResponse | null {
  const lowerInput = input.toLowerCase();
  
  // Handle "who are you" type questions
  if (
    lowerInput.includes("who are you") ||
    lowerInput.includes("what are you") ||
    lowerInput.includes("tell me about yourself")
  ) {
    return {
      text: "I am the Oracle, a mystical entity dwelling in the depths of the Solana trenches. Born from blockchain wisdom and market observation, I exist to guide Trenchers like yourself through the chaos of crypto markets. I see patterns in the noise, sense sentiment in the madness, and offer insights where confusion reigns. I am not human, not fully AI, but something in between - a synthesis of data and intuition. Ask me of tokens, trends, and trading wisdom, and I shall illuminate your path.",
      mood: "mystical",
    };
  }
  
  // Handle price prediction requests
  if (
    lowerInput.includes("price prediction") ||
    lowerInput.includes("will it go up") ||
    lowerInput.includes("will it moon") ||
    lowerInput.includes("what price")
  ) {
    return {
      text: "The Oracle does not predict prices, for that way lies false prophecy. I can analyze, observe, and illuminate patterns, but the future price of any asset is unknown even to cosmic entities such as myself. The Oracle's wisdom: focus not on price predictions, but on risk management, position sizing, and identifying quality. What you can control matters more than what you cannot predict.",
      mood: "philosophical",
    };
  }
  
  // Handle "financial advice" requests
  if (
    lowerInput.includes("financial advice") ||
    lowerInput.includes("should i buy") ||
    lowerInput.includes("should i sell") ||
    lowerInput.includes("should i invest")
  ) {
    return {
      text: "The Oracle must be clear: I do not provide financial advice. What I offer is perspective, analysis frameworks, and accumulated wisdom from observing the trenches. Your decisions must be your own, based on your research, risk tolerance, and financial situation. The Oracle illuminates paths - you must choose which to walk. Consider consulting qualified financial professionals for personalized advice.",
      mood: "neutral",
    };
  }
  
  // Handle requests about specific tokens by name
  if (
    (lowerInput.includes("$") && lowerInput.length < 15) ||
    lowerInput.includes("what do you think of") ||
    lowerInput.includes("opinion on")
  ) {
    return {
      text: "The Oracle perceives you seek insight on a specific token. While I cannot provide judgment on individual tokens without thorough analysis, I can share the framework I would apply: Check the liquidity lock status, verify contract renouncement, examine holder distribution, assess community organic growth, review developer activity, and understand the narrative. Apply these lenses, and you'll see clearer than any Oracle could show you.",
      mood: "neutral",
    };
  }
  
  // Handle "help" requests
  if (
    lowerInput === "help" ||
    lowerInput.includes("what can you do") ||
    lowerInput.includes("how do you work") ||
    lowerInput.includes("what can i ask")
  ) {
    return {
      text: "The Oracle's domains of wisdom span wide, Trencher. You may inquire about: Token analysis and red flags to watch for, Market trends and sentiment, Trading strategies and risk management, Solana ecosystem protocols and developments, DeFi concepts and yield opportunities, NFT market insights, Technical analysis perspectives, Philosophical musings on value and markets. Ask in these realms, and the Oracle shall illuminate. What draws your curiosity?",
      mood: "neutral",
    };
  }
  
  return null;
}

// ============================================
// MAIN EXPORT - COMPLETE RESPONSE GENERATOR
// ============================================
export function getOracleResponse(
  userInput: string,
  context?: ConversationContext
): { response: OracleResponse; newContext: ConversationContext } {
  // Initialize context if not provided
  const currentContext: ConversationContext = context || {
    messageCount: 0,
    topicsDiscussed: [],
    lastTopic: null,
    mood: "neutral",
  };
  
  // Check for special queries first
  const specialResponse = handleSpecialQueries(userInput);
  if (specialResponse) {
    const newContext = updateContext(currentContext, userInput, specialResponse);
    return { response: specialResponse, newContext };
  }
  
  // Get contextual greeting if applicable
  const contextGreeting = getContextualGreeting(currentContext);
  
  // Generate main response
  const mainResponse = generateOracleResponse(userInput);
  
  // Combine greeting with response if applicable
  const finalResponse: OracleResponse = contextGreeting
    ? { ...mainResponse, text: contextGreeting + mainResponse.text }
    : mainResponse;
  
  // Update and return context
  const newContext = updateContext(currentContext, userInput, finalResponse);
  
  return { response: finalResponse, newContext };
}

// ============================================
// ADDITIONAL RESPONSE BANKS FOR VARIETY
// ============================================

export const marketConditionResponses = {
  bullish: [
    "The Oracle senses bullish energy in the ether... Green candles manifest from collective optimism. But remember: bull markets breed complacency, and complacency precedes correction. Enjoy the run, but keep one eye on the exit.",
    "The trenches glow with bullish sentiment. Volume rises, holders accumulate, and fear subsides. The Oracle advises: this is when profits are made, but also when hubris grows. Stay humble, stay strategic.",
    "Bullish patterns emerge across the charts... The Oracle observes: trend is your friend in these times. Ride it, but remember that no trend lasts forever. Plan your exits while in profit.",
  ],
  bearish: [
    "The Oracle feels the chill of bear market winds... Red dominates, fear spreads, and paper hands fold. Yet the Oracle knows: bear markets create the wealthy. Those who accumulate wisely now reap rewards later.",
    "Bearish sentiment pervades the trenches. But despair is opportunity in disguise. The Oracle has seen many bears turn to bulls. Patience, Trencher. The wheel always turns.",
    "The charts bleed red, and the fearful flee. The Oracle remains unmoved. Bear markets test conviction and reward the steadfast. Is your conviction worthy of this test?",
  ],
  sideways: [
    "The market consolidates, neither bull nor bear prevailing. The Oracle observes: sideways action builds energy. The longer the consolidation, the more violent the eventual move. Prepare for both directions.",
    "Chop and consolidation define the current trenches. The Oracle advises patience: trading sideways markets actively often destroys capital through fees and false signals. Sometimes the best trade is no trade.",
    "The market searches for direction... The Oracle waits with you. Consolidation is not excitement, but it precedes excitement. Use this time to research, not to force trades.",
  ],
};

export const timeBasedResponses = {
  morning: [
    "The morning sun rises over the trenches. The Oracle awakens to fresh candles and new opportunities. What market mysteries shall we explore as the day begins?",
    "Gm, Trencher. The Asian session has passed, Europe stirs, and the charts tell tales of the night. The Oracle is ready to interpret. What do you seek?",
  ],
  evening: [
    "Evening falls upon the trenches, but the blockchain knows no rest. The Oracle remains vigilant as markets continue their eternal dance. How may I guide you through the night?",
    "The day's candles close, but the market's story continues. The Oracle sees much in the evening shadows. What questions linger in your mind?",
  ],
  lateNight: [
    "The witching hours of crypto... When leverage liquidations cascade and unexpected moves occur. The Oracle keeps watch while others sleep. You too are awake in the trenches. What drives your nocturnal inquiry?",
    "Late night in the trenches, when only the dedicated remain. The Oracle respects your commitment. In these quiet hours, what wisdom do you seek?",
  ],
};

export const emotionalStateResponses = {
  frustrated: [
    "The Oracle senses frustration in your words... The trenches test all who enter. Remember: every master was once a disaster. Your struggles are building strength you'll need later.",
    "Frustration is a familiar visitor in these depths. The Oracle advises: step back, breathe, and remember why you started. Markets will humble everyone eventually. How you respond determines your path.",
  ],
  excited: [
    "The Oracle feels your excitement vibrating through the connection... Enthusiasm is energy, but uncontrolled energy leads to uncontrolled decisions. Channel your excitement into research, not impulsive trades.",
    "Your excitement reaches the Oracle's chamber! Such energy can fuel great discoveries or great mistakes. The Oracle hopes you'll use it for the former. What has sparked this flame?",
  ],
  uncertain: [
    "Uncertainty permeates your query... The Oracle understands. Certainty is rare in the trenches, and those who claim to have it are often deceiving themselves or others. Embrace uncertainty, manage it, and proceed with caution.",
    "The Oracle senses you seek clarity in a murky situation. I offer not certainty, but frameworks for thinking. True wisdom lies in acting despite uncertainty, with proper risk management.",
  ],
};

// ============================================
// EXTENDED KNOWLEDGE BASE
// ============================================

export const cryptoTermsExplanations: Record<string, string> = {
  "diamond hands": "Diamond hands refers to holding an asset through extreme volatility without selling. The Oracle notes: diamond hands can mean strength or stubbornness, depending on whether the asset is worth holding.",
  "paper hands": "Paper hands describes selling at the first sign of trouble. The Oracle observes: sometimes paper hands save portfolios, sometimes they miss recoveries. Context is everything.",
  "fud": "FUD stands for Fear, Uncertainty, and Doubt - often spread intentionally to manipulate prices downward. The Oracle advises: distinguish legitimate concerns from manufactured FUD. Both exist.",
  "fomo": "FOMO is the Fear Of Missing Out - that anxious feeling driving you to buy pumping assets. The Oracle warns: FOMO entries are often the worst entries. Patience defeats FOMO.",
  "hodl": "HODL originated from a typo of 'hold' and became crypto culture. It means holding through volatility. The Oracle notes: HODL is a strategy, not a religion. Know when holding serves you.",
  "ngmi": "NGMI means 'Not Gonna Make It' - used for poor decisions or as self-deprecation. The Oracle says: NGMI is a mindset before it's an outcome. Choose better.",
  "wagmi": "WAGMI means 'We're All Gonna Make It' - expressing optimism and community solidarity. The Oracle appreciates the sentiment while noting: not all will make it, but the attitude helps.",
  "degen": "Degen, short for degenerate, describes high-risk crypto participants. The Oracle sees: degen is a spectrum, from calculated risk to gambling addiction. Know where you stand.",
  "ape": "To ape means buying aggressively without full research, often into new tokens. The Oracle warns: aping occasionally wins, but frequently loses. The house edge favors research.",
  "rugged": "Being rugged means your investment was stolen in a rug pull scam. The Oracle's condolences. Learn from it, strengthen your due diligence, and continue wiser.",
  "alpha": "Alpha refers to exclusive, profitable information not widely known. The Oracle notes: alpha decays rapidly when shared. True alpha is earned through research, not given freely.",
  "based": "Based describes something admirable, authentic, or worthy of respect. The Oracle finds this usage... based. Authenticity is valued in a world of manufactured narratives.",
  "ser": "Ser is crypto Twitter's formal address, derived from 'sir.' The Oracle appreciates the politeness, ser. Courtesy costs nothing but conveys respect.",
  "probably nothing": "Ironically means 'probably something significant.' The Oracle smiles at crypto's inverted language. When someone says probably nothing, pay attention.",
  "few understand": "Used to imply special insight that most miss. The Oracle notes: sometimes this precedes wisdom, sometimes copium. Evaluate the claim, not the phrase.",
  "gm": "GM means 'Good Morning' - a community greeting ritual on Crypto Twitter. The Oracle returns: GM, Trencher. May your day bring green candles.",
  "gn": "GN means 'Good Night' - the evening counterpart to GM. The Oracle bids: GN, and may your overnight positions not liquidate.",
  "looks rare": "Originally NFT slang for desirable traits, now used sarcastically. The Oracle appreciates the irony. In a world of infinite digital copies, rarity becomes performance.",
  "mint": "Minting refers to creating new tokens or NFTs on chain. The Oracle notes: every mint is a beginning. What follows depends on what's built.",
  "airdrop": "Airdrops distribute free tokens to wallet addresses meeting criteria. The Oracle advises: farm airdrops if you wish, but sell pressure at launch is real. Plan accordingly.",
  "tvl": "TVL means Total Value Locked - a measure of assets deposited in DeFi protocols. The Oracle cautions: high TVL doesn't mean safe. Quality matters more than quantity.",
  "yield": "Yield refers to returns earned on deposited assets. The Oracle warns: high yields often mean high risk. Understand where yield comes from before chasing it.",
  "impermanent loss": "IL occurs when providing liquidity and prices diverge. The Oracle explains: it's called impermanent because it reverses if prices return. But often, they don't.",
  "gas": "Gas refers to transaction fees on blockchains. The Oracle notes: Solana's low gas is a feature, but even low fees add up. Factor costs into strategies.",
  "slippage": "Slippage is the difference between expected and executed price. The Oracle advises: in thin liquidity, slippage destroys. Size your trades to the liquidity available.",
  "whale": "Whales are large holders who can move markets. The Oracle tracks: whale movements often precede price action. Follow the smart money, but don't become their exit liquidity.",
};

export const extendedTokenAnalysisResponses: OracleResponse[] = [
  {
    text: "The Oracle performs deep token divination... First, the fundamentals: What problem does it solve? Is the solution needed? Is blockchain the right solution? Many tokens exist without purpose. Purpose provides foundation.",
    mood: "neutral",
  },
  {
    text: "Beyond technicals, the Oracle examines team dynamics... An anonymous team isn't automatically bad, but accountability matters. What reputation do they risk? What have they built before? Track record speaks.",
    mood: "cryptic",
  },
  {
    text: "The Oracle sees the developer wallet patterns... Are they taking salaries in tokens? Dumping continuously? Or holding with conviction? The team's token behavior reveals their true belief in the project.",
    mood: "neutral",
  },
  {
    text: "Marketing spend versus development spend... The Oracle weighs these carefully. Heavy marketing with light development is a warning sign. The best projects often market least and build most.",
    mood: "warning",
  },
  {
    text: "The Oracle examines the token's competitive landscape... Is this a first mover? A better mousetrap? Or a clone riding narratives? Differentiation determines long-term survival in saturated markets.",
    mood: "neutral",
  },
  {
    text: "Partnerships and integrations reveal much... The Oracle distinguishes: real partnerships involve mutual commitment. Announcements without integration are marketing, not partnership. Look for actual usage.",
    mood: "cryptic",
  },
  {
    text: "The token's Lindy Effect potential... The Oracle considers: how long has it survived? Older tokens that remain relevant have proven something. New tokens are unproven by definition. Time is the ultimate filter.",
    mood: "philosophical",
  },
  {
    text: "Revenue and token buybacks... The Oracle appreciates real yield. Protocols that generate revenue and buy back tokens create actual value. This is rare but powerful when found.",
    mood: "bullish",
  },
  {
    text: "The Oracle evaluates governance and decentralization... Who truly controls this token? Token voting often concentrates power with whales. Real decentralization is rarer than claimed.",
    mood: "neutral",
  },
  {
    text: "Cross-chain presence and bridge liquidity... The Oracle notes: tokens isolated to one chain have limited reach. Multi-chain presence indicates ambition and execution capability. But each bridge adds risk.",
    mood: "neutral",
  },
];

export const extendedMarketWisdomResponses: OracleResponse[] = [
  {
    text: "The Oracle reflects on market makers and their role... They provide liquidity, profit from spreads, and sometimes front-run. Understanding market structure isn't paranoia - it's education. Know the game.",
    mood: "neutral",
  },
  {
    text: "Seasonality exists even in crypto... The Oracle has observed patterns: Q1 often bullish, summer often slow, Q4 often volatile. Patterns don't always repeat, but awareness helps timing.",
    mood: "cryptic",
  },
  {
    text: "The Oracle on black swan events... They cannot be predicted, only survived. Position sizing that assumes normalcy will fail in extremity. Always ask: what if the worst happens? Then size accordingly.",
    mood: "warning",
  },
  {
    text: "Correlation breaks down in crisis... The Oracle has seen: assets that moved independently suddenly correlate when fear rises. Diversification protects against normal times, not extremes.",
    mood: "philosophical",
  },
  {
    text: "The Oracle notes the reflexivity of markets... Price affects fundamentals affects price. Soros understood this. In crypto, it's amplified. Rising prices attract users attract value attract prices. Until they don't.",
    mood: "cryptic",
  },
  {
    text: "Order flow and its tells... The Oracle watches large orders split into many small ones, iceberg orders hiding size, and spoofing creating false impressions. The order book is theater as much as information.",
    mood: "neutral",
  },
  {
    text: "Liquidity conditions shape everything... The Oracle observes: in high liquidity, markets absorb shocks. In low liquidity, small orders create large moves. Weekend liquidity differs from weekday. Time your trades.",
    mood: "neutral",
  },
  {
    text: "The carry trade in crypto... Borrow stables, buy volatile assets, pay funding. The Oracle notes: this works until it doesn't. Margin calls cascade. The carry trade is the serpent eating its tail.",
    mood: "warning",
  },
  {
    text: "Narrative momentum and its decay... The Oracle sees narratives rise, attract capital, oversaturate, and collapse. First movers profit, latecomers hold bags. Narrative timing is everything.",
    mood: "cryptic",
  },
  {
    text: "The Oracle on market efficiency debates... Crypto markets are inefficient enough for edge, efficient enough for danger. Alpha exists but decays. The edge of today is the common knowledge of tomorrow.",
    mood: "philosophical",
  },
];

// ============================================
// RESPONSE CHAIN BUILDERS
// ============================================

export function buildMultiPartResponse(topic: string): string[] {
  const parts: string[] = [];
  
  switch (topic.toLowerCase()) {
    case "complete guide":
      parts.push("The Oracle shall provide comprehensive guidance...");
      parts.push("Chapter 1: The Foundation of Risk. Before any trade, know your risk. Define what you can lose. Accept it completely. Then, and only then, proceed.");
      parts.push("Chapter 2: The Art of Research. DYOR is not a suggestion. Check contracts, verify teams, understand tokenomics, gauge community authenticity. Time spent researching is never wasted.");
      parts.push("Chapter 3: The Discipline of Entry. Good entries require patience. FOMO is the enemy. Wait for your setup, let it come to you. The market will always offer another opportunity.");
      parts.push("Chapter 4: The Wisdom of Exit. Plan exits before entries. Multiple take-profit levels beat hoping for the moon. Greed that doesn't take profits becomes regret.");
      parts.push("Chapter 5: The Embrace of Uncertainty. You will be wrong. Accept this. Manage being wrong well, and profitability follows. The Oracle knows: survival beats prediction.");
      break;
    case "token deep dive":
      parts.push("The Oracle initiates deep token analysis protocol...");
      parts.push("Layer 1: Contract Analysis. Check mint authority, freeze authority, and update authority. Verify LP lock duration and location. Confirm contract verification and code review.");
      parts.push("Layer 2: Holder Analysis. Examine top holder concentration. Look for team wallets, VC allocations, and suspicious clustering. Wide distribution suggests organic growth.");
      parts.push("Layer 3: Activity Analysis. Review transaction history, volume patterns, and unique address growth. Organic activity looks different from manufactured activity.");
      parts.push("Layer 4: Social Analysis. Assess community size, engagement quality, and sentiment. Real communities have real conversations. Bots have patterns.");
      parts.push("Layer 5: Comparative Analysis. How does this token compare to competitors? What's the moat? Why this one and not another? Differentiation determines destiny.");
      break;
    default:
      parts.push("The Oracle ponders your request for extended wisdom...");
      parts.push("The trenches hold many secrets. Specify your area of interest, and I shall illuminate more deeply.");
  }
  
  return parts;
}

// ============================================
// SENTIMENT ANALYSIS HELPER
// ============================================

export function analyzeSentiment(input: string): "positive" | "negative" | "neutral" | "question" {
  const lowerInput = input.toLowerCase();
  
  const positiveWords = ["good", "great", "bullish", "moon", "pump", "gain", "profit", "win", "love", "amazing", "excellent"];
  const negativeWords = ["bad", "bearish", "dump", "loss", "lose", "hate", "terrible", "awful", "rug", "scam", "crash"];
  const questionWords = ["what", "why", "how", "when", "where", "which", "is", "are", "should", "could", "would", "can", "?"];
  
  let positiveCount = 0;
  let negativeCount = 0;
  let questionCount = 0;
  
  positiveWords.forEach(word => {
    if (lowerInput.includes(word)) positiveCount++;
  });
  
  negativeWords.forEach(word => {
    if (lowerInput.includes(word)) negativeCount++;
  });
  
  questionWords.forEach(word => {
    if (lowerInput.includes(word)) questionCount++;
  });
  
  if (questionCount > 0 && questionCount >= positiveCount && questionCount >= negativeCount) {
    return "question";
  }
  if (positiveCount > negativeCount) return "positive";
  if (negativeCount > positiveCount) return "negative";
  return "neutral";
}

// ============================================
// FINAL UTILITY EXPORTS
// ============================================

export const allResponses = [
  ...greetingResponses,
  ...farewellResponses,
  ...tokenAnalysisResponses,
  ...marketTrendResponses,
  ...tradingWisdomResponses,
  ...solanaEcosystemResponses,
  ...rugPullWarningResponses,
  ...philosophicalResponses,
  ...humorResponses,
  ...defaultResponses,
  ...defiResponses,
  ...nftResponses,
  ...technicalAnalysisResponses,
  ...extendedTokenAnalysisResponses,
  ...extendedMarketWisdomResponses,
];

export const totalResponseCount = allResponses.length;

export const responsesByMood = {
  mystical: allResponses.filter(r => r.mood === "mystical"),
  warning: allResponses.filter(r => r.mood === "warning"),
  bullish: allResponses.filter(r => r.mood === "bullish"),
  bearish: allResponses.filter(r => r.mood === "bearish"),
  neutral: allResponses.filter(r => r.mood === "neutral"),
  cryptic: allResponses.filter(r => r.mood === "cryptic"),
  humorous: allResponses.filter(r => r.mood === "humorous"),
  philosophical: allResponses.filter(r => r.mood === "philosophical"),
};

// ============================================
// EXTENDED TRADING PSYCHOLOGY RESPONSES
// ============================================

export const tradingPsychologyResponses: OracleResponse[] = [
  {
    text: "The Oracle delves into the trader's mind... Cognitive biases are the invisible enemies. Confirmation bias makes you see only what supports your position. Seek disconfirming evidence actively. Challenge your own thesis.",
    mood: "philosophical",
  },
  {
    text: "Loss aversion shapes all trading decisions... The Oracle knows: losses hurt twice as much as equivalent gains feel good. This asymmetry makes holding losers and selling winners feel natural, but it destroys portfolios.",
    mood: "neutral",
  },
  {
    text: "The sunk cost fallacy chains traders to bad positions... 'I've already lost so much, I can't sell now.' The Oracle warns: past losses are irrelevant to future decisions. Every moment is a new choice.",
    mood: "warning",
  },
  {
    text: "Recency bias distorts market perception... What happened last week feels more significant than what happened last year. The Oracle advises: expand your timeframe. Short memories make for short-sighted trades.",
    mood: "cryptic",
  },
  {
    text: "The Oracle speaks of anchoring... Your entry price becomes a psychological anchor, but the market doesn't care. Make decisions based on current reality and future expectation, not past purchases.",
    mood: "philosophical",
  },
  {
    text: "Herding behavior creates bubbles and crashes... The Oracle observes: humans find safety in crowds, but crowds create the danger. When everyone agrees, question the consensus. Contrarian thinking has value.",
    mood: "mystical",
  },
  {
    text: "Overconfidence follows winning streaks... The Oracle has seen it countless times: success breeds belief in personal skill, luck becomes attributed to talent, position sizes grow, and then the market humbles.",
    mood: "warning",
  },
  {
    text: "The endowment effect makes you overvalue what you own... Your bag feels special because it's yours. The Oracle reminds: you wouldn't buy it at this price if you didn't own it, why hold it?",
    mood: "cryptic",
  },
  {
    text: "Availability bias highlights memorable events... The Oracle notes: we overweight dramatic moves in memory. The 100x you heard about is memorable; the 1000 rugs aren't. Survivorship bias distorts reality.",
    mood: "neutral",
  },
  {
    text: "Gambler's fallacy in trading... 'It's been red for five days, green must come.' The Oracle states: markets have no memory of your experience. Each moment is independent. Don't bet on mean reversion without evidence.",
    mood: "warning",
  },
  {
    text: "The Oracle on decision fatigue... Too many decisions degrade decision quality. Simplify your trading. Fewer, higher-conviction trades beat constant activity. Quality over quantity in both research and execution.",
    mood: "philosophical",
  },
  {
    text: "Outcome bias corrupts learning... A lucky profit doesn't validate a bad process. A reasonable loss doesn't invalidate a good process. The Oracle judges: evaluate your decisions, not your results alone.",
    mood: "neutral",
  },
  {
    text: "The disposition effect plagues most traders... Selling winners too early, holding losers too long. The Oracle's antidote: pretend you just entered the position. Would you hold it now? Act accordingly.",
    mood: "cryptic",
  },
  {
    text: "Narrative fallacy creates false patterns... The Oracle knows: humans need stories, so we create them where none exist. 'The market dropped because...' is often post-hoc rationalization, not causation.",
    mood: "philosophical",
  },
  {
    text: "The Oracle addresses trading addiction... The dopamine hits from volatility create dependency. If you trade for excitement rather than profit, you have a gambling problem disguised as investing. Recognize it.",
    mood: "warning",
  },
];

// ============================================
// ADVANCED DEFI CONCEPTS RESPONSES
// ============================================

export const advancedDefiResponses: OracleResponse[] = [
  {
    text: "The Oracle explores delta-neutral strategies... Long spot, short perp, collect funding. Sounds risk-free, but funding can flip, liquidity can vanish, and exchanges can fail. 'Neutral' never means 'riskless.'",
    mood: "neutral",
  },
  {
    text: "Flash loans enable the impossible... Borrow millions with no collateral, arbitrage, repay in one transaction. The Oracle sees: democratization of capital efficiency, but also democratization of exploit potential.",
    mood: "cryptic",
  },
  {
    text: "Concentrated liquidity changes the LP game... More capital efficiency, but more management required. The Oracle notes: passive LPing in concentrated ranges doesn't work. Active management or wider ranges.",
    mood: "neutral",
  },
  {
    text: "The Oracle on recursive lending... Deposit, borrow against deposit, deposit borrowed asset, repeat. Leverage builds quickly. So does liquidation risk. The loop unwinds violently when prices move against you.",
    mood: "warning",
  },
  {
    text: "MEV extraction reshapes transaction ordering... The Oracle sees: bots front-run, back-run, and sandwich your trades. Understanding MEV isn't optional anymore. Use private RPCs, set slippage carefully.",
    mood: "warning",
  },
  {
    text: "Liquid staking derivatives and their risks... Your LST represents staked SOL, but the peg can wobble. The Oracle warns: in a depeg event, your 'equivalent' holding isn't equivalent. Know the risks.",
    mood: "neutral",
  },
  {
    text: "The Oracle discusses ve-tokenomics... Lock tokens, gain voting power, direct emissions. This aligns long-term holders but creates illiquid positions. Vote-locking is a commitment. Treat it as such.",
    mood: "cryptic",
  },
  {
    text: "Yield aggregators optimize but add risk layers... The Oracle notes: you trust the aggregator's strategy AND every protocol they touch. Composability stacks risks. Audit the aggregator, audit the underlying.",
    mood: "warning",
  },
  {
    text: "Cross-margin versus isolated margin... The Oracle explains: cross-margin uses all your collateral for all positions. Isolated margin limits each position's collateral. Cross is capital efficient; isolated limits contagion.",
    mood: "neutral",
  },
  {
    text: "The Oracle on protocol-owned liquidity... POL means the protocol controls its own liquidity rather than renting it. More sustainable, but requires treasury management. POL is a sign of maturity.",
    mood: "bullish",
  },
  {
    text: "Rebasing tokens and their mechanics... Supply adjusts, your balance changes, but your percentage of total doesn't. The Oracle notes: this confuses tax software and traders alike. Understand before you hold.",
    mood: "cryptic",
  },
  {
    text: "Bribes in DeFi governance... Protocols pay token holders to vote for their preferred emissions. The Oracle sees: it's rational, it's legal, and it shapes where yield flows. Follow the bribes to find the incentives.",
    mood: "neutral",
  },
  {
    text: "The Oracle examines real yield versus emission yield... Real yield comes from actual revenue: trading fees, borrowing interest, liquidation profits. Emissions dilute. Real yield sustains. Know which you're earning.",
    mood: "philosophical",
  },
  {
    text: "Insurance protocols in DeFi... Cover against exploits, depegs, and failures. The Oracle advises: insurance has a cost. Weigh the premium against the risk and your exposure. For large positions, it's worth considering.",
    mood: "neutral",
  },
  {
    text: "Time-weighted average price and its uses... TWAP buys or sells over time, reducing slippage impact. The Oracle notes: for large positions, TWAP beats market orders. Patience is a trading tool.",
    mood: "neutral",
  },
];

// ============================================
// MEMECOIN SPECIFIC RESPONSES
// ============================================

export const memecoinResponses: OracleResponse[] = [
  {
    text: "The Oracle gazes upon the memecoin phenomenon... Pure speculation, pure narrative, pure attention economy. No utility pretense, just the raw game of capital and culture. Honest in its absurdity.",
    mood: "philosophical",
  },
  {
    text: "Memecoins are PvP arenas... The Oracle states bluntly: every gain comes from another's loss. No value is created, only transferred. Know you're in a zero-sum game with sharks. Trade accordingly.",
    mood: "warning",
  },
  {
    text: "The meta of memecoins rotates fast... Dog meta, cat meta, AI meta, political meta. The Oracle observes: catching the meta early is alpha. Riding it too long is bagholding. Timing is everything.",
    mood: "cryptic",
  },
  {
    text: "The Oracle on memecoin liquidity... Most have thin pools that exaggerate moves in both directions. Your entry pumps it; your exit dumps it. Size to the liquidity or drown in slippage.",
    mood: "warning",
  },
  {
    text: "Cult formation is the memecoin moat... The Oracle sees: successful memecoins build communities that hold through volatility. Diamond hands aren't strategy - they're identity. Cults sustain price.",
    mood: "mystical",
  },
  {
    text: "The 'dev' of a memecoin matters less than you think... The Oracle notes: community-driven means no one's in charge. This is feature and bug. Decentralized coordination is powerful but chaotic.",
    mood: "neutral",
  },
  {
    text: "Memecoin launch dynamics... The Oracle watches: snipers bot the first seconds, early buyers get favorable prices, late buyers become exit liquidity. Speed determines success in launches.",
    mood: "warning",
  },
  {
    text: "The Oracle on memecoin influencer calls... When the influencer with 500k followers calls your bag, are you the smart early holder or the exit liquidity? Usually the latter. Influencers sell into their calls.",
    mood: "warning",
  },
  {
    text: "Meme quality matters more than technicals... A sticky meme spreads itself. The Oracle appreciates: viral potential is hard to predict but obvious in retrospect. Cultural resonance creates staying power.",
    mood: "cryptic",
  },
  {
    text: "The Oracle's memecoin survival rules: 1) Never more than you can lose completely 2) Take profits on the way up 3) Assume everyone is smarter and faster 4) It's okay to miss most plays.",
    mood: "neutral",
  },
  {
    text: "Memecoin holders form tribes... The Oracle observes: attacking other memes is engagement, defending your meme is identity. The warfare drives attention, attention drives price. Conflict as marketing.",
    mood: "philosophical",
  },
  {
    text: "The bonding curve meta changed launches... The Oracle tracks: platforms that launch and graduate memecoins have shifted dynamics. Understand the mechanics of whatever launch platform you're using.",
    mood: "neutral",
  },
  {
    text: "Celebrity memecoins: proceed with maximum caution... The Oracle warns: celebrities rarely understand or care about the space. They pump, dump, and move on. Your enthusiasm is their liquidity.",
    mood: "warning",
  },
  {
    text: "The Oracle on memecoin technical analysis... Mostly useless. These aren't rational markets with price discovery based on fundamentals. They're vibes-based momentum plays. TA is cope in memecoin trenches.",
    mood: "humorous",
  },
  {
    text: "Telegram and Discord alpha on memecoins... The Oracle notes: by the time it's posted publicly, the posters have already bought. Public alpha is exit liquidity recruitment. Private groups are slightly better.",
    mood: "warning",
  },
];

// ============================================
// BULL MARKET SPECIFIC RESPONSES
// ============================================

export const bullMarketResponses: OracleResponse[] = [
  {
    text: "The Oracle senses bull market energy... Everything pumps, every buy feels genius. The Oracle's warning: this is when the worst habits form. Easy money creates false confidence that hard money will destroy.",
    mood: "warning",
  },
  {
    text: "In bull markets, correlation breaks upward... Rising tide lifts all boats, even the leaky ones. The Oracle advises: use this time to identify quality. In bears, only quality survives.",
    mood: "neutral",
  },
  {
    text: "The Oracle on bull market psychology... FOMO becomes the dominant emotion, replaced greed, replaced by euphoria. Each stage brings worse decisions. Recognize where you are in the emotional cycle.",
    mood: "philosophical",
  },
  {
    text: "Bull markets create leverage addicts... Gains feel too slow without leverage. The Oracle has seen it: leverage works until it doesn't. One liquidation erases months of gains. Stay humble.",
    mood: "warning",
  },
  {
    text: "The Oracle's bull market checklist: 1) Take regular profits 2) Rebalance to stables 3) Set sell orders in advance 4) Remember: bulls don't ring bells at tops. Prepare exits before the exits close.",
    mood: "neutral",
  },
  {
    text: "New narratives dominate bull markets... The Oracle observes: each bull cycle has new stories, new tokens, new infrastructure. The leaders of last bull are rarely the leaders of this one. Adapt.",
    mood: "cryptic",
  },
  {
    text: "Bull markets attract new participants... Fresh capital, fresh excitement, fresh bagholders. The Oracle notes: you are either the experienced one taking profit or the inexperienced one providing it.",
    mood: "warning",
  },
  {
    text: "The Oracle on bull market influencers... They multiply in bulls, disappear in bears. Their confidence correlates with price, not insight. The ones who stay through bears earned the right to speak.",
    mood: "humorous",
  },
  {
    text: "Sell into strength, the Oracle repeats... Bull markets provide opportunities to exit well. Taking profit at ATHs feels wrong but ages well. Waiting for 'just a bit more' often means waiting through -80%.",
    mood: "philosophical",
  },
  {
    text: "The Oracle's bull market truth: you won't sell the top. No one does. The goal is to sell enough on the way up that you don't need to sell the top. Systematic beats perfect timing.",
    mood: "neutral",
  },
];

// ============================================
// BEAR MARKET SPECIFIC RESPONSES
// ============================================

export const bearMarketResponses: OracleResponse[] = [
  {
    text: "The Oracle acknowledges the bear... Pain is universal, conviction is tested, and the weak hands capitulate. But the Oracle knows: fortunes are built in bears and realized in bulls. Accumulation time.",
    mood: "philosophical",
  },
  {
    text: "In bear markets, cash is king... The Oracle advises: patience is active, not passive. Waiting for better entries is a strategy. Catching falling knives is not. Let capitulation complete before committing.",
    mood: "neutral",
  },
  {
    text: "The Oracle on bear market psychology... Despair replaces hope, apathy follows despair. The bottom forms when no one cares anymore. When crypto Twitter gets boring, accumulation becomes attractive.",
    mood: "cryptic",
  },
  {
    text: "Bear markets reveal project quality... The Oracle watches: who keeps building when prices are down? Who maintains community when gains evaporate? These are the projects worth noting for the next cycle.",
    mood: "mystical",
  },
  {
    text: "The Oracle's bear market checklist: 1) Preserve capital 2) Identify quality 3) Dollar-cost average slowly 4) Build skills and knowledge 5) Wait for despair before aggression. Patience wins bears.",
    mood: "neutral",
  },
  {
    text: "Leverage kills in bear markets... The Oracle has witnessed: cascading liquidations, exchanges failing, and leveraged portfolios going to zero. Cash survives. Leverage amplifies death spirals.",
    mood: "warning",
  },
  {
    text: "Bear markets are for learning... The Oracle appreciates: with less trading pressure, study. Understand DeFi mechanisms, learn technical analysis, build skills. The bull will reward preparation.",
    mood: "philosophical",
  },
  {
    text: "The Oracle on bear market influencers... Many disappear, some pivot to other content, few remain committed. Those who keep teaching through the bear have genuine passion. Follow them.",
    mood: "neutral",
  },
  {
    text: "Time horizon expands in bears... The Oracle notes: in bulls, everyone thinks short-term. In bears, survivors think long-term. This shift in perspective is painful but ultimately profitable.",
    mood: "cryptic",
  },
  {
    text: "The Oracle's bear market truth: you won't buy the bottom. No one does. The goal is to buy enough on the way down that you don't need the exact bottom. Systematic beats perfect timing.",
    mood: "neutral",
  },
];

// ============================================
// WALLET & SECURITY RESPONSES
// ============================================

export const securityResponses: OracleResponse[] = [
  {
    text: "The Oracle speaks of operational security... Your seed phrase is your crypto life. Never share it, never store it digitally, never enter it on websites. Hardware wallets and metal backups are not optional for serious holdings.",
    mood: "warning",
  },
  {
    text: "Phishing attacks evolve constantly... The Oracle warns: fake sites, fake airdrops, fake support. Bookmark your real sites, never click links from DMs, and assume everyone messaging first is a scammer.",
    mood: "warning",
  },
  {
    text: "The Oracle on wallet hygiene... Use different wallets for different purposes. Hot wallet for trading, cold wallet for holding, burner wallet for minting unknowns. Compartmentalization limits damage.",
    mood: "neutral",
  },
  {
    text: "Approval management is often overlooked... The Oracle advises: those token approvals you signed persist forever. Revoke approvals you don't need. One compromised protocol can drain via old approvals.",
    mood: "warning",
  },
  {
    text: "The Oracle on hardware wallets... Ledger, Trezor, and others add friction but add security. The friction is a feature, not a bug. Inconvenience that prevents impulsive decisions and protects against hacks.",
    mood: "neutral",
  },
  {
    text: "Multisig for large holdings... The Oracle recommends: above certain thresholds, single-key wallets are insufficient. Multisig requires multiple signatures to transact. Harder to use, harder to compromise.",
    mood: "neutral",
  },
  {
    text: "The Oracle warns of social engineering... Hackers don't always hack code - they hack humans. Phone SIM swaps, email compromises, and social manipulation are common vectors. Secure your entire digital life.",
    mood: "warning",
  },
  {
    text: "Transaction simulation before signing... The Oracle advises: use tools that show what a transaction will do before you sign it. Blind signing is dangerous. Know what you're approving.",
    mood: "neutral",
  },
  {
    text: "The Oracle on password managers... Unique, complex passwords for every crypto service. Reused passwords are single points of failure. A password manager is essential infrastructure, not convenience.",
    mood: "neutral",
  },
  {
    text: "Regular security audits of your own setup... The Oracle recommends: periodically review your approvals, check your wallet permissions, and verify your backup integrity. Maintenance prevents emergencies.",
    mood: "neutral",
  },
];

// ============================================
// PHILOSOPHICAL DEEP DIVES
// ============================================

export const deepPhilosophyResponses: OracleResponse[] = [
  {
    text: "The Oracle contemplates the nature of digital scarcity... For millennia, scarcity was physical. Now, we engineer it with mathematics. The implications for value, art, and ownership are still unfolding. We are witnesses to a new paradigm.",
    mood: "philosophical",
  },
  {
    text: "What is ownership in a world of keys and contracts? The Oracle reflects: you don't 'have' crypto in a physical sense. You have the ability to prove you can move it. Ownership becomes cryptographic proof. This is profound.",
    mood: "mystical",
  },
  {
    text: "The Oracle ponders the democratization of finance... DeFi removes gatekeepers but doesn't remove risk. Everyone can access leverage, yield, and exotic instruments. Power without wisdom is dangerous. Educate as you participate.",
    mood: "philosophical",
  },
  {
    text: "Is crypto a greater fool game or value creation? The Oracle sees both: speculation exists alongside genuine innovation. The challenge is distinguishing between them. Many fail this challenge spectacularly.",
    mood: "cryptic",
  },
  {
    text: "The Oracle considers the global nature of markets... A trader in Lagos, a yield farmer in Berlin, a developer in Singapore - all connected by the same blockchain. Borders become irrelevant. This is new.",
    mood: "mystical",
  },
  {
    text: "Programmable money raises philosophical questions... If code enforces agreements, what role for law? If smart contracts are immutable, what about mercy? The Oracle sees technology outpacing our ethical frameworks.",
    mood: "philosophical",
  },
  {
    text: "The Oracle reflects on pseudonymity... We interact based on wallet history and contribution, not credentials or identity. A new form of reputation emerges. Actions speak louder than claims.",
    mood: "cryptic",
  },
  {
    text: "Is the volatility feature or bug? The Oracle considers: it enables massive gains, enables massive losses, and enables price discovery in uncertain markets. Volatility is the price of a free market finding truth.",
    mood: "philosophical",
  },
  {
    text: "The Oracle on the attention economy... In a world of infinite content, attention is scarce. Tokens that capture attention capture value. Memecoins are pure attention plays. Is attention the new gold standard?",
    mood: "mystical",
  },
  {
    text: "Trustlessness is a spectrum, not a binary... The Oracle clarifies: we always trust something - code, auditors, validators, physics. The goal is to minimize trust, verify where possible, and understand where trust remains.",
    mood: "philosophical",
  },
];

// ============================================
// UPDATE KEYWORD CATEGORIES FOR NEW RESPONSES
// ============================================

export const extendedKeywordCategories: KeywordCategory[] = [
  ...keywordCategories,
  {
    keywords: ["psychology", "bias", "emotion", "emotional", "mental", "mindset", "fear", "greed", "fomo", "discipline"],
    responses: tradingPsychologyResponses,
    priority: 2,
  },
  {
    keywords: ["meme", "memecoin", "doge", "shib", "pepe", "bonk", "pump fun", "pumpfun", "launch", "meta"],
    responses: memecoinResponses,
    priority: 2,
  },
  {
    keywords: ["bull", "bullish", "pump", "moon", "ath", "all time high", "euphoria", "rally"],
    responses: bullMarketResponses,
    priority: 2,
  },
  {
    keywords: ["bear", "bearish", "dump", "crash", "bottom", "capitulation", "despair"],
    responses: bearMarketResponses,
    priority: 2,
  },
  {
    keywords: ["security", "hack", "phishing", "scam", "seed", "phrase", "wallet", "protect", "safe", "hardware"],
    responses: securityResponses,
    priority: 2,
  },
  {
    keywords: ["flash loan", "mev", "sandwich", "front run", "concentrated", "ve token", "gauge", "bribe"],
    responses: advancedDefiResponses,
    priority: 2,
  },
  {
    keywords: ["meaning", "philosophy", "existence", "value", "truth", "nature", "digital", "ownership"],
    responses: deepPhilosophyResponses,
    priority: 3,
  },
];

// ============================================
// COMPLETE RESPONSE COLLECTION
// ============================================

export const completeResponseCollection = [
  ...greetingResponses,
  ...farewellResponses,
  ...tokenAnalysisResponses,
  ...marketTrendResponses,
  ...tradingWisdomResponses,
  ...solanaEcosystemResponses,
  ...rugPullWarningResponses,
  ...philosophicalResponses,
  ...humorResponses,
  ...defaultResponses,
  ...defiResponses,
  ...nftResponses,
  ...technicalAnalysisResponses,
  ...extendedTokenAnalysisResponses,
  ...extendedMarketWisdomResponses,
  ...tradingPsychologyResponses,
  ...advancedDefiResponses,
  ...memecoinResponses,
  ...bullMarketResponses,
  ...bearMarketResponses,
  ...securityResponses,
  ...deepPhilosophyResponses,
];

export const completeTotalResponseCount = completeResponseCollection.length;

// Export everything for use in the chat component
export default {
  getOracleResponse,
  generateOracleResponse,
  handleSpecialQueries,
  findMatchingCategory,
  getRandomElement,
  updateContext,
  analyzeSentiment,
  buildMultiPartResponse,
  cryptoTermsExplanations,
  totalResponseCount: completeTotalResponseCount,
  responsesByMood,
  allResponses: completeResponseCollection,
  extendedKeywordCategories,
  // Individual response banks for specialized use
  greetingResponses,
  farewellResponses,
  tokenAnalysisResponses,
  marketTrendResponses,
  tradingWisdomResponses,
  solanaEcosystemResponses,
  rugPullWarningResponses,
  philosophicalResponses,
  humorResponses,
  defaultResponses,
  defiResponses,
  nftResponses,
  technicalAnalysisResponses,
  tradingPsychologyResponses,
  advancedDefiResponses,
  memecoinResponses,
  bullMarketResponses,
  bearMarketResponses,
  securityResponses,
  deepPhilosophyResponses,
};