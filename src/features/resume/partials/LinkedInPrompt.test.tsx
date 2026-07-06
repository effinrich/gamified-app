import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { LinkedInPrompt } from './LinkedInPrompt'

/**
 * Isolation check for LinkedInPrompt.
 *
 * The user has explicitly required decoupling between resume partials and
 * the parser / optimizer / sibling partials. This test proves two things:
 *
 *   1. The partial's source file does NOT import from forbidden modules
 *      (parser, optimizer, sibling partials, the Optimize index).
 *
 *   2. The partial renders standalone with mock props via React's static
 *      renderer (no DOM, no testing-library — keeps the test zero-dep).
 */

const FORBIDDEN_IMPORTS = [
  '~/features/resume/utils/parse',
  '~/features/resume/utils/optimize',
  '~/features/resume/utils/exportDocx',
  '~/features/resume/utils/exportPdf',
  '~/features/resume/utils/sample',
  './ResumePreview',
  './Scorecard',
  './BackgroundInput',
  '../index',
]

describe('LinkedInPrompt — coupling audit', () => {
  it('does not import from parser, optimizer, exporters, or sibling partials', () => {
    const src = readFileSync(
      resolve(__dirname, 'LinkedInPrompt.tsx'),
      'utf8',
    )
    for (const forbidden of FORBIDDEN_IMPORTS) {
      expect(
        src.includes(`from '${forbidden}'`) ||
          src.includes(`from "${forbidden}"`),
        `LinkedInPrompt must not import from "${forbidden}"`,
      ).toBe(false)
    }
  })
})

describe('LinkedInPrompt — render in isolation', () => {
  it('renders the editorial chrome with mock props', () => {
    const html = renderToStaticMarkup(
      <LinkedInPrompt url="https://www.linkedin.com/in/example-user" />,
    )
    // Editorial chrome markers
    expect(html).toContain('Note')
    expect(html).toContain("A LinkedIn URL")
    expect(html).toContain("Browsers can&#x27;t fetch LinkedIn")
    expect(html).toContain('Continue below')
    expect(html).toContain('https://www.linkedin.com/in/example-user')
  })

  it('renders without a url when none is provided', () => {
    const html = renderToStaticMarkup(<LinkedInPrompt url="" />)
    expect(html).toContain("Browsers can&#x27;t fetch LinkedIn")
    expect(html).toContain('Continue below')
    // The url <code> block is conditional on `url && ...`
    expect(html).not.toContain('https://')
  })
})