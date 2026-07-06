import { useEffect, useMemo, useState } from 'react'
import { css } from 'styled-system/css'
import { parseResume, isLinkedInUrlOnly } from './utils/parse'
import { optimizeResume, atsChecks, type AtsCheck } from './utils/optimize'
import { downloadDocx } from './utils/exportDocx'
import { downloadPdf } from './utils/exportPdf'
import { SAMPLE_RESUME } from './utils/sample'
import type { Resume } from './types'
import { Button } from '~/components/ui/button'
import { Stack } from '~/components/ui/layout'
import { Textarea } from '~/components/ui/textarea'
import { Text } from '~/components/ui/text'
import { ResumePreview } from './partials/ResumePreview'
import { Scorecard } from './partials/Scorecard'
import { LinkedInPrompt } from './partials/LinkedInPrompt'

const STEPS = [
  { num: '01', label: 'Paste', field: 'input' },
  { num: '02', label: 'Parse', field: 'parse' },
  { num: '03', label: 'Optimize', field: 'optimize' },
  { num: '04', label: 'Export', field: 'export' },
] as const

type StepField = (typeof STEPS)[number]['field']

function activeStepFor(hasInput: boolean, hasDraft: boolean): StepField {
  if (!hasInput) return 'input'
  if (!hasDraft) return 'parse'
  return 'export'
}

const pageStyles = {
  root: css({
    animation: 'fadeIn 500ms ease both',
  }),
  // ── Masthead (issue № 03) ───────────────────────────────────────────
  masthead: css({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px',
  }),
  mastheadChip: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    fontWeight: 600,
  }),
  mastheadRule: css({
    flex: '0 0 96px',
    height: '2px',
    backgroundColor: 'accent.solid',
  }),
  mastheadDate: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
  }),
  // ── Standfirst (italic-accent lead, framed by hairline) ────────────
  headline: css({
    fontFamily: 'display',
    fontSize: 'clamp(40px, 5.6vw, 72px)',
    fontWeight: 400,
    lineHeight: '1',
    letterSpacing: '-0.03em',
    color: 'fg.default',
    margin: 0,
    textWrap: 'balance',
  }),
  headlineEm: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  standfirst: css({
    marginTop: '20px',
    paddingTop: '16px',
    borderTopWidth: '1px',
    borderColor: 'border.default',
    fontFamily: 'display',
    fontSize: 'clamp(17px, 1.8vw, 21px)',
    lineHeight: '1.5',
    color: 'fg.muted',
    maxWidth: '60ch',
    textWrap: 'pretty',
  }),
  standfirstEm: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  // ── Workflow stepper ───────────────────────────────────────────────
  stepper: css({
    display: 'grid',
    gridTemplateColumns: `repeat(${STEPS.length}, 1fr)`,
    gap: '0',
    marginTop: '56px',
    marginBottom: '40px',
  }),
  step: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    paddingTop: '14px',
    paddingBottom: '14px',
    paddingRight: '16px',
    borderTopWidth: '1px',
    borderColor: 'border.default',
  }),
  stepHeader: css({
    display: 'flex',
    alignItems: 'baseline',
    gap: '10px',
  }),
  stepNum: (state: 'active' | 'done' | 'pending') =>
    css({
      fontFamily: 'mono',
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.04em',
      color:
        state === 'active'
          ? 'accent.solid'
          : state === 'done'
            ? 'fg.muted'
            : 'fg.subtle',
    }),
  stepLabel: (state: 'active' | 'done' | 'pending') =>
    css({
      fontFamily: 'mono',
      fontSize: '11px',
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      color:
        state === 'active'
          ? 'fg.default'
          : state === 'done'
            ? 'fg.muted'
            : 'fg.subtle',
    }),
  stepRule: (state: 'active' | 'done' | 'pending') =>
    css({
      height: '1px',
      backgroundColor:
        state === 'active'
          ? 'accent.solid'
          : state === 'done'
            ? 'border.strong'
            : 'border.subtle',
      width: '100%',
    }),
  // ── Section frames (mono caption + hairline frame for each partial) ─
  section: css({
    borderTopWidth: '1px',
    borderColor: 'border.default',
    paddingTop: '14px',
    marginTop: '40px',
  }),
  sectionCaption: css({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  }),
  sectionCaptionSpaced: css({
    marginTop: '40px',
  }),
  captionText: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
    fontWeight: 600,
  }),
  captionMark: css({
    fontFamily: 'mono',
    fontSize: '10px',
    letterSpacing: '0.1em',
    color: 'accent.solid',
  }),
  // ── Input stage (Step 01) ───────────────────────────────────────────
  inputToolbar: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  }),
  inputHint: css({
    fontSize: '12px',
    color: 'fg.muted',
    fontStyle: 'italic',
    fontFamily: 'display',
  }),
  // ── Output stage (Steps 03 + 04, two columns) ──────────────────────
  outputStage: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', lg: '1fr 1.4fr' },
    gap: '40px',
    alignItems: 'start',
  }),
  outputCol: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  // ── Export CTA (Step 04) ────────────────────────────────────────────
  exportCta: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 22px',
    borderWidth: '1px',
    borderColor: 'fg.default',
    backgroundColor: 'fg.default',
    color: 'bg.canvas',
    fontFamily: 'mono',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 200ms ease',
    _hover: {
      backgroundColor: 'transparent',
      color: 'fg.default',
    },
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  }),
  exportCtaSecondary: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 22px',
    borderWidth: '1px',
    borderColor: 'border.default',
    backgroundColor: 'transparent',
    color: 'fg.default',
    fontFamily: 'mono',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 200ms ease',
    _hover: {
      borderColor: 'fg.default',
    },
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  }),
  exportArrow: css({
    display: 'inline-block',
    fontFamily: 'body',
    transition: 'transform 240ms ease',
  }),
  exportRow: css({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  }),
  // ── Empty state (standing by) ──────────────────────────────────────
  standby: css({
    marginTop: '40px',
    padding: '64px 32px',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: 'border.default',
    textAlign: 'center',
  }),
  standbyEyebrow: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
    marginBottom: '12px',
  }),
  standbyLine: css({
    fontFamily: 'display',
    fontSize: 'clamp(20px, 2.2vw, 26px)',
    fontStyle: 'italic',
    color: 'fg.default',
    lineHeight: '1.4',
  }),
}

