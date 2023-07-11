import "./ScrollUpButton.scss"

export default function ScrollUpButton() {
	function onScrollToTop(): void {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	return (
		<button onClick={onScrollToTop} className="scroll-up-button">
			<i className="fa-solid fa-circle-chevron-up"></i>
		</button>
	)
}
