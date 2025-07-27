import React from 'react'

/**
 * Stepper Component
 *
 * Visualises the current step of a multi‑step flow. Accepts a list of
 * step labels and highlights the active step. Each step is rendered
 * as a numbered circle with a connecting line. The active step is
 * tinted with the brand colour, completed steps are tinted dark and
 * upcoming steps are greyed out. This component is purely presentational.
 *
 * @param {Object} props
 * @param {number} props.currentStep Index of the current step (0‑based)
 * @param {string[]} props.steps Array of step labels
 */
export default function Stepper({ currentStep = 0, steps = [] }) {
  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((label, idx) => {
        // Determine state of the step: completed, active or upcoming
        const isCompleted = idx < currentStep
        const isActive = idx === currentStep
        return (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center">
              <div
                className={
                  'flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ' +
                  (isCompleted
                    ? 'bg-brand text-white'
                    : isActive
                    ? 'bg-brand-light text-brand-dark dark:bg-brand-dark dark:text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300')
                }
              >
                {idx + 1}
              </div>
              <span className="mt-1 text-xs text-center text-gray-600 dark:text-gray-300 w-20 truncate">
                {label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 rounded bg-gray-300 dark:bg-gray-600" />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}