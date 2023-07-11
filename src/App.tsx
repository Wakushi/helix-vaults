import { useEffect, useState } from "react"
import "./App.scss"
import Collectible from "./shared/components/collectible/Collectible"
import Header from "./core/components/header/Header"
import Hero from "./core/components/hero/Hero"
import Rank from "./core/components/rank/Rank"
import ScrollUpButton from "./shared/components/scroll-up-button/ScrollUpButton"
import PointsModal from "./shared/components/points-modal/PointsModal"
import AboutModal from "./shared/components/about-modal/AboutModal"
import Snackbar from "./shared/components/snackbar/Snackbar"

export default function App() {
	const [userKey, setUserKey] = useState("")
	const [userItems, setUserItems] = useState({} as UserCollectibles)
	const [userRank, setUserRank] = useState({
		balance: 0,
		rank: "",
		total: ""
	})

	const [filters, setFilters] = useState([
		"collectible",
		"land",
		"pass",
		"airdrop1",
		"airdrop2"
	])

	const [isScrollBtnVisible, setIsScrollBtnVisible] = useState(false)
	const [isPointsModalShowing, setIsPointsModalShowing] = useState(false)
	const [isAboutModalShowing, setIsAboutModalShowing] = useState(false)

	function handleChange(event: any) {
		const { value } = event.target
		setUserKey(value)
	}

	function handlePaste(event: any) {
		const { value } = event.target
		setUserKey(value)
	}

	function getRank(): void {
		fetch(`https://staking.helixmetaverse.com/api/point/rank/${userKey}`)
			.then((r) => r.json())
			.then((data) => {
				setUserRank(data.payload)
			})
	}

	function getWalletItems(): void {
		fetch(`https://staking.helixmetaverse.com/api/stake/${userKey}`)
			.then((r) => r.json())
			.then((data) => {
				setUserItems(data)
			})
	}

	function isDataReady(): boolean {
		return userRank.balance > 0
	}

	function isFiltered(type: string): boolean {
		return filters.includes(type)
	}

	function filterCollectibles(type: string): void {
		if (type === "all") {
			setFilters(["collectible", "land", "pass", "airdrop1", "airdrop2"])
		} else {
			setFilters([type])
		}
	}

	function toggleVisibility(): void {
		if (window.scrollY > 1000) {
			setIsScrollBtnVisible(true)
		} else {
			setIsScrollBtnVisible(false)
		}
	}

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
			setIsAboutModalShowing((prevIsShown) => (prevIsShown = false))
		} else {
			setIsAboutModalShowing(
				(prevIsShown) => (prevIsShown = !prevIsShown)
			)
		}
	}

	useEffect(() => {
		if (userKey.length >= 42) {
			getRank()
			getWalletItems()
			setTimeout(() => {
				window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
			}, 1000)
		}
	}, [userKey])

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility)
	}, [])

	return (
		<>
			<Snackbar />
			<Header
				togglePointsModal={togglePointsModal}
				toggleAboutModal={toggleAboutModal}
			/>
			<Hero
				userKey={userKey}
				handleChange={handleChange}
				handlePaste={handlePaste}
			/>
			{isDataReady() && <Rank userRank={userRank} />}
			{isDataReady() && (
				<div className="filter-btns flex--center gap">
					<button
						className="basic-button"
						onClick={() => filterCollectibles("all")}
					>
						All
					</button>
					<button
						className="basic-button"
						onClick={() => filterCollectibles("pass")}
					>
						Pass
					</button>
					<button
						className="basic-button"
						onClick={() => filterCollectibles("land")}
					>
						Lands
					</button>
					<button
						className="basic-button"
						onClick={() => filterCollectibles("collectible")}
					>
						Collectible
					</button>
					<button
						className="basic-button"
						onClick={() => filterCollectibles("airdrop1")}
					>
						Airdrop n°1
					</button>
					<button
						className="basic-button"
						onClick={() => filterCollectibles("airdrop2")}
					>
						Airdrop n°2
					</button>
				</div>
			)}
			{isDataReady() && (
				<div
					id="collectible-list"
					className="stacked-collectibles-list flex--center"
				>
					{userItems.stakes &&
						isFiltered("pass") &&
						userItems.stakes.passes.map(
							(collectible: Collectible) => {
								return (
									<Collectible
										data={collectible}
										type="pass"
									/>
								)
							}
						)}
					{userItems.stakes &&
						isFiltered("land") &&
						userItems.stakes.lands.map((collectible: Land) => {
							return (
								<Collectible data={collectible} type="land" />
							)
						})}
					{userItems.stakes &&
						isFiltered("collectible") &&
						userItems.stakes.collectibles.map(
							(collectible: Collectible) => {
								return (
									<Collectible
										data={collectible}
										type="collectible"
									/>
								)
							}
						)}
					{userItems.stakes &&
						isFiltered("airdrop1") &&
						userItems.stakes.airdrop1.map(
							(collectible: Collectible) => {
								return (
									<Collectible
										data={collectible}
										type="airdrop1"
									/>
								)
							}
						)}
					{userItems.stakes &&
						isFiltered("airdrop2") &&
						userItems.stakes.airdrop2.map(
							(collectible: Collectible) => {
								return (
									<Collectible
										data={collectible}
										type="airdrop2"
									/>
								)
							}
						)}
				</div>
			)}
			{isScrollBtnVisible && <ScrollUpButton />}
			{isPointsModalShowing && (
				<PointsModal togglePointsModal={togglePointsModal} />
			)}
			{isAboutModalShowing && (
				<AboutModal toggleAboutModal={toggleAboutModal} />
			)}
		</>
	)
}
