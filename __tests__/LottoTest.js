import Lotto from "../src/Lotto";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  // TODO: 테스트가 통과하도록 프로덕션 코드 구현
  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  // TODO: 추가 기능 구현에 따른 테스트 코드 작성

  describe("Lotto 클래스 단위 테스트", () => {
    // 1. 구입 금액 및 티켓 수량 테스트
    describe("lottoTicket() - 구입 금액 검증", () => {
      test("1,000원 단위로 나누어떨어지지 않으면 예외가 발생한다.", () => {
        expect(() => Lotto.lottoTicket(1500)).toThrow("[ERROR]");
      });

      test("0원 이하의 금액을 입력하면 예외가 발생한다.", () => {
        expect(() => Lotto.lottoTicket(0)).toThrow("[ERROR]");
        expect(() => Lotto.lottoTicket(-1000)).toThrow("[ERROR]");
      });

      test("정상적인 금액 입력 시 티켓 장수를 정확히 반환한다.", () => {
        expect(Lotto.lottoTicket(8000)).toBe(8);
      });
    });

    // 2. 당첨 번호 비교 로직 테스트
    describe("당첨 결과 확인 로직", () => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];

      test("당첨 번호와 일치하는 개수를 정확히 계산한다.", () => {
        const myLotto = [1, 2, 3, 7, 8, 9]; // 3개 일치
        expect(Lotto.당첨번호확인(winningNumbers, myLotto)).toBe(3);
      });

      test("보너스 번호 일치 여부를 정확히 확인한다.", () => {
        const myLotto = [1, 2, 3, 4, 5, 7]; // 보너스 번호 7이라고 가정
        expect(Lotto.보너스번호확인(7, myLotto)).toBe(1); // 일치하면 1
        expect(Lotto.보너스번호확인(8, myLotto)).toBe(0); // 불일치하면 0
      });
    });

    // 3. 수익률 계산 테스트 (부동 소수점 포함)
    describe("수익률 및 당첨금 계산", () => {
      test("수익률이 소수점 둘째 자리에서 반올림되어 첫째 자리까지 표시되는가?", () => {
        // 구입: 8,000원 / 당첨: 5,000원 (5등 1개)
        // (5000 / 8000) * 100 = 62.5
        const result = Lotto.수익률계산(8000, 5000);
        expect(result).toBe("62.5");
      });

      test("당첨 금액 합계가 정확히 계산되는가?", () => {
        const stats = { 3: 1, 4: 0, 5: 0, "5+보너스": 0, 6: 0 }; // 5,000원 1개
        expect(Lotto.당첨금계산(stats)).toBe(5000);
      });
    });
  });
});
