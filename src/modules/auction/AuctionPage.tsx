import { useEffect } from "react"
import "./AuctionPage.scss"
import { MINIMUM_BID_PRICE } from "../../core/services/price-data.service"

export default function AuctionPage({
	auctionData,
	getAuctionData,
	isLoading,
	setIsLoading,
	isFormulaActivated
}: any) {
	useEffect(() => {
		getAuctionData()
		setIsLoading(true)
	}, [])

	function getAuctionPoolTotal(): number {
		return auctionData.leaderboard
			? auctionData.leaderboard
					.map((bidder: AuctionBidder) => +bidder.value)
					.reduce((total: number, acc: number) => total + acc)
					.toFixed(5)
			: 0
	}

	function getMintPrice(): number {
		return getAuctionPoolTotal() >= getFormulaMinEthAmount()
			? auctionData.minimumPrice
			: MINIMUM_BID_PRICE
	}

	function getClaimableNFTsAmount(paid: number): number {
		return Math.floor(paid / getMintPrice())
	}

	function computeCost(paid: number): number {
		const totalCost = getClaimableNFTsAmount(paid) * getMintPrice()
		return totalCost
	}

	function computeRemainder(paid: number): number {
		return paid - computeCost(paid)
	}

	function getFormulaMinEthAmount(): number {
		const NFT_POOL = isFormulaActivated ? 10 : 2300
		return NFT_POOL * MINIMUM_BID_PRICE
	}

	return (
		<div>
			{!isLoading && (
				<div className="auction-container">
						<div className="auction-header flex--between">
							<div className="rank-head">Rank</div>
							<div className="bidder-head">Bidder</div>
							<div className="vault-head">
								<span>Vault</span>
							</div>
							<div className="bids-head">
								<span>Bids</span>
							</div>
							<div className="bid-amount-head">
								Bid amount{" "}
								<i className="fa-brands fa-ethereum"></i>
							</div>
							<div className="cost-head">
								Cost <i className="fa-brands fa-ethereum"></i>
							</div>
							<div className="remainder-head">
								Remainder{" "}
								<i className="fa-brands fa-ethereum"></i>
							</div>
							<div className="nfts-head">NFTs</div>
						</div>
					<div className="auction-page flex--column">
						{auctionData.leaderboard && (
							<div className="auction-table flex--column">
								{auctionData.leaderboard.map(
									(bidder: AuctionBidder, index: number) => {
										const { bids, paid } = bidder
										return (
											<div
												className="auction-row flex--between gap"
												key={bidder.bidder}
											>
												<div className="auction-column rank-row">
													{index + 1}
												</div>
												<div className="auction-column bidder-row">
													<a
														href={`https://opensea.io/${bidder.bidder}`}
														target="_blank"
													>
														{bidder.bidder}
													</a>
												</div>
												<div className="auction-column vault-row">
													<a
														href={`/?key=${bidder.bidder}`}
													>
														<i className="fa-solid fa-vault"></i>
													</a>
												</div>
												<div className="auction-column bids-row">
													{bids}
												</div>
												<div className="auction-column bid-amount-row">
													{paid.toFixed(3)}
												</div>
												<div className="auction-column cost-row">
													{computeCost(paid).toFixed(
														3
													)}
												</div>
												<div className="auction-column remainder-row">
													{computeRemainder(
														paid
													).toFixed(3)}
												</div>
												<div className="auction-column nfts-row">
													{getClaimableNFTsAmount(
														paid
													)}
												</div>
											</div>
										)
									}
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
