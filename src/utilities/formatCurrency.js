const CURRENCY_FORMATTER = new Intl.NumberFormat("pl-PL", {
    currency: "EUR",
    style: "currency"
})

export function formatCurrency(number) {
    return CURRENCY_FORMATTER.format(number)
}