const CURR_FMTR = new Intl.NumberFormat(undefined, {
    currency: "USD", style: "currency"
})

export function formatCurrency(number) {
    return CURR_FMTR.format(number);
}