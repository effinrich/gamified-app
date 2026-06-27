import { css } from 'styled-system/css'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { Stack } from '~/components/ui/layout'

const styles = {
  prompt: css({
    padding: '20px',
    marginTop: '12px',
  }),
  url: css({
    fontFamily: 'mono',
    fontSize: '12px',
    color: 'accent.solid',
    marginBottom: '12px',
    wordBreak: 'break-all',
  }),
  steps: css({
    margin: 0,
    paddingLeft: '20px',
    fontSize: '13px',
    lineHeight: '1.6',
    color: 'fg.default',
  }),
}

/**
 * Shown when the user pastes only a LinkedIn URL. Browsers can't scrape
 * LinkedIn (CORS, anti-bot), so we ask the user to copy their own public
 * profile text. Honest about the limitation; no fake "we're fetching it…".
 */
export function LinkedInPrompt({ url }: { url: string }) {
  return (
    <Card variant="subtle" className={styles.prompt}>
      <div className={styles.url}>{url}</div>
      <Text style={{ fontSize: '13px', marginBottom: '12px' }}>
        We can't fetch LinkedIn from the browser — they block it on purpose.
        Paste your profile text instead and we'll parse the same way:
      </Text>
      <Stack gap="2">
        <ol className={styles.steps}>
          <li>
            Open your LinkedIn profile in another tab and click <strong>More
            → Save as PDF</strong> (or just select-all the About / Experience
            sections).
          </li>
          <li>
            Paste everything below this card — the parser handles the rest.
          </li>
        </ol>
      </Stack>
    </Card>
  )
}
