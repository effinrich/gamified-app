// PDF export — produces an ATS-safe PDF using pdf-lib (no headless browser).
//
// ATS-grade PDFs differ from human-grade PDFs in three ways that matter:
//   • Text must be extractable, not rasterized. (pdf-lib writes real text.)
//   • Layout must be single-column. (We render left-to-right, one block
//     at a time.)
//   • Fonts must be standard. (We use Helvetica, one of the 14 PDF base
//     fonts — every PDF reader and every ATS parser has it.)
//
// pdf-lib has no automatic text wrapping or pagination. We measure each
// run with the standard font's width table and break to a new line/page
// ourselves. It's more code than a DOM-based renderer, but it means the
// output is the same on every browser and OS — no font-loading races,
// no canvas snapshotting, no <canvas>.toDataURL.

import { PDFDocument, PDFFont, StandardFonts, rgb } from 'pdf-lib'
import FileSaver from 'file-saver'
import type { ExperienceEntry, Resume } from '../types'
import { defaultFilename } from './exportDocx'

// ──────────────────────────────────────────────────────────────────────────
// Layout constants (in points, US Letter).
// ──────────────────────────────────────────────────────────────────────────

const PAGE_WIDTH = 612 // 8.5"
const PAGE_HEIGHT = 792 // 11"
const MARGIN_X = 54 // 0.75"
const MARGIN_TOP = 54
const MARGIN_BOTTOM = 54

const BODY_SIZE = 11
const HEADER_SIZE = 11
const NAME_SIZE = 18
const LINE_GAP = 2

// ──────────────────────────────────────────────────────────────────────────
// Public entry
// ──────────────────────────────────────────────────────────────────────────

export async function buildPdf(resume: Resume): Promise<Blob> {
  const pdf = await PDFDocument.create()
  pdf.setTitle(
    resume.contact.name ? `${resume.contact.name} – Resume` : 'Resume',
  )
  pdf.setProducer('Fairshot')
  pdf.setCreator('Fairshot')

  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)

  const ctx: RenderCtx = {
    pdf,
    font,
    bold,
    page: pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]),
    cursorY: PAGE_HEIGHT - MARGIN_TOP,
  }

  renderHeader(ctx, resume)
  if (resume.summary) renderSection(ctx, 'Summary', resume.summary)
  if (resume.experience.length) renderExperience(ctx, resume.experience)
  if (resume.education.length) renderEducation(ctx, resume.education)
  if (resume.skills.length) renderSkills(ctx, resume.skills)
  if (resume.extras.length) renderExtras(ctx, resume.extras)

  const bytes = await pdf.save()
  // pdf-lib returns Uint8Array<ArrayBufferLike>; coerce to ArrayBufferView
  // so the Blob constructor accepts it under strict ArrayBuffer typing.
  return new Blob([bytes as Uint8Array<ArrayBuffer>], { type: 'application/pdf' })
}

export async function downloadPdf(resume: Resume, filename?: string): Promise<void> {
  const blob = await buildPdf(resume)
  FileSaver.saveAs(blob, filename ?? defaultFilename(resume, 'pdf'))
}

// ──────────────────────────────────────────────────────────────────────────
// Renderer
// ──────────────────────────────────────────────────────────────────────────

interface RenderCtx {
  pdf: PDFDocument
  font: PDFFont
  bold: PDFFont
  page: ReturnType<PDFDocument['addPage']>
  cursorY: number
}

function ensureSpace(ctx: RenderCtx, neededHeight: number): void {
  if (ctx.cursorY - neededHeight < MARGIN_BOTTOM) {
    ctx.page = ctx.pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT])
    ctx.cursorY = PAGE_HEIGHT - MARGIN_TOP
  }
}

function drawLine(
  ctx: RenderCtx,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  size: number,
  maxWidth?: number,
): number {
  // Word-wrap if maxWidth is provided.
  if (maxWidth && text.length) {
    const words = text.split(/\s+/)
    let line = ''
    let lastY = y
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word
      const width = font.widthOfTextAtSize(candidate, size)
      if (width > maxWidth && line) {
        ctx.page.drawText(line, { x, y: lastY, font, size, color: rgb(0, 0, 0) })
        lastY -= size + LINE_GAP
        line = word
      } else {
        line = candidate
      }
    }
    if (line) {
      ctx.page.drawText(line, { x, y: lastY, font, size, color: rgb(0, 0, 0) })
      lastY -= size + LINE_GAP
    }
    return lastY
  }
  ctx.page.drawText(text, { x, y, font, size, color: rgb(0, 0, 0) })
  return y - size - LINE_GAP
}

function renderHeader(ctx: RenderCtx, resume: Resume): void {
  const c = resume.contact
  const width = PAGE_WIDTH - MARGIN_X * 2

  if (c.name) {
    const nameWidth = ctx.bold.widthOfTextAtSize(c.name, NAME_SIZE)
    ensureSpace(ctx, NAME_SIZE + 8)
    ctx.page.drawText(c.name, {
      x: (PAGE_WIDTH - nameWidth) / 2,
      y: ctx.cursorY - NAME_SIZE,
      font: ctx.bold,
      size: NAME_SIZE,
      color: rgb(0, 0, 0),
    })
    ctx.cursorY -= NAME_SIZE + 4
  }

  const contactBits = [
    c.location,
    c.phone,
    c.email,
    c.linkedin,
    c.portfolio,
  ].filter(Boolean) as string[]

  if (contactBits.length) {
    const line = contactBits.join('  ·  ')
    const textWidth = ctx.font.widthOfTextAtSize(line, BODY_SIZE)
    ensureSpace(ctx, BODY_SIZE + 12)
    ctx.page.drawText(line, {
      x: (PAGE_WIDTH - textWidth) / 2,
      y: ctx.cursorY - BODY_SIZE,
      font: ctx.font,
      size: BODY_SIZE,
      color: rgb(0.1, 0.1, 0.1),
    })
    ctx.cursorY -= BODY_SIZE + 12
  }

  // Hairline under the contact block.
  ensureSpace(ctx, 6)
  ctx.page.drawLine({
    start: { x: MARGIN_X, y: ctx.cursorY - 2 },
    end: { x: PAGE_WIDTH - MARGIN_X, y: ctx.cursorY - 2 },
    thickness: 0.5,
    color: rgb(0.6, 0.6, 0.6),
  })
  ctx.cursorY -= 10
  void width
}

