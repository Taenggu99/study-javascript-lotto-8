import { Random, Console } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async run() {
    // 1. 입력 ) 로또 구입금액 입력받기 ( 단위는 1,000원. 1,000원으로 나누어떨어지지않으면 예외처리하기 )
    const 로또구입금액 = await Console.readLineAsync(
      "구입금액을 입력해 주세요.\n"
    );

    // 2. 출력 ) 발행한 로또 수량 및 번호 출력하기 ( 로또번호는 오름차순으로 정렬 )
    const 티켓장수 = Lotto.lottoTicket(로또구입금액);
    Console.print(`\n${티켓장수}개를 구매했습니다.`);

    //뽑은 로또 번호 저장
    const 뽑은로또목록 = [];
    // 티켓 장수만큼 번호추첨 함수 호출
    for (let 티켓 = 1; 티켓 <= 티켓장수; 티켓++) {
      const 로또번호추첨 = Lotto.로또번호추첨();
      Console.print(로또번호추첨);
      뽑은로또목록.push(로또번호추첨);
    }
    // 3. 입력 ) 당첨번호 입력받기 ( 번호는 , 기준으로 구분 )
    const 당첨번호숫자 = await Console.readLineAsync(
      "\n 당첨 번호를 입력해 주세요.\n"
    );

    const 당첨번호 = 당첨번호숫자.split(",").map(Number);
    // 4. 입력 ) 보너스번호 입력받기
    const 보너스번호입력 = await Console.readLineAsync(
      "\n 보너스 번호를 입력해 주세요.\n"
    );
    const 보너스번호 = Number(보너스번호입력);
    Lotto.보너스번호확인(보너스번호, 뽑은로또목록);

    // 5. 출력 ) 당첨내역을 출력한다
    //          3개 일치 (5,000원) - 1개
    //          4개 일치 (50,000원) - 0개
    //          5개 일치 (1,500,000원) - 0개
    //          5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
    //          6개 일치 (2,000,000,000원) - 0개

    // 6. 출력 ) 수익률은 소숫점 둘째자리에서 반올림한다.
    //          총 수익률은 62.5%입니다.
    //Console.print(`총 수익률은 ${수익률}%입니다.`)

    // 예외처리 ) 예외 상황 시 에러 문구를 출력. 에러문구 :  "[ERROR]"로 시작

    // 4-1. 예외처리 ) 당첨번호와 중복되는경우 에러발생
    const 당첨_보너스_중복확인 = Lotto.당첨_보너스_중복확인(
      당첨번호,
      보너스번호
    );

    if (당첨_보너스_중복확인) {
      throw new Error("[Error] 당첨번호와 보너스 번호가 곂칩니다 ");
    }
  }
}

export default App;
