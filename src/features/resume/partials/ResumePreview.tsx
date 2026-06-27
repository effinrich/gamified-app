import { useState } from 'react'
import { css } from 'styled-system/css'
import type { Resume, ExperienceEntry, EducationEntry, ContactLine } from '../types'
import { Card } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { HStack, Stack } from '~/components/ui/layout'
import { Eyebrow, Text } from '~/components/ui/text'

const styles = {
  doc: css({
    backgroundColor: 'bg.canvas',
    borderWidth: '1px',
    borderColor: 'border.subtle',
    borderRadius: '6px',
    padding: '32px 36px',
    fontFamily: 'body',
    fontSize: '13px',
    lineHeight: '1.55',
    color: 'fg.default',
    // Mimics a printed page on screen.
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.04)',
    minHeight: '420px',
  }),
  name: css({
    fontFamily: 'display',
    fontSize: '22px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    textAlign: 'center',
    marginBottom: '4px',
  }),
  contact: css({
    textAlign: 'center',
    fontSize: '12px',
    color: 'fg.muted',
    marginBottom: '20px',
  }),
  sectionHeader: css({
    fontFamily: 'display',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'fg.default',
    borderBottomWidth: '1px',
    borderColor: 'border.default',
    paddingBottom: '4px',
    marginTop: '20px',
    marginBottom: '10px',
  }),
  summary: css({ marginBottom: '4px' }),
  expHeader: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '8px',
    fontWeight: 600,
    fontFamily: 'display',
    fontSize: '13px',
    marginTop: '10px',
  }),
  expDate: css({ fontWeight: 400, color: 'fg.muted', fontFamily: 'body' }),
  expLocation: css({
    fontStyle: 'italic',
    fontSize: '12px',
    color: 'fg.muted',
    marginBottom: '4px',
  }),
  bulletList: css({
    listStylePosition: 'outside',
    paddingLeft: '18px',
    marginTop: '4px',
  }),
  bulletItem: css({ marginBottom: '3px' }),
  skillsText: css({ fontSize: '13px' }),
  editInput: css({
    width: '100%',
    fontFamily: 'body',
    fontSize: '13px',
    padding: '4px 6px',
    borderWidth: '1px',
    borderColor: 'border.subtle',
    borderRadius: '4px',
    backgroundColor: 'bg.surface',
  }),
  editTitle: css({ width: '100%', fontFamily: 'display', fontSize: '13px', fontWeight: 600 }),
  editDate: css({ width: '100%', fontFamily: 'body', fontSize: '12px' }),
  editBullet: css({ width: '100%', fontFamily: 'body', fontSize: '13px' }),
}

interface ResumePreviewProps {
  resume: Resume
  onChange: (next: Resume) => void
}

/**
 * WYSIWYG resume preview. What the user sees here is byte-for-byte what
 * gets exported. Every section is editable inline — the parser pulled
 * the structure, the user owns the words.
 */
