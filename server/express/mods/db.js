module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/Towkens');

    var conn = mongoose.connection;

    var model_schema_users = mongoose.Schema({
        fullname: String,
        email: String,
        password: String,
        type: String,
        facebook_id: String,
        google_id: String,
        paid: Boolean,
        rating: Number,
        total_checkin: Number,
        user_location: Array
    });
    var CollectionModel_users = conn.model('users', model_schema_users);

    var model_schema_token = mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        mile: Number,
        business_name: String,
        discount: Number,
        time_remaining: Number,
        latitude: Number,
        longitude: Number,
        Used: Boolean,
        geo_location: Array,
        start_time: String,
        views: Number,
        token_details: String,
        type_of_token: String,
        token_quantity: Number
    });
    var CollectionModel_token = conn.model('token', model_schema_token);

    var model_schema_tokenRating = mongoose.Schema({
        token_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'token'
        },
        rating: Number,
        comment: String,
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        business_id: {
            type: mongoose.Schema.Types.ObjectId
        }
    });
    var CollectionModel_tokenRating = conn.model('tokenRating', model_schema_tokenRating);

    var model_schema_tokenRedeem = mongoose.Schema({
        token_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'token'
        },
        redeem_code: String,
        used: String,
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    });
    var CollectionModel_tokenRedeem = conn.model('tokenRedeem', model_schema_tokenRedeem);

    conn.on('error', function (err) {
        process.exit();
    });

    return function (req, res, next) {
        req.mongo = conn;
        //req.gfs = gfs;
        req.Collection_users = CollectionModel_users;
        req.Collection_token = CollectionModel_token;
        req.Collection_tokenRating = CollectionModel_tokenRating;
        req.Collection_tokenRedeem = CollectionModel_tokenRedeem;
        next();
    };
};