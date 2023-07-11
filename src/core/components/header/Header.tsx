import helixLogo from "../../../assets/images/logo/helix-logo.webp"
import "./Header.scss"

export default function Header({ togglePointsModal, toggleAboutModal }: any) {
	return (
		<header className="flex--between">
			<div className="flex">
				<a href="https://www.helixmetaverse.com/" target="_blank">
					<div className="logo-container">
						<img src={helixLogo} alt="Helix logo" />
					</div>
				</a>
				<h1 className="brand--color">VAULTS</h1>
			</div>
			<div className="flex gap">
				<ul className="nav-list flex gap">
					<li
						id="pointModalBtn"
						className="points-modal-btn"
						onClick={togglePointsModal}
					>
						<i className="fa-solid fa-coins"></i>Points
					</li>
					<li
						id="aboutModalBtn"
						onClick={toggleAboutModal}
						className="about-modal-btn flex min--gap"
					>
						<i className="fa-solid fa-user-astronaut"></i>
						<span> About</span>
					</li>
					{/* <li>
						{" "}
						<i className="fa-solid fa-music"></i>
					</li> */}
				</ul>
			</div>
		</header>
	)
}
