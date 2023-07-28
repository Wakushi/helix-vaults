import { useEffect, useState } from "react"
import { getRawUrl, sanitizeInput } from "../../utils"
import Hero from "../../core/components/hero/Hero"
import Rank from "../../core/components/rank/Rank"
import Collectible from "../../shared/components/collectible/Collectible"
import "./StakingPage.scss"

export default function StakingPage({
	openSnackBar,
	auctionData,
	getAuctionData,
	userKey,
	setUserKey,
	setIsLoading,
	isLoading
}: any) {
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
		"airdrop2",
		"pfp"
	])

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

	function copyUrlWithKey(): void {
		navigator.clipboard.writeText(`${getRawUrl()}?key=${userKey}`)
		openSnackBar("copy")
	}

	function isDataReady(): boolean {
		return userRank && userRank.balance > 0
	}

	function filterCollectibles(type: string): void {
		if (type === "all") {
			setFilters([
				"collectible",
				"land",
				"pass",
				"airdrop1",
				"airdrop2",
				"pfp"
			])
		} else {
			setFilters([type])
		}
	}

	function isFiltered(type: string): boolean {
		return filters.includes(type)
	}

	return (
		<>
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
						<button
							className="basic-button"
							onClick={() => filterCollectibles("pfp")}
						>
							Citizen
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
						{userItems.stakes &&
							isFiltered("pfp") &&
							userItems.stakes.pfp.map(
								(collectible: Collectible) => {
									return (
										<Collectible
											key={collectible.id}
											data={collectible}
											type="pfp"
										/>
									)
								}
							)}
					</div>
				</>
			)}
		</>
	)
}
