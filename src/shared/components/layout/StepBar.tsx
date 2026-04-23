// src/shared/components/layout/StepBar.tsx

type StepStatus = 'done' | 'active' | 'inactive';

interface StepBarProps {
  steps: { label: string; status: StepStatus }[];
}

export default function StepBar({ steps }: StepBarProps) {
  return (
    <div className="flex items-center">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex items-center gap-[7px]">
            <div
              className="flex items-center justify-center flex-shrink-0 w-[22px] h-[22px] rounded-full text-[10px] font-medium"
              style={{
                fontFamily: 'var(--font-sans)',
                background:
                  step.status === 'active' ? 'var(--color-ink)' :
                  step.status === 'done'   ? 'var(--color-rose)' :
                  'var(--color-cream)',
                border:
                  step.status === 'inactive'
                    ? '1px solid rgba(28,23,20,0.14)'
                    : 'none',
                color:
                  step.status === 'inactive' ? 'var(--color-ink-soft)' : '#fff',
              }}
            >
              {step.status === 'done' ? '✓' : i + 1}
            </div>
            <span
              className={`text-[12px] ${step.status === 'active' ? 'font-medium' : 'font-normal'}`}
              style={{
                fontFamily: 'var(--font-sans)',
                color:
                  step.status === 'active' ? 'var(--color-ink)' :
                  step.status === 'done'   ? 'var(--color-rose)' :
                  'var(--color-ink-soft)',
              }}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="w-8 h-px mx-2 bg-black/[0.14]" />
          )}
        </div>
      ))}
    </div>
  );
}
