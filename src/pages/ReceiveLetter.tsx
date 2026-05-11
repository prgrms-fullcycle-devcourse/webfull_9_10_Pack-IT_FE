import {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../shared/components/layout/Logo";
import Button from "../shared/components/ui/Button";
import { HtmlToImage } from "../shared/utils/HtmlToImage";
import {  useGetApiLettersLetterIdCheckPassword, useGetLetterDetail, useVerifyLetterPassword } from "../shared/api/generated/letters/letters";
import LetterPaper from "../shared/components/ui/LetterPaper";
import { THEME_MAP, type LetterKeyword, type LetterTheme } from "../shared/schemas/letterSchema";
import { motion } from "framer-motion";
import { letterOpenEffect } from "../shared/utils/LetterOpenEffect";
import { HeartMist, PeaceMist } from "../shared/components/ui/LetterEffect";
import IconConfetti from "../shared/components/Icons/IconConfetti";
import IconHeart from "../shared/components/Icons/IconHeart";
import IconFlower from "../shared/components/Icons/IconFlower";


type Phase = "password" | "before" | "opened";

const ENVELOPE_ICON: Record<LetterKeyword, React.ReactNode> = {
  생일: <IconConfetti />,
  응원: <IconConfetti />,
  감사: <IconHeart />,
  고백: <IconHeart />,
  사과: <IconFlower />,
  화해: <IconFlower />,
};

export default function ReceiveLetter() {
  const navigate = useNavigate();
  const { letterId } = useParams<{ letterId: string }>();

  // 비밀번호 유무 확인
  const { data: checkPasswordData } =
    useGetApiLettersLetterIdCheckPassword(letterId ?? "", {
      query: { enabled: !!letterId },
    });

  const hasPassword = checkPasswordData?.data?.hasPassword ?? true;
  const [phase, setPhase] = useState<Phase>("password");
  const currentPhase =
    checkPasswordData?.data === undefined
      ? "password"
      : phase === "password" && !hasPassword
        ? "before"
        : phase;

  // 편지 상세 조회
  const { data, isLoading: isLetterLoading } = useGetLetterDetail(
    letterId ?? "",
    {
      query: { enabled: !!letterId && currentPhase === "before" }, // phase가 before일 때만 호출
    },
  );

  const letter = data?.data;
  const isLoading = currentPhase === "before" && isLetterLoading;

  // 비밀번호 확인
  const { mutate: verifyPassword } = useVerifyLetterPassword();

  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");

  const [isOpening, setIsOpening] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showPeace, setShowPeace] = useState(false);

  if (!letterId) return null;

  const handlePwSubmit = () => {
    if (!pw) return;

    verifyPassword(
      { letterId: letterId!, data: { password: pw } },
      {
        onSuccess: () => {
          
          setPwError("");
          setPhase("before");
        },
        onError: () => {
          setPwError("비밀번호가 올바르지 않아요. 다시 확인해주세요.");
        },
      },
    );
  };

  const theme = THEME_MAP[(letter?.theme as LetterTheme) ?? 1];
  const category = (letter?.category as LetterKeyword) ?? "생일";

  const handleOpen = () => {
    setIsOpening(true);

    if (category === "사과" || category === "화해") {
      setTimeout(() => {
        letterOpenEffect(category, setShowHearts, setShowPeace);
      }, 0);
    } else {
      setTimeout(() => {
        letterOpenEffect(category, setShowHearts, setShowPeace);
      }, 300);
    }
    setTimeout(() => {
      setPhase("opened");
    }, 950);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-cream)" }}
    >
      {/* 이펙트 — 항상 렌더, show로 제어 */}
      <HeartMist show={showHearts} />
      <PeaceMist show={showPeace} />
      {/* NAV */}
      <nav
        className="h-[52px] flex items-center justify-between px-5 border-b border-black/[0.08] flex-shrink-0 bg-white"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <Logo />
        <div
          className="flex items-center px-3 py-1 rounded-full border border-black/[0.14]"
          style={{ background: "var(--color-cream)" }}
        >
          <span
            className="text-[11px] "
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-ink-soft)",
            }}
          >
            편지가 도착했어요 💌
          </span>
        </div>
        <Button
          variant="primary"
          size="sm"
          style={{
            background: "var(--color-ink)",
            boxShadow: "none",
            borderRadius: 8,
          }}
          onClick={() => navigate("/mypage")}
        >
          마이페이지
        </Button>
      </nav>

      {/* ── PHASE: 비밀번호 입력 ── */}
      {currentPhase === "password" && (
        <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
          <div
            className="w-[64px] h-[64px] rounded-full flex items-center justify-center text-[26px] mb-5"
            style={{
              background: "var(--color-rose-pale)",
              border: "1px solid var(--color-rose-light)",
            }}
          >
            🔒
          </div>
          <h1
            className="font-bold leading-[1.3] mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-ink)",
              fontSize: 24,
            }}
          >
            비밀번호를
            <br />
            입력해주세요
          </h1>
          <p
            className="text-[16px] leading-[1.6] mb-7"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-ink-soft)",
            }}
          >
            보내는 분이 설정한 비밀번호를
            <br />
            입력하면 편지를 열어볼 수 있어요.
          </p>

          {/* 비밀번호 입력폼 — 피그마: 280px, 숫자만, 마스킹 안함 */}
          <div className="w-[280px]">
            <input
              type="text"
              inputMode="numeric"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value.replace(/[^0-9]/g, ""));
                setPwError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handlePwSubmit()}
              placeholder="비밀번호 입력"
              className="w-full px-4 py-[14px] rounded-[12px] text-[16px] text-center outline-none mb-3"
              style={{
                background: "var(--color-cream)",
                border: `1px solid ${
                  pwError ? "var(--color-rose)" : "rgba(28,23,20,0.14)"
                }`,
                fontFamily: "var(--font-sans)",
                color: "var(--color-ink)",
              }}
            />
            {pwError && (
              <p
                className="text-[12px] mb-3 text-left"
                style={{
                  color: "var(--color-rose)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {pwError}
              </p>
            )}
            {/* 확인 버튼 — 피그마: 280x54 */}
            <Button
              variant="primary"
              fullWidth
              disabled={!pw}
              style={{ height: 54, fontSize: 18, borderRadius: 12 }}
              onClick={handlePwSubmit}
            >
              확인
            </Button>
          </div>
        </div>
      )}

      {/* ── PHASE: 봉투 오픈 전 ── */}
      {currentPhase === "before" && (
        <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
          {isLoading ? (
            <p
              className="text-[16px]"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-ink-soft)",
              }}
            >
              편지를 불러오는 중이에요...
            </p>
          ) : (
            <>
              <motion.p
                className="text-[16px] mb-8"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-ink-soft)",
                }}
                animate={{ opacity: isOpening ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                터치해서 마음 열기
              </motion.p>

              <div style={{ position: "relative", width: 260, height: 180 }}>
                {/* 봉투 클릭 영역 */}
                <div
                  onClick={!isOpening ? handleOpen : undefined}
                  style={{
                    position: "absolute",
                    inset: 0,
                    cursor: isOpening ? "default" : "pointer",
                  }}
                >
                  {/* 봉투 전체 래퍼 — 몸통 + 뚜껑 같이 fade-out + scale */}
                  <motion.div
                    style={{ position: "absolute", inset: 0 }}
                    animate={{
                      opacity: isOpening ? 0 : 1,
                      scale: isOpening ? 0.9 : 1,
                      y: isOpening ? 10 : 0,
                    }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    {/* 봉투 몸통 */}
                    <div style={{ position: "absolute", inset: 0 }}>
                      <svg
                        viewBox="0 0 260 180"
                        width="260"
                        height="180"
                        fill="none"
                      >
                        <rect
                          width="260"
                          height="180"
                          rx="16"
                          fill={theme.primaryColor}
                        />
                        <path
                          d="M0 50L130 128L0 180"
                          fill={theme.primaryColor}
                          opacity="0.2"
                        />
                        <path
                          d="M260 50L130 128L260 180"
                          fill={theme.primaryColor}
                          opacity="0.2"
                        />
                        <path
                          d="M0 50L130 128L260 50"
                          stroke={theme.decoColor}
                          strokeWidth="1"
                          opacity="0.3"
                          fill="none"
                        />
                      </svg>
                    </div>

                    {/* 봉투 뚜껑 — rotateX만 담당 */}
                    <motion.div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 260,
                        height: 180,
                        transformOrigin: "top center",
                        zIndex: 3,
                        pointerEvents: "none",
                      }}
                      animate={{ rotateX: isOpening ? -170 : 0 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <svg
                        viewBox="0 0 260 180"
                        width="260"
                        height="180"
                        fill="none"
                      >
                        <path
                          d="M16 0 Q0 0 0 16 L0 50 L130 128 L260 50 L260 16 Q260 0 244 0 Z"
                          fill={theme.primaryColor}
                        />
                        <path
                          d="M16 0 Q0 0 0 16 L0 30 L130 108 L260 30 L260 16 Q260 0 244 0 Z"
                          fill="white"
                          opacity="0.12"
                        />
                        <g transform="translate(0, 20)">
                          {ENVELOPE_ICON[category]}
                        </g>
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* 타이틀 */}
              <motion.div
                className="mt-8 text-center"
                animate={{
                  opacity: isOpening ? 0 : 1,
                  y: isOpening ? 6 : 0,
                }}
                transition={{ duration: 0.25 }}
              >
                <h1
                  className="font-normal leading-[1.3] mb-2"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-ink)",
                    fontSize: 28,
                  }}
                >
                  편지가 도착했어요
                </h1>
                <p
                  className="text-[16px] leading-[1.6]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  누군가 당신에게 마음을 전했어요.
                  <br />
                  봉투를 클릭해 열어보세요.
                </p>
              </motion.div>
            </>
          )}
        </div>
      )}

      {/* ── PHASE: 편지 열람 ── */}
      {currentPhase === "opened" && (
        <>
          <div className="flex-1 overflow-y-auto px-5 py-6">
            {/* 편지지 */}
            <LetterPaper
              theme={(letter?.theme as LetterTheme) ?? 1}
              to={letter?.receiverName ?? ""}
              content={letter?.content ?? ""}
              from={letter?.senderName ?? ""}
              date={letter?.publishedAt ?? ""}
            />

            <Button
              variant="ghost"
              size="md"
              fullWidth={true}
              onClick={() => {
                HtmlToImage();
              }}
            >
              이미지 저장
            </Button>
          </div>
          <div className="flex-shrink-0 px-5 py-4 grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              size="xlg"
              fullWidth={true}
              style={{
                borderColor: "var(--color-rose-light)",
                background: "var(--color-rose-pale)",
                color: "var(--color-rose)",
              }}
              onClick={() => {
                // TODO: 편지 보관 (게스트 계정 -> 받은 편지 저장)
              }}
            >
              편지 보관하기
            </Button>
            <Button
              variant="primary"
              size="xlg"
              fullWidth={true}
              onClick={() =>
                navigate("/write", {
                  state: {
                    to: letter?.senderName,
                    from: letter?.receiverName,
                    returnTo: "/mypage",
                  },
                })
              }
            >
              답장 쓰기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
