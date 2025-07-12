import { validateURL } from "../../utills/commonUtils"

test('validateUrl', () => {
    expect(validateURL('https://www.brandimic.com')).toBe(true)
});