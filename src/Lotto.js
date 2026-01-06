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
  // 로또 번호의 숫자 범위는 1~45까지이다.
  static lottoRandome(티켓장수) {
    for (let i = 0; i < 티켓장수; i++) {
      const randomNumber = Random.pickNumberInRange(1, 9);
      console.log(randomNumber);
    }
  }
  // 1개의 로또를 발행할 때 중복되지 않는 6개의 숫자를 뽑는다.
  // 당첨 번호 추첨 시 중복되지 않는 숫자 6개와 보너스 번호 1개를 뽑는다.
  // 당첨은 1등부터 5등까지 있다. 당첨 기준과 금액은 아래와 같다.
  // 1. 랜덤한 로또 숫자 뽑기 ( 숫자범위 : 1~45 )  ( 중복되지않는 6개의 숫자 )
  // 2. 당첨번호와 곂치는지 확인하기
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
