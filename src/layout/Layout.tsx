import { Analytics } from "@vercel/analytics/react"
import { useState } from "react"
import Header from "../core/components/header/Header"
import AboutModal from "../shared/components/about-modal/AboutModal"
import PointsModal from "../shared/components/points-modal/PointsModal"
import ScrollUpButton from "../shared/components/scroll-up-button/ScrollUpButton"
import Snackbar from "../shared/components/snackbar/Snackbar"
import {
	FORMULA_MIN_ETH_AMOUNT,
	MINIMUM_BID_PRICE
} from "../core/services/price-data.service"

export default function Layout({
	children,
	isScrollBtnVisible,
	isSnackbarShowing,
	snackbarMessageType,
	openSnackBar,
	auctionData,
	toggleFormula,
	isFormulaActivated
}: any) {
	const [isPointsModalShowing, setIsPointsModalShowing] = useState(false)
	const [isAboutModalShowing, setIsAboutModalShowing] = useState(false)

	function togglePointsModal({ target }: any) {
		const authorizedInteraction = [
			"modal-container",
			"pointModalBtn",
			"pointModalIcon"
		]
		if (!authorizedInteraction.includes(target.id)) return
		setIsPointsModalShowing((prevIsShown) => (prevIsShown = !prevIsShown))
	}

	function toggleAboutModal({ target }: any) {
		const authorizedInteraction = [
			"modal-container",
			"aboutModalBtn",
			"aboutModalXmark"
		]
		if (!authorizedInteraction.includes(target.id)) {
			return
		} else if (target.id === "aboutModalXmark") {
			setIsAboutModalShowing(false)
		} else {
			setIsAboutModalShowing(
				(prevIsShown) => (prevIsShown = !prevIsShown)
			)
		}
	}

	function getAuctionPoolTotal(): number {
		return auctionData.leaderboard
			? auctionData.leaderboard
					.map((bidder: AuctionBidder) => +bidder.value)
					.reduce((total: number, acc: number) => total + acc)
					.toFixed(5)
			: 0
	}

	function getAuctionMinPrice(): number {
		if (
			getAuctionPoolTotal() >= FORMULA_MIN_ETH_AMOUNT ||
			isFormulaActivated
		) {
			return auctionData.minimumPrice
				? auctionData.minimumPrice.toFixed(3)
				: 0
		} else {
			return MINIMUM_BID_PRICE
		}
	}

	return (
		<>
			{isSnackbarShowing && (
				<Snackbar snackbarMessageType={snackbarMessageType} />
			)}
			<Header
				togglePointsModal={togglePointsModal}
				toggleAboutModal={toggleAboutModal}
				getAuctionPoolTotal={getAuctionPoolTotal}
				getAuctionMinPrice={getAuctionMinPrice}
				isFormulaActivated={isFormulaActivated}
				toggleFormula={toggleFormula}
			/>
			{children}
			{isScrollBtnVisible && <ScrollUpButton />}
			{isPointsModalShowing && (
				<PointsModal togglePointsModal={togglePointsModal} />
			)}
			{isAboutModalShowing && (
				<AboutModal
					toggleAboutModal={toggleAboutModal}
					openSnackBar={() => openSnackBar("copy")}
				/>
			)}
			<Analytics />
		</>
	)
}
