const fetch = require('node-fetch');
const util = require('./utilities');

class DotaApi {
  /**
   * Provide an optional opendota api key. Provided here -> {@link https://www.opendota.com/api-keys}
   * @param {string=} apiKey
   */
  constructor(apiKey = null) {
    this.apiKey = apiKey;
    this.API_URL = 'https://api.opendota.com/api/';
  }

  _fetch(url) {
      if (this.apiKey) {
          if (url.includes("?")) {
              url += `&api_key=${this.apiKey}`;
          } else {
              url += `?api_key=${this.apiKey}`;
          }
      }
      console.log(url);
      return fetch(url)
  }

  /**
   * Pass a matchId from any completed match, to retrieve details.
   * @param {string} matchId
   * @returns {Object}
   */
  getMatchDetails(matchId) {
    return this._fetch(this.API_URL + `matches/${matchId}`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  // ------------ PLAYER SECTION -------------

  /**
   * Provide a Steam32 Account ID to get the players data.
   * @param {string} account_id
   * @returns {Object}
   */
  getPlayerData(account_id) {
    return this._fetch(this.API_URL + `players/${account_id}`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Provide a Steam32 Account ID, along with an object of optional options, for specifiying the W/L count.
   * @param {string} account_id
   * @param {{limit: integer, offset: integer, win: integer, patch: integer, game_mode: integer, lobby_type: integer, region: integer, date: integer, lane_role: integer, hero_id, integer, is_radiant: integer, included_account_id: integer[], excluded_account_id: integer[], with_hero_id: integer[], against_hero_id: integer[], significant: integer}=} limit_options
   * @returns {Object}
   */
  getWLCount(account_id, limit_options = {}) {
    return this._fetch(
      this.API_URL + `players/${account_id}/wl${limit_options ? util.query(limit_options) : ''}`,
    )
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get the recent matches played, of the Steam32 Account id player.
   * @param {string} account_id
   * @returns {Array}
   */
  getRecentMatches(account_id) {
    return this._fetch(this.API_URL + `players/${account_id}/recentMatches`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get the matches played, of the Steam32 Account id player. Optional object of query params.
   * @param {string} account_id
   * @param {{limit: integer, offset: integer, win: integer, patch: integer, game_mode: integer, lobby_type: integer, region: integer, date: integer, lane_role: integer, hero_id, integer, is_radiant: integer, included_account_id: integer[], excluded_account_id: integer[], with_hero_id: integer[], against_hero_id: integer[], significant: integer}=} searchOptions
   * @returns {Array}
   */
  getMatches(account_id, searchOptions = null) {
    return this._fetch(
      this.API_URL + `players/${account_id}/matches${searchOptions ? util.query(searchOptions) : ''}`,
    )
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get the stats of all heroes played, of the Steam32 Account id player. Optional object of query params.
   * @param {string} account_id
   * @param {{limit: integer, offset: integer, win: integer, patch: integer, game_mode: integer, lobby_type: integer, region: integer, date: integer, lane_role: integer, hero_id, integer, is_radiant: integer, included_account_id: integer[], excluded_account_id: integer[], with_hero_id: integer[], against_hero_id: integer[], significant: integer}=} searchOptions
   * @returns {Array}
   */
  getHeroesStats(account_id, searchOptions = null) {
    return this._fetch(
      this.API_URL + `players/${account_id}/heroes${searchOptions ? util.query(searchOptions) : ''}`,
    )
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get players played with, of the Steam32 Account id player. Optional object of query params.
   * @param {string} account_id
   * @param {{limit: integer, offset: integer, win: integer, patch: integer, game_mode: integer, lobby_type: integer, region: integer, date: integer, lane_role: integer, hero_id, integer, is_radiant: integer, included_account_id: integer[], excluded_account_id: integer[], with_hero_id: integer[], against_hero_id: integer[], significant: integer}=} searchOptions
   * @returns {Array}
   */
  getPlayersPlayedWith(account_id, searchOptions = null) {
    return this._fetch(
      this.API_URL + `players/${account_id}/peers${searchOptions ? util.query(searchOptions) : ''}`,
    )
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get pro players played with, of the Steam32 Account id player. Optional object of query params.
   * @param {string} account_id
   * @param {{limit: integer, offset: integer, win: integer, patch: integer, game_mode: integer, lobby_type: integer, region: integer, date: integer, lane_role: integer, hero_id, integer, is_radiant: integer, included_account_id: integer[], excluded_account_id: integer[], with_hero_id: integer[], against_hero_id: integer[], significant: integer}=} searchOptions
   * @returns {Array}
   */
  getProPlayersPlayedWith(account_id, searchOptions = null) {
    return this._fetch(
      this.API_URL + `players/${account_id}/pros${searchOptions ? util.query(searchOptions) : ''}`,
    )
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get the totals in stats, of the Steam32 Account id player. Optional object of query params.
   * @param {string} account_id
   * @param {{limit: integer, offset: integer, win: integer, patch: integer, game_mode: integer, lobby_type: integer, region: integer, date: integer, lane_role: integer, hero_id, integer, is_radiant: integer, included_account_id: integer[], excluded_account_id: integer[], with_hero_id: integer[], against_hero_id: integer[], significant: integer}=} searchOptions
   * @returns {Array}
   */
  getTotalsInStats(account_id, searchOptions = null) {
    return this._fetch(
      this.API_URL + `players/${account_id}/totals${searchOptions ? util.query(searchOptions) : ''}`,
    )
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get the counts in different categories, of the Steam32 Account id player. Optional object of query params.
   * @param {string} account_id
   * @param {{limit: integer, offset: integer, win: integer, patch: integer, game_mode: integer, lobby_type: integer, region: integer, date: integer, lane_role: integer, hero_id, integer, is_radiant: integer, included_account_id: integer[], excluded_account_id: integer[], with_hero_id: integer[], against_hero_id: integer[], significant: integer}=} searchOptions
   * @returns {Object}
   */
  getCountsInCategories(account_id, searchOptions = null) {
    return this._fetch(
      this.API_URL + `players/${account_id}/counts${searchOptions ? util.query(searchOptions) : ''}`,
    )
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get the histogram of a single stat, of a player.
   * @param {string} account_id Steam32 Account ID
   * @param {string} field The stat that should be looked upon.
   * @param {{limit: integer, offset: integer, win: integer, patch: integer, game_mode: integer, lobby_type: integer, region: integer, date: integer, lane_role: integer, hero_id, integer, is_radiant: integer, included_account_id: integer[], excluded_account_id: integer[], with_hero_id: integer[], against_hero_id: integer[], significant: integer}=} searchOptions
   * @returns {Array}
   */
  getStatHistogram(account_id, field, searchOptions = null) {
    return this._fetch(
      this.API_URL +
        `players/${account_id}/histograms/${field}${searchOptions ? util.query(searchOptions) : ''}`,
    )
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get the wards placed in matches played, of a player.
   * @param {string} account_id Steam32 Account id
   * @param {{limit: integer, offset: integer, win: integer, patch: integer, game_mode: integer, lobby_type: integer, region: integer, date: integer, lane_role: integer, hero_id, integer, is_radiant: integer, included_account_id: integer[], excluded_account_id: integer[], with_hero_id: integer[], against_hero_id: integer[], significant: integer}=} searchOptions
   * @returns {Object}
   */
  getWardsPlaced(account_id, searchOptions = null) {
    return this._fetch(
      this.API_URL + `players/${account_id}/wardmap${searchOptions ? util.query(searchOptions) : ''}`,
    )
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get the word count, said by the player self, and also what the player has read from matches.
   * @param {string} account_id Steam32 Account id
   * @param {{limit: integer, offset: integer, win: integer, patch: integer, game_mode: integer, lobby_type: integer, region: integer, date: integer, lane_role: integer, hero_id, integer, is_radiant: integer, included_account_id: integer[], excluded_account_id: integer[], with_hero_id: integer[], against_hero_id: integer[], significant: integer}=} searchOptions
   * @returns {Object}
   */
  getWordCounts(account_id, searchOptions = null) {
    return this._fetch(
      this.API_URL + `players/${account_id}/wordcloud${searchOptions ? util.query(searchOptions) : ''}`,
    )
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get the players rating history
   * @param {string} account_id Steam32 Account ID
   * @returns {Array}
   */
  getRatingHistory(account_id) {
    return this._fetch(this.API_URL + `players/${account_id}/ratings`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get the players hero rankings
   * @param {string} account_id Steam32 Account ID
   * @returns {Array}
   */
  getHeroRankings(account_id) {
    return this._fetch(this.API_URL + `players/${account_id}/rankings`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  // ------------- END PLAYER SECTION -------------

  /**
   * Get list of pro players
   * @returns {Array}
   */
  getProPlayers() {
    return this._fetch(this.API_URL + `proPlayers`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get list of pro matches.
   * @param {{less_than_match_id: integer}=} searchOptions
   * @returns {Array}
   */
  getProMatches(searchOptions = {}) {
    return this._fetch(this.API_URL + `proMatches${searchOptions ? util.query(searchOptions) : ''}`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get list of randomly sampled public matches
   * @param {{mmr_ascending: integer, mmr_descending: integer, less_than_match_id: integer}=} searchOptions Order by either mmr_ascending or mmr_descending, or less than a specific match id
   * @returns {Array}
   */
  getPublicMatches(searchOptions = {}) {
    return this._fetch(this.API_URL + `publicMatches${searchOptions ? util.query(searchOptions) : ''}`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get list of parsed match id's.
   * @returns {Array}
   */
  getParsedMatches() {
    return this._fetch(this.API_URL + `parsedMatches`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Submit arbitrary SQL queries to the database.
   * @param {string=} query PostgreSQL query as percent encoded string.
   * @returns {Object}
   */
  getExplorer(query = null) {
    const params = {};
    if (query != null) {
      params.query = query;
    }

    return this._fetch(this.API_URL + `explorer${searchOptions ? util.query(searchOptions) : ''}`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get site metadata
   * @returns {Object}
   */
  getMetadata() {
    return this._fetch(this.API_URL + `metadata`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get the distributions of mmr data by bracket and country.
   * @returns {Object}
   */
  getDistributions() {
    return this._fetch(this.API_URL + `distributions`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Search for players by their name.
   * @param {string} name The name you want to search for.
   * @returns {Array}
   */
  searchPlayerByName(name) {
    const params = {
      name,
    };
    return this._fetch(this.API_URL + `search${searchOptions ? util.query(searchOptions) : ''}`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get the top players by hero.
   * @param {string} hero_id The id of the hero, to find it's top players.
   * @returns {Object}
   */
  getHeroTopPlayers(hero_id) {
    const params = {
      hero_id,
    };
    return this._fetch(this.API_URL + `rankings${searchOptions ? util.query(searchOptions) : ''}`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get the heroes average stats.
   * @param {string} hero_id The ID of the hero, to get average stats of.
   * @returns {Object}
   */
  getHeroAverageStats(hero_id) {
    const params = {
      hero_id,
    };
    return this._fetch(this.API_URL + `benchmarks${searchOptions ? util.query(searchOptions) : ''}`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get current service statistics.
   * @returns {Object}
   */
  getServiceStatus() {
    return this._fetch(this.API_URL + `status`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get service health data.
   * @returns {Object}
   */
  getServiceHealth() {
    return this._fetch(this.API_URL + `health`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  // ------------- Start HERO SECTION -----------

  /**
   * Get all heroes data.
   * @returns {Array}
   */
  getAllHeroes() {
    return this._fetch(this.API_URL + `heroes`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get recent matches with a specific hero.
   * @param {string} hero_id
   * @returns {Array}
   */
  getRecentMatchesWithHero(hero_id) {
    return this._fetch(this.API_URL + `heroes/${hero_id}/matches`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get array of matchups against other heroes, for a specific hero..
   * @param {string} hero_id
   * @returns {Array}
   */
  getMatchupsWithHero(hero_id) {
    return this._fetch(this.API_URL + `heroes/${hero_id}/matchups`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get performance of a specific hero, over different durations.
   * @param {string} hero_id
   * @returns {Array}
   */
  getDurationsWithHero(hero_id) {
    return this._fetch(this.API_URL + `heroes/${hero_id}/duration`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get players, who have played this hero.
   * @param {string} hero_id
   * @returns {Array}
   */
  getPlayersByHeroPlayed(hero_id) {
    return this._fetch(this.API_URL + `heroes/${hero_id}/matches`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  // TODO: add the constants for the items_id mapped to the items, for this. method.
  /**
   * Get item popularity of the hero, categorized by start, early, mid and late game. Analyzed from pro matches.
   * @param {string} hero_id
   * @returns {Object}
   */
  getItemPopularityForHero(hero_id) {
    return this._fetch(this.API_URL + `heroes/${hero_id}/itemPopularity`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get hero stats in recent matches, for all heroes.
   * @returns {Array} An array of heroes, and their overall stats.
   */
  getAllHeroesStats() {
    return this._fetch(this.API_URL + `heroStats`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get league data.
   * @returns {Array}
   */
  getLeagueData() {
    return this._fetch(this.API_URL + `leagues`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get all teams data.
   * @returns {Array}
   */
  getAllTeams() {
    return this._fetch(this.API_URL + `teams`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get data for a specific team.
   * @param {string} team_id
   * @returns {Object}
   */
  getTeam(team_id) {
    return this._fetch(this.API_URL + `teams/${team_id}`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get matches for a specific team.
   * @param {string} team_id
   * @returns {Array}
   */
  getTeamMatches(team_id) {
    return this._fetch(this.API_URL + `teams/${team_id}/matches`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get players who have played for a specific team.
   * @param {string} team_id
   * @returns {Array}
   */
  getTeamMatches(team_id) {
    return this._fetch(this.API_URL + `teams/${team_id}/players`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get heroes played by a specific team.
   * @param {string} team_id
   * @returns {Array}
   */
  getTeamMatches(team_id) {
    return this._fetch(this.API_URL + `teams/${team_id}/heroes`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get get replay data for specific matches.
   * @param {string[]} match_id
   * @returns {Array}
   */
  getReplays(match_id) {
    const params = {
      match_id,
    };
    return this._fetch(this.API_URL + `replays${util.query(params)}`)
      .then((res) => util.handleResponse(res))
      .then((json) => {
        json.forEach((val) => {
          val.replay_url = `http://replay${val.cluster}.valve.net/570/${val.match_id}_${val.replay_salt}.dem.bz2`;
        });
        return json;
      })
      .catch((error) => error);
  }

  /**
   * Get top performances in a specific stat.
   * @param {string} stat
   * @returns {Array}
   */
  getRecordsOfStat(stat) {
    return this._fetch(this.API_URL + `records/${stat}`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get currently ongoing live games.
   * @returns {Array}
   */
  getLiveGames() {
    return this._fetch(this.API_URL + `live`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get Item timings scenarios.
   * Win rates for certain item timings on a hero, for items that cost more than 1400 gold.
   * @param {string=} item_name Filter scenarios with a specific item.
   * @param {string=} hero_id Filter scenarios with a specific hero.
   * @returns {Array}
   */
  getItemScenarios(item_name, hero_id) {
    const params = {
      item: item_name,
      hero_id,
    };
    return this._fetch(this.API_URL + `scenarios/itemTimings${util.query(params)}`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get Lane Roles scenarios.
   * Win rates for herores in certain lane roles.
   * @param {string=} lane_role Filter scenarios by a specific lane_role 1-4 (Safe, Mid, Off, Jungle).
   * @param {string=} hero_id Filter scenarios with a specific hero.
   * @returns {Array}
   */
  getLaneRoleScenarios(lane_role, hero_id) {
    const params = {
      lane_role,
      hero_id,
    };
    return this._fetch(this.API_URL + `scenarios/laneRoles${util.query(params)}`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get Misc scenarios.
   * Miscellaneous team scenarios
   * @param {string} scenario You only have 4 options: 'pos_chat_1min', 'neg_chat_1min', 'courier_kill' or 'first_blood'
   * @returns {Array}
   */
  getMiscScenarios(scenario) {
    const params = {
      scenario,
    };
    return this._fetch(this.API_URL + `scenarios/misc${util.query(params)}`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get database schema.
   * @returns {Array}
   */
  getDBSchema() {
    return this._fetch(this.API_URL + `schema`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }

  /**
   * Get static game constants.
   * See the available constants [here] {@link https://github.com/odota/dotaconstants/tree/master/build}
   * @param {string=} resource If left out, then returns array of available resources.
   * @returns {Array|Object}
   */
  getConstants(resource) {
    return this._fetch(this.API_URL + `constants/${resource}`)
      .then((res) => util.handleResponse(res))
      .catch((error) => error);
  }
}

module.exports = DotaApi;
