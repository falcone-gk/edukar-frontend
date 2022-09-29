function paginate(current: number, max: number) {
	// if (!current || !max) return null

	const prev: number | null = current === 1 ? null : current - 1
	const next: number | null = current === max ? null : current + 1
	const items: (string|number)[] = [1]

	if (current === 1 && max === 1) return {current, prev, next, items}
	if (current > 4) items.push('…')

	let r = 2, r1 = current - r, r2 = current + r

	for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i)

	if (r2 + 1 < max) items.push('…')
	if (r2 < max) items.push(max)

	return {current, prev, next, items}
}

export default paginate