import helixLogo from "../../../assets/images/logo/helix-logo.webp"
import "./Header.scss"

export default function Header({
	togglePointsModal,
	toggleAboutModal,
	getAuctionPoolTotal,
	getAuctionMinPrice
}: any) {
	function isStakingPage(): boolean {
		return window.location.href.split("/")[3] === "auction"
	}

	return (
		<header className="flex--between">
			<div className="flex">
				<a href="https://www.helixmetaverse.com/" target="_blank">
					<div className="logo-container">
						<img src={helixLogo} alt="Helix logo" />
					</div>
				</a>
				<h1 className="brand--color" onClick={isStakingPage}>
					VAULTS
				</h1>
			</div>
			{getAuctionPoolTotal() > 0 && isStakingPage() && (
				<div className="auction-total">
					POOL TOTAL :{" "}
					<span className="brand--color">
						{getAuctionPoolTotal()}{" "}
						<i className="fa-brands fa-ethereum"></i>
					</span>{" "}
				</div>
			)}
			{getAuctionMinPrice() > 0 && isStakingPage() && (
				<div className="minimum-price">
					MIN. PRICE:{" "}
					<span className="brand--color">
						{" "}
						{getAuctionMinPrice()}{" "}
						<i className="fa-brands fa-ethereum"></i>
					</span>
				</div>
			)}
			<div className="flex gap">
				<ul className="nav-list flex gap">
					<li>
						<a href="/" className="flex min--gap">
							<i className="fa-solid fa-vault"></i>
							<span className="nav-text"> Vault</span>
						</a>
					</li>
					<li>
						<a href="auction" className="flex min--gap">
							<i className="fa-solid fa-gavel"></i>
							<span className="nav-text"> Auction</span>
						</a>
					</li>
					<li
						id="pointModalBtn"
						className="points-modal-btn"
						onClick={togglePointsModal}
					>
						<i
							id="pointModalIcon"
							className="fa-solid fa-coins"
						></i>
						Points
					</li>
					<li
						id="aboutModalBtn"
						onClick={toggleAboutModal}
						className="about-modal-btn flex min--gap"
					>
						<i className="fa-solid fa-user-astronaut"></i>
						<span className="nav-text"> About</span>
					</li>
				</ul>
			</div>
		</header>
	)
}
