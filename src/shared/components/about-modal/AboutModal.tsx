import "./AboutModal.scss"

export default function AboutModal({ toggleAboutModal }: any) {
	function onCopyAddress(): void {
		navigator.clipboard.writeText(
			"0x6dffD1245d2cCd37B89726e29145DB9d2672EA67"
		)
	}

	return (
		<div
			onClick={toggleAboutModal}
			id="modal-container"
			className="modal-container flex--center"
		>
			<i id="aboutModalXmark" className="fa-solid fa-xmark" onClick={toggleAboutModal}></i>
			<div
				id="modal-inner"
				className="modal-inner flex--center flex--column min--gap"
			>
				<p>
					This is a <span className="brand--color">non-official</span>{" "}
					website, made for the community. Its purpose is to show anyone's current staked items.
				</p>
				<p>
					Helix is an{" "}
					<span className="brand--color">
						hyper-realistic metaverse
					</span>{" "}
					where players can create games, roleplaying servers, social
					lounges, community meetups, art projects, tech demos, all
					for <span className="brand--color">free</span>.
				</p>
				<p>
					I'm <span className="brand--color">Makushi</span>, working
					as a <span className="brand--color">web developer</span>{" "}
					(and still learning) and I{" "}
					<span className="brand--color">produce music </span>
					as a hobby.
				</p>
				<p>
					Please feel free to{" "}
					<span className="brand--color">contact me</span> on Twitter
					if you find any
					<span className="brand--color"> issues</span> or if you have
					a <span className="brand--color">feature idea</span>.
				</p>
				<p>
					I'm currently in a working/studying program, and I did this
					on my free time, so if you like this tool, you can buy me a
					coffee !<br></br>
					<span
						className="brand--color address"
						onClick={onCopyAddress}
					>
						<i className="fa-brands fa-ethereum"></i>
						0x6dffD1245d2cCd37B89726e29145DB9d2672EA67
					</span>
				</p>
				<div className="socials flex gap">
					<div className="social-card flex--center flex--column gap">
						<h2>Helix</h2>
						<a
							href="https://twitter.com/HELIX_Metaverse"
							target="_blank"
						>
							<i className="fa-brands fa-twitter"></i>
						</a>
					</div>
					<div className="social-card flex--center flex--column gap">
						<h2>My Twitter</h2>
						<a
							href="https://twitter.com/Maxime_ELZ"
							target="_blank"
						>
							<i className="fa-brands fa-twitter"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
