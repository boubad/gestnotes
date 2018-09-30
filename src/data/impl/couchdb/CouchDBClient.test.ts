import { CouchDBClient } from './CouchDBClient';
const TEST_ID = "033880e71b8c4b1cbf9802466abcaed0";
//
it("Test CouchDBClient info", (done)=>{
    let pMan = new CouchDBClient();
    pMan.info().then((info)=>{
        expect(info).toBeDefined();
        expect(info.db_name).toEqual('test');
        //console.log(info);
        done();
    }).catch((err)=>{
        console.error(err);
        done();
    });    
});

it("Test CouchDBClient isAlive", (done)=>{
    let pMan = new CouchDBClient();
    pMan.isAlive().then((bAlive)=>{
        expect(bAlive).toEqual(true);
        done();
    }).catch((err)=>{
        console.error(err);
        done();
    });    
});
it("Test CouchDB findDocById", (done)=>{
    let pMan = new CouchDBClient();
    let sid = TEST_ID;
    pMan.findDocById(sid).then((doc)=>{
        expect(doc).toBeDefined();
        expect(doc._id).toBeDefined();
        expect(doc._id).toEqual(sid);
        expect(doc._rev).toBeDefined();
        expect(doc._rev).not.toBeNull();
        //console.log(doc);
        done();
    }).catch((err)=>{
        console.error(err);
        done();
    });    
});
it("Test CouchDB findBlobsByOwnerId", (done)=>{
    let pMan = new CouchDBClient();
    let sid = TEST_ID;
    pMan.findBlobsByOwnerId(sid).then((pp)=>{
        expect(pp).toBeDefined();
        expect(pp.length).toBeGreaterThan(0);
        //console.log(pp);
        done();
    }).catch((err)=>{
        console.error(err);
        done();
    });    
});
it("Test CouchDB findDocRevision", (done)=>{
    let pMan = new CouchDBClient();
    let sid = TEST_ID;
    pMan.findDocRevision(sid).then((pp)=>{
        expect(pp).toBeDefined();
        expect(pp.length).toBeGreaterThan(0);
        //console.log(pp);
        done();
    }).catch((err)=>{
        console.error(err);
        done();
    });    
});
it('Test CouchDB findDocsBySelector',(done)=>{
    let pMan = new CouchDBClient();
    let sel={
        type:{
            $eq: 'etud'
        }
    };
    let start = 0;
    let count = 5;
    let fields = ["_id","firstname","lastname","avatar"];
    pMan.findDocsBySelector(sel,start,count,fields).then((pp)=>{
        expect(pp).toBeDefined();
        expect(pp.length).toBeGreaterThan(0);
        //console.log(pp);
        done();
    }).catch((err)=>{
        console.error(err);
        done();
    });  
});