export function ResumePreview({ resume, onChange }: ResumePreviewProps) {
  return (
    <Card>
      <Card.Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div>
            <Card.Title>Preview</Card.Title>
            <Card.Description>Edit anything — exports follow your edits.</Card.Description>
          </div>
          <HStack gap="2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onChange({
                ...resume,
                experience: [...resume.experience, blankExperience()],
              })}
            >
              + Role
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onChange({
                ...resume,
                education: [...resume.education, blankEducation()],
              })}
            >
              + Education
            </Button>
          </HStack>
        </div>
      </Card.Header>

      <div className={styles.doc}>
        <ContactBlock contact={resume.contact} onChange={(c) => onChange({ ...resume, contact: c })} />
        {resume.summary !== undefined && (
          <SummaryBlock summary={resume.summary} onChange={(s) => onChange({ ...resume, summary: s })} />
        )}
        {resume.experience.length > 0 && (
          <>
            <div className={styles.sectionHeader}>Experience</div>
            <Stack gap="3">
              {resume.experience.map((entry, i) => (
                <ExperienceBlock
                  key={`exp-${i}`}
                  entry={entry}
                  onChange={(next) =>
                    onChange({
                      ...resume,
                      experience: resume.experience.map((e, j) => (i === j ? next : e)),
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
            </Stack>
          </>
        )}
        {resume.education.length > 0 && (
          <>
            <div className={styles.sectionHeader}>Education</div>
            <Stack gap="3">
              {resume.education.map((entry, i) => (
                <EducationBlock
                  key={`edu-${i}`}
                  entry={entry}
                  onChange={(next) =>
                    onChange({
                      ...resume,
                      education: resume.education.map((e, j) => (i === j ? next : e)),
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
            </Stack>
          </>
        )}
        {resume.skills.length > 0 && (
          <>
            <div className={styles.sectionHeader}>Skills</div>
            <SkillsBlock skills={resume.skills} onChange={(s) => onChange({ ...resume, skills: s })} />
          </>
        )}
      </div>

      <Eyebrow style={{ marginTop: '20px', marginBottom: '4px' }}>
        Source of truth
      </Eyebrow>
      <Text variant="muted" style={{ fontSize: '12px' }}>
        This preview is what the DOCX and PDF render. We don't change your
        words after you do.
      </Text>
    </Card>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Section blocks
// ──────────────────────────────────────────────────────────────────────────

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
        className={styles.name}
        value={contact.name}
        onChange={(e) => update({ name: e.target.value })}
        placeholder="Your name"
        aria-label="Name"
        style={{
          textAlign: 'center',
          width: '100%',
          border: 'none',
          background: 'transparent',
          outline: 'none',
        }}
      />
      <div className={styles.contact}>
        <HStack gap="2" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          <ContactField
            label="Location"
            value={contact.location ?? ''}
            onChange={(v) => update({ location: v || undefined })}
          />
          <span>·</span>
          <ContactField
            label="Email"
            value={contact.email ?? ''}
            onChange={(v) => update({ email: v || undefined })}
            type="email"
          />
          <span>·</span>
          <ContactField
            label="Phone"
            value={contact.phone ?? ''}
            onChange={(v) => update({ phone: v || undefined })}
          />
          <span>·</span>
          <ContactField
            label="LinkedIn"
            value={contact.linkedin ?? ''}
            onChange={(v) => update({ linkedin: v || undefined })}
          />
        </HStack>
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
        className={styles.editInput}
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
        style={{ width: `${Math.max(label.length, value.length, 6)}ch` }}
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
      style={{
        background: 'transparent',
        border: 'none',
        padding: 0,
        color: value ? 'inherit' : 'var(--colors-fg-muted, #888)',
        cursor: 'text',
        font: 'inherit',
      }}
    >
      {value || label}
    </button>
  )
}

function SummaryBlock({
  summary,
  onChange,
}: {
  summary: string
  onChange: (next: string) => void
}) {
  return (
    <>
      <div className={styles.sectionHeader}>Summary</div>
      <textarea
        className={styles.summary}
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        style={{
          width: '100%',
          fontFamily: 'body',
          fontSize: '13px',
          padding: '6px',
          border: '1px solid var(--colors-border-subtle, #eee)',
          borderRadius: '4px',
          resize: 'vertical',
          background: 'var(--colors-bg-surface, #fafafa)',
        }}
      />
    </>
  )
}

function ExperienceBlock({
  entry,
  onChange,
  onRemove,
}: {
  entry: ExperienceEntry
  onChange: (next: ExperienceEntry) => void
  onRemove: () => void
}) {
  const update = (patch: Partial<ExperienceEntry>) => onChange({ ...entry, ...patch })
  return (
    <div>
      <div className={styles.expHeader}>
        <input
          className={styles.editTitle}
          value={[entry.title, entry.company].filter(Boolean).join(' — ')}
          onChange={(e) => {
            const v = e.target.value
            const split = v.split(/\s+—\s+/)
            if (split.length === 2) {
              update({ title: split[0], company: split[1] })
            } else {
              update({ title: v, company: '' })
            }
          }}
          placeholder="Job Title — Company"
        />
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove role"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--colors-fg-muted, #888)',
            fontSize: '11px',
          }}
        >
          ✕
        </button>
      </div>
      <HStack gap="2" style={{ marginBottom: '4px', flexWrap: 'wrap' }}>
        <input
          className={styles.editDate}
          value={entry.dateRange ?? ''}
          onChange={(e) => update({ dateRange: e.target.value || undefined })}
          placeholder="Jan 2022 – Present"
          style={{ maxWidth: '200px' }}
        />
        <input
          className={styles.editDate}
          value={entry.location ?? ''}
          onChange={(e) => update({ location: e.target.value || undefined })}
          placeholder="Remote"
          style={{ maxWidth: '200px' }}
        />
      </HStack>
      <BulletList
        bullets={entry.bullets}
        onChange={(bullets) => update({ bullets })}
      />
    </div>
  )
}

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
          <input
            className={styles.editBullet}
            value={b}
            onChange={(e) =>
              onChange(bullets.map((x, j) => (i === j ? e.target.value : x)))
            }
            placeholder="One accomplishment per line. Quantify when you can."
          />
        </li>
      ))}
      <li className={styles.bulletItem}>
        <button
          type="button"
          onClick={() => onChange([...bullets, ''])}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--colors-fg-muted, #888)',
            fontSize: '12px',
            padding: 0,
          }}
        >
          + Add bullet
        </button>
      </li>
    </ul>
  )
}

function EducationBlock({
  entry,
  onChange,
  onRemove,
}: {
  entry: EducationEntry
  onChange: (next: EducationEntry) => void
  onRemove: () => void
}) {
  const update = (patch: Partial<EducationEntry>) => onChange({ ...entry, ...patch })
  return (
    <div>
      <div className={styles.expHeader}>
        <input
          className={styles.editTitle}
          value={[entry.degree, entry.field].filter(Boolean).join(', ')}
          onChange={(e) => {
            const v = e.target.value
            const [deg, field] = v.split(/,\s*/, 2)
            update({ degree: deg, field: field })
          }}
          placeholder="Degree, Field"
        />
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove education"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--colors-fg-muted, #888)',
            fontSize: '11px',
          }}
        >
          ✕
        </button>
      </div>
      <input
        className={styles.editInput}
        value={entry.school}
        onChange={(e) => update({ school: e.target.value })}
        placeholder="School"
      />
      <input
        className={styles.editDate}
        value={entry.dateRange ?? ''}
        onChange={(e) => update({ dateRange: e.target.value || undefined })}
        placeholder="2018 – 2022"
        style={{ marginTop: '4px', maxWidth: '200px' }}
      />
    </div>
  )
}

function SkillsBlock({
  skills,
  onChange,
}: {
  skills: string[]
  onChange: (next: string[]) => void
}) {
  return (
    <textarea
      className={styles.skillsText}
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
      style={{
        width: '100%',
        fontFamily: 'body',
        fontSize: '13px',
        padding: '6px',
        border: '1px solid var(--colors-border-subtle, #eee)',
        borderRadius: '4px',
        resize: 'vertical',
        background: 'var(--colors-bg-surface, #fafafa)',
      }}
    />
  )
}

function blankExperience(): ExperienceEntry {
  return { title: '', company: '', bullets: [] }
}

function blankEducation(): EducationEntry {
  return { school: '' }
}
