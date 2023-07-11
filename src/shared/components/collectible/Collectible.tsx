import {
	getRemaingDays,
	getStackedPeriodDays,
	getStackingEndDate,
	getStackingStartDate
} from "../../../utils"
import "./Collectible.scss"
import sparkIcon from "../../../assets/images/icons/spark-icon.svg"
import clockIcon from "../../../assets/images/icons/clock-icon.svg"
import { StaticImages } from "../../../assets/images/static-images-collection"
import { CollectibleNameCollection } from "../../../core/services/collectible-name.collection"
import helixLogo from "../../../assets/images/logo/helix-logo.webp"

interface CollectibleProps {
	data: Collectible
	type: string
}

export default function Collectible({ data, type }: CollectibleProps) {
	const {
		endTimestamp,
		id,
		points,
		stakedPeriod,
		startTimestamp,
		tokenId,
		amount
	} = data

	function getCollectibleImg(tokenId: string): string {
		switch (type) {
			case "collectible":
				return `https://helix-metaverse.client.web3experts.ibbsinc.com/${tokenId}_512.png`
			case "pass":
				return "https://helix-metaverse.client.web3experts.ibbsinc.com/pass_512.png"
			case "land":
				return `https://img-cdn.magiceden.dev/rs:fill:512:512:0:0/plain/https://bafybeihqzpkwf3xu7vfzlqdjjqaz7f3m4a2unzublgentvifvatxra4oeq.ipfs.nftstorage.link/${tokenId}.png`
			case "airdrop1":
				return StaticImages[getAirdrop1ImageIndex()]
			case "airdrop2":
				return StaticImages[getAirdrop2ImageIndex()]
			default:
				return helixLogo
		}
	}

	function getCollectibleName(): string {
		switch (type) {
			case "pass":
				return "FOUNDER PASS"
			case "land":
				return (data as Land).name
			case "collectible":
				return CollectibleNameCollection[tokenId]
			case "airdrop1":
				return "1959 Archipelago Cruisemaster"
			case "airdrop2":
				return (data as Airdrop2).name

			default:
				return "UNKNOWN"
		}
	}

	function getAirdrop1ImageIndex(): string {
		return data.id.split(":")[1].split("-")[0]
	}

	function getAirdrop2ImageIndex(): string {
		return (data as Airdrop2).name
	}

	return (
		<div id={id} className="collectible-card flex--column">
			<div className="collectible-info-top">
				<div className="collectible-info-top-a flex--between">
					<h3>{getCollectibleName()} </h3>
					<h4> #{tokenId} </h4>
				</div>
				<div className="collectible-info-top-b flex--between">
					<h5 className="brand--color flex min--gap">
						{" "}
						<img
							className="spark-icon"
							src={sparkIcon}
							alt="Spark icon"
						/>
						{Math.floor(points)} PTS
					</h5>
					<h5 className="brand--color flex min--gap">
						{" "}
						<img
							className="clock-icon"
							src={clockIcon}
							alt="Spark icon"
						/>
						{""}
						{getRemaingDays(endTimestamp)} DAYS{" "}
					</h5>
				</div>
			</div>

			<div className="image-container">
				<img src={getCollectibleImg(tokenId)} />
				{type === "collectible" && <h6>x {amount} </h6>}
			</div>
			<div className="collectible-info-bottom">
				<p>
					Stacked period : {getStackedPeriodDays(stakedPeriod)} days
				</p>
				<p>Stacked the {getStackingStartDate(startTimestamp)} </p>
				<p>Locked until the {getStackingEndDate(endTimestamp)}</p>
			</div>
		</div>
	)
}
