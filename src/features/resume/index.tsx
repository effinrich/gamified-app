import { useEffect, useMemo, useState } from 'react'
import { css } from 'styled-system/css'
import { parseResume, isLinkedInUrlOnly } from './utils/parse'
import { optimizeResume, atsChecks, type AtsCheck } from './utils/optimize'
import { downloadDocx } from './utils/exportDocx'
import { downloadPdf } from './utils/exportPdf'
import { SAMPLE_RESUME } from './utils/sample'
import type { Resume } from './types'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { HStack, Stack } from '~/components/ui/layout'
import { Textarea } from '~/components/ui/textarea'
import { Eyebrow, Text } from '~/components/ui/text'
import { ResumePreview } from './partials/ResumePreview'
import { Scorecard } from './partials/Scorecard'
import { LinkedInPrompt } from './partials/LinkedInPrompt'
import { Heading } from '~/components/ui/heading'

const pageStyles = {
  fadeIn: css({ animation: 'fadeIn 450ms ease both' }),
  header: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    gap: '16px',
    flexWrap: 'wrap',
  }),
  headerCopy: css({ flex: 1, minWidth: '280px' }),
  headerActions: css({ display: 'flex', gap: '8px', flexShrink: 0 }),
  stage: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', lg: '1fr 1.2fr' },
    gap: '24px',
    alignItems: 'start',
  }),
  inputHeader: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    gap: '8px',
  }),
  toolbar: css({
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginTop: '12px',
    flexWrap: 'wrap',
  }),
  hint: css({
    fontSize: '12px',
    color: 'fg.muted',
    fontStyle: 'italic',
    fontFamily: 'display',
  }),
}

/**
 * Resume page — the main entry to the Optimize feature.
 *
 * Vertical flow:
 *   1. Input textarea (or LinkedIn URL detection)
 *   2. Scorecard (ATS checks)
 *   3. Optimized preview (editable; this is what gets exported)
 *   4. Export buttons (DOCX + PDF)
 *
 * The user is the source of truth — they paste what they have, we reframe
 * it, they edit the preview, what they see is what they get.
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

  return (
    <div className={pageStyles.fadeIn}>
      <div className={pageStyles.header}>
        <div className={pageStyles.headerCopy}>
          <Eyebrow>Optimize · Milestone 01</Eyebrow>
          <Heading as="h1" textStyle="heading-xl">
            Your resume, in a form ATS will actually read.
          </Heading>
          <Text variant="muted" style={{ marginTop: '8px', maxWidth: '60ch' }}>
            Paste your background or a LinkedIn URL. We'll reframe the bullets
            for clean parsing and hand you a DOCX and PDF that travel through
            Workday, Greenhouse, and iCIMS without losing your story.
          </Text>
        </div>
      </div>

      <Stack gap="6">
        {/* ── Input stage ─────────────────────────────────────────────── */}
        <Card>
          <Card.Header>
            <div className={pageStyles.inputHeader}>
              <div>
                <Card.Title>Paste your background</Card.Title>
                <Card.Description>
                  A LinkedIn URL works too. The text is what we use.
                </Card.Description>
              </div>
              <HStack gap="2">
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
              </HStack>
            </div>
          </Card.Header>

          {isLinkedinUrl ? (
            <LinkedInPrompt url={raw.trim()} />
          ) : (
            <>
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
              <div className={pageStyles.toolbar}>
                <Button
                  variant="solid"
                  size="md"
                  onClick={handleOptimize}
                  disabled={!parsedLive || optimizing}
                >
                  {optimizing ? 'Optimizing…' : 'Optimize'}
                </Button>
                {parsedLive && !draft && (
                  <span className={pageStyles.hint}>
                    Click Optimize to reframe the bullets.
                  </span>
                )}
              </div>
            </>
          )}
        </Card>

        {/* ── Output stage ────────────────────────────────────────────── */}
        {draft && (
          <div className={pageStyles.stage}>
            <Stack gap="5">
              <Scorecard checks={checks} passedCount={passedCount} />
              <Card>
                <Card.Header>
                  <Card.Title>Export</Card.Title>
                  <Card.Description>
                    What you see is what you get — both files come from this
                    same preview.
                  </Card.Description>
                </Card.Header>
                <HStack gap="2" style={{ flexWrap: 'wrap' }}>
                  <Button
                    variant="solid"
                    size="md"
                    onClick={() => handleExport('docx')}
                    disabled={Boolean(exporting)}
                  >
                    {exporting === 'docx' ? 'Building DOCX…' : 'Download .docx'}
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => handleExport('pdf')}
                    disabled={Boolean(exporting)}
                  >
                    {exporting === 'pdf' ? 'Building PDF…' : 'Download .pdf'}
                  </Button>
                </HStack>
                {error && (
                  <Text
                    style={{
                      marginTop: '12px',
                      fontSize: '13px',
                      color: 'red.700',
                    }}
                  >
                    {error}
                  </Text>
                )}
              </Card>
            </Stack>
            <ResumePreview resume={draft} onChange={setDraft} />
          </div>
        )}
      </Stack>
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
