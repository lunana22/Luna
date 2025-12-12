/**
 * 만원 단위로 가격을 반환합니다.
 * @param price
 * @param locale ko | en
 * @returns
 */
function toManWonPrecise(price: number, locale?: "ko" | "en"): string {
  const man = price / 10000;
  const KorPrecise = `${man.toLocaleString()}만원`;

  return locale === "ko" ? KorPrecise : KorPrecise;
}

/**
 * 할인율을 적용한 가격을 반환합니다.
 * @param price
 * @param discountRate
 * @returns
 */

function toDiscountRatePrecise(price: number, discountRate: number) {
  return price * (1 - discountRate / 100);
}

export { toManWonPrecise, toDiscountRatePrecise };
