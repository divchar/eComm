const e$4 = (e2) => {
  let t2 = (e3, n2 = []) => {
    if (typeof e3 == `object`) {
      let r2 = [];
      for (let i2 in e3) {
        let a2 = e3[i2] ?? [];
        if (Array.isArray(a2)) for (let e4 of a2) r2.push(t2(e4, [...n2, i2]));
        else if (typeof a2 == `object`) for (let e4 of Object.keys(a2)) {
          let o2 = a2[e4];
          for (let a3 of o2) r2.push(t2(a3, [...n2, `${i2}:${e4}`]));
        }
      }
      return r2.flatMap((e4) => e4);
    }
    return [...n2, String(e3)].join(`.`);
  };
  return e2.flatMap((e3) => t2(e3));
};
const t$5 = [`fields`, `filter`, `search`, `sort`, `limit`, `offset`, `page`, `deep`, `backlink`, `alias`, `aggregate`, `groupBy`, `version`, `versionRaw`], n$3 = (e2) => typeof e2 == `boolean`, r$2 = (e2) => typeof e2 == `string` && !!e2, i = (e2) => typeof e2 == `number`, a = (e2) => Array.isArray(e2) && e2.length > 0, o = (e2) => typeof e2 == `object` && !!e2 && !a(e2) && Object.keys(e2).length > 0, s = (s2) => {
  let c = {};
  s2.fields && (a(s2.fields) && (c.fields = e$4(s2.fields).join(`,`)), r$2(s2.fields) && (c.fields = s2.fields)), o(s2.filter) && (c.filter = JSON.stringify(s2.filter)), r$2(s2.search) && (c.search = s2.search), s2.sort && (a(s2.sort) && (c.sort = s2.sort.join(`,`)), r$2(s2.sort) && (c.sort = s2.sort)), `limit` in s2 && (i(s2.limit) && s2.limit >= -1 && (c.limit = String(s2.limit)), r$2(s2.limit) && (c.limit = s2.limit)), `offset` in s2 && (i(s2.offset) && s2.offset >= 0 && (c.offset = String(s2.offset)), r$2(s2.offset) && (c.offset = s2.offset)), `page` in s2 && (i(s2.page) && s2.page >= 1 && (c.page = String(s2.page)), r$2(s2.page) && (c.page = s2.page)), o(s2.deep) && (c.deep = JSON.stringify(s2.deep)), o(s2.alias) && (c.alias = JSON.stringify(s2.alias)), o(s2.aggregate) && (c.aggregate = JSON.stringify(s2.aggregate)), s2.groupBy && (a(s2.groupBy) && (c.groupBy = s2.groupBy.join(`,`)), r$2(s2.groupBy) && (c.groupBy = s2.groupBy)), r$2(s2.version) && (c.version = s2.version), s2.versionRaw && (n$3(s2.versionRaw) && (c.versionRaw = String(s2.versionRaw)), r$2(s2.versionRaw) && (c.versionRaw = s2.versionRaw));
  for (let [e2, n2] of Object.entries(s2)) {
    if (t$5.includes(e2)) continue;
    let r2;
    r2 = typeof n2 == `string` ? n2 : JSON.stringify(n2), r2 && (c[e2] = r2);
  }
  return c;
};
const t$4 = (e2, t2) => (e2.endsWith(`/`) && (e2 = e2.slice(0, -1)), t2.startsWith(`/`) || (t2 = `/` + t2), e2 + t2), n$2 = (n2, r2, i2) => {
  let a2 = n2.pathname === `/` ? r2 : t$4(n2.pathname, r2), o2 = new globalThis.URL(a2, n2);
  if (i2) for (let [t2, n3] of Object.entries(s(i2))) if (n3 && typeof n3 == `object` && !Array.isArray(n3)) for (let [e2, r3] of Object.entries(n3)) o2.searchParams.set(`${t2}[${e2}]`, String(r3));
  else o2.searchParams.set(t2, n3);
  return o2;
};
function e$3(e2) {
  return typeof e2 != `object` || !e2 ? false : `headers` in e2 && `ok` in e2 && `json` in e2 && typeof e2.json == `function` && `text` in e2 && typeof e2.json == `function`;
}
async function t$3(t2) {
  if (!(typeof t2 != `object` || !t2)) {
    if (e$3(t2)) {
      let e2 = t2.headers.get(`Content-Type`)?.toLowerCase();
      if (e2?.startsWith(`application/json`) || e2?.startsWith(`application/health+json`)) {
        let e3 = await t2.json();
        if (!t2.ok || `errors` in e3) throw e3;
        return `data` in e3 ? e3.data : e3;
      }
      if (e2?.startsWith(`text/html`) || e2?.startsWith(`text/plain`)) {
        let e3 = await t2.text();
        if (!t2.ok) throw e3;
        return e3;
      }
      return t2.status === 204 ? null : t2;
    }
    if (`errors` in t2) throw t2;
    return `data` in t2 ? t2.data : t2;
  }
}
const t$2 = async (t2, n2, r2 = globalThis.fetch) => (n2.headers = typeof n2.headers == `object` && !Array.isArray(n2.headers) ? n2.headers : {}, r2(t2, n2).then((t3) => t$3(t3).catch((e2) => {
  let n3 = { message: ``, errors: e2 && typeof e2 == `object` && `errors` in e2 ? e2.errors : e2, response: t3 };
  return e2 && typeof e2 == `object` && `data` in e2 && (n3.data = e2.data), Array.isArray(n3.errors) && n3.errors[0]?.message && (n3.message = n3.errors[0].message), Promise.reject(n3);
})));
const e$2 = { fetch: globalThis.fetch, WebSocket: globalThis.WebSocket, URL: globalThis.URL, logger: globalThis.console }, t$1 = (t2, n2 = {}) => {
  let r2 = n2.globals ? { ...e$2, ...n2.globals } : e$2;
  return { globals: r2, url: new r2.URL(t2), with(e2) {
    return { ...this, ...e2(this) };
  } };
};
function e$1(e2) {
  return `directus_access.directus_activity.directus_collections.directus_comments.directus_fields.directus_files.directus_folders.directus_migrations.directus_permissions.directus_policies.directus_presets.directus_relations.directus_revisions.directus_roles.directus_sessions.directus_settings.directus_users.directus_dashboards.directus_panels.directus_notifications.directus_shares.directus_flows.directus_operations.directus_translations.directus_versions.directus_extensions.directus_deployments.directus_deployment_projects.directus_deployment_runs`.split(`.`).includes(e2);
}
const e = (e2, t2) => {
  if (e2.length === 0) throw Error(t2);
};
const t = (t2, n2) => {
  if (e$1(String(t2))) throw Error(n2);
};
const n$1 = (n2, r2) => () => (e(String(n2), `Collection cannot be empty`), t(n2, `Cannot use readItems for core collections`), { path: `/items/${n2}`, params: r2 ?? {}, method: `GET` }), r$1 = (n2, r2, i2) => () => (e(String(n2), `Collection cannot be empty`), t(n2, `Cannot use readItem for core collections`), e(String(r2), `Key cannot be empty`), { path: `/items/${n2}/${r2}`, params: i2 ?? {}, method: `GET` });
const n = {}, r = (r2 = {}) => (i2) => {
  let a2 = { ...n, ...r2 };
  return { async request(n2) {
    let o2 = n2();
    if (o2.headers ||= {}, `Content-Type` in o2.headers ? o2.headers[`Content-Type`] === `multipart/form-data` && delete o2.headers[`Content-Type`] : o2.headers[`Content-Type`] = `application/json`, `getToken` in this && !(`Authorization` in o2.headers)) {
      let e2 = await this.getToken();
      e2 && (o2.headers.Authorization = `Bearer ${e2}`);
    }
    let s2 = n$2(i2.url, o2.path, o2.params), c = { method: o2.method ?? `GET`, headers: o2.headers ?? {} };
    `credentials` in a2 && (c.credentials = a2.credentials), o2.body && (c.body = o2.body), o2.onRequest && (c = await o2.onRequest(c)), a2.onRequest && (c = await a2.onRequest(c));
    let l = await t$2(s2.toString(), c, i2.globals.fetch);
    return `onResponse` in o2 && (l = await o2.onResponse(l, c)), `onResponse` in r2 && (l = await r2.onResponse(l, c)), l;
  } };
};
export {
  r as a,
  n$1 as n,
  r$1 as r,
  t$1 as t
};
