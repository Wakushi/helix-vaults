import HelixFrame from "../../../shared/components/helix-frame/HelixFrame"
import "./Hero.scss"

export default function Hero(props: any) {
	return (
		<section className="hero flex--center flex--column">
			<div className="hero-content flex--center flex--column">
				<h1>WELCOME TO THE VAULTS</h1>
				<p>Start searching by entering the vault's key</p>
				<div className="search-bar-container flex">
					<input
						type="text"
						className="key-input"
						value={props.userKey}
						placeholder="0x000..."
						onChange={props.handleChange}
						onPaste={props.handlePaste}
					/>
				</div>
				<HelixFrame />
			</div>
		</section>
	)
}
