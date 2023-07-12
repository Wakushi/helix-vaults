import HelixFrame from "../../../shared/components/helix-frame/HelixFrame"
import "./Hero.scss"

export default function Hero(props: any) {
	const {
		userKey,
		handleChange,
		handlePaste,
		userRank,
		isLoading,
		copyUrlWithKey
	} = props

	return (
		<section className="hero flex--center flex--column">
			<div className="hero-content flex--center flex--column">
				<h1>WELCOME TO THE VAULTS</h1>
				<p>Start searching by entering the vault's public key</p>
				<div className="flex">
					<div className="search-bar-container flex">
						<input
							type="text"
							className="key-input"
							value={userKey}
							placeholder="0x000..."
							onChange={handleChange}
							onPaste={handlePaste}
						/>
					</div>
					{userKey.length >= 42 && (
						<i
							onClick={copyUrlWithKey}
							className="fa-solid fa-share-nodes brand--color"
						></i>
					)}
				</div>
				{!userRank.balance && userKey.length >= 42 && !isLoading && (
					<p className="error-message">This vault is empty</p>
				)}
				<HelixFrame />
			</div>
		</section>
	)
}
