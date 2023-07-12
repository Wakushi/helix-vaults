import "./Snackbar.scss"

export default function Snackbar({ snackbarMessageType }: any) {
	function getMessage(): string {
		switch (snackbarMessageType) {
			case "copy":
				return "Copied to clipboard"

			default:
				return ""
		}
	}

	return (
		<div className="snackbar-container">
			<p> {getMessage()} </p>
		</div>
	)
}
