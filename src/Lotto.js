import { Console, Random } from "@woowacourse/mission-utils";
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  // 로또 티켓 장수 계산
  static lottoTicket(로또구입금액) {
    this.티켓장수 = Number(로또구입금액 / 1000);
    if (로또구입금액 % 1000) {
      throw new Error("[ERROR] 구입 금액 단위는 1,000원 입니다.");
    }
    return this.티켓장수;
  }

  // 1. 랜덤한 로또 숫자 뽑기 ( 숫자범위 : 1~45 )  ( 중복되지않는 6개의 숫자 )
  // 로또 번호의 숫자 범위는 1~45까지이다.
  // 1개의 로또를 발행할 때 중복되지 않는 6개의 숫자를 뽑는다.
  static 로또번호추첨() {
    let 로또번호 = Random.pickUniqueNumbersInRange(1, 45, 6);
    return 로또번호.sort((a, b) => a - b);
  }

  // 2. 당첨번호와 곂치는지 확인하기
  static 당첨번호확인(당첨번호, 뽑은로또) {
    // Console.print("당첨번호 : " + 당첨번호);
    // Console.print("뽑은로또 : " + 뽑은로또);
    const 본전당첨갯수 = 당첨번호.filter((item) =>
      뽑은로또.includes(item)
    ).length;
    // Console.print("본전당첨개수 : " + 본전당첨갯수);
    return 본전당첨갯수;
  }
  static 당첨_보너스_중복확인(당첨번호, 보너스번호) {
    const 당첨_보너스_중복확인_결과 = 당첨번호.includes(보너스번호);
    Console.print("당첨_보너스_중복확인_결과 : " + 당첨_보너스_중복확인_결과);

    return 당첨_보너스_중복확인_결과;
  }
  // 3. 보너스 번호와 곂치는지 확인하기
  // 4. 당첨금액 계산
  // 5. 수익률 계산
  //     1등: 6개 번호 일치 / 2,000,000,000원
  //     2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
  //     3등: 5개 번호 일치 / 1,500,000원
  //     4등: 4개 번호 일치 / 50,000원
  //     5등: 3개 번호 일치 / 5,000원

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  // TODO: 추가 기능 구현
}
export default Lotto;
