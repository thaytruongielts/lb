
import { LetterState } from '../types';

export const generateLetterText = (state: LetterState): string => {
  const { recipient, topic, student1, studentPair, summary, deadlineWarning, wishes, signature } = state;

  return `Kính gửi ${recipient},

Thư này là ${topic}

Về bạn ${student1.name}:
- Điểm mạnh: ${student1.strength}
- Điểm cần khắc phục: ${student1.weakness}
- Khen ngợi: ${student1.praise}
- Đã đóng tiền học đến ngày: ${student1.paidUntil}
- Cần đóng từ ngày: ${student1.nextPayment}
- Ghi chú: ${student1.notes}
- Cam kết: ${student1.commitment}

Về bạn ${studentPair.name}:
- Điểm mạnh: ${studentPair.strength}
- Điểm cần khắc phục: ${studentPair.weakness}
- Khen ngợi: ${studentPair.praise}
- Đã đóng tiền học đến ngày: ${studentPair.paidUntil}
- Cần đóng từ ngày: ${studentPair.nextPayment}
- Chi tiết các buổi học:
${studentPair.classDetails}
- Ghi chú: ${studentPair.notes}
- Chiến lược sắp tới: ${studentPair.strategy}

${summary}

Lưu ý: ${deadlineWarning}

${wishes}

Trân trọng,
${signature}`;
};
