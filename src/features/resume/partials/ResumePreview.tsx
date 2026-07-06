import { useState } from 'react'
import { css } from 'styled-system/css'
import type { Resume, ExperienceEntry, EducationEntry, ContactLine } from '../types'
import { Button } from '~/components/ui/button'

const styles = {
  // ── Section header ─────────────────────────────────────────────────
  header: css({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '14px',
  }),
  eyebrow: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    fontWeight: 600,
  }),
  headerRule: css({
    flex: 1,
    height: '1px',
    backgroundColor: 'border.default',
  }),
  caption: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.muted',
    marginTop: '8px',
    marginBottom: '18px',
  }),
  // ── Toolbar (Add role / Add education) ─────────────────────────────
  toolbar: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  }),
  toolbarRule: css({
    flex: 1,
    height: '1px',
    backgroundColor: 'border.default',
  }),
  toolbarLabel: css({
    fontFamily: 'mono',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.subtle',
  }),
  // ── Paper frame ────────────────────────────────────────────────────
  page: css({
    backgroundColor: 'bg.surface',
    borderTopWidth: '1px',
    borderBottomWidth: '1px',
    borderColor: 'border.default',
    borderRadius: 0,
    padding: { base: '32px 28px', md: '48px 56px' },
    maxWidth: '720px',
    margin: '0 auto',
    animation: 'fadeIn 500ms ease both',
    animationDelay: '80ms',
    animationFillMode: 'both',
    // The user owns the words; keep selectable and copyable like a real page.
    userSelect: 'text',
  }),
  // ── Empty state ────────────────────────────────────────────────────
  empty: css({
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: 'border.default',
    padding: '56px 32px',
    textAlign: 'center',
    maxWidth: '720px',
    margin: '0 auto',
  }),
  emptyEyebrow: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
    marginBottom: '12px',
  }),
  emptyLine: css({
    fontFamily: 'display',
    fontSize: 'clamp(18px, 2vw, 22px)',
    fontStyle: 'italic',
    color: 'fg.default',
    lineHeight: 1.45,
  }),
  // ── Contact block ──────────────────────────────────────────────────
  contactName: css({
    fontFamily: 'display',
    fontSize: 'clamp(28px, 3.2vw, 40px)',
    fontWeight: 500,
    letterSpacing: '-0.02em',
    lineHeight: 1.05,
    color: 'fg.default',
    width: '100%',
    textAlign: 'center',
    border: 'none',
    background: 'transparent',
    outline: 'none',
    padding: 0,
    marginBottom: '8px',
    transition: 'color 200ms ease',
    _focus: { color: 'accent.solid' },
    _placeholder: { color: 'fg.subtle', fontStyle: 'italic' },
  }),
  contactNameEm: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  contactLine: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '32px',
    paddingBottom: '20px',
    borderBottomWidth: '1px',
    borderColor: 'border.default',
  }),
  contactSep: css({
    fontFamily: 'mono',
    fontSize: '11px',
    color: 'fg.subtle',
  }),
  contactEditButton: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.muted',
    background: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'text',
    transition: 'color 200ms ease',
    _hover: { color: 'fg.default' },
    _focus: { color: 'accent.solid', outline: 'none' },
  }),
  contactEditInput: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.default',
    background: 'transparent',
    border: 'none',
    borderBottomWidth: '1px',
    borderColor: 'accent.solid',
    padding: '0 0 2px',
    outline: 'none',
    transition: 'border-color 200ms ease',
  }),
  // ── Resume section titles (within the page) ────────────────────────
  sectionTitle: css({
    fontFamily: 'mono',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.default',
    borderBottomWidth: '1px',
    borderColor: 'border.default',
    paddingBottom: '6px',
    marginTop: '28px',
    marginBottom: '14px',
  }),
  sectionTitleFirst: css({
    marginTop: '8px',
  }),
  // ── Summary ────────────────────────────────────────────────────────
  summaryText: css({
    fontFamily: 'body',
    fontSize: '15px',
    lineHeight: 1.6,
    color: 'fg.default',
    width: '100%',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: 0,
    resize: 'none',
    transition: 'color 200ms ease',
    _focus: { color: 'accent.solid' },
    _placeholder: { color: 'fg.subtle', fontStyle: 'italic' },
  }),
  // ── Experience entry ───────────────────────────────────────────────
  expBlock: css({
    marginBottom: '20px',
  }),
  expHeader: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '12px',
    marginBottom: '4px',
  }),
  expTitle: css({
    fontFamily: 'display',
    fontSize: 'clamp(18px, 1.8vw, 24px)',
    fontWeight: 500,
    letterSpacing: '-0.01em',
    lineHeight: 1.25,
    color: 'fg.default',
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: 0,
    transition: 'color 200ms ease',
    _focus: { color: 'accent.solid' },
    _placeholder: { color: 'fg.subtle', fontStyle: 'italic' },
  }),
  removeBtn: css({
    fontFamily: 'mono',
    fontSize: '11px',
    color: 'fg.muted',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    lineHeight: 1,
    transition: 'color 200ms ease',
    _hover: { color: 'accent.solid' },
    _focus: { color: 'accent.solid', outline: 'none' },
  }),
  expMeta: css({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '12px',
  }),
  expMetaItem: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.muted',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: 0,
    transition: 'color 200ms ease',
    _focus: { color: 'accent.solid' },
    _placeholder: { color: 'fg.subtle', fontStyle: 'italic' },
  }),
  expMetaItemSchool: css({
    marginBottom: '4px',
  }),
  expMetaSep: css({
    fontFamily: 'mono',
    fontSize: '11px',
    color: 'fg.subtle',
  }),
  // ── Bullets ────────────────────────────────────────────────────────
  bulletList: css({
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }),
  bulletItem: css({
    position: 'relative',
    paddingLeft: '20px',
    marginBottom: '6px',
  }),
  bulletMark: css({
    position: 'absolute',
    left: 0,
    top: '0.45em',
    width: '8px',
    height: '1px',
    backgroundColor: 'fg.muted',
  }),
  bulletInput: css({
    fontFamily: 'body',
    fontSize: '15px',
    lineHeight: 1.6,
    color: 'fg.default',
    width: '100%',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: 0,
    transition: 'color 200ms ease',
    _focus: { color: 'accent.solid' },
    _placeholder: { color: 'fg.subtle', fontStyle: 'italic' },
  }),
  addBullet: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.muted',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 0 4px 20px',
    marginTop: '4px',
    transition: 'color 200ms ease',
    _hover: { color: 'accent.solid' },
  }),
  // ── Skills ─────────────────────────────────────────────────────────
  skillsInput: css({
    fontFamily: 'body',
    fontSize: '15px',
    lineHeight: 1.7,
    color: 'fg.default',
    width: '100%',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: 0,
    resize: 'none',
    transition: 'color 200ms ease',
    _focus: { color: 'accent.solid' },
    _placeholder: { color: 'fg.subtle', fontStyle: 'italic' },
  }),
  // ── Footer caption ─────────────────────────────────────────────────
  footer: css({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '18px',
  }),
  footerLabel: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
  }),
  footerNote: css({
    fontFamily: 'display',
    fontSize: '13px',
    fontStyle: 'italic',
    lineHeight: 1.55,
    color: 'fg.muted',
    marginTop: '8px',
    maxWidth: '60ch',
  }),
  // ── Education entry ────────────────────────────────────────────────
  eduBlock: css({
    marginBottom: '16px',
  }),
}

