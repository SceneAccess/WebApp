import { fetchPageAssets } from '../../ducks/hostedAssets.duck';
export const ASSET_NAME = 'blog-article-single-page';

export const loadData = (params, search) => dispatch => {
  const pageAsset = { blogArticleSinglePage: `content/pages/${ASSET_NAME}.json` };
  return dispatch(fetchPageAssets(pageAsset, true));
};
