const express = require('express');
const app = express();
const SERVER_KEY = 'AAAAwuA1KgQ:APA91bGk90kEJhH2fzy3cXR0CgkJ3moVyEN-pvGbrZ2MSMv_vefOWNLsQW9YfJZIxoVix54HeI-RGA_ZBHK4EgB8axkjwhdtb8lCZ-8zA2vzAR6fczzkK60MrvYiUISKz4h45_sRCo_H';

const FCM = require('fcm-node');

var port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is Up and Running at ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


//fcm endpoint
app.post('/fcm', (req, res, next) => {
    try {
        let fcm = new FCM(SERVER_KEY);
        let message = {
            to: '/topics/' + req.body.topic,
            notification: {
                title: req.body.title,
                body: req.body.body,
                sound: 'default',
                "click_action": "FCM_PLUGIN_ACTIVITY",
                "icon": "fcm_push_icon"
            },
            data: req.body.data
        }

        console.log("message: ", message);

        fcm.send(message, (err, response) => {
            if (err) {
                next(err);
            } else {
                res.json(response);
                console.log(response);
            }
        })
    } catch (error) {
        next(error);
    }
})