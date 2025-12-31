
import React, { useState, useCallback } from 'react';
import { INITIAL_STATE, LetterState, StudentData } from './types';
import { generateLetterText } from './utils/letterGenerator';
import { Copy, Download, RefreshCw, PenTool, CheckCircle, User, Users, Info, MessageSquare } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<LetterState>(INITIAL_STATE);
  const [copied, setCopied] = useState(false);

  const handleChange = (path: string, value: string) => {
    const keys = path.split('.');
    if (keys.length === 1) {
      setState(prev => ({ ...prev, [keys[0]]: value }));
    } else {
      const [obj, key] = keys;
      setState(prev => ({
        ...prev,
        [obj]: {
          ...(prev[obj as keyof LetterState] as any),
          [key]: value
        }
      }));
    }
  };

  const handleCopy = async () => {
    const text = generateLetterText(state);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const text = generateLetterText(state);
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Thu_Gui_${state.recipient.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleReset = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hết thông tin và làm lại từ đầu?")) {
      setState({
        ...INITIAL_STATE,
        recipient: "",
        topic: "",
        student1: { name: "", strength: "", weakness: "", praise: "", paidUntil: "", nextPayment: "", notes: "", commitment: "" },
        studentPair: { name: "", strength: "", weakness: "", praise: "", paidUntil: "", nextPayment: "", classDetails: "", notes: "", strategy: "" },
        summary: "",
        deadlineWarning: "",
        wishes: ""
      });
    }
  };

  const InputField = ({ label, value, onChange, placeholder, isTextArea = false }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
      {isTextArea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PenTool size={24} />
            <h1 className="text-xl font-bold tracking-tight">IELTS Letter Builder</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="p-2 hover:bg-indigo-600 rounded-full transition-colors"
              title="Làm lại"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
              <Info className="text-indigo-600" size={18} />
              <h2 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Thông tin chung</h2>
            </div>
            <div className="p-5">
              <InputField
                label="Người nhận"
                value={state.recipient}
                onChange={(v: string) => handleChange('recipient', v)}
                placeholder="Ví dụ: Cô Tuyết Anna"
              />
              <InputField
                label="Chủ đề thư"
                value={state.topic}
                onChange={(v: string) => handleChange('topic', v)}
                placeholder="Ví dụ: Cập nhật tiến độ học tập..."
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
              <User className="text-indigo-600" size={18} />
              <h2 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Học sinh 1</h2>
            </div>
            <div className="p-5">
              <InputField label="Tên học sinh" value={state.student1.name} onChange={(v: string) => handleChange('student1.name', v)} />
              <InputField label="Điểm mạnh" value={state.student1.strength} onChange={(v: string) => handleChange('student1.strength', v)} isTextArea />
              <InputField label="Điểm cần khắc phục" value={state.student1.weakness} onChange={(v: string) => handleChange('student1.weakness', v)} isTextArea />
              <InputField label="Khen ngợi" value={state.student1.praise} onChange={(v: string) => handleChange('student1.praise', v)} isTextArea />
              <InputField label="Đã đóng đến ngày" value={state.student1.paidUntil} onChange={(v: string) => handleChange('student1.paidUntil', v)} />
              <InputField label="Kỳ đóng tiếp theo" value={state.student1.nextPayment} onChange={(v: string) => handleChange('student1.nextPayment', v)} isTextArea />
              <InputField label="Ghi chú" value={state.student1.notes} onChange={(v: string) => handleChange('student1.notes', v)} isTextArea />
              <InputField label="Cam kết" value={state.student1.commitment} onChange={(v: string) => handleChange('student1.commitment', v)} isTextArea />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
              <Users className="text-indigo-600" size={18} />
              <h2 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Học sinh 2 & 3</h2>
            </div>
            <div className="p-5">
              <InputField label="Tên các học sinh" value={state.studentPair.name} onChange={(v: string) => handleChange('studentPair.name', v)} />
              <InputField label="Điểm mạnh" value={state.studentPair.strength} onChange={(v: string) => handleChange('studentPair.strength', v)} isTextArea />
              <InputField label="Điểm cần khắc phục" value={state.studentPair.weakness} onChange={(v: string) => handleChange('studentPair.weakness', v)} isTextArea />
              <InputField label="Khen ngợi" value={state.studentPair.praise} onChange={(v: string) => handleChange('studentPair.praise', v)} isTextArea />
              <InputField label="Đã đóng đến ngày" value={state.studentPair.paidUntil} onChange={(v: string) => handleChange('studentPair.paidUntil', v)} />
              <InputField label="Kỳ đóng tiếp theo" value={state.studentPair.nextPayment} onChange={(v: string) => handleChange('studentPair.nextPayment', v)} isTextArea />
              <InputField label="Chi tiết buổi học" value={state.studentPair.classDetails} onChange={(v: string) => handleChange('studentPair.classDetails', v)} isTextArea />
              <InputField label="Ghi chú" value={state.studentPair.notes} onChange={(v: string) => handleChange('studentPair.notes', v)} isTextArea />
              <InputField label="Chiến lược sắp tới" value={state.studentPair.strategy} onChange={(v: string) => handleChange('studentPair.strategy', v)} isTextArea />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
              <MessageSquare className="text-indigo-600" size={18} />
              <h2 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Tổng kết & Ký tên</h2>
            </div>
            <div className="p-5">
              <InputField label="Tóm lại" value={state.summary} onChange={(v: string) => handleChange('summary', v)} isTextArea />
              <InputField label="Điều kiện/Nếu" value={state.deadlineWarning} onChange={(v: string) => handleChange('deadlineWarning', v)} isTextArea />
              <InputField label="Lời chúc" value={state.wishes} onChange={(v: string) => handleChange('wishes', v)} isTextArea />
              <InputField label="Ký tên" value={state.signature} onChange={(v: string) => handleChange('signature', v)} isTextArea />
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="relative">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden min-h-[600px] flex flex-col">
              <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
                <span className="font-semibold text-sm">Xem trước thư</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      copied ? 'bg-green-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    }`}
                  >
                    {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copied ? 'Đã sao chép' : 'Gửi qua Zalo (Copy)'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  >
                    <Download size={14} />
                    Tải về (.txt)
                  </button>
                </div>
              </div>
              <div className="p-8 flex-1 overflow-auto whitespace-pre-wrap font-serif text-slate-800 leading-relaxed text-sm bg-neutral-50 border-8 border-white m-4 shadow-inner rounded">
                {generateLetterText(state)}
              </div>
            </div>
            <p className="text-slate-500 text-xs text-center italic">
              * Nhấn nút 'Gửi qua Zalo' để sao chép toàn bộ nội dung, sau đó dán vào cửa sổ chat Zalo.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 p-6 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} IELTS Letter Builder - Thầy Trường Professional Tools
      </footer>
    </div>
  );
};

export default App;
