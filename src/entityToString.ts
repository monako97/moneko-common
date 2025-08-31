/**
 * HTML实体字符转string
 * @param {string} entity HTML实体字符
 * @returns {string} string
 */
export function entityToString(entity: string): string {
  const div: HTMLDivElement = document.createElement('div');

  div.innerHTML = entity;
  return div.innerText || div.textContent || '';
}