function renderSection(ctx: RenderCtx, title: string, body: string): void {
  drawSectionHeader(ctx, title)
  ctx.cursorY = drawLine(
    ctx,
    body,
    MARGIN_X,
    ctx.cursorY - BODY_SIZE,
    ctx.font,
    BODY_SIZE,
    PAGE_WIDTH - MARGIN_X * 2,
  ) - 6
}

function drawSectionHeader(ctx: RenderCtx, title: string): void {
  ensureSpace(ctx, HEADER_SIZE + 16)
  ctx.page.drawText(title.toUpperCase(), {
    x: MARGIN_X,
    y: ctx.cursorY - HEADER_SIZE,
    font: ctx.bold,
    size: HEADER_SIZE,
    color: rgb(0, 0, 0),
  })
  ctx.cursorY -= HEADER_SIZE + 2
  ctx.page.drawLine({
    start: { x: MARGIN_X, y: ctx.cursorY - 2 },
    end: { x: PAGE_WIDTH - MARGIN_X, y: ctx.cursorY - 2 },
    thickness: 0.5,
    color: rgb(0.6, 0.6, 0.6),
  })
  ctx.cursorY -= 8
}

function renderExperience(ctx: RenderCtx, entries: ExperienceEntry[]): void {
  drawSectionHeader(ctx, 'Experience')
  for (const e of entries) {
    ensureSpace(ctx, BODY_SIZE + 8)
    const titleLine = [e.title, e.company].filter(Boolean).join(' — ')
    if (titleLine) {
      ctx.cursorY = drawLine(
        ctx,
        titleLine,
        MARGIN_X,
        ctx.cursorY - BODY_SIZE,
        ctx.bold,
        BODY_SIZE,
      ) - 2
    }
    if (e.dateRange) {
      ctx.cursorY = drawLine(
        ctx,
        e.dateRange,
        MARGIN_X,
        ctx.cursorY - BODY_SIZE,
        ctx.font,
        BODY_SIZE,
      ) - 2
    }
    if (e.location) {
      ctx.cursorY = drawLine(
        ctx,
        e.location,
        MARGIN_X,
        ctx.cursorY - BODY_SIZE,
        ctx.font,
        BODY_SIZE,
      ) - 2
    }
    for (const bullet of e.bullets) {
      if (!bullet.trim()) continue
      ensureSpace(ctx, BODY_SIZE + 4)
      ctx.cursorY = drawLine(
        ctx,
        `•  ${bullet}`,
        MARGIN_X + 14,
        ctx.cursorY - BODY_SIZE,
        ctx.font,
        BODY_SIZE,
        PAGE_WIDTH - MARGIN_X * 2 - 14,
      ) - 2
    }
    ctx.cursorY -= 4
  }
}

function renderEducation(ctx: RenderCtx, entries: Resume['education']): void {
  drawSectionHeader(ctx, 'Education')
  for (const e of entries) {
    ensureSpace(ctx, BODY_SIZE + 4)
    const headline = [e.degree, e.field].filter(Boolean).join(', ')
    const line = headline ? `${headline} — ${e.school}` : e.school
    ctx.cursorY = drawLine(
      ctx,
      line,
      MARGIN_X,
      ctx.cursorY - BODY_SIZE,
      ctx.bold,
      BODY_SIZE,
      PAGE_WIDTH - MARGIN_X * 2,
    )
    if (e.dateRange) {
      ctx.cursorY = drawLine(
        ctx,
        e.dateRange,
        MARGIN_X,
        ctx.cursorY - BODY_SIZE,
        ctx.font,
        BODY_SIZE,
      ) - 2
    }
    ctx.cursorY -= 2
  }
}

function renderSkills(ctx: RenderCtx, skills: Resume['skills']): void {
  drawSectionHeader(ctx, 'Skills')
  ensureSpace(ctx, BODY_SIZE + 4)
  ctx.cursorY = drawLine(
    ctx,
    skills.join(', '),
    MARGIN_X,
    ctx.cursorY - BODY_SIZE,
    ctx.font,
    BODY_SIZE,
    PAGE_WIDTH - MARGIN_X * 2,
  )
}

function renderExtras(ctx: RenderCtx, extras: Resume['extras']): void {
  drawSectionHeader(ctx, 'Additional')
  for (const line of extras) {
    ensureSpace(ctx, BODY_SIZE + 4)
    ctx.cursorY = drawLine(
      ctx,
      `•  ${line}`,
      MARGIN_X + 14,
      ctx.cursorY - BODY_SIZE,
      ctx.font,
      BODY_SIZE,
      PAGE_WIDTH - MARGIN_X * 2 - 14,
    ) - 2
  }
}
