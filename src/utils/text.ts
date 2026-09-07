/**
 * Venue descriptions are free-text fields, and some listings contain raw HTML
 * markup that would otherwise be rendered as literal tags.
 */
export function stripHtml(value: string) {
  return (
    value
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/[^\S\n]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      // stripped inline tags can leave a gap before punctuation
      .replace(/ ([,.!?;:])/g, '$1')
      .trim()
  )
}
