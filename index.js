const axios = require("axios");

/**
 * @typedef Locale
 * @type {object}
 * @property {object} locale
 * @property {string} locale.code
 * @property {string} locale.name
 * @property {number} totalStrings
 * @property {number} approvedStrings
 * @property {number} stringsWithWarnings
 * @property {number} missingStrings
 * @property {number} progress
 */

/**
 * Queries the Pontoon GraphQL endpoint for the specified project and optionally
 * filters the results by a minimum translation threshold.
 *
 * This method will return an array of locales with the following keys:
 *
 * ```js
 * [{
 *   locale: {
 *     code: 'en-CA',
 *     name: 'English (Canada)'
 *   },
 *   totalStrings: 263,
 *   approvedStrings: 263,
 *   stringsWithWarnings: 0,
 *   missingStrings: 0,
 *   progress: 100 },
 *  {...}
 * ]
 * ```
 *
 * @param {string} slug The name of the project in Pontoon.
 * @param {number} [threshold] The minimum string translation percentage for the
 * locale to be included in the results. By default only locales with >0%
 * string translations are included, but you can set the threshold to `0` to include
 * all results.
 * @returns {Locale[]} An array of locales.
 */
module.exports = async function (slug, threshold=1) {
  if (!slug) {
    throw new Error("Project name not specified");
  }
  const query = {query: `{project(slug:"${slug}"){name,localizations{locale{code,name}totalStrings,approvedStrings,stringsWithWarnings,missingStrings}}}`};
  const { data } = await axios.get("https://pontoon.mozilla.org/graphql", {params: query});

  const body = data.data;

  if (!Array.isArray(body?.project?.localizations)) {
    const err = new Error("Unexpected GraphQL response");
    err.body = body;
    throw err;
  }

  return body.project.localizations
    .reduce((arr, locale) => {
      locale.progress = (locale.approvedStrings + locale.stringsWithWarnings) / locale.totalStrings * 100;
      if (locale.progress >= threshold) {
        arr.push(locale);
      }
      return arr;
    }, [])
    .sort((localeA, localeB) => localeB.progress - localeA.progress);
};
