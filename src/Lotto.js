import { Console, Random } from "@woowacourse/mission-utils";
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  // 로또 티켓 장수 계산
  static lottoTicket(로또구입금액) {
    if (
      Number.isNaN(로또구입금액) ||
      로또구입금액 % 1000 ||
      로또구입금액 <= 0
    ) {
      throw new Error(
        "[ERROR] 구입 금액 단위는 1,000원 입니다. 숫자로만 입력해주세요 "
      );
    }
    this.티켓장수 = Number(로또구입금액 / 1000);

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
    // Console.print("뽑은로또##### : " + 뽑은로또);
    const 본전당첨갯수 = 당첨번호.filter((item) =>
      뽑은로또.includes(item)
    ).length;
    // Console.print("본전당첨개수 : " + 본전당첨갯수);
    return 본전당첨갯수;
  }
  static 당첨_보너스_중복확인(당첨번호, 보너스번호) {
    const 당첨_보너스_중복확인_결과 = 당첨번호.includes(보너스번호);
    // Console.print("당첨_보너스_중복확인_결과 : " + 당첨_보너스_중복확인_결과);

    return 당첨_보너스_중복확인_결과;
  }
  // 3. 보너스 번호와 곂치는지 확인하기
  static 보너스번호확인(보너스번호, 뽑은로또) {
    const 보너스당첨유무 = 뽑은로또.includes(보너스번호);
    if (보너스당첨유무) {
      return 1;
    } else {
      return 0;
    }
  }

  // 4. 당첨금액 계산
  //     5등: 3개 번호 일치 / 5,000원
  //     4등: 4개 번호 일치 / 50,000원
  //     3등: 5개 번호 일치 / 1,500,000원
  //     2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
  //     1등: 6개 번호 일치 / 2,000,000,000원

  static 당첨통계(본전당첨갯수목록, 보너스당첨유무목록) {
    const 당첨통계 = {
      3: 0, // 5등
      4: 0, // 4등
      5: 0, // 3등
      "5+보너스": 0, // 2등
      6: 0, // 1등
    };
    for (let i = 0; i < 본전당첨갯수목록.length; i++) {
      const 개수 = 본전당첨갯수목록[i];
      const 보너스 = 보너스당첨유무목록[i];
      //   Console.print(개수);
      //   Console.print(보너스);

      switch (개수) {
        case 3:
          당첨통계[3]++;
          break;
        case 4:
          당첨통계[4]++;
          break;
        case 5:
          보너스 ? 당첨통계["5+보너스"]++ : 당첨통계[5]++;
          break;
        case 6:
          당첨통계[6]++;
          break;
        default:
      }
    }
    return 당첨통계;
  }

  static 당첨금액출력(당첨통계) {
    Console.print(`3개 일치 (5,000원) - ${당첨통계[3]}개`);

    Console.print(`4개 일치 (50,000원) - ${당첨통계[4]}개`);

    Console.print(`5개 일치 (1,500,000원) - ${당첨통계[5]}개`);

    Console.print(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${당첨통계["5+보너스"]}개`
    );

    Console.print(`6개 일치 (2,000,000,000원) - ${당첨통계[6]}개`);
  }

  // 5. 수익률 계산
  static 수익률계산(로또구입금액, 당첨금계산) {
    const 수익률 = (당첨금계산 / 로또구입금액) * 100;
    const 반올림 = 수익률.toFixed(1);
    return 반올림;
  }
  static 당첨금계산(당첨통계) {
    let 당첨금 = 0;
    let 당첨갯수순서대로 = [];
    let 당첨금금액 = [5000, 50000, 1500000, 30000000, 2000000000];

    const 정해진순서 = ["3", "4", "5", "5+보너스", "6"];

    for (const key of 정해진순서) {
      const value = 당첨통계[key];
      당첨갯수순서대로.push(value);
    }

    for (let i = 0; i < 5; i++) {
      당첨금 += 당첨갯수순서대로[i] * 당첨금금액[i];
    }
    return 당첨금;
  }
  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다. ", numbers);
    }

    const set = new Set(numbers);
    if (set.size !== 6) {
      throw new Error("[ERROR] 로또 번호에 중복된 숫자가 있습니다. ");
    }
    const 쉼표외다른거찾기 = numbers;
  }

  // TODO: 추가 기능 구현
}
export default Lotto;
