const md5 = require('md5');
const bcrypt = require('bcryptjs');
const instabio = require('instabio');
const getstream = require('getstream');

const MongoClient = require('mongodb').MongoClient;

module.exports.signup = (event, context, callback) => {
    const data = JSON.parse(event.body);

    MongoClient.connect(
        process.env.DB_URI,
        { useNewUrlParser: true },
        (err, client) => {
            if (err) {
                callback(err);
            }

            const db = client.db(process.env.DB_NAME);

            // Find user
            db.collection('users').findOneAndUpdate(
                { email: data.email },
                {
                    $set: {
                        guid: data.guid,
                        name: data.name,
                        email: data.email,
                        password: data.password.length
                            ? bcrypt.hashSync(data.password, 8)
                            : null,
                    },
                },
                {
                    upsert: true,
                    returnOriginal: false,
                },
                (err, res) => {
                    if (err) {
                        callback(err);
                        process.exit(1);
                    }

                    // Close MongoDB connection
                    client.close();

                    // Remove password from payload
                    delete res.value['password'];

                    // Connect to Stream client
                    const stream = getstream.connect(
                        process.env.STREAM_KEY,
                        process.env.STREAM_SECRET
                    );

                    const userId = res.value._id.toString();
                    const token = stream.createUserSessionToken(userId);
                    const session = stream.createUserSession(token);

                    // Default follow - Self
                    session.feed('timeline').follow('user', userId);

                    // Default follow - Nick Parsons (like Tom from MySpace)
                    session
                        .feed('timeline')
                        .follow('user', '5c2cfbeab407b5227f1d5f27');

                    // Retro gravatar - Force = true
                    const image = `https://www.gravatar.com/avatar/${md5(
                        res.value.email
                    )}&size=400&d=retro&f=y`;

                    // Create  user in Stream
                    session.user.getOrCreate({
                        uid: userId,
                        guid: res.guid,
                        name: res.value.name,
                        email: res.value.email.toLowerCase(),
                        bio: instabio() + '.',
                        avatar: image,
                        profileImage: image,
                        username: `@${res.value.name
                            .replace(/\s/g, '')
                            .toLowerCase()}`,
                    });

                    callback(null, {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': true,
                        },
                        body: JSON.stringify(
                            Object.assign(
                                {},
                                {
                                    id: res._id,
                                    authed: true,
                                    token,
                                }
                            )
                        ),
                    });
                }
            );
        }
    );
};

module.exports.signin = (event, context, callback) => {
    const data = JSON.parse(event.body);

    MongoClient.connect(
        process.env.DB_URI,
        { useNewUrlParser: true },
        (err, client) => {
            if (err) {
                callback(err);
            }

            const db = client.db(process.env.DB_NAME);

            // Find user with provided email
            db.collection('users')
                .find({ email: data.email })
                .toArray((err, res) => {
                    if (err) {
                        callback(err);
                        process.exit(1);
                    }

                    // Close MongoDB connection
                    client.close();

                    // Found object
                    const obj = res[0];

                    // Compare provided password with database password - Sync
                    const authed = bcrypt.compareSync(
                        data.password,
                        obj.password
                    );

                    // Connect to Stream client
                    const stream = getstream.connect(
                        process.env.STREAM_KEY,
                        process.env.STREAM_SECRET
                    );

                    // Convert MongoDB ID to string (from Object)
                    const userId = obj._id.toString();

                    // Get users Stream token
                    const token = stream.createUserSessionToken(userId);

                    // Remove password from payload
                    delete obj['password'];

                    callback(null, {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': true,
                        },
                        body: JSON.stringify(
                            Object.assign({}, { id: obj._id, authed, token })
                        ),
                    });
                });
        }
    );
};

module.exports.suggested = (event, context, callback) => {
    MongoClient.connect(
        process.env.DB_URI,
        { useNewUrlParser: true },
        (err, client) => {
            if (err) {
                callback(err);
                process.exit(1);
            }

            const db = client.db(process.env.DB_NAME);

            // User aggregation to get a sample (mocking recommended) to get misc. users
            db.collection('users')
                .aggregate([
                    {
                        $sample: { size: 25 },
                    },
                ])
                .toArray((err, res) => {
                    if (err) {
                        callback(err);
                        process.exit(1);
                    }

                    client.close();

                    const users = res.map(user => {
                        user.uid = user._id;

                        user.avatar = `https://www.gravatar.com/avatar/${md5(
                            user.email
                        )}&size=400&identicon=true`;

                        user.username = `@${user.name
                            .replace(/\s/g, '')
                            .toLowerCase()}`;

                        // Delete sensitive data from response
                        delete user['_id'];
                        delete user['guid'];
                        delete user['password'];

                        return user;
                    });

                    callback(null, {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': true,
                        },
                        body: JSON.stringify(users),
                    });
                });
        }
    );
};