interface ResumePreviewProps {
  resume: Resume
  onChange: (next: Resume) => void
}

/**
 * WYSIWYG resume preview — reframed as a typeset proof before export.
 *
 * The output here is what the DOCX/PDF render. Every section is editable
 * inline: the parser pulled the structure, the user owns the words. The
 * visual treatment borrows the magazine-spread vocabulary — mono
 * section rules, display-serif anchors, hairline-separated contact
 * line — so the resume reads like a laid-out page, not a form.
 */
export function ResumePreview({ resume, onChange }: ResumePreviewProps) {
  const isEmpty =
    !resume.contact.name &&
    !resume.contact.email &&
    !resume.summary &&
    resume.experience.length === 0 &&
    resume.education.length === 0 &&
    resume.skills.length === 0

  if (isEmpty) {
    return (
      <div>
        <PreviewHeader />
        <div className={styles.empty}>
          <div className={styles.emptyEyebrow}>Standing by</div>
          <div className={styles.emptyLine}>
            No draft yet. Run Optimize to typeset one.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PreviewHeader />

      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel}>Edit</span>
        <Button
          variant="ghost"
          size="xs"
          onClick={() =>
            onChange({
              ...resume,
              experience: [...resume.experience, blankExperience()],
            })
          }
        >
          + Role
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={() =>
            onChange({
              ...resume,
              education: [...resume.education, blankEducation()],
            })
          }
        >
          + Education
        </Button>
        <span className={styles.toolbarRule} aria-hidden />
      </div>

      <div className={styles.page}>
        <ContactBlock
          contact={resume.contact}
          onChange={(c) => onChange({ ...resume, contact: c })}
        />

        {resume.summary !== undefined && (
          <>
            <div
              className={`${styles.sectionTitle} ${styles.sectionTitleFirst}`}
            >
              Summary
            </div>
            <SummaryBlock
              summary={resume.summary}
              onChange={(s) => onChange({ ...resume, summary: s })}
            />
          </>
        )}

        {resume.experience.length > 0 && (
          <>
            <div className={styles.sectionTitle}>Experience</div>
            {resume.experience.map((entry, i) => (
              <ExperienceBlock
                key={`exp-${i}`}
                entry={entry}
                onChange={(next) =>
                  onChange({
                    ...resume,
                    experience: resume.experience.map((e, j) =>
                      i === j ? next : e,
                    ),
                  })
                }
                onRemove={() =>
                  onChange({
                    ...resume,
                    experience: resume.experience.filter((_, j) => i !== j),
                  })
                }
              />
            ))}
          </>
        )}

        {resume.education.length > 0 && (
          <>
            <div className={styles.sectionTitle}>Education</div>
            {resume.education.map((entry, i) => (
              <EducationBlock
                key={`edu-${i}`}
                entry={entry}
                onChange={(next) =>
                  onChange({
                    ...resume,
                    education: resume.education.map((e, j) =>
                      i === j ? next : e,
                    ),
                  })
                }
                onRemove={() =>
                  onChange({
                    ...resume,
                    education: resume.education.filter((_, j) => i !== j),
                  })
                }
              />
            ))}
          </>
        )}

        {resume.skills.length > 0 && (
          <>
            <div className={styles.sectionTitle}>Skills</div>
            <SkillsBlock
              skills={resume.skills}
              onChange={(s) => onChange({ ...resume, skills: s })}
            />
          </>
        )}
      </div>

      <div className={styles.footer}>
        <span className={styles.footerLabel}>Source of truth</span>
      </div>
      <p className={styles.footerNote}>
        This preview is what the DOCX and PDF render. We don't change your
        words after you do.
      </p>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Section header (shared between empty + populated states)
// ──────────────────────────────────────────────────────────────────────

function PreviewHeader() {
  return (
    <div>
      <div className={styles.header}>
        <span className={styles.eyebrow}>№ Preview · Typeset proof</span>
        <span className={styles.headerRule} aria-hidden />
      </div>
      <div className={styles.caption}>
        Edit anything — exports follow your edits.
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Contact block — italic accent on the whole name, hairline-separated
// contact line.
// ──────────────────────────────────────────────────────────────────────

function ContactBlock({
  contact,
  onChange,
}: {
  contact: ContactLine
  onChange: (next: ContactLine) => void
}) {
  const update = (patch: Partial<ContactLine>) => onChange({ ...contact, ...patch })
  return (
    <div>
      <input
        className={`${styles.contactName} ${styles.contactNameEm}`}
        value={contact.name}
        onChange={(e) => update({ name: e.target.value })}
        placeholder="Your name"
        aria-label="Name"
      />
      <div className={styles.contactLine}>
        <ContactField
          label="Email"
          value={contact.email ?? ''}
          onChange={(v) => update({ email: v || undefined })}
          type="email"
        />
        <span className={styles.contactSep} aria-hidden>·</span>
        <ContactField
          label="Phone"
          value={contact.phone ?? ''}
          onChange={(v) => update({ phone: v || undefined })}
          type="tel"
        />
        <span className={styles.contactSep} aria-hidden>·</span>
        <ContactField
          label="Location"
          value={contact.location ?? ''}
          onChange={(v) => update({ location: v || undefined })}
        />
        <span className={styles.contactSep} aria-hidden>·</span>
        <ContactField
          label="LinkedIn"
          value={contact.linkedin ?? ''}
          onChange={(v) => update({ linkedin: v || undefined })}
        />
        {contact.portfolio && (
          <>
            <span className={styles.contactSep} aria-hidden>·</span>
            <ContactField
              label="Portfolio"
              value={contact.portfolio ?? ''}
              onChange={(v) => update({ portfolio: v || undefined })}
            />
          </>
        )}
      </div>
    </div>
  )
}

function ContactField({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  if (editing) {
    return (
      <input
        className={styles.contactEditInput}
        type={type}
        placeholder={label}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          onChange(draft.trim())
          setEditing(false)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onChange(draft.trim())
            setEditing(false)
          } else if (e.key === 'Escape') {
            setDraft(value)
            setEditing(false)
          }
        }}
        autoFocus
        size={Math.max(label.length, value.length, 6)}
      />
    )
  }
  return (
    <button
      type="button"
      onClick={() => {
        setDraft(value)
        setEditing(true)
      }}
      className={styles.contactEditButton}
      aria-label={`Edit ${label}`}
    >
      {value || label}
    </button>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Summary
// ──────────────────────────────────────────────────────────────────────

function SummaryBlock({
  summary,
  onChange,
}: {
  summary: string
  onChange: (next: string) => void
}) {
  return (
    <textarea
      className={styles.summaryText}
      value={summary}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
      placeholder="One or two sentences. ATS-friendly; no fluff."
      aria-label="Summary"
    />
  )
}

// ──────────────────────────────────────────────────────────────────────
// Experience entry
// ──────────────────────────────────────────────────────────────────────

function ExperienceBlock({
  entry,
  onChange,
  onRemove,
}: {
  entry: ExperienceEntry
  onChange: (next: ExperienceEntry) => void
  onRemove: () => void
}) {
  const update = (patch: Partial<ExperienceEntry>) =>
    onChange({ ...entry, ...patch })

  return (
    <div className={styles.expBlock}>
      <div className={styles.expHeader}>
        <input
          className={styles.expTitle}
          value={[entry.title, entry.company].filter(Boolean).join(' — ')}
          onChange={(e) => {
            const v = e.target.value
            const split = v.split(/\s+—\s+/)
            if (split.length === 2) {
              update({ title: split[0] ?? '', company: split[1] ?? '' })
            } else {
              update({ title: v, company: '' })
            }
          }}
          placeholder="Job Title — Company"
          aria-label="Job title and company"
        />
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove role"
          className={styles.removeBtn}
        >
          ✕
        </button>
      </div>
      <div className={styles.expMeta}>
        <input
          className={styles.expMetaItem}
          value={entry.dateRange ?? ''}
          onChange={(e) => update({ dateRange: e.target.value || undefined })}
          placeholder="Jan 2022 – Present"
          aria-label="Date range"
        />
        <span className={styles.expMetaSep} aria-hidden>·</span>
        <input
          className={styles.expMetaItem}
          value={entry.location ?? ''}
          onChange={(e) => update({ location: e.target.value || undefined })}
          placeholder="Remote"
          aria-label="Location"
        />
      </div>
      <BulletList
        bullets={entry.bullets}
        onChange={(bullets) => update({ bullets })}
      />
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Bullets — body-serif, hanging indent, hairline mark
// ──────────────────────────────────────────────────────────────────────

function BulletList({
  bullets,
  onChange,
}: {
  bullets: string[]
  onChange: (next: string[]) => void
}) {
  return (
    <ul className={styles.bulletList}>
      {bullets.map((b, i) => (
        <li key={i} className={styles.bulletItem}>
          <span className={styles.bulletMark} aria-hidden />
          <input
            className={styles.bulletInput}
            value={b}
            onChange={(e) =>
              onChange(bullets.map((x, j) => (i === j ? e.target.value : x)))
            }
            placeholder="One accomplishment per line. Quantify when you can."
            aria-label={`Bullet ${i + 1}`}
          />
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={() => onChange([...bullets, ''])}
          className={styles.addBullet}
        >
          + Add bullet
        </button>
      </li>
    </ul>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Education entry
// ──────────────────────────────────────────────────────────────────────

function EducationBlock({
  entry,
  onChange,
  onRemove,
}: {
  entry: EducationEntry
  onChange: (next: EducationEntry) => void
  onRemove: () => void
}) {
  const update = (patch: Partial<EducationEntry>) =>
    onChange({ ...entry, ...patch })

  return (
    <div className={styles.eduBlock}>
      <div className={styles.expHeader}>
        <input
          className={styles.expTitle}
          value={[entry.degree, entry.field].filter(Boolean).join(', ')}
          onChange={(e) => {
            const v = e.target.value
            const [deg, field] = v.split(/,\s*/, 2)
            update({ degree: deg, field })
          }}
          placeholder="Degree, Field"
          aria-label="Degree and field"
        />
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove education"
          className={styles.removeBtn}
        >
          ✕
        </button>
      </div>
      <input
        className={`${styles.expMetaItem} ${styles.expMetaItemSchool}`}
        value={entry.school}
        onChange={(e) => update({ school: e.target.value })}
        placeholder="School"
        aria-label="School"
      />
      <div className={styles.expMeta}>
        <input
          className={styles.expMetaItem}
          value={entry.dateRange ?? ''}
          onChange={(e) => update({ dateRange: e.target.value || undefined })}
          placeholder="2018 – 2022"
          aria-label="Date range"
        />
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Skills — single body-serif field, comma-separated
// ──────────────────────────────────────────────────────────────────────

function SkillsBlock({
  skills,
  onChange,
}: {
  skills: string[]
  onChange: (next: string[]) => void
}) {
  return (
    <textarea
      className={styles.skillsInput}
      value={skills.join(', ')}
      onChange={(e) =>
        onChange(
          e.target.value
            .split(/,\s*/)
            .map((s) => s.trim())
            .filter(Boolean),
        )
      }
      rows={2}
      placeholder="Comma-separated. Keep it honest."
      aria-label="Skills"
    />
  )
}

// ──────────────────────────────────────────────────────────────────────
// Blank-entry factories
// ──────────────────────────────────────────────────────────────────────

function blankExperience(): ExperienceEntry {
  return { title: '', company: '', bullets: [] }
}

function blankEducation(): EducationEntry {
  return { school: '' }
}