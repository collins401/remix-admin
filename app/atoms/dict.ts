import { atom } from 'jotai';
import { atomFamily, loadable } from 'jotai/utils';

import { getDictListByType } from '~/routes/system+/api';

const dictAtom = atom<Map<string, any>>(new Map());

const loadableDictAtom = loadable(dictAtom);

export const dictAtomFamily = atomFamily((id: string) =>
	atom(
		async (get) => {
			// If somewhere else in the app, we've manually set the post with this ID, it'll be in the posts cache atom defined above. So let's just retrieve and return it.
			const dictCache = get(dictAtom);
			if (dictCache.has(id)) return dictCache.get(id);
			const res = await getDictListByType(id);
			// Otherwise, call out to the API to retrieve the post. (Then, on future calls, this post will be retrieved via the internal `atomFamily` cache map, rather than `postsCacheAtom` above.)
			return res.data?.map((s) => ({
				...s,
				value: s.dictValue,
				label: s.dictLabel,
			}));
		},
		async (get, set) => {
			// If e.g., the home feed calls `set(postsAtomFamily('some-id'), somePost)`, we'll add it to the posts cache here.
			const dict = get(dictAtom);
			const cache = new Map(dict);
			const res = await getDictListByType(id);
			const newDict = res.data?.map((s) => ({
				...s,
				value: s.dictValue,
				label: s.dictLabel,
			}));
			cache.set(id, newDict);
			set(dictAtom, cache);
		},
	),
);
