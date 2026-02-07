interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Lodestar - OAuth-native Blockchain',
    description: `A Substrate PoC for on-chain JWT verification, starting with RSA signature checks.
    Designed as a building block for wallet-less UX and web-native auth in appchains.`,
    imgSrc: '/static/images/lodestar01.png',
    href: 'https://github.com/somthn0somthn/rsa-ver-chain',
  },
  {
    title: 'Fusogen - Equitable DAO M&As',
    description: `A Solana devnet PoC for “merger of equals” mechanics: two treasuries burn assets
    and receive a newly minted combined token, signed by multiple parties in one flow.`,
    imgSrc: '/static/images/fusogen01.png',
    href: 'https://www.fusogen.io/',
  },
  {
    title: 'Fusogen Interchain - Cross-chain DAO M&As',
    description: `A Cosmos interchain PoC exploring DAO merger mechanics across Juno and XION via IBC
    relaying—lock value on one chain, mint/settle on the other, with a migration-to-XION roadmap.`,
    imgSrc: '/static/images/fusogen-interchain01.png',
    href: 'https://github.com/somthn0somthn/fusogen-xion-inter',
  },
  {
    title: 'Beerus - Starknet Light Client',
    description: `Contributor work on a Starknet light client (inspired by Helios) aimed at fast, simple
    Starknet state queries and contract interaction with L1-backed verification paths.`,
    imgSrc: '/static/images/beerus01.png',
    href: 'https://github.com/somthn0somthn/beerus',
  },
]

export default projectsData
