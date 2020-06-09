class BrandModel {
    
    #dbm
    
    constructor(dbm) {
        this.dbm = dbm;
    } 
    
    getConnection() {
        return this.dbm.getConnection()
    }
    
    /*
     * BRAND
     */
    
    // function for select all brands
    getAllBrands(title, description, callback){
        this.getConnection().then((conn) => {
            var sql = '';
            if (title == '' && description == '') {
                sql = "select brand_id, brand_title, brand_description from brand;";
            } else if (title !== '' && description == '') {
                sql = "select brand_id, brand_title, brand_description from brand where brand_title like '%"+ title +"%';";
            } else if (title == '' && description !== '') {
                sql = "select brand_id, brand_title, brand_description from brand where brand_description like '%"+ description +"%';";
            } else {
                var sql = "select brand_id, brand_title, brand_description from brand where brand_title like '%"+ title +"%' and brand_description like '%"+ description +"%';";
            }
//             console.log(sql)
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                callback(results);
                conn.release();
            });
        })
    }
    
    // function to delete a brand
    deleteBrand(id, callback){
        this.getConnection().then((conn) => {
            var sql = "update spice set brand_id = NULL where brand_id='"+ id +"';";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                var sql = "delete from brand where brand_id='"+ id +"';";
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    callback(1);
                    conn.release();
                });
            });
        })
    }
    
    // function to add a brand
    addBrand(title, description, callback){
        this.getConnection().then((conn) => {
            var sql = "insert into brand (brand_title, brand_description, user_id) values('"+ title +"' ,'"+ description +"' ,'1') ;"
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                sql = "select brand_id, brand_title, brand_description from brand where brand_id='" + results.insertId + "';"
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    var data = {
                        brand_id: results[0].brand_id,
                        brand_title: results[0].brand_title,
                        brand_description: results[0].brand_description
                    }
                    callback(data);
                    conn.release();
                });
            });
        })
    }
    
    // function to update a brand
    editBrand(id, title, description, callback){
        this.getConnection().then((conn) => {
            var sql = "update brand set brand_title='" + title + "', brand_description='" + description + "' where brand_id='"+ id +"';";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                sql = "select brand_id, brand_title, brand_description from brand where brand_id='" + id +"';";
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    var data = {
                        brand_id: results[0].brand_id,
                        brand_title: results[0].brand_title,
                        brand_description: results[0].brand_description
                    }
//                     console.log(data)
                    callback(data);
                    conn.release();
                });
            });
        })
    }
}

module.exports = BrandModel;
 
