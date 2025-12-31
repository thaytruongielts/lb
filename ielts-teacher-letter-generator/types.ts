
export interface StudentData {
  name: string;
  strength: string;
  weakness: string;
  praise: string;
  paidUntil: string;
  nextPayment: string;
  notes: string;
  commitment?: string; // Specific for individual student
  strategy?: string;   // Specific for group/pair
  classDetails?: string; // Specific for group/pair
}

export interface LetterState {
  recipient: string;
  topic: string;
  student1: StudentData;
  studentPair: StudentData;
  summary: string;
  deadlineWarning: string;
  wishes: string;
  signature: string;
}

export const INITIAL_STATE: LetterState = {
  recipient: "Cô Tuyết Anna",
  topic: "Cập nhật tiến độ học IELTS của học viên Tố Uyên, Tạ Khánh và Mai Hương",
  student1: {
    name: "Tố Uyên",
    strength: "vừa thi thử IELTS được 6.0, có tiến bộ về bài đọc, đã điền hết 40 câu đáp án.",
    weakness: "luyện thêm nghe để tăng lên thành 6.0",
    praise: "Tố Uyên học đều và có cố gắng làm tốt hơn từng ngày.",
    paidUntil: "2/10 - 1/11/25",
    nextPayment: "2/11/25 đến 1/1/2026 với số tiền là 9 triệu đồng",
    notes: "anh sẽ bố trí cho bạn Tố Uyên thi thử một lần nữa trong tháng 1 và bạn có thể thi thật vào đầu tháng 2 trước Tết",
    commitment: "Cam kết của anh là nếu bạn Tố Uyên không đạt 5.5 IELTS trước 17/2/26 thì anh sẽ dạy bạn 3 tháng tiếp theo miễn phí."
  },
  studentPair: {
    name: "Tạ Khánh và Mai Hương",
    strength: "học tốt nắm bắt kiến thức nhanh, vui vẻ học",
    weakness: "vắng mặt từ 22/12 đến 28/12 mà không thấy thông báo gì, máy tính của Mai Hương có một vài lần không có mic, không có cam.",
    praise: "hai bạn Tạ Khánh Mai Hương thân thiết với nhau nên học có nhiều năng lượng và hỗ trợ nhau",
    paidUntil: "20/9 - 9/11/25",
    nextPayment: "10/11 - 4/12/25 (20 buổi) với số tiền là 4.5 triệu đồng",
    classDetails: "Tính từ 10/11 - 4/12: 20 buổi\nTháng 11: 10 MH, 12 TKMH, 13 TK, 14TK, 15TKMH, 16MH 14, 16TK 18, 17TKMH, 19MH, 21TKMH, 22 MH 17, 22 TK 18:30, 23 MH 8, 23 TK 17:30, 24TKMH, 30MH\nTháng 12: 1 TKMH, 3MH, 4MH 17:30, 4 TK 19:00",
    notes: "bạn Mai Hương có vắng hơn một tuần chưa học và một số buổi học trước đó máy tính còn chập chờn chưa vào được mic và cam nên thầy Trường không cam kết là bạn đạt được IELTS 5.5 vào 28/3/26 được",
    strategy: "anh sẽ tách riêng lớp của bạn Tạ Khánh và Mai Hương ra để dễ theo dõi tiến độ học tập hơn."
  },
  summary: "Vậy em chuyển cho anh 13.5 triệu vnd vào tài khoản BIDV 1690000157 Lê Hồng Trường tiền học của bạn Tố Uyên từ 2/11/25 - 1/1/26 và 20 buổi của bạn Tạ Khánh, Mai Hương từ 10/11-4/12/25",
  deadlineWarning: "Nếu trước ngày 10/1/2026 mà anh chưa nhận được tiền của bạn nào thì anh sẽ ngưng dạy bạn ấy trong một thời gian đến khi nhận được tiền học.",
  wishes: "Chúc bạn Tố Uyên đạt 5.5, bạn Tạ Khánh đạt 5.0 và bạn Mai Hương đạt 5.5 theo mục tiêu và vào được trường đại học mong ước của mình.",
  signature: "Thầy Trường\nGiáo viên IELTS"
};
