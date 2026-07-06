import { css } from 'styled-system/css'
import type { Problem } from '../types'
import { Card } from '~/components/ui/card'

/**
 * ProblemSection — the magazine's opening number.
 *
 * Reframed from a generic centered SaaS panel into the editorial front page.
 * A mono `Opener · 00` masthead sits above the headline, an oversized italic
 * display line carries the lead, and the three "evidence" cards are pinned
 * to a 72px gutter column on the left with the headline + standfirst on the
 * right. Single orchestrated entrance stagger. Bookends the issue alongside
 * Hero (`Issue № 01`), WaitlistCta (`Final · 03`) and SiteFooter
 * (`Colophon · 04`).
 */
export function ProblemSection({ problems }: { problems: Problem[] }) {
  return (
    <section className={styles.root} id="problem">
      {/* Masthead: same family as Hero / WaitlistCta / SiteFooter — issue chip,
          short accent rule, dateline. Anchors this as the front page of the
          magazine, not a mid-issue block. */}
      <div className={styles.masthead}>
        <span className={styles.issue}>Opener · 00</span>
        <span className={styles.rule} aria-hidden />
        <span className={styles.dateline}>The market, as it stands</span>
      </div>

      {/* Top hairline — closes the chrome and starts the spread. */}
      <div className={styles.topRule} aria-hidden />

      {/* Gutter-pinned layout: a 72px gutter column pins the section's
          "what is this" label, the rest of the row carries the lead headline
          and standfirst. Mirrors WaitlistCta + SiteFooter so the front page
          reads as part of the same publication. */}
      <div className={styles.layout}>
        <div className={styles.gutter} aria-hidden>
          <span className={styles.gutterLabel}>The</span>
          <span className={styles.gutterLabel}>State</span>
          <span className={styles.gutterLabel}>Of Things</span>
          <span className={styles.gutterMeta}>Vol. 00</span>
        </div>

        <div className={styles.spread}>
          <h2 className={styles.title}>
            Job search <em className={styles.titleEm}>broke</em>
            <br />
            your <em className={styles.titleEm}>spirit.</em>
          </h2>

          <p className={styles.standfirst}>
            <span className={styles.standfirstLead}>You upload your resume.</span>{' '}
            It scores 42 out of 100. The tool tells you to add more keywords. You
            tweak. You re-upload. 48 out of 100. <em>Try harder.</em>
          </p>

          <p className={styles.body}>
            Meanwhile, auto-apply bots spam 200 jobs a day with generic cover
            letters. Recruiters can smell it. Your inbox fills with silence.
            And the bill comes every month whether you get an interview or not.
          </p>
        </div>
      </div>

      {/* Evidence row — three "filed reports" framed by hairlines and pinned
          to the same gutter rhythm as the lead above. Each card carries an
          editorial index, a sharp teal monogram, and a quoted summary. */}
      <div className={styles.evidence}>
        <div className={styles.evidenceGutter} aria-hidden>
          <span className={styles.gutterLabel}>Filed</span>
          <span className={styles.gutterLabel}>Reports</span>
          <span className={styles.gutterMeta}>№ 01—03</span>
        </div>

        <div className={styles.evidenceGrid}>
          {problems.map((p, idx) => (
            <Card className={styles.card} key={p.title}>
              <div className={styles.cardTop}>
                <span className={styles.cardIndex}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className={styles.cardMonogram} aria-hidden>
                  {p.icon}
                </span>
              </div>

              <div className={styles.cardRule} aria-hidden />

              <div className={styles.cardTitle}>{p.title}</div>
              <div className={styles.cardDesc}>{p.desc}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom hairline — closes the spread as a self-contained front page. */}
      <div className={styles.bottomRule} aria-hidden />
    </section>
  )
}

const styles = {
  root: css({
    position: 'relative',
    backgroundColor: 'bg.canvas',
    padding: { base: '80px 48px 96px', md: '120px 48px 120px' },
  }),
  // Masthead chrome — same family as Hero, WaitlistCta, SiteFooter.
  masthead: css({
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
    animation: 'fadeIn 600ms ease both',
  }),
  issue: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    fontWeight: 600,
  }),
  rule: css({
    flex: '0 0 96px',
    height: '2px',
    backgroundColor: 'accent.solid',
  }),
  dateline: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
  }),
  topRule: css({
    maxWidth: '1200px',
    margin: '0 auto 64px',
    height: '1px',
    backgroundColor: 'border.default',
    animation: 'fadeIn 600ms ease both',
    animationDelay: '80ms',
  }),
  // 72px gutter pinned layout — same compositional language as WaitlistCta
  // and SiteFooter so the issue reads as one continuous publication.
  layout: css({
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: '72px 1fr' },
    gap: { base: '32px', md: '56px' },
    alignItems: 'start',
    animation: 'fadeIn 700ms ease both',
    animationDelay: '160ms',
  }),
  gutter: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    paddingTop: '8px',
    borderTopWidth: '1px',
    borderColor: 'border.default',
  }),
  gutterLabel: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.muted',
  }),
  gutterMeta: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'accent.solid',
    marginTop: '24px',
    fontWeight: 600,
  }),
  spread: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    maxWidth: '780px',
  }),
  // Oversized display headline — sits between the Hero's ceiling (104px) and
  // the WaitlistCta closing scale (80px). Reads as a front-page lead, not a
  // closing argument.
  title: css({
    fontFamily: 'display',
    fontSize: 'clamp(44px, 6.4vw, 96px)',
    fontWeight: 400,
    lineHeight: '0.98',
    letterSpacing: '-0.03em',
    margin: 0,
    textWrap: 'balance',
    color: 'fg.default',
    animation: 'fadeIn 700ms ease both',
    animationDelay: '240ms',
  }),
  titleEm: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  // Standfirst — the lead paragraph that sits under the front-page headline.
  // Slightly larger than the in-card body copy to feel like a deck, not a
  // description.
  standfirst: css({
    fontFamily: 'display',
    fontSize: 'clamp(18px, 1.8vw, 22px)',
    lineHeight: '1.55',
    color: 'fg.default',
    maxWidth: '52ch',
    margin: 0,
    textWrap: 'pretty',
    animation: 'fadeIn 700ms ease both',
    animationDelay: '320ms',
  }),
  standfirstLead: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  body: css({
    fontFamily: 'display',
    fontSize: 'clamp(16px, 1.5vw, 18px)',
    lineHeight: '1.7',
    color: 'fg.muted',
    maxWidth: '52ch',
    margin: 0,
    animation: 'fadeIn 700ms ease both',
    animationDelay: '400ms',
  }),
  // Evidence block — three "filed reports" sit on the same gutter rhythm as
  // the lead. Carries its own entrance stagger so the section reads as a
  // single orchestrated reveal, not scattered micro-interactions.
  evidence: css({
    maxWidth: '1200px',
    margin: '96px auto 0',
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: '72px 1fr' },
    gap: { base: '32px', md: '56px' },
    alignItems: 'start',
    animation: 'fadeIn 700ms ease both',
    animationDelay: '480ms',
  }),
  evidenceGutter: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    paddingTop: '8px',
    borderTopWidth: '1px',
    borderColor: 'border.default',
  }),
  evidenceGrid: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: 'repeat(3, 1fr)' },
    gap: '20px',
  }),
  // Card — kept on the Park UI `Card` primitive for visual coherence with the
  // PricingSection rate-cards. The hover gesture and frame treatment matches.
  card: css({
    padding: { base: '28px 24px', md: '32px 28px' },
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    transition: 'all 300ms ease',
    _hover: { borderColor: 'border.strong' },
  }),
  cardTop: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '14px',
  }),
  cardIndex: css({
    fontFamily: 'mono',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'fg.muted',
    fontWeight: 500,
  }),
  // Sharp teal monogram — replaces the previous rounded accent tile. Reads
  // as an editorial mark, not a UI icon chip.
  cardMonogram: css({
    fontFamily: 'mono',
    fontSize: '14px',
    fontWeight: 600,
    color: 'accent.solid',
    borderWidth: '1px',
    borderColor: 'accent.solid',
    padding: '4px 8px',
    lineHeight: 1,
  }),
  cardRule: css({
    height: '1px',
    backgroundColor: 'border.default',
    marginBottom: '20px',
  }),
  cardTitle: css({
    fontFamily: 'display',
    fontSize: '20px',
    fontWeight: 500,
    letterSpacing: '-0.01em',
    color: 'fg.default',
    marginBottom: '10px',
  }),
  cardDesc: css({
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'fg.muted',
  }),
  bottomRule: css({
    maxWidth: '1200px',
    margin: '96px auto 0',
    height: '1px',
    backgroundColor: 'border.default',
    animation: 'fadeIn 600ms ease both',
    animationDelay: '640ms',
  }),
}