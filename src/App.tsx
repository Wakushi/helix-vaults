import { useEffect, useState } from "react"
import "./App.scss"
import { sanitizeInput } from "./utils"
import { Routes, Route } from "react-router-dom"
import StakingPage from "./modules/staking/StakingPage"
import Layout from "./layout/Layout"
import AuctionPage from "./modules/auction/AuctionPage"

export default function App() {
	const [userKey, setUserKey] = useState("")
	const [auctionData, setAuctionData] = useState({} as AuctionData)
	const [isScrollBtnVisible, setIsScrollBtnVisible] = useState(false)
	const [snackbarMessageType, setSnackbarMessageType] = useState("copy")
	const [isSnackbarShowing, setIsSnackbarShowing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	function getAuctionData(allData: boolean = false): void {
		const url = allData
			? "https://auction.helixmetaverse.com/api/logs/leaderboard/1"
			: `https://auction.helixmetaverse.com/api/logs/leaderboard/1?address=${userKey}`
		fetch(url)
			.then((r) => r.json())
			.then((data) => {
				setAuctionData(data.data)
				setIsLoading(false)
			})
	}

	function detectUrlKeyParam(): void {
		const url = new URL(window.location.href)
		const params = new URLSearchParams(url.search)
		const key = params.get("key")
		if (key) {
			setUserKey(sanitizeInput(key) || "")
		}
	}

	function openSnackBar(type: string): void {
		setSnackbarMessageType(type)
		setIsSnackbarShowing(true)
		setTimeout(() => {
			setIsSnackbarShowing(false)
		}, 2000)
	}

	function toggleScrollBtnVisibility(): void {
		if (window.scrollY > 1000) {
			setIsScrollBtnVisible(true)
		} else {
			setIsScrollBtnVisible(false)
		}
	}

	useEffect(() => {
		detectUrlKeyParam()
		window.addEventListener("scroll", toggleScrollBtnVisibility)
	}, [])

	return (
		<>
			<Layout
				isScrollBtnVisible={isScrollBtnVisible}
				isSnackbarShowing={isSnackbarShowing}
				snackbarMessageType={snackbarMessageType}
				openSnackBar={openSnackBar}
			>
				<Routes>
					<Route
						path="/"
						element={
							<StakingPage
								userKey={userKey}
								openSnackBar={openSnackBar}
								auctionData={auctionData}
								getAuctionData={getAuctionData}
								setUserKey={setUserKey}
								isLoading={isLoading}
								setIsLoading={setIsLoading}
							/>
						}
					/>
					<Route
						path="/auction"
						element={
							<AuctionPage
								auctionData={auctionData}
								getAuctionData={getAuctionData}
								isLoading={isLoading}
								setIsLoading={setIsLoading}
							/>
						}
					/>
				</Routes>
			</Layout>
		</>
	)
}
