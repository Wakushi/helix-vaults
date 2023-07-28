interface UserCollectibles {
	items: UnstackedCollectible
	stakes: Collectibles
}

interface Collectibles {
	airdrop1: Collectible[]
	airdrop2: Airdrop2[]
	collectibles: Collectible[]
	lands: Land[]
	passes: Collectible[]
	pfp: Collectible[]
}

interface UnstackedCollectible {
	id: string
	amount: string
}

interface Collectible {
	endTimestamp: number
	id: string
	points: number
	stakedPeriod: string
	startBlock: string
	startTimestamp: string
	tokenId: string
	amount?: string
}

interface Airdrop2 extends Collectible {
	name: string
}

interface Land extends Collectible {
	tier: string
	name: string
}
