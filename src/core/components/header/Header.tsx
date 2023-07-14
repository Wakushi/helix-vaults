import { useState } from "react"
import helixLogo from "../../../assets/images/logo/helix-logo.webp"
import auctionPriceInfo from "../../../assets/images/other/helix-auction-price-info.png"
import "./Header.scss"
import {
	FORMULA_MIN_ETH_AMOUNT,
	MINIMUM_BID_PRICE
} from "../../services/price-data.service"

export default function Header({
	togglePointsModal,
	toggleAboutModal,
	getAuctionPoolTotal,
	getAuctionMinPrice,
	isFormulaActivated,
	toggleFormula
}: any) {
	const [isInfoShowing, setIsInfoShowing] = useState(false)
	function isStakingPage(): boolean {
		return window.location.href.split("/")[3] === "auction"
	}

	function toggleInfoModal(): void {
		setIsInfoShowing(
			(prevIsInfoShowing) => (prevIsInfoShowing = !prevIsInfoShowing)
		)
	}

	const infoModalStyle = {
		transform: isInfoShowing ? "translateY(0%)" : "translateY(-100%)"
	}

	const formulaToggleStyle = {
		transform: isFormulaActivated ? "translateX(100%)" : "translateX(0%)"
	}

	const formulaSwitchStyle = {
		backgroundColor: isFormulaActivated ? "#ff4242" : "rgb(79, 74, 74)"
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
						{isFormulaActivated
							? ">" + FORMULA_MIN_ETH_AMOUNT
							: getAuctionPoolTotal()}{" "}
						<i className="fa-brands fa-ethereum"></i>
					</span>{" "}
				</div>
			)}
			{getAuctionMinPrice() > 0 && isStakingPage() && (
				<div className="minimum-price">
					MIN. PRICE:{" "}
					<span className="brand--color">
						{" "}
						{isFormulaActivated
							? getAuctionMinPrice()
							: MINIMUM_BID_PRICE}{" "}
						<i className="fa-brands fa-ethereum"></i>
						<i
							className="fa-solid fa-circle-info"
							onClick={toggleInfoModal}
						></i>
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

			<div className="header-info-modal" style={infoModalStyle}>
				<div className="info-image-container">
					<i
						className="fa-solid fa-caret-up hover"
						onClick={toggleInfoModal}
					></i>
					<img
						src={auctionPriceInfo}
						alt="Info about the auction mint price"
					/>
				</div>
				<div className="info-option flex--between">
					<p>SIMULATE FORMULA</p>
					<div
						className="switch-container btn-selected"
						style={formulaSwitchStyle}
						onClick={toggleFormula}
					>
						<div
							className="box-button switch flex--center"
							style={formulaToggleStyle}
							onClick={toggleFormula}
						>
							<i className="fa-brands fa-ethereum"></i>
						</div>
					</div>{" "}
				</div>
			</div>
		</header>
	)
}
