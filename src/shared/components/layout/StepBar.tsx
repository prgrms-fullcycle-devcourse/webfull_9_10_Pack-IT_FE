// src/shared/components/layout/StepBar.tsx
// 피그마 기준: active 단계만 텍스트 노출, 나머지는 원형 숫자만

type StepStatus = 'done' | 'active' | 'inactive';

interface StepBarProps {
  steps: { label: string; status: StepStatus }[];
}

export default function StepBar({ steps }: StepBarProps) {
  return (
    <div className="flex items-center">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex items-center gap-[6px]">
            {/* 원형 숫자 */}
            <div
              className="flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full text-[10px] font-medium"
              style={{
                fontFamily: 'var(--font-sans)',
                background:
                  step.status === 'active' ? 'var(--color-ink)' :
                  step.status === 'done'   ? 'var(--color-rose)' :
                  'var(--color-cream)',
                border: step.status === 'inactive' ? '1px solid rgba(28,23,20,0.14)' : 'none',
                color:
                  step.status === 'inactive' ? 'var(--color-ink-soft)' : '#fff',
              }}
            >
              {step.status === 'done' ? '✓' : i + 1}
            </div>
            {/* active 단계만 텍스트 노출 — 피그마 기준 */}
            {step.status === 'active' && (
              <span
                className="text-[12px] font-medium whitespace-nowrap"
                style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink)' }}
              >
                {step.label}
              </span>
            )}
          </div>
          {i < steps.length - 1 && (
            <div className="w-[10px] h-px mx-[6px] bg-black/[0.14]" />
          )}
        </div>
      ))}
    </div>
  );
}
