import type {Resource} from '@site/src/data/resources';
import {resourceTypes} from '@site/src/data/resources';
import {normalizeSearch, getResourceUrl} from '@site/src/components/PowerPoint/library';

// Tái sử dụng hai hàm thuần hiện có, giữ nguyên chuyên mục PowerPoint.
export {getResourceUrl};
export type ResourceFilters = {query: string; type: string; grade: string};

export function filterResources(items: Resource[], filters: ResourceFilters): Resource[] {
  const terms = normalizeSearch(filters.query).split(/\s+/).filter(Boolean);
  return items.filter(item => {
    const searchable = normalizeSearch([item.title, item.summary, item.subject, resourceTypes[item.type], ...(item.tags ?? [])].join(' '));
    return (!filters.type || item.type === filters.type) &&
      (!filters.grade || item.grades.some(grade => String(grade) === filters.grade)) &&
      terms.every(term => searchable.includes(term));
  });
}

export function getResourcePath(resource: Pick<Resource, 'slug'>): string {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(resource.slug) || resource.slug === 'index') {
    throw new Error(`Slug tài liệu không hợp lệ: ${resource.slug}`);
  }
  return `/tai-lieu/${resource.slug}`;
}

export function formatResourceDate(value?: string): string | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return undefined;
  return new Intl.DateTimeFormat('vi-VN', {timeZone: 'UTC'}).format(date);
}

export function getResourceFormats(resource: Resource): string[] {
  const formats = (resource.files ?? []).filter(file => getResourceUrl(file.url)).map(file => file.format === 'other' ? 'Tệp đính kèm' : file.format.toUpperCase());
  return [...new Set([...(resource.contentFormat === 'mdx' ? ['Bài đọc trực tuyến'] : []), ...formats])];
}

export function getRelatedResources(resource: Resource, items: Resource[]): Resource[] {
  return items.filter(item => item.id !== resource.id &&
    (Boolean(resource.subject && item.subject === resource.subject) || item.grades.some(grade => resource.grades.includes(grade))),
  ).slice(0, 3);
}
