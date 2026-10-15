Readme:
*MCX Gold Normalization - Logic*

Sabka underlying same hai (999 Gold), bas quotation alag hai.
Symbol	Unit	Quoted In	Normalize to 10g
**GOLD**	1 Kg	per 10g	`Price * 1`
**GOLDM**	100g	per 10g	`Price * 1`
**GOLDTEN**	10g	per 10g	`Price * 1`
**GOLDGUINEA**	8g	per 8g	`Price * 10/8`
**GOLDPETAL**	1g	per 1g	`Price * 10/1`
*Formula:*
`Normal Price (10g) = LTP _ (10 / QuotationBase)`

Example:
- GOLDM 97500 = 97500
- GUINEA 78000 = 78000 _ 10/8 = 97500
- PETAL 9750 = 9750 * 10 = 97500

Normalize ke baad sab same hona chahiye.
MCX pe gold ke 4 futures contracts hain: GOLDM, GOLDTEN, GOLDGUINEA, GOLDPETAL. Sab ka underlying same hai (gold), bas size aur quotation alag hai. Isliye normalize karne ke baad inke prices lagbhag same hone chahiye.
