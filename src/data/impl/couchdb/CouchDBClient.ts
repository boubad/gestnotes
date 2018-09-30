import { ICouchDBAttachmentInfo } from "./../../ICouchDBAttachmentInfo";
import { ICouchDBUpdateResponse } from "./../../ICouchDBUpdateResponse";
import { IDataStore } from '../../IDataStore';
//
const DEFAULT_DB_URL = "http://services.diarra.ovh:5984/test";
const STRING_ID_IMPL: string = "_id";
const STRING_REV_IMPL: string = "_rev";
const STRING_FIND_IMPL: string = "_find";
const STRING_ATTACHMENTS_IMPL: string = "_attachments";
const STRING_ETAG1 = "etag";
const STRING_ETAG2 = "ETag";
const DATA_CHUNK_SIZE: number = 128;

//
export class CouchDBClient implements IDataStore {
  protected _baseurl: string;
  //
  constructor(url?: string) {
    this._baseurl = url !== undefined && url !== null ? url : DEFAULT_DB_URL;
  } // constructor
  //
  protected performGet(url: string): Promise<any> {
    let myHeaders = new Headers({
      Accept: "application/json"
    });
    let sUrl = this._baseurl + "/" + encodeURI(url);
    return fetch(sUrl, {
      method: "GET",
      headers: myHeaders,
      mode: "cors"
    }).then(response => {
      if (response.status === 200 || response.status === 304) {
        return response.json();
      } else {
        return {};
      }
    });
  } // performGet
  protected performHead(url: string): Promise<Headers> {
    let sUrl = this._baseurl + "/" + encodeURI(url);
    return fetch(sUrl, {
      method: "HEAD",
      mode: "cors"
    }).then(response => {
      if (response.status === 200) {
        return response.headers;
      } else {
        return new Headers();
      }
    });
  } // performHead
  //
  protected performPut(
    url: string,
    data: any
  ): Promise<ICouchDBUpdateResponse> {
    let myHeaders = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json"
    });
    return fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: myHeaders,
      body: JSON.stringify(data)
    })
      .then(rsp => {
        return rsp.json();
      })
      .then((r: ICouchDBUpdateResponse) => {
        return r;
      }).catch((err)=>{
        return {ok:false};
      });
  } // performPut
  protected performPost(url: string, data: any): Promise<any> {
    let myHeaders = new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json"
    });
    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: myHeaders,
      body: JSON.stringify(data)
    })
      .then(rsp => {
        return rsp.json();
      })
      .then((r: any) => {
        return r;
      }).catch((e)=>{
         return {};
      });
  } // performPost
  protected performDelete(url: string): Promise<ICouchDBUpdateResponse> {
    let myHeaders = new Headers({
      Accept: "application/json"
    });
    return fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: myHeaders
    })
      .then(rsp => {
        return rsp.json();
      })
      .then((r: ICouchDBUpdateResponse) => {
        return r;
      });
  } // performDelete
  //
  public formBlobUrl(docid: string, attname: string): string {
    if (
      docid !== undefined &&
      docid !== null &&
      attname !== undefined &&
      attname !== null
    ) {
      return this._baseurl + "/" + encodeURI(docid) + "/" + encodeURI(attname);
    } else {
      return "";
    }
  } //formBlobUrl
  //
  public isAlive(): Promise<boolean> {
    let sUrl = this._baseurl;
    return fetch(sUrl, {
      method: "HEAD",
      mode: "cors"
    }).then(response => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    });
  } // isAlive
  //
  public info(): Promise<any> {
    return this.performGet("");
  } // info
  public async findDocById(sid: string): Promise<any> {
    let oRet = {};
    if (sid === undefined || sid === null) {
      return oRet;
    }
    let id = sid.trim();
    if (sid.length < 1) {
      return oRet;
    }
    try {
      oRet = await this.performGet(id);
    } catch (e) {}
    return oRet;
  } // findDocById
  public async findManyDocs(ids: string[]): Promise<any[]> {
    let oRet = new Array<any>();
    if (ids !== undefined && ids !== null) {
      let n = ids.length;
      for (let i = 0; i < n; i++) {
        let id = ids[i];
        if (id !== undefined && id !== null) {
          let sid = id.trim();
          if (sid.length > 0) {
            let p = await this.findDocById(sid);
            if (p !== undefined && p !== null) {
              if (
                p[STRING_ID_IMPL] !== undefined &&
                p[STRING_ID_IMPL] !== null
              ) {
                oRet.push(p);
              }
            } //p
          } // sId
        } // id
      } // i
    } // ids
    return oRet;
  } //findManyDocs
  //
  public async findBlobsByOwnerId(
    sid: string
  ): Promise<ICouchDBAttachmentInfo[]> {
    let oRet = new Array<ICouchDBAttachmentInfo>();
    if (sid === undefined || sid === null) {
      return oRet;
    }
    let id = sid.trim();
    if (sid.length < 1) {
      return oRet;
    }
    try {
      let o = await this.performGet(id);
      if (
        o[STRING_ATTACHMENTS_IMPL] !== undefined &&
        o[STRING_ATTACHMENTS_IMPL] !== null
      ) {
        let ox = o[STRING_ATTACHMENTS_IMPL];
        for (let name in ox) {
          let p: ICouchDBAttachmentInfo = ox[name];
          p.name = name;
          oRet.push(p);
        } // name
      } // attachment
    } catch (e) {}
    return oRet;
  } // findBlobsByOwnerId
  public async findDocRevision(sid: string): Promise<string> {
    let sRet: string = "";
    if (sid === undefined || sid === null) {
      return sRet;
    }
    let id = sid.trim();
    if (sid.length < 1) {
      return sRet;
    }
    try {
      let hh = await this.performHead(id);
      let sx = "";
      if (hh.has(STRING_ETAG1)) {
        let s = hh.get(STRING_ETAG1);
        sx = s !== undefined && s !== null ? s : "";
      } else if (hh.has(STRING_ETAG2)) {
        let s = hh.get(STRING_ETAG2);
        sx = s !== undefined && s !== null ? s : "";
      }
      let n = sx.length;
      if (n > 2) {
        sRet = sx.slice(1, n - 1);
      }
    } catch (e) {}
    return sRet;
  } //getDocRevision
  public async maintainsBlob(
    sid: string,
    attname: string,
    attype: string,
    bdata: Blob
  ): Promise<string> {
    let sRet = "";
    if (
      sid === undefined ||
      sid === null ||
      (attname === undefined || attname === null) ||
      attype === undefined ||
      attype === null ||
      bdata === undefined ||
      bdata === null
    ) {
      return sRet;
    }
    try {
      let id = sid.trim();
      let srev = await this.findDocRevision(id);
      if (srev.length > 0) {
        let sUrl =
          this._baseurl +
          encodeURI(id) +
          "/" +
          encodeURI(attname) +
          "?rev=" +
          srev;
        let myHeaders = new Headers({
          Accept: "application/json",
          "Content-Type": attype
        });
        fetch(sUrl, {
          method: "PUT",
          headers: myHeaders,
          body: bdata,
          mode: "cors"
        })
          .then(rsp => {
            return rsp.json();
          })
          .then((r: ICouchDBUpdateResponse) => {
            if (r.ok !== undefined && r.ok !== null && r.ok === true) {
              sRet = this.formBlobUrl(id, attname);
            }
            return sRet;
          })
          .catch(err => {
            return sRet;
          });
      } // srev
    } catch (e) {
      console.error(e);
    }
    return sRet;
  } //maintainsBlob
  public async removeBlob(sid: string, attname: string): Promise<boolean> {
    let bRet = false;
    if (
      sid === undefined ||
      sid === null ||
      attname === undefined ||
      attname === null
    ) {
      return bRet;
    }
    try {
      let id = sid.trim();
      let srev = await this.findDocRevision(id);
      if (srev.length > 0) {
        let sUrl = this._baseurl + encodeURI(id) + "/" + encodeURI(attname);
        let rsp = await this.performDelete(sUrl);
        if (rsp.ok !== undefined && rsp.ok !== null) {
          bRet = rsp.ok;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return bRet;
  } //removeAttachment
  //
  public async findDocsBySelector(
    sel: Object,
    start?: number,
    count?: number,
    ff?: string[]
  ): Promise<any[]> {
    let oRet = new Array<any>();
    if (sel === undefined || sel === null) {
      return oRet;
    }
    try {
      let sUrl = this._baseurl + "/" + STRING_FIND_IMPL;
      if (ff !== undefined && ff !== null && ff.length > 0) {
        let opts = {
          fields: ff,
          skip: start !== undefined && start != null && start >= 0 ? start : 0,
          limit:
            count !== undefined && count !== null && count > 0
              ? count
              : DATA_CHUNK_SIZE,
          selector: sel
        };
        let rsp = await this.performPost(sUrl, opts);
        oRet = rsp.docs;
      } else {
        let opts = {
          skip: start !== undefined && start != null && start >= 0 ? start : 0,
          limit:
            count !== undefined && count !== null && count > 0
              ? count
              : DATA_CHUNK_SIZE,
          selector: sel
        };
        let rsp = await this.performPost(sUrl, opts);
        oRet = rsp.docs;
      }
    } catch (e) {
      // console.error(e);
    }
    return oRet;
  } //findDocsBySelector
  //
  public async createDoc(doc: any): Promise<ICouchDBUpdateResponse> {
    let oRet = {};
    if (doc === undefined || doc === null) {
      return oRet;
    }
    try {
      let sId: string =
        doc[STRING_ID_IMPL] !== undefined && doc[STRING_ID_IMPL] !== null
          ? doc[STRING_ID_IMPL]
          : "";
      if (sId.length < 1) {
        oRet = await this.performPost(
          this._baseurl,
          doc
        );
      } else {
        let sUrl = this._baseurl + encodeURI(sId);
        oRet = await this.performPut(sUrl, doc);
      }
    } catch (e) {
      console.error(e);
    }
    return oRet;
  } // createDoc
  //
  public async maintainsDoc(doc: any): Promise<boolean> {
    let oRet = false;
    if (doc === undefined || doc === null) {
      return oRet;
    }
    try {
      let sId: string =
        doc[STRING_ID_IMPL] !== undefined && doc[STRING_ID_IMPL] !== null
          ? doc[STRING_ID_IMPL]
          : "";
      if (sId.length < 1) {
        let rx = await this.createDoc(doc);
        if (rx !== undefined && rx !== null && rx.ok) {
          doc[STRING_ID_IMPL] = rx.id;
          doc[STRING_REV_IMPL] = rx.rev;
          return true;
        } else {
          return false;
        }
      }
      let sRev = await this.findDocRevision(sId);
      if (sRev.length < 1) {
        let rx = await this.createDoc(doc);
        if (rx !== undefined && rx !== null && rx.ok) {
          doc[STRING_ID_IMPL] = rx.id;
          doc[STRING_REV_IMPL] = rx.rev;
          return true;
        } else {
          return false;
        }
      }
      let old = await this.findDocById(sId);
      if (
        old !== undefined &&
        old !== null &&
        old[STRING_ID_IMPL] !== undefined &&
        old[STRING_REV_IMPL] !== undefined
      ) {
        let aa = old[STRING_ATTACHMENTS_IMPL];
        if (aa !== undefined && aa !== null) {
          doc[STRING_ATTACHMENTS_IMPL] = aa;
        }
        let sUrl = this._baseurl + encodeURI(sId) + "?rev=" + sRev;
        let rsp = await this.performPut(sUrl, doc);
        oRet = rsp.ok !== undefined && rsp.ok !== null ? rsp.ok : false;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
    }
    return oRet;
  } // maintainsDoc
  public async removeDoc(sid: string): Promise<boolean> {
    let oRet = false;
    if (sid === undefined || sid === null) {
      return oRet;
    }
    let id = sid.trim();
    if (sid.length < 1) {
      return oRet;
    }
    try {
      let sRev = await this.findDocRevision(id);
      if (sRev.length > 0) {
        let sUrl = this._baseurl + encodeURI(id) + "?rev=" + sRev;
        let rsp = await this.performDelete(sUrl);
        oRet = rsp.ok !== undefined && rsp.ok !== null ? rsp.ok : false;
      }
    } catch (e) {}
    return oRet;
  } // deleteDoc
} // class CouchDBClient
