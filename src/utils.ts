function getStackedPeriodDays(time: string): number {
	const DAY_IN_SEC = 1 * 24 * 60 * 60
	return Math.floor(+time / DAY_IN_SEC)
}

function getStackingStartDate(time: string): string {
	const date = new Date(+time * 1000)
	return date.toLocaleDateString()
}

function getStackingEndDate(time: number): string {
	const endingDate = new Date(Date.now() + time * 1000)
	return endingDate.toLocaleDateString()
}

function getRemaingDays(time: number): number {
	const DAY_IN_SEC = 1 * 24 * 60 * 60
	return Math.floor(time / DAY_IN_SEC)
}

function sanitizeInput(text: string) {
	const textNode = document.createTextNode(text)
	return textNode.textContent
}

export {
	getStackedPeriodDays,
	getRemaingDays,
	getStackingEndDate,
	getStackingStartDate,
	sanitizeInput
}
