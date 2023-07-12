interface AuctionData {
	leaderboard: AuctionBidder[]
	rank: number
	percentage: number
	entry: AuctionBidder
	minimumPrice: number
}

interface AuctionBidder {
	bidder: string
	bids: number
	cost: number
	nfts: number
	paid: number
	remainder: number
	value: number
}
