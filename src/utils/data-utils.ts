import { type CollectionEntry } from 'astro:content';
import { slugify } from './common-utils';

export function sortItemsByDateDesc(itemA: CollectionEntry<'prose' | 'projects'>, itemB: CollectionEntry<'prose' | 'projects'>) {
  return new Date(itemB.data.publishDate).getTime() - new Date(itemA.data.publishDate).getTime();
}

export function filterDraftProse<T extends CollectionEntry<'prose'>>(item: T) {
  return import.meta.env.PROD ? !item.data.draft : !item.id.startsWith('_');
}

export function getAllTags(posts: CollectionEntry<'prose'>[]) {
  const tags: string[] = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))];
  return tags
    .map((tag) => {
      return {
        name: tag,
        id: slugify(tag),
      };
    })
    .filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos;
    });
}

export function getPostsByTag(posts: CollectionEntry<'prose'>[], tagId: string) {
  const filteredPosts: CollectionEntry<'prose'>[] = posts.filter((post) => (post.data.tags || []).map((tag) => slugify(tag)).includes(tagId));
  return filteredPosts;
}
