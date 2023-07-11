import HelixFrame from "../helix-frame/HelixFrame"
import "./PointsModal.scss"
import sparkIcon from "../../../assets/images/icons/spark-icon.svg"

export default function PointsModal({ togglePointsModal }: any) {
	return (
		<div
			onClick={togglePointsModal}
			id="modal-container"
			className="modal-container flex--center"
		>
			<div id="modal-inner" className="modal-inner flex--center">
				<div className="points-card flex--column gap">
					<div className="points-stat flex min--gap">
						<img
							className="spark-icon"
							src={sparkIcon}
							alt="Spark icon"
						/>
						15 PTS/DAY
					</div>
					<h2>FOUNDER PASS</h2>
					<p>
						For every Founder Pass you stake, you will earn 15 HELIX
						Points per day.
					</p>
				</div>
				<div className="points-card flex--column gap">
					<div className="points-stat flex min--gap">
						<img
							className="spark-icon"
							src={sparkIcon}
							alt="Spark icon"
						/>
						15 PTS/DAY
					</div>
					<h2>BILLIONAIRE MANSION</h2>
					<p>
						For every Billionaire Mansion you stake, you will earn
						15 HELIX Points per day.
					</p>
				</div>
				<div className="points-card flex--column gap">
					<div className="points-stat flex min--gap">
						<img
							className="spark-icon"
							src={sparkIcon}
							alt="Spark icon"
						/>
						5 PTS/DAY
					</div>
					<h2>LUXURY SUITE</h2>
					<p>
						For every Luxury Suite you stake, you will earn 5 HELIX
						Points per day.
					</p>
				</div>
				<div className="points-card flex--column gap">
					<div className="points-stat flex min--gap">
						<img
							className="spark-icon"
							src={sparkIcon}
							alt="Spark icon"
						/>
						6 PTS/DAY
					</div>
					<h2>FOUNDER PENTHOUSE</h2>
					<p>
						For every Founder Penthouse you stake, you will earn 6
						HELIX Points per day.
					</p>
				</div>
				<div className="points-card flex--column gap">
					<div className="points-stat flex min--gap">
						<img
							className="spark-icon"
							src={sparkIcon}
							alt="Spark icon"
						/>
						3 PTS/DAY
					</div>
					<h2>MODERN FLAT</h2>
					<p>
						For every Modern Flat you stake, you will earn 3 HELIX
						Points per day.
					</p>
				</div>
				<div className="points-card flex--column gap">
					<div className="points-stat flex min--gap">
						<img
							className="spark-icon"
							src={sparkIcon}
							alt="Spark icon"
						/>
						2 PTS/DAY
					</div>
					<h2>COZY LOFT</h2>
					<p>
						For every Cozy Loft you stake, you will earn 2 HELIX
						Points per day.
					</p>
				</div>
				<div className="points-card flex--column gap">
					<div className="points-stat flex min--gap">
						<img
							className="spark-icon"
							src={sparkIcon}
							alt="Spark icon"
						/>
						0.1 PTS/DAY
					</div>
					<h2>HELIX COLLECTIBLES</h2>
					<p>
						For every HELIX Collectable you stake, (Clothing,
						Accessories, Vaults, Mystery Boxes, etc) you will earn
						0.1 HELIX Points per day.
					</p>
				</div>
				<div className="points-card flex--column gap">
					<div className="points-stat flex min--gap">
						<img
							className="spark-icon"
							src={sparkIcon}
							alt="Spark icon"
						/>
						3 PTS/DAY
					</div>
					<h2>MYSTERY CARS / 1959 ARCHIPELAGO</h2>
					<p>
						For every 1959 Archipelago Cruisemaster and Mystery Car
						you stake (all tiers), you will earn 3 HELIX Points per
						day.
					</p>
				</div>
				<HelixFrame />
			</div>
		</div>
	)
}
