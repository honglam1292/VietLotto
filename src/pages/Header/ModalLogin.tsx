import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (payload: { username: string; password: string; remember: boolean }) => Promise<void> | void;
  loading?: boolean;
};

export default function ModalLogin({ open, onClose, onSubmit, loading }: Props) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const tId = setTimeout(() => firstFieldRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      clearTimeout(tId);
    };
  }, [open, onClose]);

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
      setError(err?.message || t("auth_login_error"));
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
        {/* Header */}
        <div className="bg-[#FFBD00] px-5 py-3 flex items-center justify-between">
          <h2 id="login-title" className="text-[#1a2b49] font-semibold text-lg">
            {t("auth_login_title")}
          </h2>
          <button
            className="size-8 grid place-items-center rounded-full hover:bgブラック/10 text-[#1a2b49]"
            aria-label={t("common_close")}
            onClick={onClose}
          >
            <svg viewBox="0 0 20 20" className="size-5" fill="currentColor"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" /></svg>
          </button>
        </div>

        <form onSubmit={submit} className="px-6 pt-5 pb-6">
          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Username */}
          <label className="block text-sm font-medium text-[#1a2b49] mb-1">
            {t("auth_login_username_label")}
          </label>
          <input
            ref={firstFieldRef}
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a2b49] focus:border-transparent"
            placeholder={t("auth_login_username_placeholder")}
          />

          {/* Password */}
          <label className="block text-sm font-medium text-[#1a2b49] mt-4 mb-1">
            {t("auth_login_password_label")}
          </label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a2b49] focus:border-transparent"
            placeholder={t("auth_login_password_placeholder")}
          />

          {/* Options */}
          <div className="mt-4 flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-[#1a2b49]">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="size-4 rounded border-gray-300 text-[#1a2b49] focus:ring-[#1a2b49]"
                aria-label={t("auth_login_remember")}
              />
              {t("auth_login_remember")}
            </label>

            <button
              type="button"
              className="text-sm text-[#1a2b49] hover:underline"
              onClick={() => alert(t("auth_login_forgot_go"))}
            >
              {t("auth_login_forgot")}
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
            {loading ? t("auth_login_loading") : t("auth_login_submit")}
          </button>

          {/* Fine print */}
          <p className="mt-3 text-[11px] text-gray-500 leading-snug">
            {t("auth_login_terms_prefix")}{" "}
            <a className="underline hover:no-underline" href="#">
              {t("common_terms")}
            </a>{" "}
            &{" "}
            <a className="underline hover:no-underline" href="#">
              {t("common_policy")}
            </a>.
          </p>
        </form>
      </div>
    </div>
  );
}
