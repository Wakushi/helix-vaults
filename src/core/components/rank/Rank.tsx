import HelixFrame from "../../../shared/components/helix-frame/HelixFrame"
import "./Rank.scss"

export default function Rank({ userRank, userBid }: any) {
	return (
		<section className="user-rank flex--center flex--column">
			<div className="rank-content flex--center gap">
				<div className="flex--column ">
					<h2>Rank</h2>
					<p className="brand--color bold--text">
						{" "}
						#{userRank.rank}{" "}
					</p>
					<h2>Balance</h2>
					<p className="brand--color bold--text">
						{" "}
						{userRank.balance}{" "}
					</p>
				</div>
				{userBid.entry && userBid.entry.value && (
					<div className="flex--column">
						<h2>Auction rank</h2>
						<p className="brand--color bold--text">
							{" "}
							{userBid.rank}/{userBid.leaderboard.length}{" "}
						</p>
						<h2>Total bid</h2>
						<p className="brand--color bold--text">
							{" "}
							{userBid.entry.paid.toFixed(3)}{" "}
							<i className="fa-brands fa-ethereum"></i>
						</p>
					</div>
				)}
				<HelixFrame />
			</div>
		</section>
	)
}
