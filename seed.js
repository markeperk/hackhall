var mongo =  require ('mongodb');
var objectId = mongo.ObjectID;
seedUsers = [
	{
		firstName:	"Admin",
		lastName:	"Account",
		displayName:	"Admin Account",
		password:	"admin-test",
		email:	"admin-test@test.com",
		role:	"admin",
		admin: true,
		_id: objectId("503cf4730e9f580200000002"),
		headline: "Admin of HackHall",
    approved: true
	},
	{
		firstName:	"test",
		lastName:	"Account",
		displayName:	"test Account",
		password:	"1",
		email:	"1@1.com",
		role:	"user",
		admin: false,
		_id: objectId("503cf4730e9f580200000003"),
		photoUrl: "https://s3.amazonaws.com/photos.angel.co/users/68026-medium_jpg?1344297998",
		headline: "Test user 1",
    approved: true
	}
];
var db;
var invites;
var users;
var posts;

var dbUrl = process.env.MONGOHQ_URL || "mongodb://@127.0.0.1:27017/hackhall";
mongo.Db.connect(dbUrl, function(error, client){
	if (error) throw error;
	else {
		db=client;
		invites = new mongo.Collection(db, "invites");
		users = new mongo.Collection(db, "users");
		posts = new mongo.Collection(db, "posts");
		invites.remove(function(){});
		users.remove(function(){});
		// posts.remove();
		invites.insert({code:'smrules'}, function(){});
		users.insert(seedUsers, function(){});
		posts.insert({title:'test',text:'testbody',author:{name:seedUsers[0].displayName, id:seedUsers[0]._id}}, function(){});
	}
	db.close();
});