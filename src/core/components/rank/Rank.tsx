import HelixFrame from "../../../shared/components/helix-frame/HelixFrame"
import "./Rank.scss"

export default function Rank({ userRank }: any) {
	return (
		<section className="user-rank flex--center flex--column">
			<div className="rank-content flex--center flex--column">
				<h2>Rank</h2>
				<p className="brand--color bold--text"> #{userRank.rank} </p>
				<h2>Balance</h2>
				<p className="brand--color bold--text"> {userRank.balance} </p>
				<HelixFrame />
			</div>
		</section>
	)
}
