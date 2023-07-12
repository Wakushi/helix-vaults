import { Analytics } from "@vercel/analytics/react"
import { useState } from "react"
import Header from "../core/components/header/Header"
import AboutModal from "../shared/components/about-modal/AboutModal"
import PointsModal from "../shared/components/points-modal/PointsModal"
import ScrollUpButton from "../shared/components/scroll-up-button/ScrollUpButton"
import Snackbar from "../shared/components/snackbar/Snackbar"

export default function Layout({
	children,
	isScrollBtnVisible,
	isSnackbarShowing,
	snackbarMessageType,
	openSnackBar
}: any) {
	const [isPointsModalShowing, setIsPointsModalShowing] = useState(false)
	const [isAboutModalShowing, setIsAboutModalShowing] = useState(false)

	function togglePointsModal({ target }: any) {
		if (target.id !== "modal-container" && target.id !== "pointModalBtn")
			return
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

	return (
		<>
			{isSnackbarShowing && (
				<Snackbar snackbarMessageType={snackbarMessageType} />
			)}
			<Header
				togglePointsModal={togglePointsModal}
				toggleAboutModal={toggleAboutModal}
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
