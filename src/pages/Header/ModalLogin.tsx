import { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (payload: { username: string; password: string; remember: boolean }) => Promise<void> | void;
  loading?: boolean;
};

export default function ModalLogin({ open, onClose, onSubmit, loading }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Lock scroll + focus first field
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  // Close when clicking outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit?.({ username, password, remember });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4"
      onMouseDown={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="login-title"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-md rounded-2xl shadow-2xl bg-white overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header vàng theo site */}
        <div className="bg-[#FFBD00] px-5 py-3 flex items-center justify-between">
          <h2 id="login-title" className="text-[#1a2b49] font-semibold text-lg">Đăng nhập</h2>
          <button
            className="size-8 grid place-items-center rounded-full hover:bg-black/10 text-[#1a2b49]"
            aria-label="Đóng"
            onClick={onClose}
          >
            <svg viewBox="0 0 20 20" className="size-5" fill="currentColor"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" /></svg>
          </button>
        </div>

        <form onSubmit={submit} className="px-6 pt-5 pb-6">
          {/* Alert lỗi */}
          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Username */}
          <label className="block text-sm font-medium text-[#1a2b49] mb-1">Email / Số điện thoại</label>
          <input
            ref={firstFieldRef}
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a2b49] focus:border-transparent"
            placeholder="you@example.com"
          />

          {/* Password */}
          <label className="block text-sm font-medium text-[#1a2b49] mt-4 mb-1">Mật khẩu</label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a2b49] focus:border-transparent"
            placeholder="••••••••"
          />

          {/* Options */}
          <div className="mt-4 flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-[#1a2b49]">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="size-4 rounded border-gray-300 text-[#1a2b49] focus:ring-[#1a2b49]"
              />
              Ghi nhớ
            </label>

            <button
              type="button"
              className="text-sm text-[#1a2b49] hover:underline"
              onClick={() => alert('Đi tới trang quên mật khẩu')}
            >
              Quên mật khẩu?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-xl px-4 py-2 font-semibold text-white shadow
                       disabled:opacity-60
                       bg-gradient-to-b from-[#b77a3e] to-[#8e5b2c] hover:brightness-105"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          {/* Fine print */}
          <p className="mt-3 text-[11px] text-gray-500 leading-snug">
            Bằng việc tiếp tục, bạn đồng ý với <a className="underline hover:no-underline" href="#">Điều khoản</a> & <a className="underline hover:no-underline" href="#">Chính sách</a>.
          </p>
        </form>
      </div>
    </div>
  );
}
