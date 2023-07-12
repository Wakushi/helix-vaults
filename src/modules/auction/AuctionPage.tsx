import { useEffect } from "react"
import "./AuctionPage.scss"

export default function AuctionPage({
	auctionData,
	getAuctionData,
	isLoading,
	setIsLoading
}: any) {
	useEffect(() => {
		getAuctionData()
		setIsLoading(true)
	}, [])

	return (
		<div>
			{!isLoading && (
				<div className="auction-container">
					<div className="auction-page flex--column">
						<div className="auction-header flex--between">
							<div className="rank-head">Rank</div>
							<div className="bidder-head">Bidder</div>
							<div className="vault-head">
								<span>Vault</span>
							</div>
							<div className="bids-head">
								<span>Bids</span>
							</div>
							<div className="bid-amount-head">Bid amount</div>
							<div className="cost-head">Cost</div>
							<div className="remainder-head">Remainder</div>
							<div className="nfts-head">NFTs</div>
						</div>
						{auctionData.leaderboard && (
							<div className="auction-table flex--column">
								{auctionData.leaderboard.map(
									(bidder: AuctionBidder, index: number) => {
										const {
											bids,
											paid,
											cost,
											remainder,
											nfts
										} = bidder
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
													{cost.toFixed(3)}
												</div>
												<div className="auction-column remainder-row">
													{remainder.toFixed(3)}
												</div>
												<div className="auction-column nfts-row">
													{nfts}
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
