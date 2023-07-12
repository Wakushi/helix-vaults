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
import { Analytics } from "@vercel/analytics/react"
import { getRawUrl, sanitizeInput } from "./utils"

export default function App() {
	const [isLoading, setIsLoading] = useState(false)
	const [userKey, setUserKey] = useState("")
	const [userItems, setUserItems] = useState({} as UserCollectibles)
	const [userRank, setUserRank] = useState({
		balance: 0,
		rank: "",
		total: ""
	})
	const [auctionData, setAuctionData] = useState({} as AuctionData)

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
	const [snackbarMessageType, setSnackbarMessageType] = useState("copy")
	const [isSnackbarShowing, setIsSnackbarShowing] = useState(false)

	function handleChange(event: any) {
		const { value } = event.target
		setUserKey(sanitizeInput(value) || "")
	}

	function handlePaste(event: any) {
		const { value } = event.target
		setUserKey(sanitizeInput(value) || "")
	}

	function getRank(): void {
		fetch(`https://staking.helixmetaverse.com/api/point/rank/${userKey}`)
			.then((r) => r.json())
			.then((data) => {
				setUserRank(data.payload)
				setIsLoading(false)
			})
	}

	function getWalletItems(): void {
		fetch(`https://staking.helixmetaverse.com/api/stake/${userKey}`)
			.then((r) => r.json())
			.then((data) => {
				setUserItems(data)
				setIsLoading(false)
			})
	}

	function getAuctionData(): void {
		fetch(
			`https://auction.helixmetaverse.com/api/logs/leaderboard/1?address=${userKey}`
		)
			.then((r) => r.json())
			.then((data) => {
				setAuctionData(data.data)
			})
	}

	function isDataReady(): boolean {
		return userRank && userRank.balance > 0
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

	function toggleScrollBtnVisibility(): void {
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
			setIsAboutModalShowing(false)
		} else {
			setIsAboutModalShowing(
				(prevIsShown) => (prevIsShown = !prevIsShown)
			)
		}
	}

	function detectUrlKeyParam(): void {
		const url = new URL(window.location.href)
		const params = new URLSearchParams(url.search)
		const key = params.get("key")
		if (key) {
			setUserKey(sanitizeInput(key) || "")
		}
	}

	function copyUrlWithKey(): void {
		navigator.clipboard.writeText(`${getRawUrl()}?key=${userKey}`)
		openSnackBar("copy")
	}

	function openSnackBar(type: string): void {
		setSnackbarMessageType(type)
		setIsSnackbarShowing(true)
		setTimeout(() => {
			setIsSnackbarShowing(false)
		}, 2000)
	}

	useEffect(() => {
		if (userKey.length >= 42) {
			setIsLoading(true)
			getRank()
			getWalletItems()
			getAuctionData()
			setTimeout(() => {
				window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
			}, 1000)
		}
	}, [userKey])

	useEffect(() => {
		detectUrlKeyParam()
		window.addEventListener("scroll", toggleScrollBtnVisibility)
	}, [])

	return (
		<>
			{isSnackbarShowing && (
				<Snackbar snackbarMessageType={snackbarMessageType} />
			)}
			<Header
				togglePointsModal={togglePointsModal}
				toggleAboutModal={toggleAboutModal}
			/>
			<Hero
				userKey={userKey}
				userRank={userRank}
				handleChange={handleChange}
				handlePaste={handlePaste}
				isLoading={isLoading}
				copyUrlWithKey={copyUrlWithKey}
			/>
			{isDataReady() && !isLoading && (
				<>
					<Rank userRank={userRank} userBid={auctionData} />

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
											key={collectible.id}
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
									<Collectible
										key={collectible.id}
										data={collectible}
										type="land"
									/>
								)
							})}
						{userItems.stakes &&
							isFiltered("collectible") &&
							userItems.stakes.collectibles.map(
								(collectible: Collectible) => {
									return (
										<Collectible
											key={collectible.id}
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
											key={collectible.id}
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
											key={collectible.id}
											data={collectible}
											type="airdrop2"
										/>
									)
								}
							)}
					</div>
				</>
			)}

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