/**
 * Resume page — the Optimize feature, framed as Issue № 03 of the
 * in-app magazine.
 *
 * Vertical workflow:
 *   1. Input (textarea or LinkedIn URL detection)
 *   2. Parse (lives as a useMemo, surfaced only as the stepper state)
 *   3. Optimize (produces a draft resume + scorecard checklist)
 *   4. Export (DOCX + PDF)
 *
 * The user owns the words. The page reframes the bullets for ATS
 * parsers and hands back DOCX/PDF without changing what the user wrote.
 */
export function ResumePage() {
  const [raw, setRaw] = useState('')
  const [draft, setDraft] = useState<Resume | null>(null)
  const [optimizing, setOptimizing] = useState(false)
  const [exporting, setExporting] = useState<null | 'docx' | 'pdf'>(null)
  const [error, setError] = useState<string | null>(null)

  // Parse on debounce so users get live preview as they paste.
  const parsedLive = useMemo(() => (raw.trim() ? parseResume(raw) : null), [raw])

  const isLinkedinUrl = isLinkedInUrlOnly(raw)

  // Reset draft whenever raw input changes meaningfully. We only auto-optimize
  // when the user has given us something substantive; empty input clears the
  // preview rather than producing a blank page.
  useEffect(() => {
    if (!parsedLive || !hasContent(parsedLive)) {
      setDraft(null)
      return
    }
  }, [parsedLive])

  async function handleOptimize() {
    if (!parsedLive) return
    setOptimizing(true)
    setError(null)
    try {
      // Defer one tick so the "Optimizing" state paints; the work is
      // synchronous but the visual pause helps the user notice the
      // preview just changed.
      await new Promise((r) => setTimeout(r, 150))
      setDraft(optimizeResume(parsedLive))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not optimize this input.')
    } finally {
      setOptimizing(false)
    }
  }

  async function handleExport(format: 'docx' | 'pdf') {
    if (!draft) return
    setExporting(format)
    setError(null)
    try {
      if (format === 'docx') await downloadDocx(draft)
      else await downloadPdf(draft)
    } catch (e) {
      setError(
        e instanceof Error
          ? `Export failed: ${e.message}`
          : 'Export failed. Try the other format.',
      )
    } finally {
      setExporting(null)
    }
  }

  function handleLoadSample() {
    setRaw(SAMPLE_RESUME)
  }

  function handleClear() {
    setRaw('')
    setDraft(null)
    setError(null)
  }

  const checks: AtsCheck[] = draft ? atsChecks(draft) : []
  const passedCount = checks.filter((c) => c.passed).length
  const hasInput = Boolean(raw.trim())
  const active = activeStepFor(hasInput, draft !== null)
  const activeIdx = STEPS.findIndex((s) => s.field === active)

  return (
    <div className={pageStyles.root}>
      {/* ── Masthead ──────────────────────────────────────────────── */}
      <div className={pageStyles.masthead}>
        <span className={pageStyles.mastheadChip}>Optimize · № 03</span>
        <span className={pageStyles.mastheadRule} aria-hidden />
        <span className={pageStyles.mastheadDate}>
          {formatDateline(new Date())} · ATS-aligned output
        </span>
      </div>

      {/* ── Headline + standfirst ────────────────────────────────── */}
      <h1 className={pageStyles.headline}>
        Your resume, in a form{' '}
        <em className={pageStyles.headlineEm}>ATS will actually read.</em>
      </h1>
      <p className={pageStyles.standfirst}>
        <span className={pageStyles.standfirstEm}>Paste your background.</span>{' '}
        We tidy up the wording so it travels through Workday, Greenhouse, and
        iCIMS without losing your story. DOCX and PDF both come from the same
        preview you see here.
      </p>

      {/* ── Workflow stepper (editorial chrome) ───────────────────── */}
      <div className={pageStyles.stepper} role="list" aria-label="Optimize workflow">
        {STEPS.map((step, i) => {
          const state: 'active' | 'done' | 'pending' =
            i === activeIdx ? 'active' : i < activeIdx ? 'done' : 'pending'
          return (
            <div
              key={step.field}
              className={pageStyles.step}
              role="listitem"
              aria-current={state === 'active' ? 'step' : undefined}
            >
              <div className={pageStyles.stepHeader}>
                <span className={pageStyles.stepNum(state)}>№ {step.num}</span>
                <span className={pageStyles.stepLabel(state)}>{step.label}</span>
              </div>
              <div className={pageStyles.stepRule(state)} aria-hidden />
            </div>
          )
        })}
      </div>

      {/* ── Step 01 · Input ─────────────────────────────────────── */}
      <section className={pageStyles.section}>
        <div className={pageStyles.sectionCaption}>
          <span className={pageStyles.captionText}>Step 01 · Input</span>
          <span className={pageStyles.captionMark} aria-hidden>
            ──
          </span>
        </div>

        {isLinkedinUrl ? (
          <LinkedInPrompt url={raw.trim()} />
        ) : (
          <Stack gap="3">
            <Textarea
              placeholder="Paste your background here. Section headers like 'Experience', 'Education', and 'Skills' help the parser; missing ones are fine."
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              rows={12}
              style={{
                minHeight: '280px',
                resize: 'vertical',
                lineHeight: '1.6',
                fontFamily: 'body',
              }}
            />
            <div className={pageStyles.inputToolbar}>
              <Button
                variant="ghost"
                size="xs"
                onClick={handleLoadSample}
                disabled={Boolean(raw)}
              >
                Load sample
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={handleClear}
                disabled={!raw}
              >
                Clear
              </Button>
              {parsedLive && !draft && (
                <span className={pageStyles.inputHint}>
                  Click Optimize to reframe the bullets.
                </span>
              )}
            </div>
            <div>
              <Button
                variant="solid"
                size="md"
                onClick={handleOptimize}
                disabled={!parsedLive || optimizing}
              >
                {optimizing ? 'Optimizing…' : 'Optimize'}
              </Button>
            </div>
          </Stack>
        )}
      </section>

      {/* ── Output stages (Steps 03 + 04) ───────────────────────── */}
      {draft ? (
        <section className={pageStyles.section}>
          <div className={pageStyles.outputStage}>
            <div className={pageStyles.outputCol}>
              {/* Step 03 — Scorecard */}
              <div className={pageStyles.sectionCaption}>
                <span className={pageStyles.captionText}>Step 03 · Scorecard</span>
                <span className={pageStyles.captionMark} aria-hidden>
                  ──
                </span>
              </div>
              <Scorecard checks={checks} passedCount={passedCount} />

              {/* Step 04 — Export */}
              <div
                className={`${pageStyles.sectionCaption} ${pageStyles.sectionCaptionSpaced}`}
              >
                <span className={pageStyles.captionText}>Step 04 · Export</span>
                <span className={pageStyles.captionMark} aria-hidden>
                  ──
                </span>
              </div>
              <Text variant="muted" style={{ marginBottom: '16px', fontSize: '14px' }}>
                What you see is what you get — both files come from this same
                preview.
              </Text>
              <div className={pageStyles.exportRow}>
                <button
                  type="button"
                  className={pageStyles.exportCta}
                  onClick={() => handleExport('docx')}
                  disabled={Boolean(exporting)}
                >
                  {exporting === 'docx' ? 'Building DOCX…' : 'Download .docx'}
                  <span className={pageStyles.exportArrow} aria-hidden>
                    →
                  </span>
                </button>
                <button
                  type="button"
                  className={pageStyles.exportCtaSecondary}
                  onClick={() => handleExport('pdf')}
                  disabled={Boolean(exporting)}
                >
                  {exporting === 'pdf' ? 'Building PDF…' : 'Download .pdf'}
                  <span className={pageStyles.exportArrow} aria-hidden>
                    →
                  </span>
                </button>
              </div>
              {error && (
                <Text
                  style={{
                    marginTop: '16px',
                    fontSize: '13px',
                    color: 'red.700',
                    fontFamily: 'mono',
                  }}
                >
                  {error}
                </Text>
              )}
            </div>

            {/* Step 03 — Preview */}
            <div className={pageStyles.outputCol}>
              <div className={pageStyles.sectionCaption}>
                <span className={pageStyles.captionText}>Step 03 · Preview</span>
                <span className={pageStyles.captionMark} aria-hidden>
                  ──
                </span>
              </div>
              <ResumePreview resume={draft} onChange={setDraft} />
            </div>
          </div>
        </section>
      ) : (
        <div className={pageStyles.standby}>
          <div className={pageStyles.standbyEyebrow}>Standing by</div>
          <div className={pageStyles.standbyLine}>
            Paste your background to begin.
          </div>
        </div>
      )}
    </div>
  )
}

function hasContent(r: Resume): boolean {
  return Boolean(
    r.contact.name ||
      r.contact.email ||
      r.summary ||
      r.experience.length ||
      r.education.length ||
      r.skills.length,
  )
}

function formatDateline(d: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const day = days[d.getDay()]
  const month = months[d.getMonth()]
  const date = d.getDate().toString().padStart(2, '0')
  const year = d.getFullYear()
  return `${day} · ${date} ${month} ${year}`
}
