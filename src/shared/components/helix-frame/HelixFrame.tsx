import "./HelixFrame.scss"

export default function HelixFrame() {
	return (
		<>
			<div className="corner-top-left"></div>
			<div className="corner-top-right"></div>
			<div className="corner-bottom-left"></div>
			<div className="corner-bottom-right"></div>
			<div className="plus-container-top flex--center">
				<div className="plus-bar-1"></div>
				<div className="plus-bar-2"></div>
			</div>
			<div className="plus-container-bottom flex--center">
				<div className="plus-bar-1"></div>
				<div className="plus-bar-2"></div>
			</div>
		</>
	)
}
